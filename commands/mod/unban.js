const h = require('../helpers/helpers2.js');

module.exports.run = (bot, message, args) => {
        
        var ubEmbed = h.createEmbed(bot);
        var fieldTitle = `\`!unban`;
        var fieldDes = ``
        // ensure first argument a user tag or id
        if (/[0-9]{18}/.test(args[0])) {

            const u = args.shift();
            fieldTitle += ` ${u}\``;
            //check to see if user id is in guild bans
            const thisGuild = message.guild;
            thisGuild.fetchBans()
                .then(bans => {
                    if (bans.size == 0) {
                        h.setEmbed(message, ubEmbed, {title: fieldTitle, dx: `This server has no bans`});
                        return;
                    }
                    let bUser = bans.find(ban => ban.user.id == u);
                    if (!bUser) {
                        h.setEmbed(message, ubEmbed, {title: fieldTitle, dx: `${u} is not banned in ${message.guild.name}.`})
                        return;                      
                    }
                    // append reasons
                    var reason = '';
                    const bt = `${bUser.user.username}#${bUser.user.discriminator}`;

                    if (args.length > 0) {
                        reason += `\nReason: `;
                        let i = 0;
                        while (i < args.length) {
                            reason += `${args[i]} `;
                            i++;
                        }
                    }
                    thisGuild.members.unban(u, reason)
                        .then(user => {
                            fieldDes += `${message.author} unbanned ${bt}.`;
                            if (reason.length) fieldDes += reason;
                            fieldDes += `\nRedemption is possible, but never guaranteed.`;
                            h.setEmbed(message, ubEmbed, {title: fieldTitle, dx: fieldDes});
                            console.log(`${message.guild.name}: ${fieldDes}`);
                        })
                        .catch(err => {
                            h.setEmbed(message, ubEmbed, {title: fieldTitle, dx: err});
                            console.log(`${message.guild.name}: ${this.help.name} command issue failed:\n${err}`);
                            return;
                        });
                })
                .catch(err=>{
                    h.setEmbed(message, ubEmbed, {title: fieldTitle, dx: err});
                    console.log(`${message.guild.name}: ${this.help.name} command issue failed:\n${err}`);
                    return;
                });

        } else {
            fieldTitle += `\``;
            h.setEmbed(message, ubEmbed, {title: fieldTitle, dx: `For help with this command, type \`${bot.prefix}help ${this.help.name}\``});            
        }

};

module.exports.help = {
    name: "unban",
    description: "Mod tool for unbanning members",
    usage: "\`!unban (userid)\` but only if you actually mean it",
    aliases: ["ub"],
};