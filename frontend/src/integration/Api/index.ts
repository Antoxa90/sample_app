import { getJson, postJson } from '../../utils/httpUtils';

const prefix: string = '/api';
const signInApiUrl: string = `${prefix}/login`;
const userApiUrl: string = `${prefix}/user`;

export default class Api {
  public static signIn( login: string, password: string ) {
    return postJson( signInApiUrl, { login, password } );
  }

  public static getUser() {
    return getJson( userApiUrl );
  }
}
