export const importComponent = ({ name, path }) =>
  `import ${name} from '${path}';`;

const propsToComponent = keys => `${keys
  .map(d => {
    return `  ${d}={${d}}`;
  })
  .join('\n')}`;

export const getDataToComponent = keys => keyPath => `${keys
  .map((d, i) => {
    return `  ${d}={data.getIn([${keyPath[i].map(d => `'${d}'`).join(', ')}])}`;
  })
  .join('\n')}`;

export const embedSectionComponent = (
  {
    componentName,
    keys,
    registerValidator,
    changeHandler,
  },
) => `
  <${componentName}
    ${propsToComponent(keys)}
    registerValidator={${registerValidator}}
    update={${changeHandler}}
  />`;

export const embedFieldComponent = (
  {
    componentName,
    key,
    registerValidator,
    changeHandler,
  },
) => `
  <${componentName}
    value={${key}}
    registerValidator={${registerValidator}}
    onChange={${changeHandler}}
  />`;

export const embedSectionComponentByKeyPath = (
  {
    componentName,
    keys,
    keyPaths,
    registerValidator,
    changeHandler,
  },
) => `
  <${componentName}
    ${getDataToComponent(keys)(keyPaths)}
    registerValidator={${registerValidator}}
    update={${changeHandler}}
  />`;

export const embedFieldComponentByKeyPath = (
  {
    componentName,
    key,
    registerValidator,
    changeHandler,
  },
) => `
  <${componentName}
    value={${getDataToComponent([key])([key])}}
    registerValidator={${registerValidator}}
    onChange={${changeHandler}}
  />`;

export const defaultProps = (props, defaultValue) => `${props
  .map((d, i) => {
    let value = 'null';
    if (typeof defaultValue[i] === 'string') {
      value = `'${defaultValue[i]}'`;
    } else if (typeof defaultValue[i] === 'function') {
      value = `() => {}`;
    }
    return `${d}: ${value}`;
  })
  .join(', \n')}`;

export const passProps = props => `const { ${props.join(', ')} } = props;`;

export const importCSSModule = sourceCss => `
import classnames from 'classnames/bind';
import styles from '${sourceCss}';
const cx = classnames.bind(styles);

`;

const validateRequireFn = label => `
if(value == null || value === ''){
  return '${label} cannot be empty';
}
`;

const validateRequireDateFn = label => `
if(value == null){
  return '${label} cannot be empty';
}
`;

const validateRequireListFn = label => `
if(value == null || value.count() === 0){
  return '${label} cannot be empty';
}
`;

const validateMinLengthFn = (label, min) => `
if(value.length < ${min}){
  return '${label} must be longer than ${min} chars';
}
`;

const validateMaxLengthFn = (label, max) => `
if(value.length > ${max}){
  return '${label} must be smaller than ${max} chars';
}
`;

const validateNumberFn = label => `
if(isNaN(Number(value))){
  return '${label} must be a valid Number';
}
`;

const validateMinFn = (label, min) => `
if(Number(value) < ${min}){
  return '${label} must be larger than ${min}';
}
`;

const validateMaxFn = (label, max) => `
if(Number(value) > ${max}){
  return '${label} must be smaller than ${max}';
}
`;

const emptyValidateFn = () => `return null;`;

const defaultValidateFn = () => `
{
  ${emptyValidateFn()}
}
`;

export const getValidateFnText = ({ label, template }) => (
  {
    required,
    minLength,
    maxLength,
    number,
    min,
    max,
  },
) => {
  let validateArr = [];

  //checkbox
  // console.log(template, )
  if (template === 'checkbox' || template === 'multiSelector') {
    if (required) {
      validateArr.push(validateRequireListFn(label));
    }
  } else if (template === 'dateSelector') {
    if (required) {
      validateArr.push(validateRequireDateFn(label));
    }
  } else {
    if (required) {
      validateArr.push(validateRequireFn(label));
    }
    if (minLength) {
      validateArr.push(validateMinLengthFn(label, minLength));
    }
    if (maxLength) {
      validateArr.push(validateMaxLengthFn(label, maxLength));
    }

    if (number) {
      validateArr.push(validateNumberFn(label));
      if (min && Number.isInteger(Number(min))) {
        validateArr.push(validateMinFn(label, Number(min)));
      }
      if (max && Number.isInteger(Number(max))) {
        validateArr.push(validateMaxFn(label, Number(max)));
      }
    }
  }

  if (validateArr.length) {
    validateArr.push(defaultValidateFn());
  } else {
    validateArr = [emptyValidateFn()];
  }

  return validateArr
    .map((d, i) => {
      if (i > 0) {
        return d.replace(/\n/, '');
      }
      return d;
    })
    .join('else ');
};