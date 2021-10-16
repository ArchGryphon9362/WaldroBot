module.exports = class Assignment {
    constructor (name, description, due_date, reminders) {
        this.name = name;
        this.description = description;
        this.due_date = due_date;
        this.reminders = reminders;
    }
};