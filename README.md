# react-form-generator

This library can generate three type React form components: `field`, `section` and `form`.

Before you start, please install dependencies at first.

```
yarn
```


# Example

You can run


```
npm run gen
```

```
npm run gen:exampleA
```

to generate components, and took `./dist` folder to see what component are created.

## Generator

The generator can generate React components based on registered templates.

```
npm run gen
```

After you generate your form template, you can launch storybook to preview your component

```
npm run storybook
```

### Field generator

The `field` type component is the basic component, which responsible for displaying value, label and implementing validating detail.

output:

```
FieldComponent.js
```


### Section generator

The `section` type component is a wrapper, which includes one or several field components. Wrapping `field` components in `section` can provide several benefits.

1. Better performance: putting all `field` components in one place is not able to enjoy `pure rendering` too much, since that big component will generate a big Virtual DOM even only a single field updated.

2. Convenient for styling: We usually will wrap similar fields in one place. For example, we wrap age field, gender field together in `personalInfo` section.

3. Increasing Maintainability: Grouping related `field` components into the same directory can help maintainer to locate and organize those components easily.

output:

```
SectionName/
  SectionName.js
  FieldComponent1.js
  FieldComponent2.js
```


### Form generator

The `form` type component will hold registered validator and updater for field value. Usually, there is only one root `form` component in each code generation.

The main difference between `form` and `section` is that the `section` don't handle update value and register validator, they just receive props and pass to `field` component.

output:

```
Form/
  SectionName1/
    SectionName1.js
    FieldComponent1.js
    FieldComponent2.js
  SectionName2/
    SectionName2.js
    FieldComponent3.js
    FieldComponent4.js
    FieldComponent5.js
```

## Template

The file in template folder will be used to generate components, and those template files should be registered before used in generator.

The template is actually a runnable react component, while there are several preserved words, such as `__COMPONENT_NAME__`, `__LABEL__`, `__PLACEHOLDER__`, for generator to substitue.

Currently, we assume you use the following lib: `immutable`, `classname`.

## available template

#### TextInputer

* available config

```javascript
{
  type: 'field',
  template: 'textInputer',
  componentName: 'NameInputer',
  className: '', // optional
  label: 'Name',
  key: 'name',
  keyPath: ['name'], // optional
  defaultValue: '',
  validate: {
    required: true,
    isNumber: true,
    min: 5,
    max: 150,
  }, // optional
}
```

#### Radio

* available config

```javascript
{
  type: 'field',
  template: 'radio',
  componentName: 'GenderSelector',
  key: 'gender',
  keyPath: ['target', 'gender'], // optional

  // optional: params is string that you want to replaced in your template
  params: {
    className: '', // replace __CLASS_NAME__
    label: 'Select your gender', // replace __LABEL__
  },

  // optional: if options is not specified.
  // we will assume it is passed from parents
  options: [
    {
      value: 'female'
      label: 'Female',
    },
    {
      value: 'male'
      label: 'Male',
    },
    {
      value: 'other'
      label: 'Others',
    },
  ],
  validate: {
    required: true,
  } // optional
}
```

#### CheckBox

* available config

```javascript

{
  type: 'field',
  template: 'checkbox',
  componentName: 'DeviceSelector',
  key: 'owner_device',
  keyPath: ['target', 'device'], // optional

  // optional: params is string that you want to replaced in your template
  params: {
    className: '', // replace __CLASS_NAME__
    label: 'Select device you owned', // replace __LABEL__
  },

  // optional: if options is not specified.
  // we will assume it is passed from parents
  options: [
    {
      value: 'pc',
      label: 'PC',
    },
    {
      value: 'tablet',
      label: 'Tablet',
    },
    {
      value: 'phone',
      label: 'Phone',
    },
  ],
  validate: {
    required: true,
  } // optional
}
```

#### Single Selector

* available config is the same as Radio one with following extra field.

```javascript
{
  template: 'singleSelector',
}
```


#### MultiSelector

Before you generate this component, please change template file to specify the multi-selector lib you want to use.

Currently Setting is `react-select`.

* available config is the same as CheckBox one.

```javascript
{
  template: 'multiSelector',
}
```

#### SearchableSelector

Before you generate this component, please change template file to specify the multi-selector lib you want to use.

Currently Setting is `react-select`.

* available config is the same as CheckBox one.

```javascript
{
  template: 'searchableSelector',
}
```



#### DateSelector

Before you generate this component, please change template file to specify the datePicker lib you want to use.

Currently Setting is `mf-datepicker`.

* available config

```javascript
{
  type: 'field', // required
  componentName: 'BeginDateSelector',
  key: 'beginAt',
  keyPath: ['begin_at'], // optional
  params: {
    className: '', // replace __CLASS_NAME__
    label: 'From', // replace __LABEL__
  },
}
```

#### Section

* available config

```javascript
{
  type: 'section', // required
  template: 'section',
  componentName: 'BasicInfo',
  params: {
    className: '', // replace __CLASS_NAME__
  },
  children: [
    {
      type: 'field',
      componentName: 'NameInputer',
      label: 'Name',
      key: 'name',
      defaultValue: '',
      validate: {
        required: true,
      },
    },
    //you can nest another section...
    {
      type: 'section',
      template: 'inlineWrap',
      componentName: 'DateRangePicker',
      children: [
        {
          type: 'field',
          componentName: 'BeginDateSelector',
          label: 'From',
          key: 'beginAt',
        },
        {
          type: 'field',
          componentName: 'EndDateSelector',
          label: 'To',
          key: 'EndAt',
        }
      ]
    },
  ],
}
```


#### Form

* available config

```javascript
{
  type: 'form',
  componentName: 'Form',
  params: {
    className: '', // replace __CLASS_NAME__
  },
  children: [
    {
      type: 'section',
      template: 'section',
      componentName: 'BasicInfoSection',
      children: [...]
    },
    {
      type: 'section',
      template: 'section',
      componentName: 'TargetInfoSection',
      children: [...]
    },
  ]
}
```

### Register Template

Before use template in your config, you must declare it in `config.js`

the register template part in config.js should look like this:


```javascript
template: {
  field: {
    textInputer: 'template/Field/textInputer',
    ...
  },

  section: {
    default: 'template/Section/Index.js'
    inlineWrap: 'template/Section/InlineWrap.js',
    ...
  },

  form: {
    default: 'template/Form.js',
    ...
  },
}
```


### Build Your own Template

TODO...


## Common config

common config must at the root of config file.

```javascript
{
  config: {
    cssModule: true,
    sourceCSS: 'template/Form.css',
    // we may allow user to define how to import css file by component
    // in the furture
  },

  template: [ ... ],

  entry: [ ... ]
}
```

if cssModule is true, then every generated component will include those header.

```javascript
import classnames from 'classnames/bind';
import styles from './Form.css';
const cx = classnames.bind(styles);
```

and all `className="componentName"` will be replaced by `className={cx('componentName')}`



## Config Format

config.js is a config file tell generator how to generate form structure.

```javascript
{
  config: {
    ....
  },

  template: [ ... ],

  entry: [
    {
      type: 'form',
      componentName: 'Form',
      className: '',
      children: [...],
    },
  ],
}
```


# LICENSE

MIT