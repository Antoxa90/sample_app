import { QueryInterface, SequelizeStatic } from 'sequelize';

module.exports = {
  up: ( queryInterface: QueryInterface, Sequelize: SequelizeStatic ) =>
    queryInterface.createTable( 'Comments', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      text: Sequelize.STRING,
      creationDate: {
        type: Sequelize.DATE,
        allowNull: false
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'User',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
    } ),
  down: ( queryInterface: QueryInterface, Sequelize: SequelizeStatic ) => queryInterface.dropTable( 'Comments' ),
};