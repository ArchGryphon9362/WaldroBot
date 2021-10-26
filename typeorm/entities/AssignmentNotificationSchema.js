const EntitySchema = require('typeorm').EntitySchema;
const AssignmentNotification = require('../models/AssignmentNotificationModel');

module.exports = new EntitySchema({
    name: 'AssignmentNotification',
    target: AssignmentNotification,
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        discord_id: {
            type: "text"
        },
        tag: {
            type: "text"
        }
    }
});