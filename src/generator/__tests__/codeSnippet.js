import {
  importComponent,
  embedFieldComponent,
  getValidateFnText
} from '../codeSnippet';

describe('codeSnippet Generator', () => {
  it('importComponent', () => {
    expect(
      importComponent({
        name: 'TextInputer',
        path: './Section1/TextInputer'
      })
    ).toMatchSnapshot();
  });

  it('embedFieldComponent', () => {
    expect(
      embedFieldComponent({
        componentName: 'TextInputer',
        key: 'name',
        changeHandler: 'update'
      })
    ).toMatchSnapshot();
  });

  it('getValidateFnText: default', () => {
    expect(getValidateFnText({ label: 'Name' })({})).toMatchSnapshot();
  });

  it('getValidateFnText: required', () => {
    expect(
      getValidateFnText({ label: 'Name' })({ required: true })
    ).toMatchSnapshot();
  });

  it('getValidateFnText: required, minLength', () => {
    expect(
      getValidateFnText({ label: 'Name' })({
        required: true,
        minLength: 3
      })
    ).toMatchSnapshot();
  });

  it('getValidateFnText: required, minLength, maxLength', () => {
    expect(
      getValidateFnText({ label: 'Name' })({
        required: true,
        minLength: 3,
        maxLength: 20
      })
    ).toMatchSnapshot();
  });

  it('getValidateFnText: minLength, maxLength', () => {
    expect(
      getValidateFnText({ label: 'CompanyName' })({
        minLength: 3,
        maxLength: 20
      })
    ).toMatchSnapshot();
  });

  it('getValidateFnText: number', () => {
    expect(
      getValidateFnText({ label: 'Bid Price' })({
        number: true
      })
    ).toMatchSnapshot();
  });

  it('getValidateFnText: require, number', () => {
    expect(
      getValidateFnText({ label: 'Bid Price' })({
        required: true,
        number: true
      })
    ).toMatchSnapshot();
  });

  it('getValidateFnText: number, min, max', () => {
    expect(
      getValidateFnText({ label: 'Bid Price' })({
        number: true,
        min: 1,
        max: 15
      })
    ).toMatchSnapshot();
  });
});
