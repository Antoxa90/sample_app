import { QueryInterface, SequelizeStatic } from 'sequelize';

module.exports = {
  up: ( queryInterface: QueryInterface, Sequelize: SequelizeStatic ) => {
    return queryInterface.bulkInsert( 'Comments', [
      {
        id: 1,
        userId: 2,
        text: 'This is the first comment.',
        creationDate: new Date()
      },
      {
        id: 2,
        userId: 2,
        text: 'One more small comment.',
        creationDate: new Date()
      }
    ], {} );
  },

  down: ( queryInterface: QueryInterface, Sequelize: SequelizeStatic ) => {
    queryInterface.bulkDelete( 'Comments', [{ id: 1 }, { id: 2 }] )
  }
};