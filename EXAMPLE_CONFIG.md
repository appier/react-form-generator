
Field:


```javascript
entry: [
  {
    type: 'field',
    template: 'textInputer',
    componentName: 'NameInputer',
    key: 'name',
    keyPath: ['name'],
    defaultValue: '',
    params: {
      className: '',
      label: 'Name',
      placeholder: 'Input your account name',
    },
    validate: {
      required: true,
      minLength: 3,
      maxLength: 20,
    },
  },
],
```


```javascript
entry: [
  {
    type: 'field',
    template: 'radio',
    componentName: 'GenderSelector',
    key: 'gender',
    keyPath: ['target', 'gender'],
    defaultValue: '',

    params: {
      className: '',
      label: 'Gender',
    },
    validate: {
      required: true,
    },
    options: [
      {
        value: 'female',
        label: 'Female',
      },
      {
        value: 'male',
        label: 'Male',
      },
      {
        value: 'other',
        label: 'Others',
      },
    ],
  },
],
```

```javascript
entry: [
  {
    type: 'field',
    template: 'checkbox',
    componentName: 'DeviceSelector',
    key: 'owner_device',
    keyPath: ['target', 'device'], // optional
    params: {
      className: '',
      label: 'Target Device'
    },
    validate: {
      required: true
    },
    options: [
      {
        value: 'pc',
        label: 'PC'
      },
      {
        value: 'tablet',
        label: 'Tablet'
      },
      {
        value: 'phone',
        label: 'Phone'
      }
    ],
    validate: {
      required: true
    }
  },
],
```


Section:

```javascript
entry: [
  {
  type: 'section', // required
  template: 'default',
  componentName: 'CompanyInfo',
  params: {
    className: '',
  },
  children: [
    {
      type: 'section', // required
      template: 'default',
      componentName: 'Contact',
      params: {
        className: 'inline-wrap',
      },
      children: [
        {
          type: 'field',
          template: 'textInputer',
          componentName: 'AdressInputer',
          key: 'address',
          defaultValue: '',
          params: {
            className: '',
            label: 'Company Address',
            placeholder: 'Input your company address',
          },
        },
        {
          type: 'field',
          template: 'textInputer',
          componentName: 'PhoneInputer',
          key: 'phone',
          defaultValue: '',
          params: {
            className: '',
            label: 'Company Phone',
            placeholder: 'Input your company contact phone',
          },
        },
      ]
    },
    {
      type: 'field',
      template: 'textInputer',
      componentName: 'CompanyName',
      key: 'companyName',
      defaultValue: '',
      params: {
        className: '',
        label: 'Company Name',
        placeholder: 'Input your company name',
      },
      validate: {
        required: true,
      },
    },
    {
      type: 'field',
      template: 'textInputer',
      componentName: 'CompanyUrl',
      key: 'companyUrl',
      defaultValue: '',
      params: {
        className: '',
        label: 'Company Website',
        placeholder: 'Input your company website',
      },
    },
  ]
  },
]
```


Form:

```javascript
entry: [
  {
    type: 'form',
    template: 'default',
    componentName: 'Form',
    params: {
      className: '',
    },
    children: [
      {
        type: 'section',
        template: 'default',
        componentName: 'CompanyInfo',
        params: {
          className: 'company-section',
        },
        children: [
          {
            type: 'field',
            template: 'textInputer',
            componentName: 'CompanyName',
            key: 'companyName',
            keyPath: ['company', 'name'],
            defaultValue: '',
            params: {
              className: '',
              label: 'Company Name',
              placeholder: 'Input your company name',
            },
            validate: {
              required: true,
            },
          },
          {
            type: 'field',
            template: 'textInputer',
            componentName: 'CompanyUrl',
            key: 'companyUrl',
            keyPath: ['company', 'url'],
            defaultValue: '',
            params: {
              className: '',
              label: 'Company Website',
              placeholder: 'Input your company website',
            },
          },
          {
            type: 'section', // required
            template: 'default',
            componentName: 'Contact',
            params: {
              className: 'inline-wrap',
            },
            children: [
              {
                type: 'field',
                template: 'textInputer',
                componentName: 'AdressInputer',
                key: 'address',
                keyPath: ['company', 'address'],
                defaultValue: '',
                params: {
                  className: '',
                  label: 'Company Address',
                  placeholder: 'Input your company address',
                },
              },
              {
                type: 'field',
                template: 'textInputer',
                componentName: 'PhoneInputer',
                key: 'phone',
                keyPath: ['company', 'phone'],
                defaultValue: '',
                params: {
                  className: '',
                  label: 'Company Phone',
                  placeholder: 'Input your company contact phone',
                },
                validate: {
                  required: true,
                  number: true,
                  minLength: 8,
                  maxLength: 10,
                },
              },
            ]
          },
        ],
      }
    ]
  },
]
```


```javascript
{
  type: 'section',
  template: 'default',
  componentName: 'BasicInfo',
  params: {
    className: 'basic-info-section'
  },
  children: []
},
{
  type: 'section',
  template: 'default',
  componentName: 'Targeting',
  params: {
    className: 'targeting-section'
  },
  children: []
},
{
  type: 'section',
  template: 'default',
  componentName: 'BudgetTracking',
  params: {
    className: 'budget-tracking-section'
  },
  children: []
}
```


```javascript
{
  type: 'field',
  template: 'textInputer',
  componentName: 'Name',
  key: 'name',
  params: {
    className: 'campaign-name-inputer',
    label: 'Campaign Name'
  },
  validate: {
    required: true
  }
},
{
  type: 'field',
  template: 'multiSelector',
  componentName: 'AdsCategory',
  key: 'advertiserCategories',
  params: {
    className: 'campaign-ads-category-inputer',
    label: 'Campaign Adds Category'
  },
  validate: {
    required: true
  }
},
{
  type: 'field',
  template: 'radio',
  componentName: 'PromotionalContent',
  key: 'adType',
  params: {
    className: 'campaign-promotional-content-selector',
    label: 'Promotional Content Type'
  },
  validate: {
    required: true
  },
  options: [
    {
      value: 'web',
      label: 'Web Content'
    },
    {
      value: 'android',
      label: 'App: Android Google Play'
    },
    {
      value: 'ios',
      label: 'App: Apple iTune Store'
    }
  ]
}
```

