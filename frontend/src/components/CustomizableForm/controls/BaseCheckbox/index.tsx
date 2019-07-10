import classNames from 'classnames';
import React from 'react';
import { WrappedFieldProps } from 'redux-form';

export interface IBaseCheckboxProps extends WrappedFieldProps {
  text: React.ReactNode | string;
  className?: string;
}

class BaseCheckbox extends React.PureComponent<IBaseCheckboxProps> {
  public handleChange = ( event: React.ChangeEvent<HTMLInputElement> ) => {
    const checked = event.target.checked;
    this.props.input.onChange( checked );
  }

  public render() {
    const { input: { name, value }, text, className } = this.props;

    return (
      <div className={ classNames( 'custom-checkbox', className ) }>
        <label>
          <input
            type='checkbox'
            name={ name }
            checked={ Boolean( value ) }
            onChange={ this.handleChange }
          />
          { text }
        </label>
      </div>
    );
  }
}

export default BaseCheckbox;
