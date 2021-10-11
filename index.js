const chalk = require('chalk');
const discord = require('discord.js');
const Intents = discord.Intents;
require('dotenv').config();

const new_state = chalk.bgBlueBright.whiteBright;
const error = chalk.bgRed.whiteBright;
const warn = chalk.bgYellow;
const log = chalk.green;

// console.log(`
// Test Colors:
// ${new_state('new_state')}
// ${error('error')}
// ${warn('warn')}
// ${log('log')}
// `);

const client = new discord.Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
client.login(process.env.TOKEN);

client.on('ready', client => {
    console.log(new_state("WaldroBot is ready!"))
});

client.on('messageCreate', message => {
    try {
        if (message.content.includes('<:JohnWaldron:893175829675278406>')) {
            message.react(client.emojis.resolveId('893175829675278406'));
        }
        if (message.content.includes('<:GigaWaldron:897158188930060338>')) {
            message.react(client.emojis.resolveId('897158188930060338'));
        }
    }
    catch (err) {
        console.log(error(err));
    }
})