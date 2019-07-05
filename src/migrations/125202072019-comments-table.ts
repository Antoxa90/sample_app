import { QueryInterface, SequelizeStatic } from 'sequelize';

module.exports = {
  down: ( queryInterface: QueryInterface, Sequelize: SequelizeStatic ) => queryInterface.dropTable( 'Comments' ),
  up: ( queryInterface: QueryInterface, Sequelize: SequelizeStatic ) =>
    queryInterface.createTable( 'Comments', {
      creationDate: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      text: Sequelize.STRING,
      userId: {
        onDelete: 'cascade',
        onUpdate: 'cascade',
        references: {
          key: 'id',
          model: 'User',
        },
        type: Sequelize.INTEGER,
      },
    } ),
};
