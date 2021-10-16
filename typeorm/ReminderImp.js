const typeorm = require('typeorm');
const Reminder = require('./models/ReminderModel');
const GlobalDb = require('./GlobalDb');

const db = GlobalDb.get_db;

module.exports = class AssignmentImp {
    async addReminder(discord_id, interval, times) {
        return await this.db().manager.save(new Reminder(discord_id, interval, times));
    }

    async listReminders() {
        return await this.db().manager.find(Reminder);
    }
}