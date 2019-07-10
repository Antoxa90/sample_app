import React from 'react';

interface IWithLabelProps {
  label?: string;
  name?: string;
}

export const withLabel = ( WrappedComponent: React.FunctionComponent<{name?: string}> | React.ComponentClass<{name?: string}> ) =>
  ( { label, ...props }: IWithLabelProps ) => (
    <div>
      { label && <label htmlFor={ props.name }>{ label }</label> }
      <WrappedComponent { ...props } />
    </div>
  );
