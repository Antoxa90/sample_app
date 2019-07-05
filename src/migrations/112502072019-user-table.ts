import { QueryInterface, SequelizeStatic } from 'sequelize';

module.exports = {
  down: ( queryInterface: QueryInterface, Sequelize: SequelizeStatic ) => queryInterface.dropTable( 'User' ),
  up: ( queryInterface: QueryInterface, Sequelize: SequelizeStatic ) =>
    queryInterface.createTable( 'User', {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      login: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
      },
    } ),
};
