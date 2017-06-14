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
      <div className="__CLASS_NAME__ section-wrap">
        <div className="section-title">
          __LABEL__
        </div>
        <div className="section">
          {/* __INJECT_COMPONENT__ */}
        </div>
      </div>
    );
  }
}