import React from 'react';
import { fromJS, List } from 'immutable';

import RadioBtnGrp from '__ROOT_PATH__/../../../common/RadioBtn/RadioBtnGrp';

/* __IMPORT__ */

/* __DEFINE_OPTION__ */

export default class __COMPONENT_NAME__ extends React.PureComponent {
  static defaultProps = {
    registerValidator: () => {},
    value: '__DEFAULT_VALUE__',
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
          <div className="label-text">__LABEL__</div>
          <div className="text validate-msg">
            {validateMsg}
          </div>
        </div>
        <div className="input-wrap">
          <div className="inline-label">
            <RadioBtnGrp
              options={__OPTIONS__}
              value={value}
              disabled={disabled}
              onChange={this.update}
            />
          </div>
        </div>
      </div>
    );
  }
}