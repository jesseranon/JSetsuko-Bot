const h = require('../helpers/helpers2.js');
const { MessageEmbed } = require('discord.js');

module.exports.run = (bot, message, args=[]) => {
        var helpEmbed = h.createEmbed(bot);            

        var ti = `\`${bot.prefix}${this.help.name}`;
        var des = ``;

        if (args.length) {
            // help with particular command
            if (bot.commands.has(args[0])) {
                let cmd = bot.commands.get(args[0]);
                console.log(cmd);
                ti += ` ${cmd.help.name}\``,
                des += `**Usage**: ${cmd.help.usage}
                        **Description**: ${cmd.help.description}
                        **Aliases**: ${cmd.help.aliases.join(', ')}`
            } else {
                ti += `\``
                des += `Sorry, I can't help you with that.`
            }
                
        } else {
            // cycle through commands and display name: description of each
            ti += `\` commands menu`;
            for (const i of bot.commands) {
                let cmd = i[1];
                des += `**${cmd.help.name}** => ${cmd.help.description}\n`;
            }
        }

        h.setEmbed(message, helpEmbed, {title: ti, dx: des});
 
};

module.exports.help = {
    name: "help",
    description: `Shows commands menu or helps with a single command.`,
    usage: `\`!help\` or \`!help (commandname)\``,
    aliases: ["h"],
};