import React from 'react';
import { Map } from 'immutable';

/* __IMPORT_COMPONENT__ */

/* __IMPORT__ */

let uuidKey = 0;
const uuid = () => uuidKey++;

export default class __COMPONENT_NAME__ extends React.PureComponent {
  static defaultProps = {
    data: Map(),
    onSubmit: () => {},
  };

  constructor(props) {
    super(props);
    this.reigsteredValidators = {};
  }

  registerValidator = initValue => {
    let key = uuid();
    this.reigsteredValidators[key] = initValue;

    let validator = validatedValue => {
      this.reigsteredValidators[key] = validatedValue;
    };

    validator.remove = () => {
      delete this.reigsteredValidators[key];
    };

    return validator;
  };

  update = path => {
    return value => {
      //Please change it as you need.
      this.props.update(data => data.updateIn(path, () => value));
    };
  };

  submit = () => {
    Promise.all(Object.keys(this.reigsteredValidators)).then(keys => {
      const notValidated = keys
        .map(key => this.reigsteredValidators[key])
        .filter(d => !!d);
      //Please change it as you need.
      if (notValidated.length) {
        window.alert(notValidated.join('\n'));
        return;
      }
      //Please change it as you need.
      this.props.onSubmit(this.props.data);
    });
  };

  render() {
    const { props } = this;
    const { data } = props;

    return (
      <div className="form __CLASS_NAME__">
        {/* __INJECT_COMPONENT__ */}
        <div className="main-function-bar">
          <div className="left-bar">
            <div className="draft-btn">Save Draft</div>
            <div className="draft-btn">Import Draft</div>
          </div>
          <div className="submit-btn" onClick={this.submit}>Submit</div>
        </div>
      </div>
    );
  }
}