const EntitySchema = require('typeorm').EntitySchema;
const Assignment = require('../models/AssignmentModel');

module.exports = new EntitySchema({
    name: 'Assignment',
    target: Assignment,
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        name: {
            type: "text"
        },
        description: {
            type: "text"
        },
        due_date: {
            type: "datetime"
        },
        tag: {
            type: "text"
        },
        reminders: {
            type: "text"
        }
    }
});