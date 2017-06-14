import path from 'path';
import json5 from 'json5';

import { readFile, writeFile } from '../util/file';

import { getValidateFnText } from './codeSnippet';

import { compose, fromNullable, Right } from '../util/fpHelper';

import { replaceParam, injectCSSModule, beautifier } from './util';

export const substitueParam = ({ componentName, defaultValue, params }) =>
  template => {
    let ret = template
      .replace(/__COMPONENT_NAME__/g, componentName)
      .replace(/'__DEFAULT_VALUE__'/g, defaultValue || `''`);
    ret = replaceParam(params)(ret);
    return ret;
  };

export const injectValidateFn = ({ componentName, params, template }) =>
  validate => templateText => {
    let ret = templateText;
    let label = params.label || componentName;
    const validateFnText = getValidateFnText({ label, template })(
      validate || {},
    );
    ret = ret.replace(/\/\* __VALIDATE_FN__ \*\//g, '\n' + validateFnText);
    return ret;
  };

export const substitueKeyPath = ({ key, keyPath, rootPath }) => template => {
  let ret = template;
  let keyPathText = `['${key}']`;
  if (keyPath) {
    keyPathText = `[${keyPath.map(d => `'${d}'`).join(', ')}]`;
  }
  ret = ret
    .replace(/__KEY_PATH__/g, keyPathText)
    .replace(/__ROOT_PATH__/g, rootPath.join('/'));
  return ret;
};

export const customizeModification = s => (
  {
    config,
    outputFile,
  },
) => template => {
  let ret = template;

  if (
    s.template === 'radio' ||
    s.template === 'checkbox' ||
    s.template === 'singleSelector' ||
    s.template === 'multiSelector' ||
    s.template === 'searchableSelector'
  ) {
    if (s.options) {
      const defaultOptionText = s.options
        .map(d => {
          return json5.stringify(d, null, 2).replace(/"/g, `'`);
        })
        .join(',\n');

      ret = ret
        .replace(
          /\/\* __DEFINE_OPTION__ \*\//g,
          `\nconst OPTIONS = fromJS([\n${defaultOptionText}\n]);`,
        )
        .replace(/\/\* __OPTION_DEFAULT_PROPS__ \*\//g, '')
        .replace(
          /\/\* __PASS_PROPS_TO_CHILDREN__ \*\//g,
          '\n' + 'const { value, disabled } = props;',
        )
        .replace(/__OPTIONS__/g, 'OPTIONS');
    } else {
      ret = ret
        .replace(/\/\* __DEFINE_OPTION__ \*\//g, '')
        .replace(
          /\/\* __OPTION_DEFAULT_PROPS__ \*\//g,
          '\n' + 'options: List(),',
        )
        .replace(
          /\/\* __PASS_PROPS_TO_CHILDREN__ \*\//g,
          '\n' + 'const { value, disabled, options } = props;',
        )
        .replace(/__OPTIONS__/g, 'options');
    }
  }

  return ret;
};

export const interploation = s => (
  {
    config,
    rootPath,
    outputFile,
  },
) => templateRes => {
  const {
    template,
    key,
    keyPath,
    componentName,
    params,
    defaultValue,
    validate,
  } = s;

  return templateRes.then(
    compose(
      customizeModification(s)({ config, outputFile }),
      substitueKeyPath({ key, keyPath, rootPath }),
      injectCSSModule(config)(rootPath)('Form.css'),
      injectValidateFn({ componentName, params, template })(validate),
      substitueParam({ componentName, defaultValue, params }),
    ),
  );
};

export const codeGen = config =>
  registeredTemplate => entry => rootPath => dist => {
    return Promise.all(
      entry.map(s => {
        const { componentName, template } = s;
        const outputFile = path.resolve(__dirname, dist, componentName + '.js');
        return fromNullable(registeredTemplate.field[template])
          .map(templateFileName => {
            return path.resolve(__dirname, '../', templateFileName);
          })
          .map(readFile)
          .fold(
            () => {
              return Promise.reject('fail loading template file');
            },
            res => {
              console.log(`Generate Field Component: ${outputFile}`);
              return interploation(s)({
                config,
                rootPath,
                outputFile,
              })(res)
                .then(beautifier)
                .then(writeFile(outputFile));
            },
          )
          .catch(err => {
            console.log(`Create ${componentName} fail due to ${err}`);
          });
      }),
    );
  };

export default codeGen;