import React from 'react';
import { fromJS, Map, List } from 'immutable';
import CheckboxGrp from '__ROOT_PATH__/../../../common/Checkbox/CheckboxGrp';

/* __IMPORT__ */

/* __DEFINE_OPTION__ */

export default class __COMPONENT_NAME__ extends React.PureComponent {
  static defaultProps = {
    registerValidator: () => {},
    value: List(),
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
    const { value } = e.target;
    let newValue = this.props.value || List();
    if (newValue.includes(value)) {
      newValue = newValue.filter(d => d !== value);
    } else {
      newValue = newValue.push(value);
    }
    this.props.onChange(__KEY_PATH__)(newValue);
  };

  render() {
    const { state, props } = this;
    /* __PASS_PROPS_TO_CHILDREN__ */
    const { validateMsg } = state;

    return (
      <div className="vertical-input-group __CLASS_NAME__">
        <div className="label">
          <div className="label-text">__LABEL__</div>
          <div className="text validate-msg">
            {validateMsg}
          </div>
        </div>
        <div className="input-wrap">
          <div className="inline-label">
            <CheckboxGrp
              options={__OPTIONS__}
              disabled={disabled}
              value={value}
              onClick={this.update}
            />
          </div>
        </div>
      </div>
    );
  }
}