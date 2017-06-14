import path from 'path';

import { readFile, writeFile, copyFile } from '../util/file';

import { compose, fromNullable, Right } from '../util/fpHelper';

import {
  importComponent,
  getDataToComponent,
  embedSectionComponentByKeyPath,
  embedFieldComponentByKeyPath,
} from './codeSnippet';

import {
  getChildrenKeys,
  getChildrenKeyPath,
  substitueParam,
  injectPassProps,
  injectCSSModule,
  getSourceCSSFileLocation,
  beautifier,
} from './util';

import fieldCodeGen from './field';
import sectionCodeGen from './section';

export const injectChildrenComponent = children => template => {
  const importChildrenFileText = children
    .map(({ type, componentName }) => {
      if (type === 'field') {
        return importComponent({
          name: componentName,
          path: `./${componentName}`,
        });
      } else if (type === 'section') {
        return importComponent({
          name: componentName,
          path: `./${componentName}/Index`,
        });
      }
      return '';
    })
    .join('\n');

  const usedProps = getChildrenKeys(children).concat([
    'update',
    'registerValidator',
  ]);

  const childrenComponentText = children
    .map(({ type, componentName, key, keyPath, children }) => {
      if (type === 'field') {
        return embedFieldComponentByKeyPath({
          componentName,
          key,
          registerValidator: 'this.registerValidator',
          changeHandler: 'this.update',
        });
      } else if (type === 'section') {
        return embedSectionComponentByKeyPath({
          componentName,
          keys: getChildrenKeys(children),
          keyPaths: getChildrenKeyPath(children),
          registerValidator: 'this.registerValidator',
          changeHandler: 'this.update',
        });
      }
      return '';
    })
    .join('\n');

  let ret = template
    .replace(/\/\* __IMPORT_COMPONENT__ \*\//g, importChildrenFileText)
    .replace(/{\/\* __INJECT_COMPONENT__ \*\/}/g, '\n' + childrenComponentText);

  ret = injectPassProps(usedProps)(ret);
  return ret;
};

const injectCSS = rootPath => sourceCSS => template => {
  let ret = template;
  ret = ret.replace(
    /\/\* __IMPORT__ \*\//g,
    `\nimport '${getSourceCSSFileLocation(rootPath)(sourceCSS)}'`,
  );
  return ret;
};

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
      config.cssModule
        ? injectCSSModule(config)(rootPath)('Form.css')
        : injectCSS(rootPath)('Form.css'),
      injectChildrenComponent(children),
      substitueParam({ componentName, params }),
    ),
  );
};

export const codeGen = config =>
  registeredTemplate => entry => rootPath => dist => {
    const { template, params, children } = entry[0];
    const outputFile = path.resolve(__dirname, dist, 'Form.js');
    const outputCSSFile = path.resolve(__dirname, dist, 'Form.css');
    const sourceCSSFile = path.resolve(__dirname, '../', config.sourceCSS);

    copyFile(sourceCSSFile)(outputCSSFile);

    return fromNullable(registeredTemplate.form[template])
      .map(templateFileName => {
        return path.resolve(__dirname, '../', templateFileName);
      })
      .map(readFile)
      .fold(
        () => {
          return Promise.reject('fail loading template file');
        },
        res => {
          console.log(`Generate Form Component: ${outputFile}`);
          return interploation({
            componentName: 'Form',
            params,
            config,
            rootPath,
            children,
          })(res)
            .then(beautifier)
            .then(writeFile(outputFile));
        },
      )
      .then(() => {
        return Promise.all(
          children.map(d => {
            if (d.type === 'field') {
              return fieldCodeGen(config)(registeredTemplate)([d])(rootPath)(
                dist,
              );
            } else if (d.type === 'section') {
              return sectionCodeGen(config)(registeredTemplate)([d])(rootPath)(
                dist,
              );
            }
          }),
        );
      })
      .catch(err => {
        console.log(`Create Form fail due to: ${err}`);
      });
  };

export default codeGen;