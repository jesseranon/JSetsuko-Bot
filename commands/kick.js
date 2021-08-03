module.exports = {
    name: "kick",
    description: "Mod tool for kicking a single user",
    help: "\`!kick @user (reason)\` but they can re-join later with an invite",
    execute(message, embed, args) {
        var fieldTitle = `\`!kick`;
        var fieldDes = ``;
        // ensure first argument is a user
        if (message.mentions.users.size == 1 && args[0] == `<@!${message.mentions.users.first().id}>`) {
            // set title, description, user
            const u = message.mentions.users.first();
            fieldTitle += ` @${u.tag}\``
            fieldDes += `${u} has been kicked by ${message.author}.`;
            args.shift();
            var reason = ``;
            // append reasons
            if (args.length) {
                fieldDes += `\nReason:`;
                let i = 0;
                while (i < args.length) {
                    reason += ` ${args[i]}`;
                    i++;
                }
            }
            // perform kick
            if (u) {
                const m = message.guild.member(u);
                if (m) {
                    m
                    .kick(reason)
                    .then(() => { //returns GuildMember
                        embed.setTitle(fieldTitle).setDescription(`${fieldDes} ${reason}`);
                        message.reply(embed);
                        embed.setTitle('').setDescription('');
                    })
                    .catch(err=>{
                        embed.setTitle(fieldTitle).setDescription(err);
                        message.reply(embed);
                        embed.setTitle('').setDescription('');
                        return;
                    });
                }
            }

        } else {

            fieldTitle += ` help\``;
            embed.setTitle(fieldTitle).setDescription(this.help);
            message.reply(embed);
            embed.setTitle('').setDescription('');
        }

        console.log(`*****MOD TOOLS: ${this.name} evoked in ${message.guild.name} by ${message.author.tag}.*****`);

    },
};