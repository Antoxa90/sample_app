import React from 'react';

export interface ILabelProps {
  className?: string;
  text: string;
}

class Label extends React.PureComponent<ILabelProps> {
  public render() {
    const { className, text } = this.props;

    return (
      <div className={ className }>{ text }</div>
    );
  }
}

export default Label;
