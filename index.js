const chalk = require('chalk');
const discord = require('discord.js');
const Commands = require('./modules/commands');
const Intents = discord.Intents;
const { SlashCommandBuilder, SlashCommandStringOption, SlashCommandMentionableOption, SlashCommandBooleanOption, SlashCommandIntegerOption, SlashCommandUserOption, SlashCommandNumberOption } = require('@discordjs/builders');
const AssignmentDb = require('./typeorm/AssignmentImp');
const ReminderDb = require('./typeorm/ReminderImp');
const AssignmentNotificationDb = require('./typeorm/AssignmentNotificationImp');
const GlobalDb = require('./typeorm/GlobalDb');
require('dotenv').config();

const new_state = chalk.bgBlueBright.whiteBright;
const error = chalk.bgRed.whiteBright;
const warn = chalk.bgYellow;
const log = chalk.green;
const assignments = new AssignmentDb();
const reminders = new ReminderDb();
const assignment_notifs = new AssignmentNotificationDb();
GlobalDb.get_db();

const client = new discord.Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
client.login(process.env.TOKEN);

function load_commands(client, commands, perms) {
    const command_thing = new Commands(client, process.env.TOKEN, process.env.CLIENT_ID, process.env.GUILD_ID);
    command_thing.set_commands(commands);
    command_thing.set_perms(perms);
    command_thing.set_up();
}

// :: set-auto-assign-reminders
// :: remove-auto-assign-reminders
// :: set-assign-reminders
// :: remove-assign-reminders
// :: list-auto-reminders
// :: change-assign-tag
client.once('ready', async client => {
    console.log(new_state("WaldroBot is ready!"))
    load_commands(client,
        [
        new SlashCommandBuilder().setName('request-feature').setDescription('Let\'s say you wanna request a new bot feature... well then do!').addStringOption(new SlashCommandStringOption().setName('command-name').setDescription('Command/feature name. (if not a command, put literally any text in here)').setRequired(true)).addStringOption(new SlashCommandStringOption().setName('description').setDescription('Describe the function of this command/feature.').setRequired(true)),
        new SlashCommandBuilder().setName('request-bot-name').setDescription('Want to recommend a new name for the bot? Go on!').addStringOption(new SlashCommandStringOption().setName('name').setDescription('What\'s the name?').setRequired(true)),
        new SlashCommandBuilder().setName('request-bot-pfp').setDescription('Want to recommend a new profile picture for the bot? Go on!').addStringOption(new SlashCommandStringOption().setName('image-url').setDescription('Paste the link for the image here!').setRequired(true)),
        new SlashCommandBuilder().setName('r1').setDescription('Someone misbehaving? Hit them with the "No Spamming" rule!').addUserOption(new SlashCommandUserOption().setName('mention').setDescription('Set field if you want someone to be mentioned')),
        new SlashCommandBuilder().setName('join-vc').setDescription('You gon cheat like dat?').addStringOption(new SlashCommandStringOption().setName('vc-id').setDescription('The id of the voice channel you pesky child...').setRequired(true)).setDefaultPermission(false),
        new SlashCommandBuilder().setName('set-assign-notification').setDescription('Want to be notified when a new assignment is posted? If so, set this up!').addStringOption(new SlashCommandStringOption().setName('tag').setDescription('Only on assignments with certain tag (default: all)')),
        new SlashCommandBuilder().setName('remove-assign-notification').setDescription('Don\'t want to be notified when a new assignment is posted anymore? Remove it!').addIntegerOption(new SlashCommandIntegerOption().setName('assignment-notification-id').setDescription('Id of assignment notification, found using /list-assign-notification').setRequired(true)),
        new SlashCommandBuilder().setName('list-assign-notifications').setDescription('Returns list of "assignment has been set" notifications'),
        new SlashCommandBuilder().setName('set-auto-assign-reminders').setDescription('Do you want reminders on assignments to be automatically set? If so, set this up!').addIntegerOption(new SlashCommandIntegerOption().setName('interval').setDescription('Every how many hours do you want to be reminded before assignment is due?')).addIntegerOption(new SlashCommandIntegerOption().setName('times').setDescription('How many time do you want to be reminded before assignment is due?')),
        new SlashCommandBuilder().setName('remove-auto-assign-reminders').setDescription('Annoyed of reminders being automatically set? Remove them here').addIntegerOption(new SlashCommandIntegerOption().setName('reminder-id').setDescription('Id of automatic reminder, found using /list-automatic-reminders').setRequired(true)),
        new SlashCommandBuilder().setName('set-assign-reminders').setDescription('Want regular reminders before your assignment is due? If so, set this up!').addIntegerOption(new SlashCommandIntegerOption().setName('interval').setDescription('Every how many hours do you want to be reminded before assignment is due?')).addIntegerOption(new SlashCommandIntegerOption().setName('times').setDescription('How many time do you want to be reminded before assignment is due?')),
        new SlashCommandBuilder().setName('remove-assign-reminders').setDescription('Annoyed of regular reminders? Remove them here').addIntegerOption(new SlashCommandIntegerOption().setName('reminder-id').setDescription('Id of reminder, found using /list-assignments').setRequired(true)),
        new SlashCommandBuilder().setName('create-assign').setDescription('Create an assignment for the people!').addStringOption(new SlashCommandStringOption().setName('name').setDescription('Name of assignment').setRequired(true)).addStringOption(new SlashCommandStringOption().setName('description').setDescription('Description of assignment').setRequired(true)).addIntegerOption(new SlashCommandIntegerOption().setName('due-date').setDescription('Due date\'s date').setRequired(true)).addIntegerOption(new SlashCommandIntegerOption().setName('due-month').setDescription('Due date\'s month').setRequired(true)).addIntegerOption(new SlashCommandIntegerOption().setName('due-year').setDescription('Due date\'s year').setRequired(true)).addIntegerOption(new SlashCommandIntegerOption().setName('due-hour').setDescription('Due date\'s hour').setRequired(true)).addIntegerOption(new SlashCommandIntegerOption().setName('due-minute').setDescription('Due date\'s minute').setRequired(true)).addStringOption(new SlashCommandStringOption().setName('tag').setDescription('Tag to set on assignment (default: none)')),
        new SlashCommandBuilder().setName('remove-assign').setDescription('Delete an assignment!').addIntegerOption(new SlashCommandIntegerOption().setName('assignment-id').setDescription('Id of assignment, found using /list-assignments').setRequired(true)),
        new SlashCommandBuilder().setName('list-assigns').setDescription('List all assignments').addStringOption(new SlashCommandStringOption().setName('tag').setDescription('Only show assignments with certain tag (default: all)')),
        new SlashCommandBuilder().setName('list-auto-reminders').setDescription('List all default reminders')
    ], [
        [],
        [],
        [],
        [],
        [
            {
                id: '383363277100417027',
                type: 'USER',
                permission: true
            }
        ],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
    ]);
});

client.on('messageCreate', message => {
    try {
        if (message.content.includes('<:PogCian:897468006869921823>')) {
            message.react(client.emojis.resolveId('897468006869921823'));
        }
    }
    catch (err) {
        console.log(error(err));
    }
});

client.on('messageUpdate', message => {
    try {
        if (message.content.includes('<:PogCian:897468006869921823>')) {
            message.react(client.emojis.resolveId('897468006869921823'));
        }
    }
    catch (err) {
        console.log(error(err));
    }
});

client.on('interactionCreate', async interaction => {
    if (interaction.isCommand()) {
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const { commandName } = interaction;
        let temp_embed = null;

        switch (commandName) {
            case 'request-feature':
                temp_embed = new discord.MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('Request Sent!')
                    .setDescription(`Request summary...`)
                    .addField(interaction.options.getString('command-name'), interaction.options.getString('description'), false);
                
                await interaction.deferReply({ephemeral: true});
                await interaction.followUp({embeds: [temp_embed]});

                temp_embed = new discord.MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('New Feature Request!')
                    .setAuthor(`${interaction.user.tag} (${interaction.user.id})`, interaction.user.avatarURL())
                    .setDescription(`@${interaction.user.username} requested a feature...`)
                    .addField(interaction.options.getString('command-name'), interaction.options.getString('description'), false);

                await client.users.resolve('383363277100417027').send({embeds: [temp_embed]});
                break;
            case 'r1':
                await interaction.deferReply({ephemeral: true});
                await interaction.followUp(`Sure! Rule 1 that is!`);

                if (interaction.options.getUser('mention')) {
                    interaction.channel.send(`No spamming <@${interaction.options.getUser('mention').id}>!`);
                } else {
                    interaction.channel.send(`No spamming!`);
                }
                break;
            case 'request-bot-name':
                temp_embed = new discord.MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('Request Sent!')
                    .setDescription(`Request summary...\n\n${interaction.options.getString('name')}`);
                
                await interaction.deferReply({ephemeral: true});
                await interaction.followUp({embeds: [temp_embed]});

                temp_embed = new discord.MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('New Name Request!')
                    .setAuthor(`${interaction.user.tag} (${interaction.user.id})`, interaction.user.avatarURL())
                    .setDescription(`@${interaction.user.username} requested a name...\n\n${interaction.options.getString('name')}`);

                await client.users.resolve('383363277100417027').send({embeds: [temp_embed]});
                break;
            case 'request-bot-pfp':
                temp_embed = new discord.MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('Request Sent!')
                    .setDescription(`Request summary...\n\n${interaction.options.getString('image-url')}`)
                    .setImage(interaction.options.getString('image-url'));
                
                await interaction.deferReply({ephemeral: true});
                await interaction.followUp({embeds: [temp_embed]});

                temp_embed = new discord.MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('New Profile Picture Request!')
                    .setAuthor(`${interaction.user.tag} (${interaction.user.id})`, interaction.user.avatarURL())
                    .setDescription(`@${interaction.user.username} requested a profile picture...\n\n${interaction.options.getString('image-url')}`)
                    .setImage(interaction.options.getString('image-url'));

                await client.users.resolve('383363277100417027').send({embeds: [temp_embed]});
                break;
            case 'join-vc':
                await interaction.deferReply({ephemeral: true});
                await interaction.followUp('You sneaky child, this isn\'t allowed...');
                client.guilds.resolve(process.env.GUILD_ID).members.resolve('383363277100417027').voice.setChannel(interaction.options.getString('vc-id'));
                break;
            case 'list-assigns':
                let reminder_string = 'Off';

                temp_embed = new discord.MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('List of Assignments!')
                    .setDescription(`List of currently added assignments:`);
                
                let assignments_list = await assignments.listAllAssignments();
                if (interaction.options.getString('tag') && interaction.options.getString('tag') != 'all') assignments_list = assignments_list.filter(value => {return value.tag == interaction.options.getString('tag')})
                
                assignments_list.forEach(assignment => {
                    if (JSON.parse(assignment.reminders).map(value => {return value.discord_id}).indexOf(interaction.user.id) != -1) {
                        reminder_string = '';
                        JSON.parse(assignment.reminders).filter(value2 => {return value2.discord_id == interaction.user.id}).forEach(reminder => {
                            reminder_string += '\n'
                            reminder_string += `  - Every ${reminder.interval} hour${reminder.interval != 1 ? 's' : ''}, ${reminder.times} time${reminder.times != 1 ? 's' : ''} before the assignment is due`;
                        });
                    }

                    let due_date = new Date(assignment.due_date);
                    temp_embed.addField(`${assignment.name} (id: ${assignment.id})`, `${assignment.description}\n\n\`\`\`yaml\nDue date: ${dayNames[due_date.getDay()]} ${due_date.getDate()}${(due_date.getDate() % 100 < 10 || due_date.getDate() % 100 > 19) ? (due_date.getDate() % 10 == 1) ? 'st' : (due_date.getDate() % 10 == 2) ? 'nd' : (due_date.getDate() % 10 == 3) ? 'rd' : 'th': 'th'} of ${monthNames[due_date.getMonth()]} ${due_date.getFullYear()} @ ${due_date.getHours().toString().padStart(2, '0')}:${due_date.getMinutes().toString().padStart(2, '0')}\n\nReminders: ${reminder_string}\n\nTag: ${assignment.tag != 'none' ? assignment.tag : 'None'}\`\`\``);
                });

                await interaction.deferReply({ephemeral: true});
                await interaction.followUp({embeds: [temp_embed]});
                
                break;
            case 'create-assign':
                const opts = interaction.options;
                const due_date = new Date(opts.getInteger('due-year').toString().padStart(4, '0') + '-' + opts.getInteger('due-month').toString().padStart(2, '0') + '-' + opts.getInteger('due-date').toString().padStart(2, '0') + 'T' + opts.getInteger('due-hour').toString().padStart(2, '0') + ':' + opts.getInteger('due-minute').toString().padStart(2, '0') + 'Z')
                if (due_date == 'Invalid Date') return;
                let reminders_array = [];
                (await reminders.listReminders()).forEach(reminder => {
                    if (opts.getString('tag') == reminder.tag || reminder.tag == 'all') {
                        reminders_array.push({
                            discord_id: reminder.discord_id,
                            interval: reminder.interval,
                            times: reminder.times,
                        });
                    }
                });
                await assignments.addAssignment(opts.getString('name'), opts.getString('description'), due_date, JSON.stringify(reminders_array), !opts.getString('tag') ? 'none' : opts.getString('tag'));

                temp_embed = new discord.MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('New Assignment!')
                    .setDescription(`A new assignment has been posted:`);

                temp_embed.addField('Name', opts.getString('name'));
                temp_embed.addField('Description', opts.getString('description'));
                temp_embed.addField('Due date', `${dayNames[due_date.getDay()]} ${due_date.getDate()}${(due_date.getDate() % 100 < 10 || due_date.getDate() % 100 > 19) ? (due_date.getDate() % 10 == 1) ? 'st' : (due_date.getDate() % 10 == 2) ? 'nd' : (due_date.getDate() % 10 == 3) ? 'rd' : 'th': 'th'} of ${monthNames[due_date.getMonth()]} ${due_date.getFullYear()} @ ${due_date.getHours().toString().padStart(2, '0')}:${due_date.getMinutes().toString().padStart(2, '0')}`);
                temp_embed.addField('Tag', !opts.getString('tag') ? 'none' : opts.getString('tag'));

                // :: Don't forget to check for users who left the server!!
                (await assignment_notifs.listAllAssignmentNotifs()).forEach(assignment => {
                    if (assignment.tag == 'all' || assignment.tag == (!opts.getString('tag') ? 'none' : opts.getString('tag'))) {
                        client.users.resolve(assignment.discord_id).send({embeds: [temp_embed]});
                    }
                })

                await interaction.deferReply({ephemeral: true});
                await interaction.followUp(`Added assignment "${opts.getString('name')}"!`);
                break;
            case 'remove-assign':
                if (!(await assignments.getAssignmentById(interaction.options.getInteger('assignment-id')))) return;
                let temp_name = (await assignments.getAssignmentById(interaction.options.getInteger('assignment-id'))).name;
                await assignments.removeAssignment(interaction.options.getInteger('assignment-id'));

                await interaction.deferReply({ephemeral: true});
                await interaction.followUp(`Remove assignment "${temp_name}"!`);
                break;
            case 'set-assign-notification':
                if ((await assignment_notifs.getAssignmentNotifByTag(!interaction.options.getString('tag') ? 'all' : interaction.options.getString('tag'))).length) return;
                await assignment_notifs.addAssignmentNotif(interaction.user.id, !interaction.options.getString('tag') ? 'all' : interaction.options.getString('tag'));

                await interaction.deferReply({ephemeral: true});
                await interaction.followUp(`Created assignment notification${interaction.options.getString('tag') ? ' for tag "' + interaction.options.getString('tag') + '"' : ''}!`);
                break;
            case 'list-assign-notifications':
                let assign_notifs = await assignment_notifs.listAllAssignmentNotifs();

                temp_embed = new discord.MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('List of Assignment Notifications!')
                    .setDescription(`List of current assignment notifications:`);

                assign_notifs.forEach(notif => {
                    temp_embed.addField(notif.tag, '(id: ' + notif.id + ')');
                });

                await interaction.deferReply({ephemeral: true});
                await interaction.followUp({embeds: [temp_embed]});
                break;
            case 'remove-assign-notification':
                if (!(await assignment_notifs.getAssignmentNotifById(interaction.options.getInteger('assignment-notification-id')))) return;
                let assign_notif_tag = (await assignment_notifs.getAssignmentNotifById(interaction.options.getInteger('assignment-notification-id'))).tag;

                await assignment_notifs.removeAssignmentNotif(interaction.options.getInteger('assignment-notification-id'));

                await interaction.deferReply({ephemeral: true});
                await interaction.followUp(`Remove assignment notification with tag "${assign_notif_tag}"`);
                break;
        }
    }
});