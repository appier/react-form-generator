import React from 'react';
import { fromJS, Map, List } from 'immutable';

/* __IMPORT__ */

/* __DEFINE_OPTION__ */

export default class __COMPONENT_NAME__ extends React.PureComponent {
  static defaultProps = {
    registerValidator: () => {},
    value: '',
    disabled: false,
    /* __OPTION_DEFAULT_PROPS__ */
  };

  constructor(props) {
    super(props);
    this.validator = null;
    this.state = {
      validateMsg: null,
    };
  }

  componentDidMount() {
    const { registerValidator, value } = this.props;
    this.validator = registerValidator(null);
    this.updateValidateMsg(this.validate(value));
  }

  componentWillUnmount() {
    if (this.validator) {
      this.validator.remove();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.updateValidateMsg(this.validate(nextProps.value));
    }
  }

  updateValidateMsg = msg => {
    this.validator(msg);
    this.setState({ validateMsg: msg });
  };

  validate = value => {
    /* __VALIDATE_FN__ */
  };

  update = e => {
    this.props.onChange(__KEY_PATH__)(e.target.value);
  };

  render() {
    const { state, props } = this;
    /* __PASS_PROPS_TO_CHILDREN__ */
    const { validateMsg } = state;

    return (
      <div className="vertical-input-group __CLASS_NAME__">
        <div className="label">
          __LABEL__
        </div>
        <div className="input-wrap">
          <div className="inline-label">
            <select onChange={this.update} value={value || ''}>
              {__OPTIONS__.map((d, i) => {
                return (
                  <option key={i} disabled={disabled} value={d.get('value')}>
                    {d.get('label')}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="text validate-msg">
            {validateMsg}
          </div>
        </div>
      </div>
    );
  }
}