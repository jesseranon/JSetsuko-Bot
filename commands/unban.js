module.exports = {
    name: "unban",
    description: "Mod tool for banning members",
    help: "\`!unban (userid)\` but only if you actually mean it",
    memberfacing: true,
    execute(message, embed, args) {

        console.log(`*****MOD TOOLS: ${this.name} evoked in ${message.guild.name} by ${message.author.tag}.*****`); // for logging
        
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
                        embed.setTitle(fieldTitle).setDescription(`This server has no bans! Give it time, young padawan.`)
                        message.reply(embed);
                        embed.setTitle('').setDescription('');
                        return;
                    }
                    let bUser = bans.find(ban => ban.user.id == u);
                    if (!bUser) {
                        embed.setDescription(`${u} is not banned in ${message.guild.name}'s Bans.`)
                        message.reply(embed);
                        embed.setTitle('').setDescription('');
                        return;                      
                    }
                    // append reasons
                    var reason = '';
                    const bt = `${bUser.user.username}#${bUser.user.discriminator}`;
                    fieldDes += `${message.author} unbanned ${bt}.`;

                    if (args.length > 0) {
                        fieldDes += `\nReason: `;
                        let i = 0;
                        while (i < args.length) {
                            reason += `${args[i]} `;
                            i++;
                        }
                    }
                    thisGuild.members.unban(u, reason)
                        .then(user => {
                            embed.setTitle(fieldTitle).setDescription(`${fieldDes}${reason}\nRedemption is possible, but never guaranteed.`);
                            message.reply(embed);
                            embed.setTitle('').setDescription('');
                        })
                        .catch(err => {
                            embed.setTitle(fieldTitle).setDescription(`${err}`);
                            message.reply(embed);
                            embed.setTitle('').setDescription('');
                            return;
                        });
                })
                .catch(err=>{
                    embed.setTitle(fieldTitle).setDescription(`${err}`);
                    message.reply(embed);
                    embed.setTitle('').setDescription('');
                    return;
                });

        } else {
            fieldTitle += ` help\``;
            embed.setTitle(fieldTitle).setDescription(this.help);
            message.reply(embed);
            embed.setTitle('').setDescription('');
            
        }

    },
};