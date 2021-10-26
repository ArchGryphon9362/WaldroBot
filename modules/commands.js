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

        this.rest.put(Routes.applicationGuildCommands(this.client_id, this.guild_id), { body: this.commands })
            .then(() => console.log(chalk.green('Successfully registered application commands.')))
            .catch(err => console.log(chalk.bgRed.whiteBright(err)));
        
        this.rest.get(Routes.applicationCommands(this.client_id))
            .then(async commands => {
                for (let i; i < commands.length; i++) {
                    if (commands[i].length) {
                        let cmd = await this.client.guilds.cache.get(this.guild_id)?.commands.fetch(commands[i]);
                        await cmd.permissions.add({ permissions: this.perms[i] });
                    }
                }
            })
    }
};