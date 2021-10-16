const typeorm = require('typeorm');
const Reminder = require('./models/ReminderModel');
const GlobalDb = require('./GlobalDb');

const db = GlobalDb.get_db;

module.exports = class ReminderImp {
    async addReminder(discord_id, interval, times, tag) {
        return await (await db()).manager.save(new Reminder(discord_id, interval, times, tag));
    }

    async listReminders() {
        return await (await db()).manager.find(Reminder);
    }
}