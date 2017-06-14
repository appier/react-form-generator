export default {
  config: {
    cssModule: true,
    sourceCSS: 'template/ExampleA/Form.css',
  },
  template: {
    field: {
      textInputer: 'template/ExampleA/Field/textInputer.js',
      radio: 'template/ExampleA/Field/Radio.js',
      checkbox: 'template/ExampleA/Field/Checkbox.js',
      multiSelector: 'template/ExampleA/Field/MultiSelector.js',
      searchableSelector: 'template/ExampleA/Field/SearchableSelector.js',
      dateSelector: 'template/ExampleA/Field/DateSelector.js',
      empty: 'template/ExampleA/Field/Empty.js',
    },
    section: {
      default: 'template/ExampleA/Section/Index.js',
      inline: 'template/ExampleA/Section/Inline.js',
      label: 'template/ExampleA/Section/LabelSection.js',
    },
    form: {
      default: 'template/ExampleA/Form.js',
    },
  },
  entry: [
    {
      type: 'form',
      template: 'default',
      componentName: 'Form',
      params: {
        className: 'campaign-data-form',
      },
      children: [
        {
          type: 'section',
          template: 'default',
          componentName: 'BasicInfo',
          params: {
            className: 'basic-info-section',
          },
          children: [
            {
              type: 'field',
              template: 'textInputer',
              componentName: 'Name',
              key: 'name',
              params: {
                className: 'campaign-name-inputer',
                label: 'Campaign Name',
                placeholder: '',
              },
              validate: {
                required: true,
              },
            },
            {
              type: 'field',
              template: 'multiSelector',
              componentName: 'AdsCategory',
              key: 'advertiserCategories',
              keyPath: ['advertiser_categories'],
              params: {
                className: 'campaign-ads-category-inputer',
                label: 'Campaign Adds Category',
              },
              validate: {
                required: true,
              },
            },
            {
              type: 'field',
              template: 'radio',
              componentName: 'PromotionalContent',
              key: 'adType',
              keyPath: ['ad_type'],
              params: {
                className: 'campaign-promotional-content-selector',
                label: 'Promotional Content Type',
              },
              validate: {
                required: true,
              },
              options: [
                {
                  value: 'web',
                  label: 'Web Content',
                },
                {
                  value: 'android',
                  label: 'App: Android Google Play',
                },
                {
                  value: 'ios',
                  label: 'App: Apple iTune Store',
                },
              ],
            },
            {
              type: 'section',
              template: 'default',
              componentName: 'AppInfo',
              params: {
                className: 'inline-wrap',
              },
              children: [
                {
                  type: 'field',
                  template: 'textInputer',
                  componentName: 'AppUrl',
                  key: 'appUrl',
                  keyPath: ['app_url'],
                  params: {
                    className: 'app-url-inputer',
                    label: '',
                    placeholder: '',
                  },
                  validate: {
                    required: true,
                  },
                },
                {
                  type: 'field',
                  template: 'singleSelector',
                  componentName: 'OsVersionSelector',
                  key: 'deviceOsv',
                  keyPath: ['require_device_osv'],
                  params: {
                    className: 'os-version-selector',
                    label: '',
                  },
                  validate: {
                    required: true,
                  },
                },
              ],
            },
          ],
        },
        {
          type: 'section',
          template: 'default',
          componentName: 'Targeting',
          params: {
            className: 'targeting-section',
          },
          children: [
            {
              type: 'field',
              template: 'multiSelector',
              componentName: 'Country',
              key: 'regions',
              params: {
                className: 'campaign-countries-selector',
                label: 'Country',
              },
              validate: {
                required: true,
              },
            },
            {
              type: 'field',
              template: 'checkbox',
              componentName: 'DeviceType',
              key: 'deviceType',
              keyPath: ['target_device_type'],
              params: {
                className: 'device-type-selector',
                label: 'Device Type',
              },
              validate: {
                required: true,
              },
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
                {
                  value: 'unknown',
                  label: 'Unknown',
                },
              ],
            },
            {
              type: 'field',
              template: 'checkbox',
              componentName: 'OS',
              key: 'deviceOs',
              keyPath: ['require_device_os'],
              params: {
                className: 'campaign-os-selector',
                label: 'OS',
              },
              validate: {
                required: true,
              },
              options: [
                {
                  value: 'win',
                  label: 'Win',
                },
                {
                  value: 'ios',
                  label: 'iOS',
                },
                {
                  value: 'android',
                  label: 'Android',
                },
                {
                  value: 'linux',
                  label: 'Linux',
                },
                {
                  value: 'mac',
                  label: 'Mac',
                },
              ],
            },
            {
              type: 'field',
              template: 'checkbox',
              componentName: 'ConnectPreference',
              key: 'connectionType',
              keyPath: ['require_connection_type'],
              params: {
                className: 'connection-type-selector',
                label: 'Connection Preference',
              },
              validate: {
                required: true,
              },
              options: [
                {
                  value: 'cellular',
                  label: 'Cellular',
                },
                {
                  value: 'wifi',
                  label: 'Wifi',
                },
                {
                  value: 'ethernet',
                  label: 'Ethernet',
                },
                {
                  value: 'unknown',
                  label: 'Unknown',
                },
              ],
            },
            {
              type: 'field',
              template: 'radio',
              componentName: 'CrossDevice',
              key: 'crossDevice',
              keyPath: ['require_cross_device'],
              defaultValue: true,
              params: {
                className: 'cross-device-selector',
                label: 'Cross Device',
              },
              validate: {
                required: true,
              },
              options: [
                {
                  value: true,
                  label: 'Yes',
                },
                {
                  value: false,
                  label: 'No',
                },
              ],
            },
            {
              type: 'field',
              template: 'multiSelector',
              componentName: 'TargetDeviceIdList',
              key: 'requireDeviceId',
              keyPath: ['require_device_id'],
              params: {
                className: 'require-device-id-selector',
                label: 'Target List',
              },
              validate: {
                required: true,
              },
            },
            {
              type: 'field',
              template: 'multiSelector',
              componentName: 'DeviceIdList',
              key: 'rejectDeviceId',
              keyPath: ['reject_device_id'],
              params: {
                className: 'reject-device-id-selector',
                label: 'Exclude List',
              },
              validate: {
                required: true,
              },
            },
            {
              type: 'field',
              template: 'empty',
              componentName: 'TimeParting',
              key: 'timeParting',
              keyPath: ['require_time_parting'],
              params: {
                className: 'time-parting-wrap',
                label: 'Day Parting Management',
              },
              validate: {
                required: true,
              },
            },
          ],
        },
        {
          type: 'section',
          template: 'default',
          componentName: 'BudgetTracking',
          params: {
            className: 'budget-tracking-section',
          },
          children: [
            {
              type: 'section',
              template: 'default',
              componentName: 'TypeAndBidPrice',
              params: {
                className: 'inline-wrap',
              },
              children: [
                {
                  type: 'field',
                  template: 'singleSelector',
                  componentName: 'GoalInputer',
                  key: 'primaryGoal',
                  keyPath: ['primary_goal'],
                  params: {
                    className: 'goal-inputer',
                    label: '',
                    placeholder: '',
                  },
                  validate: {
                    required: true,
                  },
                },
                {
                  type: 'field',
                  template: 'textInputer',
                  componentName: 'MinBid',
                  key: 'bidPrice',
                  keyPath: ['bid_price'],
                  params: {
                    className: 'bid-price-inputer',
                    label: '',
                    placeholder: '',
                  },
                  validate: {
                    required: true,
                    number: true,
                    min: 0,
                    max: 100,
                  },
                },
              ],
            },
            {
              type: 'field',
              template: 'singleSelector',
              componentName: 'ActionTypeSelector',
              key: 'actionType',
              keyPath: ['action_type'],
              params: {
                className: 'action-type-selector',
                label: 'Action Type for this Campaign',
              },
              validate: {
                required: true,
              },
            },
            {
              type: 'field',
              template: 'multiSelector',
              componentName: 'MajorEventSelector',
              key: 'majorEvent',
              keyPath: ['major_event'],
              params: {
                className: 'major-event-selector',
                label: 'Major Event to Optimise',
              },
              validate: {
                required: true,
              },
            },
            {
              type: 'field',
              template: 'multiSelector',
              componentName: 'MinorEventSelector',
              key: 'minorEvent',
              keyPath: ['minor_event'],
              params: {
                className: 'minor-event-selector',
                label: 'Minor Event to Optimise',
              },
              validate: {
                required: true,
              },
            },
            {
              type: 'section',
              template: 'label',
              componentName: 'CampaignDate',
              params: {
                className: 'inline-wrap',
                label: 'Duration and Total Budget *',
              },
              children: [
                {
                  type: 'field',
                  template: 'dateSelector',
                  componentName: 'StartDateSelector',
                  key: 'begin_at',
                  params: {
                    className: 'start-date-selector',
                    label: '',
                  },
                  validate: {
                    required: true,
                  },
                },
                {
                  type: 'field',
                  template: 'dateSelector',
                  componentName: 'EndDateSelector',
                  key: 'end_at',
                  params: {
                    className: 'end-date-selector',
                    label: '',
                  },
                  validate: {
                    required: true,
                  },
                },
                {
                  type: 'field',
                  template: 'textInputer',
                  componentName: 'TotalBudget',
                  key: 'total_budget',
                  params: {
                    className: 'total-budget-inputer',
                    label: '',
                    placeholder: '',
                  },
                  validate: {
                    required: true,
                    number: true,
                    min: 0,
                    max: 1000,
                  },
                },
              ],
            },
          ],
        },
      ],
    }
  ],
};
