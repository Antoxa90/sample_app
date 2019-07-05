import { QueryInterface, SequelizeStatic } from 'sequelize';

module.exports = {
  up: ( queryInterface: QueryInterface, Sequelize: SequelizeStatic ) => {
    return queryInterface.bulkInsert( 'Comments', [
      {
        creationDate: new Date(),
        id: 1,
        text: 'This is the first comment.',
        userId: 2,
      },
      {
        creationDate: new Date(),
        id: 2,
        text: 'One more small comment.',
        userId: 2,
      }
    ], {} );
  },

  down: ( queryInterface: QueryInterface, Sequelize: SequelizeStatic ) => {
    queryInterface.bulkDelete( 'Comments', [{ id: 1 }, { id: 2 }] );
  }
};
