const fs = require('fs');
const { sep } = require('path');
const { Client, Collection, MessageEmbed } = require('discord.js');
const config = require('./config.json');
const bot = new Client();
["commands", "aliases", "h"].forEach(x => bot[x] = new Collection());

// Attaching config to bot so it can be accessed by commands if needed
// bot.config = config;
bot.prefix = config["prefix"];

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

//uncomment next line to troubleshoot command module handling
//console.log(client.commands);

//initiate client
bot.once('ready', () => {
    console.log('JSetsuko-Bot is online!');
    // console.log(bot.commands);
    console.log(bot.aliases);
});

//listen for messages sent in all channels the bot is in
bot.on('message', message => {

    //ignore messages that are not from a guild or are from a bot
    if (!message.guild || message.author.bot) return;

    //listen for a message that starts with a single mention for this bot
    if (message.content.startsWith(`<@!`) && message.mentions.has(bot.user) && message.mentions.users.size == 1) {
        
        //special response to creator
        if (message.author.id == config.creatorid) {
            message.reply(`buy 20 outfits right now and get ten percent off <3`)
                .then(() => console.log(`Be my whale, Retsuko`))
                .catch(console.error);
        }

        //respond with help
        try {
            bot.commands.get('help').run(bot, message);
        } catch (error) {
            console.log(`There was an error trying to execute !help via @JSetsuko-Bot tag`);
        }

    } else {

        //ignore messages that don't start with a !
        if (!message.content.startsWith(config.prefix)) return;

        //curate would-be commands and rest of string into an array
        const args = message.content.slice(config.prefix.length).trim().split(/ +/);
        const cmd = args.shift().toLowerCase();

        let command;

        //cull non-commands
        if (bot.commands.has(cmd)) {
            command = bot.commands.get(cmd);
        } else if (bot.aliases.has(cmd)) {
            command = bot.commands.get(bot.aliases.get(cmd));
        } else {
            return;
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

        // in theory, this prevents mod tools from being called by
        // members without proper permissions
        
        if (command.help.name in config.permissions) {
            console.log(`Mod tool being called`);
            if (!message.member.hasPermission('ADMINISTRATOR')) {   //if not an admin
                if (!message.member.hasPermission(config.permissions[command.help.name])) { //must have specific permission
                    console.log(`${message.author.tag} used !${command} in ${message.guild.name}.  It failed...`);
                    return;
                }
            }
        }

        //if you made it here, the author is able to do the thing
        try {
            command.run(bot, message, args);
        } catch (error) {
            console.log(`There was an error trying to execute ${config.prefix}${command}`);
        }

    }

});

//login
bot.login(config.token);