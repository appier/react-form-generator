import {
  importComponent,
  embedSectionComponent,
  embedFieldComponent,
  importCSSModule,
  passProps,
  defaultProps,
} from './codeSnippet';

import prettier from 'prettier';

export const beautifier = template => {
  return prettier.format(template, {
    printWidth: 80,
    tabWidth: 2,
    singleQuote: true,
    trailingComma: true,
    bracketSpacing: true,
    jsxBracketSameLine: false,
    parser: 'babylon',
  });
};

export const camcelCaseToTemplateStr = s =>
  '__'
    .concat(s.replace(/(?:^|\.?)([A-Z])/g, (x, y) => '_' + y).toUpperCase())
    .concat('__');

export const replaceParam = params => text => {
  return Object.keys(params).reduce(
    (acc, key) => {
      const replacedStr = camcelCaseToTemplateStr(key);
      return acc.replace(new RegExp(`${replacedStr}`, 'g'), params[key]);
    },
    text,
  );
};

export const substitueParam = ({ componentName, params }) => template => {
  let ret = template.replace(/__COMPONENT_NAME__/g, componentName);
  ret = replaceParam(params)(ret);
  return ret;
};

export const getChildrenKeys = data => {
  return data.reduce(
    (acc, { type, key, children }) => {
      if (type === 'field') {
        acc.push(key);
        return acc;
      } else if (type === 'section') {
        return acc.concat(getChildrenKeys(children));
      }
    },
    [],
  );
};

export const getChildrenKeyPath = data => {
  return data.reduce(
    (acc, { type, key, keyPath, children }) => {
      if (type === 'field') {
        if (keyPath) {
          acc.push(keyPath);
        } else {
          acc.push([key]);
        }
        return acc;
      } else if (type === 'section') {
        return acc.concat(getChildrenKeyPath(children));
      }
    },
    [],
  );
};

export const getChildrenDefaultValue = data => {
  return data.reduce(
    (acc, { type, defaultValue, children }) => {
      if (type === 'field') {
        acc.push(defaultValue);
        return acc;
      } else if (type === 'section') {
        return acc.concat(getChildrenDefaultValue(children));
      }
    },
    [],
  );
};

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
  const usedPropsDefaultValue = getChildrenDefaultValue(children).concat([
    () => {},
    () => {},
  ]);

  const childrenComponentText = children
    .map(({ type, componentName, key, children }) => {
      if (type === 'field') {
        return embedFieldComponent({
          componentName,
          key,
          registerValidator: 'registerValidator',
          changeHandler: 'update',
        });
      } else if (type === 'section') {
        return embedSectionComponent({
          componentName,
          keys: getChildrenKeys(children),
          registerValidator: 'registerValidator',
          changeHandler: 'update',
        });
      }
      return '';
    })
    .join('\n');

  let ret = template
    .replace(/\/\* __IMPORT_COMPONENT__ \*\//g, importChildrenFileText)
    .replace(/{\/\* __INJECT_COMPONENT__ \*\/}/g, '\n' + childrenComponentText);

  ret = injectPassProps(usedProps)(ret);
  ret = setDefaultProps(usedProps, usedPropsDefaultValue)(ret);
  return ret;
};

export const injectPassProps = props => template => {
  let ret = template.replace(
    /\/\* __PASS_PROPS_TO_CHILDREN__ \*\//g,
    '\n' + passProps(props),
  );
  return ret;
};

export const setDefaultProps = (props, defaultValue) => template => {
  let ret = template.replace(
    /\/\* __PASS_PROPS__ \*\//g,
    '\n' + defaultProps(props, defaultValue),
  );
  return ret;
};

export const getSourceCSSFileLocation = rootPath => sourceCSS => {
  if (rootPath.length) {
    return [...rootPath, sourceCSS].join('/');
  } else {
    return './' + sourceCSS;
  }
};

export const injectCSSModule = config => rootPath => sourceCSS => template => {
  let ret = template;
  if (config.cssModule) {
    ret = ret.replace(
      /\/\* __IMPORT__ \*\//g,
      importCSSModule(getSourceCSSFileLocation(rootPath)(sourceCSS)),
    );
    ret = bindCSSModule(ret);
  } else {
    ret = ret.replace(/\s+\/\* __IMPORT__ \*\//g, '\n');
  }
  return ret;
};

export const bindCSSModule = template => {
  return template.replace(/className="([a-zA-Z\-_ ]+)"/g, (match, group) => {
    const cx = group.split(' ').map(d => `'${d}'`).join(', ');
    return `className={cx(${cx})}`;
  });
};