import classNames from 'classnames';
import { map } from 'lodash-es';
import React from 'react';
import { compose, pure } from 'recompose';
import { FormSubmitHandler, InjectedFormProps } from 'redux-form';
import Buttons, { IButtonsProps } from './Buttons/index';
import BaseCheckbox from './controls/BaseCheckbox/index';
import BaseInput from './controls/BaseInput/index';
import BaseSelect from './controls/BaseSelect/index';
import { withLabel } from './Label/withLabel';
import './styles.scss';
import { withError } from './withError';

export const Input = compose(
  withLabel,
  withError,
  pure
)( BaseInput );

export const Select = compose(
  withLabel,
  withError,
  pure
)( BaseSelect );

export const Checkbox = compose(
  withError,
  pure
)( BaseCheckbox );

interface IComponentProps {
  name: string;
  type?: string;
  label?: string;
  component: React.FunctionComponent | React.ComponentClass;
  placeholder?: string;
}

interface IFields {
  component: React.FunctionComponent<IComponentProps> | React.ComponentClass<IComponentProps>;
  show?: () => boolean;
  componentProps: IComponentProps;
}

export interface ICustomizableFormProps<T> extends IButtonsProps<T> {
  fields: IFields[];
  onLoad?: () => void;
  onCancelButtonClick?: () => void;
  successMessage?: string;
  className?: string;
  isLoading?: boolean;
  formButtons?: React.FunctionComponent<IButtonsProps<T>> | React.ComponentClass<IButtonsProps<T>>;
  onSubmit?: FormSubmitHandler<T>;
}

class CustomizableForm<T> extends React.PureComponent<ICustomizableFormProps<T> & InjectedFormProps<T>> {
  public componentDidMount() {
    this.props.onLoad && this.props.onLoad();
  }

  public handleCancelButtonClick = ( event: React.MouseEvent<HTMLElement> ) => {
    event.preventDefault();
    this.props.reset();
    this.props.onCancelButtonClick && this.props.onCancelButtonClick();
  }

  public render() {
    const {
      fields, submitButtonText, cancelButtonText, showSubmitButton, showCancelButton, handleSubmit, successMessage,
      formButtons: FormButtons = Buttons, submitSucceeded, submitting, error, isLoading, className
    } = this.props;

    return (
      <div className={ classNames( 'custom-form', className ) }>
        { submitSucceeded && !submitting && (
          <div className='submit-succeed'>
            { successMessage }
          </div>
        ) }
        { error && (
          <div className='submit-failed'>
            { error }
          </div>
        ) }
        <form onSubmit={ handleSubmit }>
          {
            map( fields, ( fieldProps: IFields, i ) =>
              (typeof fieldProps.show === 'undefined' || fieldProps.show()) ?
                React.createElement<IComponentProps>( fieldProps.component, { ...fieldProps.componentProps, key: i } ) : null
            )
          }
          <FormButtons<T>
            handleSubmit={ handleSubmit }
            handleCancel={ this.handleCancelButtonClick }
            submitButtonText={ submitButtonText }
            showSubmitButton={ showSubmitButton }
            cancelButtonText={ cancelButtonText }
            showCancelButton={ showCancelButton }
            isLoading={ isLoading }
          />
        </form>
      </div>
    );
  }
}

export default CustomizableForm;
