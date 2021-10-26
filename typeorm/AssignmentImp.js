const typeorm = require('typeorm');
const Assignment = require('./models/AssignmentModel');
const GlobalDb = require('./GlobalDb');

const db = GlobalDb.get_db;

module.exports = class AssignmentImp {
    async addAssignment(name, description, due_date, reminders, tag) {
        return await (await db()).manager.save(new Assignment(name, description, due_date, reminders, tag));
    }

    async removeAssignment(id) {
        return await (await db()).manager.delete(Assignment, id);
    }

    async addReminder(id, discord_id, interval, times) {
        let assignment = await this.getAssignmentById(id);
        let reminders = JSON.parse(assignment.reminders);
        reminders.push({discord_id, interval, times});
        assignment.reminders = JSON.stringify(reminders);
        return await (await db()).manager.save(assignment);
    }

    async listAllAssignments() {
        return await (await db()).manager.find(Assignment);
    }

    async listAssignmentsByTag(tag) {
        return await (await db()).manager.find(Assignment, {
            tag
        });
    }

    async getAssignmentByName(name) {
        return await (await db()).manager.find(Assignment, {
            name
        });
    }

    async getAssignmentById(id) {
        return await (await db()).manager.findOne(Assignment, id);
    }
}