const typeorm = require('typeorm');
const Assignment = require('./models/AssignmentModel');
const GlobalDb = require('./GlobalDb');

const db = GlobalDb.get_db;

module.exports = class AssignmentImp {
    async addAssignment(name, description, due_date, reminders) {
        return await (await db()).manager.save(new Assignment(name, description, due_date, reminders));
    }

    async addReminder(id, discord_id, interval, times) {
        let assignment = await this.getAssignment(id);
        let reminders = JSON.parse(assignment.reminders);
        reminders.push({discord_id, interval, times});
        assignment.reminders = JSON.stringify(reminders);
        return await (await db()).manager.save(assignment);
    }

    async listAssignments() {
        return await (await db()).manager.find(Assignment);
    }

    async getAssignment(name) {
        return await (await db()).manager.find(Assignment, {
            name
        });
    }

    async getAssignment(id) {
        return await (await db()).manager.findOne(Assignment, id);
    }
}