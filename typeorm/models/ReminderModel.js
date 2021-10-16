module.exports = class Reminder {
    constructor (discord_id, interval, times) {
        this.discord_id = discord_id;
        this.interval = interval;
        this.times = times;
    }
};