'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * 
     */

    await queryInterface.createTable('studios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: Sequelize.STRING,
      slug: Sequelize.STRING,
    });

    await queryInterface.addConstraint('studios', {
      fields:  ['slug'],
      type: 'unique',
      name: 'studio_slug_unique'
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeConstraint('studios', 'studio_slug_unique');
    await queryInterface.dropTable('studios');
  }
};
