import { QueryInterface, SequelizeStatic } from 'sequelize';
import { getPasswordHash } from '../utils/userUtils';

module.exports = {
  up: async ( queryInterface: QueryInterface, Sequelize: SequelizeStatic ) => {
    return queryInterface.bulkInsert( 'User', [
      {
        id: 1,
        login: 'admin',
        password: await getPasswordHash( 'admin123' )
      },
      {
        id: 2,
        login: 'user',
        password: await getPasswordHash( '12345678' )
      }
    ], {} );
  },

  down: async ( queryInterface: QueryInterface, Sequelize: SequelizeStatic ) => {
    queryInterface.bulkDelete( 'User', [{ id: 1 }, { id: 2 }] );
  }
};
