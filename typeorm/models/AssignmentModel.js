module.exports = class Assignment {
    constructor (name, description, due_date) {
        this.name = name;
        this.description = description;
        this.due_date = due_date;
        this.reminders = '[]'
    }
};