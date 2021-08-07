const h = require('../helpers/helpers2.js');

module.exports.run = (bot, message, args) => {

        var kickEmbed = h.createEmbed(bot);
        var fieldTitle = `\`!kick`;
        var fieldDes = ``;
        
        // ensure first argument is a user
        if (message.mentions.users.size == 1 && args[0] == `<@!${message.mentions.users.first().id}>`) {

            // set title, description, user
            const u = message.mentions.users.first();
            const m = message.guild.member(u);
            fieldTitle += ` @${u.tag}\``

            if (!m.kickable) {
                fieldDes += `${message.author} is unable to kick ${m}.`
                h.setEmbed(message, kickEmbed, {title: fieldTitle, dx: fieldDes})
                return;
            }
            
            args.shift();
            var reason = ``;
            // append reasons
            if (args.length) {
                reason += `\nReason:`;
                let i = 0;
                while (i < args.length) {
                    reason += ` ${args[i]}`;
                    i++;
                }
            }
            // perform kick
            if (u) {
                if (m) {
                    m
                    .kick(reason)
                    .then(() => { //returns GuildMember
                        fieldDes += `${u} has been kicked by ${message.author}.`;
                        if (reason.length) fieldDes += reason;
                        h.setEmbed(message, kickEmbed, {title: fieldTitle, dx: `${fieldDes}`});
                        console.log(`${message.guild.name}: ${fieldDes}`);
                    })
                    .catch(err=>{
                        h.setEmbed(message, kickEmbed, {title: fieldTitle, dx: err})
                        console.log(`${message.guild.name}: ${this.help.name} command issue failed:\n${err}`);
                        return;
                    });
                }
            }

        } else {

            fieldTitle += `\``;
            h.setEmbed(message, kickEmbed, {title: fieldTitle, dx: `For help with this command, type \`${bot.prefix}help ${this.help.name}\``});
            
        }

};

module.exports.help = {
    name: "kick",
    description: "Mod tool for kicking a single user. They can re-join later with an invite.",
    usage: "\`!kick @user (reason)\`",
    aliases: ["k"],
};