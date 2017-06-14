import { bindCSSModule, camcelCaseToTemplateStr } from '../util';

describe('codeSnippet Generator', () => {
  it('bindCSSModule', () => {
    expect(
      bindCSSModule('<div className="vertical-input-group __CLASS_NAME__">'),
    ).toMatchSnapshot();
    expect(bindCSSModule('<div className="input-wrap">')).toMatchSnapshot();
    expect(bindCSSModule('className="input"')).toMatchSnapshot();
  });

  it('camcelCaseToTemplateStr', () => {
    expect(camcelCaseToTemplateStr('className')).toMatchSnapshot();
    expect(camcelCaseToTemplateStr('label')).toMatchSnapshot();
    expect(camcelCaseToTemplateStr('placeholder')).toMatchSnapshot();
    expect(camcelCaseToTemplateStr('componentName')).toMatchSnapshot();
  });
  // it('indentText', () => {
  //   expect(indentText(0)('hello')).toMatchSnapshot();
  //   expect(indentText(1)('hello')).toMatchSnapshot();
  //   expect(indentText(1)('  hello')).toMatchSnapshot();
  //   expect(indentText(4)('  hello')).toMatchSnapshot();
  // });
});