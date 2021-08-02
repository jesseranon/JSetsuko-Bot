const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token, creatorid } = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

//uncomment next line to troubleshoot command module handling
//console.log(client.commands);

//initiate client
client.once('ready', () => {
    console.log('Ready!');
});

// Generate generic embed
var botEmbed = new Discord.MessageEmbed()
     .setAuthor('@JSetsuko-Bot', client.commands.get('retsuko').pics["bot-avatar"])
     .setFooter('@JSetsuko-Bot - Your sexy unicorn virtual boyfriend/Discord bot')
     .setThumbnail(client.commands.get("retsuko").pics["bot-avatar"])
     .setColor('ORANGE');

//listen for messages sent in all channels the bot is in
client.on('message', message => {

    //listen for user message that starts a mention for this bot
    if (message.content.startsWith(`<@!`) && message.mentions.has(client.user) && !message.author.bot) {
        
        //special response to creator
        if (message.author.id == creatorid) {
            message.reply(`buy 20 outfits right now and get ten percent off <3`)
                .then(() => console.log(`Your wish is my command, Retsuko`))
                .catch(console.error);
        }

        //respond with help
        try {
            client.commands.get('help').execute(message);
        } catch (error) {
            console.log(`There was an error trying to execute !help`);
        }

    } else {

        //listen for messages that are sent by non-bots and that start with prefix
        if (!message.content.startsWith(prefix) || message.author.bot) return;

        // uncomment next line for troubleshooting
        // console.log(message.content);

        //curate would-be commands and rest of string into separate arguments
        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();

        //cull non-commands
        if (!client.commands.has(command)) return;

        //execute commands from modules
        try {
            client.commands.get(command).execute(message, botEmbed, args);
        } catch (error) {
            console.log(`There was an error trying to execute !${command}`);
        }

    }

});

//login
client.login(token);
