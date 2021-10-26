const typeorm = require('typeorm');

let db = null;
let test_value = 0;

module.exports = {
    async get_db() {
        if (db == null) {
            db = await typeorm.createConnection({
                type: 'sqlite',
                database: '/config/bot.db',
                entities: [
                    require('./entities/AssignmentSchema'),
                    require('./entities/ReminderSchema'),
                    require('./entities/AssignmentNotificationSchema')
                ],
                synchronize: true
            });
        }
        return db;
    }
};