let db = null;

module.exports = {
    async get_db() {
        if (db == null) {
            db = await typeorm.createConnection({
                type: 'sqlite',
                database: '/config/bot.db',
                entities: [
                    require('./entities/AssignmentSchema'),
                    require('./entities/ReminderSchema')
                ],
                synchronize: true
            });
        }
        return db;
    }
};