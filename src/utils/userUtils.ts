import bcrypt from 'bcrypt';

export const getPasswordHash = ( password: string ): Promise<string> =>
  new Promise( ( resolve, reject ) =>
    bcrypt.hash( password, 10, ( err, hash ) => resolve( hash ) )
  );