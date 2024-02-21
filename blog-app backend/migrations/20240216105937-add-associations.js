'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
 // Add foreign key constraint to LikePost table
 await queryInterface.addConstraint('likePosts', {
  fields: ['userId'],
  type: 'foreign key',
  name: 'userId',
  references: {
    table: 'users',
    field: 'id',
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

await queryInterface.addConstraint('likePosts', {
  fields: ['postId'],
  type: 'foreign key',
  name: 'postId',
  references: {
    table: 'posts',
    field: 'id',
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.removeConstraint('likePosts', 'userId');
    await queryInterface.removeConstraint('likePosts', 'postId');
  }
};
