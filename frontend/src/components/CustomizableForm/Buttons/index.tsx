import React from 'react';
import { SubmitHandler } from 'redux-form';
import { Button } from 'semantic-ui-react';

export interface IButtonsProps<T> {
  handleSubmit: SubmitHandler<T>;
  submitButtonText?: string;
  cancelButtonText?: string;
  showSubmitButton?: boolean;
  showCancelButton?: boolean;
  isLoading?: boolean;
  handleCancel?: ( event?: React.MouseEvent<HTMLElement> ) => void;
}

class Buttons<T> extends React.PureComponent<IButtonsProps<T>> {
  public render() {
    const { handleSubmit, handleCancel, submitButtonText, cancelButtonText, showSubmitButton, showCancelButton, isLoading } = this.props;

    return (
      <div className='buttons'>
        {
          showSubmitButton &&
          <Button
            type='submit'
            onClick={ handleSubmit }
            loading={ isLoading }
            disabled={ isLoading }
          >
            { submitButtonText }
          </Button>
        }
        {
          showCancelButton &&
          <button className='button-invert' onClick={ handleCancel }>{ cancelButtonText }</button>
        }
      </div>
    );
  }
}

export default Buttons;
