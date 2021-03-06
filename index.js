const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token, creatorid, guildsmanaged, permissions } = require('./config.json');

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
     .setThumbnail(client.commands.get("retsuko").pics["bot-avatar"])
     .setColor('ORANGE');

//listen for messages sent in all channels the bot is in
client.on('message', message => {

    //ignore messages that are not from a guild or are from a bot
    if (!message.guild || message.author.bot) return;

    //listen for user message that starts a mention for this bot
    if (message.content.startsWith(`<@!`) && message.mentions.has(client.user) && message.mentions.users.size == 1) {
        
        //special response to creator
        if (message.author.id == creatorid) {
            message.reply(`buy 20 outfits right now and get ten percent off <3`)
                .then(() => console.log(`Be my whale, Retsuko`))
                .catch(console.error);
        }

        //respond with help
        try {
            client.commands.get('help').execute(message,botEmbed);
        } catch (error) {
            console.log(`There was an error trying to execute !help via @JSetsuko-Bot tag`);
        }

    } else {

        //ignore messages that don't start with a !
        if (!message.content.startsWith(prefix)) return;

        //curate would-be commands and rest of string into an array
        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();

        //cull non-commands
        if (!client.commands.has(command)) return;

        // // listen for message coming in only from certain guilds
        // if (message.guild.id in guildsmanaged) {
        //     const mGuild = message.guild;
        // //  sending a reply to only a certain channel
        //     const pchannel = mGuild.channels.cache.get(guildsmanaged[mGuild.id]["botchannel"]);
        //     pchannel.send(`This should only appear in #jsetsuko-bot`);       
        // }

        // // welcome back function check
        // const now = new Date();
        // const nows = Math.trunc(now.getTime()/1000);
        // // const lasttime = message.author.lastMessage.createdTimestamp;
        // const lasttime = Math.trunc(1627938907564/1000);
        // console.log(nows);
        // console.log(lasttime);
        // const missed = 48 //hours
        // const away = nows - lasttime;
        // const awaymath = 60*60*missed;
        // console.log(awaymath);
        // console.log(away > awaymath);

        // mod commands check permissions for user and bot -- 
        if (command in permissions) {
            if (!message.member.hasPermission('ADMINISTRATOR') || !message.guild.me.hasPermission('ADMINISTRATOR')) {
                if (!message.member.hasPermission(permissions[command]) || !message.guild.me.hasPermission(permissions[command])) {
                    //bot hasn't been granted permission
                    console.log(`${message.author.tag} used !${command} in ${message.guild.name}.  It failed...`);
                    return;
                }
            }
            //if you made it here, do the thing because you both can
            console.log(`Sufficient permissions to perform Mod Tool !${command}`);
        }

        // // uncomment next line for troubleshooting
        // console.log(message.content);

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
