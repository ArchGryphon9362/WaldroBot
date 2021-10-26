const typeorm = require('typeorm');
const AssignmentNotification = require('./models/AssignmentNotificationModel');
const GlobalDb = require('./GlobalDb');

const db = GlobalDb.get_db;

module.exports = class AssignmentNotificationImp {
    async addAssignmentNotif(discord_id, tag) {
        return await (await db()).manager.save(new AssignmentNotification(discord_id, tag));
    }

    async removeAssignmentNotif(id) {
        return await (await db()).manager.delete(AssignmentNotification, id);
    }

    async listAllAssignmentNotifs() {
        return await (await db()).manager.find(AssignmentNotification);
    }

    async getAssignmentNotifById(id) {
        return await (await db()).manager.findOne(AssignmentNotification, id);
    }

    async getAssignmentNotifByTag(tag) {
        return await (await db()).manager.find(AssignmentNotification, {
            tag
        });
    }
}