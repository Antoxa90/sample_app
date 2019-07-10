import React from 'react';
import { connect } from 'react-redux';
import { Field, FormSubmitHandler, InjectedFormProps, reduxForm } from 'redux-form';
import { acSignIn } from '../../actions/acUser';
import { ThunkDispatch } from '../../types';
import { submissionErrorHandler } from '../../utils/errorUtils';
import CustomizableForm, { Input } from '../CustomizableForm';

const fields = [
  {
    component: Field,
    componentProps: {
      component: Input,
      label: 'Login:',
      name: 'login',
      placeholder: 'Login',
      type: 'text',
    }
  },
  {
    component: Field,
    componentProps: {
      component: Input,
      label: 'Password:',
      name: 'password',
      placeholder: 'Password',
      type: 'password',
    }
  }
];

interface IFormData {
  login: string;
  password: string;
}

interface ISignInProps extends InjectedFormProps<IFormData> {
  onSubmit?: FormSubmitHandler<IFormData>;
}

class SignIn extends React.PureComponent<ISignInProps> {
  public render() {
    return (
      <div className='sing-in-popup'>
        <h2>Sign In</h2>
        <CustomizableForm<IFormData>
          fields={ fields }
          submitButtonText='Sign In'
          showCancelButton={ false }
          successMessage='You successfully sign in!'
          showSubmitButton
          { ...this.props }
        />
      </div>
    );
  }
}

const mapDispatchToProps = ( dispatch: ThunkDispatch ) => ({
  onSubmit: ( { login, password }: IFormData ) =>
    dispatch( acSignIn( login, password ) )
      .catch(submissionErrorHandler )
});

export default connect( null, mapDispatchToProps )(
  reduxForm<IFormData>( { form: 'signInFrom' } )( SignIn )
);
