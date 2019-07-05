import React from 'react';
import { connect } from 'react-redux';
import { acGetUser } from '../../actions/acUser';
import { IStoreState } from '../../interfaces/IReducerInterfaces';
import { ThunkDispatch } from '../../types';

export interface IMainPageProps {
  login: string;
  isAuth: boolean;
  onGetUser: typeof acGetUser;
}

class MainPage extends React.PureComponent<IMainPageProps> {
  public componentDidMount() {
    this.props.onGetUser();
  }

  public render() {
    return (
      <div className='header'>
        { this.props.isAuth && <div>Hello { this.props.login }</div> }
      </div>
    );
  }
}

const mapStateToProps = ( { user: { login, isAuth } }: IStoreState ) => ({
  isAuth,
  login,
});

const mapDispatchToProps = ( dispatch: ThunkDispatch ) => ({
  onGetUser: () => dispatch(acGetUser())
});

export default connect( mapStateToProps, mapDispatchToProps )( MainPage );
