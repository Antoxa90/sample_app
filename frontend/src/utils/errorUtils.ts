import { isEmpty, map } from 'lodash-es';
import { SubmissionError } from 'redux-form';

export const submissionErrorHandler = ( formError: { errors?: any[], message?: string } ) => {
  const { errors, message } = formError;
  const resultErrors: { [key: string]: string } = {};
  if (!isEmpty( errors )) {
    map( errors, ( error ) => {
      resultErrors[error.property_path] = error.message;
    } );
  } else if (!isEmpty( message )) {
    resultErrors._error = message;
  } else {
    return false;
  }
  throw new SubmissionError( resultErrors );
};
