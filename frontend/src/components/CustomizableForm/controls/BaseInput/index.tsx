import React from 'react';
import { WrappedFieldProps } from 'redux-form';

export interface IBaseInputProps extends WrappedFieldProps {
  type: string;
  placeholder?: string;
}

export default class BaseInput extends React.PureComponent<IBaseInputProps> {
  public handleChange = ( event: React.ChangeEvent<HTMLInputElement> ) => {
    const value = (event.target as HTMLInputElement).value;
    this.props.input.onChange( value === '' ? null : value );
  }

  public render() {
    const { input, type, placeholder } = this.props;

    return (
      <input
        type={ type }
        value={ input.value || '' }
        onChange={ this.handleChange }
        placeholder={ placeholder }
      />
    );
  }
}
