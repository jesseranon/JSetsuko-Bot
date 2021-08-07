const fs = require('fs');
const { sep } = require('path');
const { Client, Collection, MessageEmbed } = require('discord.js');
const { prefix, token, creatorid, guildsmanaged, permissions } = require('./config.json');
const bot = new Client();
["commands", "aliases", "h"].forEach(x => bot[x] = new Collection());

const load = (d = "./commands/") => {

    fs.readdirSync(d).forEach(dirs => {
        const commands = fs.readdirSync(`${d}${sep}${dirs}${sep}`).filter(files => files.endsWith(".js"));
        for (const file of commands) {
            const pull = require(`${d}${sep}${dirs}${sep}${file}`);

            if (dirs == 'helpers') {
                bot.h.set(pull.name, pull);

            } else {

                if (pull.help && typeof pull.help.name === "string") {
                    //stuff
                    if (bot.commands.get(pull.help.name)) return console.warn(`warning: Two or more commands have the same name ${pull.help.name}`)
                    bot.commands.set(pull.help.name, pull);
                    console.log(`success Loaded command ${pull.help.name}`);
                } else {
                    //stuff
                    console.log(`Error loading command in ${d}${dirs}. You have a missing help.name or help name is not a string.`)
                    continue;
                }
                if (pull.help.aliases && typeof (pull.help.aliases) === "object") {
                    pull.help.aliases.forEach(alias=>{
                        if (bot.aliases.get(alias)) return console.warn(`Two or more commands share the same alias ${alias}`);
                        bot.aliases.set(alias, pull.help.name);
                    });
                }
            }
        }
    });

}

load();
const h = bot.h.get('helpers');

//uncomment next line to troubleshoot command module handling
//console.log(client.commands);

//initiate client
bot.once('ready', () => {
    console.log('JSetsuko-Bot is online!');
    // console.log(bot.commands);
    // console.log(bot.aliases);
    console.log(bot.h);
    h.test();
});

// Generate generic embed
var botEmbed = new MessageEmbed()
     .setAuthor('@JSetsuko-Bot', bot.commands.get('retsuko').help.pics["bot-avatar"])
     .setThumbnail(bot.commands.get("retsuko").help.pics["bot-avatar"])
     .setColor('ORANGE');

//listen for messages sent in all channels the bot is in
bot.on('message', message => {

    //ignore messages that are not from a guild or are from a bot
    if (!message.guild || message.author.bot) return;

    //listen for a message that starts with a single mention for this bot
    if (message.content.startsWith(`<@!`) && message.mentions.has(bot.user) && message.mentions.users.size == 1) {
        
        //special response to creator
        if (message.author.id == creatorid) {
            message.reply(`buy 20 outfits right now and get ten percent off <3`)
                .then(() => console.log(`Be my whale, Retsuko`))
                .catch(console.error);
        }

        //respond with help
        try {
            bot.commands.get('help').run(message,botEmbed);
        } catch (error) {
            console.log(`There was an error trying to execute !help via @JSetsuko-Bot tag`);
        }

    } else {

        //ignore messages that don't start with a !
        if (!message.content.startsWith(prefix)) return;

        //curate would-be commands and rest of string into an array
        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const cmd = args.shift().toLowerCase();

        let command;

        //cull non-commands
        if (bot.commands.has(cmd)) {
            console.log(command)
        } else if (bot.aliases.has(cmd)) {
            command = bot.commands.get(bot.aliases.get(cmd));
        }

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
            command.run(message, botEmbed, args);
        } catch (error) {
            console.log(`There was an error trying to execute !${command}`);
        }

    }

});

//login
bot.login(token);
