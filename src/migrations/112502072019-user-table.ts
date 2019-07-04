import { QueryInterface, SequelizeStatic } from 'sequelize';

module.exports = {
  up: ( queryInterface: QueryInterface, Sequelize: SequelizeStatic ) =>
    queryInterface.createTable( 'User', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      login: {
        type: Sequelize.STRING,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
    } ),
  down: ( queryInterface: QueryInterface, Sequelize: SequelizeStatic ) => queryInterface.dropTable( 'User' ),
};