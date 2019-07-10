import React from 'react';
import Select from 'react-select';
import { WrappedFieldProps } from 'redux-form';

export interface ISelectOptions {
  label: string;
  value: string;
}

export interface IBaseSelect extends WrappedFieldProps {
  options: ISelectOptions[];
  mode?: string;
  className?: string;
  placeholder?: string;
}

export default class BaseSelect extends React.PureComponent<IBaseSelect> {
  public handleChange = ( value: any ) => this.props.input.onChange( value === '' ? null : value );

  public render() {
    const { options, className, placeholder, input: { value, name } } = this.props;

    return (
     <Select
       name={ name }
       value={ value || '' }
       className={ className }
       options={ options }
       onChange={ this.handleChange }
       placeholder={ placeholder }
     />
    );
  }
}
