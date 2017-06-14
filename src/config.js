export default {
  config: {
    cssModule: true,
    sourceCSS: 'template/Form.css'
  },
  template: {
    field: {
      textInputer: 'template/Field/textInputer.js',
      radio: 'template/Field/Radio.js',
      checkbox: 'template/Field/Checkbox.js',
      singleSelector: 'template/Field/SingleSelector.js',
      multiSelector: 'template/Field/MultiSelector.js',
      searchableSelector: 'template/Field/SearchableSelector.js',
      dateSelector: 'template/Field/DateSelector.js',
    },
    section: {
      default: 'template/Section/Index.js'
    },
    form: {
      default: 'template/Form.js'
    }
  },
  entry: [
    {
      type: 'form',
      template: 'default',
      componentName: 'Form',
      params: {
        className: ''
      },
      children: [
        {
          type: 'section',
          template: 'default',
          componentName: 'CampaignDate',
          params: {
            className: 'campaign-section'
          },
          children: [
            {
              type: 'field',
              template: 'dateSelector',
              componentName: 'StartDateSelector',
              key: 'begin_at',
              params: {
                className: '',
                label: ''
              },
              validate: {
                required: true
              },
            },
            {
              type: 'field',
              template: 'dateSelector',
              componentName: 'EndDateSelector',
              key: 'end_at',
              params: {
                className: '',
                label: ''
              },
              validate: {
                required: true
              },
            },
          ]
        },
        {
          type: 'section',
          template: 'default',
          componentName: 'CompanyInfo',
          params: {
            className: 'company-section'
          },
          children: [
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
            {
              type: 'field',
              template: 'radio',
              componentName: 'GenderSelector',
              key: 'gender',
              keyPath: ['target', 'gender'],
              defaultValue: '',
              params: {
                className: '',
                label: 'Gender'
              },
              validate: {
                required: true
              },
              options: [
                {
                  value: 'female',
                  label: 'Female'
                },
                {
                  value: 'male',
                  label: 'Male'
                },
                {
                  value: 'other',
                  label: 'Others'
                }
              ]
            },
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
            {
              type: 'field',
              template: 'singleSelector',
              componentName: 'CountrySelector',
              key: 'country',
              keyPath: ['target', 'country'], // optional
              params: {
                className: '',
                label: 'Target Country'
              },
              validate: {
                required: true
              },
              options: [
                {
                  value: 'tw',
                  label: 'Taiwan'
                },
                {
                  value: 'jp',
                  label: 'Japan'
                },
                {
                  value: 'sg',
                  label: 'Singapore'
                }
              ],
              validate: {
                required: true
              }
            },
            {
              type: 'field',
              template: 'multiSelector',
              componentName: 'OSSelector',
              key: 'os',
              keyPath: ['target', 'os'], // optional
              params: {
                className: '',
                label: 'Target OS'
              },
              validate: {
                required: true
              },
              options: [
                {
                  value: 'apple',
                  label: 'Apple'
                },
                {
                  value: 'banana',
                  label: 'Banana'
                },
                {
                  value: 'orange',
                  label: 'Orange'
                }
              ],
              validate: {
                required: true
              }
            },
            {
              type: 'field',
              template: 'searchableSelector',
              componentName: 'FruitSelector',
              key: 'fruit',
              keyPath: ['target', 'fruit'], // optional
              params: {
                className: '',
                label: 'Target Fruit'
              },
              validate: {
                required: true
              },
              options: [
                {
                  value: 'ios',
                  label: 'IOS'
                },
                {
                  value: 'android',
                  label: 'Android'
                },
                {
                  value: 'other',
                  label: 'Other'
                }
              ],
              validate: {
                required: true
              }
            },
          ]
        },
      ]
    }
  ]
};
