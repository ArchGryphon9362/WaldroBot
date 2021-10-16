const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const chalk = require('chalk');

module.exports = class Commands {
    constructor (token, client_id, guild_id) {
        if (!token) throw("Token not provided");
        if (!client_id) throw("Client Id not provided");
        if (!guild_id) throw("Guild Id not provided");

        this.rest = new REST({ version: '9' }).setToken(token);
        this.client_id = client_id;
        this.guild_id = guild_id;
    }

    set_commands (commands) {
        if (!commands) throw("No commands provided")

        this.commands = commands.map(command => command.toJSON());
    }

    set_up () {
        if (!this.commands) return;

        // :: Restore deleting old commands after you're done!!
        /*
        this.rest.get(Routes.applicationGuildCommands(this.client_id, this.guild_id))
            .then(async response => {
                await Promise.all(response.map(async (command) => {
                    await this.rest.delete(Routes.applicationGuildCommand(this.client_id, this.guild_id, command.id));
                }));
                await */this.rest.put(Routes.applicationGuildCommands(this.client_id, this.guild_id), { body: this.commands })
                    .then(() => console.log(chalk.green('Successfully registered application commands.')))
                    .catch(err => console.log(chalk.bgRed.whiteBright(err)));/*
            });*/
    }
};