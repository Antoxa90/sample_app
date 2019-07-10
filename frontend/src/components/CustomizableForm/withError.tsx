import React from 'react';

interface IWithErrorProps {
  meta: {
    error?: string;
  };
}

export const withError = ( WrappedComponent: React.FunctionComponent | React.ComponentClass ) =>
  ( { meta: { error }, ...props }: IWithErrorProps ) => (
  <div>
    <WrappedComponent { ...props } />
    { error && <div className='submit-failed'>{ error }</div> }
  </div>
);
