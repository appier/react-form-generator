import React from 'react';

/* __IMPORT_COMPONENT__ */

/* __IMPORT__ */

export default class __COMPONENT_NAME__ extends React.PureComponent {
  static defaultProps = {
    /* __PASS_PROPS__ */
  };

  render() {
    const { props } = this;
    /* __PASS_PROPS_TO_CHILDREN__ */

    return (
      <div className="__CLASS_NAME__">
        <div className="label">
          <div className="label-text">
            __LABEL__
          </div>
        </div>
        <div className="inline-wrap">
          {/* __INJECT_COMPONENT__ */}
        </div>
      </div>
    );
  }
}