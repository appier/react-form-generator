import React from 'react';
import InputDatePicker from 'mf-input-date-picker';

/* __IMPORT__ */

export default class __COMPONENT_NAME__ extends React.PureComponent {
  static defaultProps = {
    registerValidator: () => {},
    value: null,
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

  update = date => {
    this.props.onChange(__KEY_PATH__)(date);
  };

  render() {
    const { state, props } = this;
    const { value } = props;
    const { validateMsg } = state;

    return (
      <div className="vertical-input-group __CLASS_NAME__">
        <div className="label">
          __LABEL__
        </div>
        <div className="input-wrap">
          <InputDatePicker
            className="date-input"
            showYearMonthSelector={false}
            selectedDate={value}
            onChange={this.update}
          />
          <div className="text validate-msg">
            {validateMsg}
          </div>
        </div>
      </div>
    );
  }
}