const typeorm = require('typeorm');
const Assignment = require('./models/AssignmentModel');

module.exports = class AssignmentImp {
    constructor() {
        this.db = await typeorm.createConnection({
            type: 'sqlite',
            database: '/config/bot.db',
            entities: [
                require('./entities/AssignmentSchema')
            ]
        });
    }

    addAssignment(name, description, due_date) {
        return await this.db.manager.save(new Assignment(0, name, description, due_date));
    }

    listAssignment() {
        return await this.db.manager.find(Assignment);
    }

    getAssignment(name) {
        return await this.db.manager.find(Assignment, {
            name
        });
    }

    getAssignment(id) {
        return await this.db.manager.findOne(Assignment, id);
    }
}