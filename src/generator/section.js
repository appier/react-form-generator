import path from 'path';

import { readFile, writeFile } from '../util/file';

import { compose, fromNullable, Right } from '../util/fpHelper';

import {
  substitueParam,
  injectChildrenComponent,
  injectPassProps,
  injectCSSModule,
  beautifier,
} from './util';

import fieldCodeGen from './field';

export const interploation = (
  {
    componentName,
    params,
    config,
    rootPath,
    children,
  },
) => templateRes => {
  return templateRes.then(
    compose(
      injectCSSModule(config)(rootPath)('Form.css'),
      injectPassProps(children),
      injectChildrenComponent(children),
      substitueParam({ componentName, params }),
    ),
  );
};

export const codeGen = config =>
  registeredTemplate => entry => rootPath => dist => {
    return Promise.all(
      entry.map(({ template, componentName, params, children }) => {
        const newRootPath = ['..', ...rootPath];
        const outputFile = path.resolve(
          __dirname,
          dist,
          componentName,
          'Index.js',
        );
        return fromNullable(registeredTemplate.section[template])
          .map(templateFileName => {
            return path.resolve(__dirname, '../', templateFileName);
          })
          .map(readFile)
          .fold(
            () => {
              return Promise.reject('fail loading template file');
            },
            res => {
              console.log(`Generate Section Component: ${outputFile}`);
              return interploation({
                componentName,
                params,
                config,
                rootPath: newRootPath,
                children,
                outputFile,
              })(res)
                .then(beautifier)
                .then(writeFile(outputFile));
            },
          )
          .then(() => {
            //recursive call self or field/codeGen
            return Promise.all(
              children.map(d => {
                const newDist = `${dist}/${componentName}`;
                if (d.type === 'field') {
                  return fieldCodeGen(config)(registeredTemplate)([d])(
                    newRootPath,
                  )(newDist);
                } else if (d.type === 'section') {
                  return codeGen(config)(registeredTemplate)([d])(newRootPath)(
                    newDist,
                  );
                }
              }),
            );
          })
          .catch(err => {
            console.log(`Create ${componentName} fail due to: ${err}`);
          });
      }),
    );
  };

export default codeGen;