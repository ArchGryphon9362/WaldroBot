const typeorm = require('typeorm');
const Assignment = require('./models/AssignmentModel');

module.exports = class AssignmentImp {
    async init() {
        this.db = await typeorm.createConnection({
            type: 'sqlite',
            database: '/config/bot.db',
            entities: [
                require('./entities/AssignmentSchema')
            ],
            synchronize: true
        });
    }

    async addAssignment(name, description, due_date) {
        return await this.db.manager.save(new Assignment(name, description, due_date));
    }

    async addReminder(id, discord_id, interval, times) {
        let assignment = await this.getAssignment(id);
        let reminders = JSON.parse(assignment.reminders);
        reminders.push({discord_id, interval, times});
        assignment.reminders = JSON.stringify(reminders);
        return await this.db.manager.save(assignment);
    }

    async listAssignments() {
        return await this.db.manager.find(Assignment);
    }

    async getAssignment(name) {
        return await this.db.manager.find(Assignment, {
            name
        });
    }

    async getAssignment(id) {
        return await this.db.manager.findOne(Assignment, id);
    }
}