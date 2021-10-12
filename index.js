const chalk = require('chalk');
const discord = require('discord.js');
const Commands = require('./modules/commands.js');
const Intents = discord.Intents;
const { SlashCommandBuilder, SlashCommandStringOption, SlashCommandMentionableOption } = require('@discordjs/builders');
require('dotenv').config();

const new_state = chalk.bgBlueBright.whiteBright;
const error = chalk.bgRed.whiteBright;
const warn = chalk.bgYellow;
const log = chalk.green;

const client = new discord.Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
client.login(process.env.TOKEN);

function load_commands(commands) {
    const command_thing = new Commands(process.env.TOKEN, process.env.CLIENT_ID, process.env.GUILD_ID);
    command_thing.set_commands(commands);
    command_thing.set_up();
}

client.on('ready', client => {
    console.log(new_state("WaldroBot is ready!"))
    load_commands([
        new SlashCommandBuilder().setName('request-feature').setDescription('Let\'s say you wanna request a new bot feature... well then do!').addStringOption(new SlashCommandStringOption().setName('command-name').setDescription('Command/feature name. (if not a command, put literally any text in here)').setRequired(true)).addStringOption(new SlashCommandStringOption().setName('description').setDescription('Describe the function of this command/feature.').setRequired(true)),
        new SlashCommandBuilder().setName('r1').setDescription('Someone misbehaving? Hit them with the "No Spamming" rule!').addMentionableOption(new SlashCommandMentionableOption().setName('mention').setDescription('Set field if you want someone to be mentioned'))
    ]);
});

client.on('messageCreate', message => {
    try {
        if (message.content.includes('<:CianPog:897468006869921823>')) {
            message.react(client.emojis.resolveId('897468006869921823'));
        }
    }
    catch (err) {
        console.log(error(err));
    }
});

client.on('messageUpdate', message => {
    try {
        if (message.content.includes('<:CianPog:897468006869921823>')) {
            message.react(client.emojis.resolveId('897468006869921823'));
        }
    }
    catch (err) {
        console.log(error(err));
    }
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;
    switch (commandName) {
        case 'request-feature':
            await interaction.deferReply({ephemeral: true});
            await interaction.followUp(`Sure! Requested command '${interaction.options.getString('command-name')}'!`);

            let temp_embed = new discord.MessageEmbed()
                .setColor('RANDOM')
                .setTitle('New Feature Request!')
                .setAuthor(`${interaction.user.tag} (${interaction.user.id})`, interaction.user.avatarURL())
                .setDescription(`@${interaction.user.username} requested a feature...`)
                .addField(interaction.options.getString('command-name'), interaction.options.getString('description'), false);

            await client.users.resolve('383363277100417027').send({embeds: [temp_embed]});
            //await client.users.resolve('383363277100417027').send(`User '@${interaction.user.tag} (${interaction.user.id})' requested feature '${interaction.options.getString('command-name')}' with description '${interaction.options.getString('description')}'`);
        case 'r1':
            await interaction.deferReply({ephemeral: true});
            await interaction.followUp(`Sure! Rule 1 that is!`);

            if (interaction.options.getMentionable('mention')) {
                interaction.channel.send(`No spamming <@${interaction.options.getMentionable('mention').id}>!`)
            } else {
                interaction.channel.send(`No spamming!`)
            }
    }
});