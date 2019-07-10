import React from 'react';
import { TransitionablePortal } from 'semantic-ui-react';
import './style.scss';

export interface IStatelessPopupProps {
  open: boolean;
  content: (() => React.ReactNode) | React.ReactNode;
  onClose: () => void;
}

class StatelessPopup extends React.PureComponent<IStatelessPopupProps> {
  public render() {
    const { open, content, onClose } = this.props;

    return (
      <TransitionablePortal
        closeOnTriggerClick
        open={ open }
        onClose={ onClose }
      >
        <div className='custom-popup'>
          <i className='times icon close-icon' onClick={ onClose }></i>
          { typeof content === 'function' ? content() : content }
        </div>
      </TransitionablePortal>
    );
  }
}

export default StatelessPopup;
