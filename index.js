const fs = require('fs');
const { sep } = require('path');
const { Client, Collection, MessageEmbed } = require('discord.js');
const config = require('./config.json');

const bot = new Client();
["commands", "aliases", "h"].forEach(x => bot[x] = new Collection());
const dateOptions = {year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', timeZoneName: 'short'};

    bot.prefix = config["prefix"];
    bot.guildsmanaged = config["guildsmanaged"];

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
                    if (bot.commands.get(pull.help.name)) return console.warn(`WARNING Two or more commands have the same name ${pull.help.name}`)
                    bot.commands.set(pull.help.name, pull);
                    console.log(`SUCCESS Loaded command ${pull.help.name}`);
                } else {
                    //stuff
                    console.log(`ERROR loading command in ${d}${dirs}. You have a missing help.name or help name is not a string.`)
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

//import helper functions
bot.helpers = bot.h.get('helpers');

//initiate client
bot.once('ready', () => {
    console.log('JSetsuko-Bot is online!');

    //fetch designated rules/roles reaction messages for listening
    for (let g of Object.keys(bot.guildsmanaged)) {
        if (g == "870147820366209055") {
            //rules and roles
            ['rules', 'roles'].forEach(r => {
                bot.guilds.cache.get(g).channels.cache.get(bot.guildsmanaged[g].channels[r]).messages.fetch()
                .then(a => {
                    a.forEach(b => {
                        if (!bot.guildsmanaged[g][`${r}react`].includes(b.id)) bot.guildsmanaged[g][`m${r}react`].push(b.id);
                    });
                })
                .catch(err => console.log(err));
            });
        }
    
    }
});

bot.on('messageUpdate', (om, nm) => {
    if (nm.author.bot || om.content == nm.content) return;
    let a = ``;
    if (om.attachments.size > 0) {
        om.attachments.each(att => {
            a += `${att.url}`;
        })
    } 
    var muEmbed = bot.helpers.createEmbed(bot)
        .setTitle(`**EDITED MESSAGE**`);
    var fieldDes = `**Author**: ${nm.author}
                    **Channel**: ${nm.channel}
                    **Old**: ${om.content}
                    **New**: ${nm.content}
                    **Attached**: ${a.length > 0 ? a : 'N/A'}
                    [Jump!](${nm.url})
                    Created: ${nm.createdAt.toLocaleDateString('en-US', dateOptions)} | Edited: ${nm.editedAt.toLocaleDateString('en-US', dateOptions)}`;
    muEmbed.setDescription(fieldDes);
    bot.helpers.setEmbed(nm, muEmbed, {cid: bot.guildsmanaged[nm.guild.id].channels.botchannel});
});

bot.on('messageDelete', (m) => {

    var mdEmbed = bot.helpers.createEmbed(bot)
        .setTitle(`**DELETED MESSAGE**`);
    let a = ``;
    if (m.attachments.size > 0) {
        m.attachments.each(att => {
            a += `${att.url}`;
        })
    } 
    // **Attachment**: ${m.attachments}
    var fieldDes = `**Author**: ${m.author}
                    **Channel**: ${m.channel}
                    **Text**: ${m.content}
                    **Attached**: ${a.length > 0 ? a : 'N/A'}
                    **Created**: ${m.createdAt.toLocaleDateString('en-US', dateOptions)}`;
    mdEmbed.setDescription(fieldDes);
    bot.helpers.setEmbed(m, mdEmbed, {cid: bot.guildsmanaged[m.guild.id].channels.botchannel});

});

bot.on('guildMemberAdd', member => { //using for bot server only for now

    if (member.guild.id != Object.keys(bot.guildsmanaged)[1]) return; //works, but don't want it affecting channels other than my own for now.

    //assign muted role
    member.roles.set([bot.guildsmanaged[member.guild.id].roles.mute])
        .then(() => {
            //send welcome message
            let roles = bot.guildsmanaged[member.guild.id].channels.roles;
            let rules = bot.guildsmanaged[member.guild.id].channels.rules;
            member.guild.channels.cache.get(bot.guildsmanaged[member.guild.id].channels.welcome)
                .send(`Hey ${member}, welcome to **${member.guild}**! Assign yourself a role in ${member.guild.channels.cache.get(roles)} to get started after reading ${member.guild.channels.cache.get(rules)}`);
        })
        .catch(err => console.log(err));

});

bot.on('messageReactionAdd', (messageReaction, user) => { //using for bot server only for now
    if (messageReaction.message.guild.id != Object.keys(bot.guildsmanaged)[1]) return;
    let gid = messageReaction.message.guild.id;
    let mid = messageReaction.message.id;
    let roles = bot.guildsmanaged[gid].rolesreact;
    let rules = bot.guildsmanaged[gid].rulesreact;
    if (!roles.includes(mid) && !rules.includes(mid)) return;
    // if has mute role and reacts to rules message, assign initiated role
    memberid = user.id;
    if (rules.includes(mid) && messageReaction.message.guild.members.cache.get(memberid).roles.cache.has(bot.guildsmanaged[gid].roles.mute)) {
        let u = messageReaction.message.guild.members.cache.get(memberid);
        return u.roles.set([bot.guildsmanaged[gid].roles.initiated]);
    }
    // if reacted to a roles assignment message, assign role
});

//bot.on('messageReactionRemove', (messageReaction, user) => {};

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