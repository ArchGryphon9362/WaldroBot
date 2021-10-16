const EntitySchema = require('typeorm').EntitySchema;
const Reminder = require('../models/ReminderModel');

module.exports = new EntitySchema({
    name: 'Reminder',
    target: Reminder,
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        discord_id: {
            type: "int"
        },
        interval: {
            type: "int"
        },
        times: {
            type: "int"
        },
        tag: {
            type: "text"
        }
    }
});