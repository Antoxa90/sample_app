import React from 'react';
import { connect } from 'react-redux';
import { acGetUser } from '../../actions/acUser';
import { IStoreState } from '../../interfaces/IReducerInterfaces';
import { ThunkDispatch } from '../../types';
import StatelessPopup from '../Popup/StatelessPopup';
import SignIn from '../SignIn';
import './styles.scss';

export interface IMainPageProps {
  login: string;
  isAuth: boolean;
  onGetUser: typeof acGetUser;
}

interface IMainPageState {
  isOpenPopup: boolean;
}

class MainPage extends React.PureComponent<IMainPageProps, IMainPageState> {
  public state = {
    isOpenPopup: false
  };

  public componentDidMount() {
    this.props.onGetUser();
  }

  public handleOpenPopup = () => {
    this.setState( { isOpenPopup: true } );
  }

  public handleClosePopup = () => {
    this.setState( { isOpenPopup: false } );
  }

  public render() {
    return (
      <div className='header-wrapper'>
        <div>Logo</div>
        {
          this.props.isAuth ?
            <div>Hello { this.props.login }</div> :
            <div className='sign-in' onClick={ this.handleOpenPopup }>Sign in</div>
        }
        <StatelessPopup open={ this.state.isOpenPopup } content={ <SignIn/> } onClose={ this.handleClosePopup }/>
      </div>
    );
  }
}

const mapStateToProps = ( { user: { login, isAuth } }: IStoreState ) => ({
  isAuth,
  login,
});

const mapDispatchToProps = ( dispatch: ThunkDispatch ) => ({
  onGetUser: () => dispatch( acGetUser() )
});

export default connect( mapStateToProps, mapDispatchToProps )( MainPage );
