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
            type: "string"
        },
        description: {
            type: "string"
        },
        due_date: {
            type: "date"
        }
    }
});