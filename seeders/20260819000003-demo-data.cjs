'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    await queryInterface.bulkInsert('Users', [
      { name: 'Juan Dela Cruz', email: 'juan@itelect2.test', createdAt: now, updatedAt: now },
      { name: 'Maria Santos', email: 'maria@itelect2.test', createdAt: now, updatedAt: now },
      { name: 'Pedro Reyes', email: 'pedro@itelect2.test', createdAt: now, updatedAt: now }
    ]);

    // Never hard-code userId: 1 -- PostgreSQL owns the id counter.
    const users = await queryInterface.sequelize.query(
      'SELECT id, name FROM "Users";',
      { type: Sequelize.QueryTypes.SELECT }
    );
    const idOf = (name) => users.find((u) => u.name === name).id;

    await queryInterface.bulkInsert('Tasks', [
      { title: 'Set up PostgreSQL database', dueDate: new Date('2026-08-20'), completed: true,
        userId: idOf('Juan Dela Cruz'), createdAt: now, updatedAt: now },
      { title: 'Write Sequelize models', dueDate: new Date('2026-08-21'), completed: true,
        userId: idOf('Juan Dela Cruz'), createdAt: now, updatedAt: now },
      { title: 'Define User-Task association', dueDate: new Date('2026-08-22'), completed: false,
        userId: idOf('Maria Santos'), createdAt: now, updatedAt: now },
      { title: 'Rewrite routes with Sequelize queries', dueDate: new Date('2026-08-23'), completed: false,
        userId: idOf('Maria Santos'), createdAt: now, updatedAt: now },
      { title: 'Test JOIN query in Postman', dueDate: new Date('2026-08-24'), completed: false,
        userId: idOf('Pedro Reyes'), createdAt: now, updatedAt: now }
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Tasks', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  }
};
