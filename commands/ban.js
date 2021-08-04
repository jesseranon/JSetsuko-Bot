module.exports = {
    name: "ban",
    description: "Mod tool for banning members",
    help: "\`!ban @user (days) (reason)\` if no days, defaults to 3 days",
    memberfacing: true,
    execute(message, embed, args) {

        console.log(`*****MOD TOOLS: ${this.name} evoked in ${message.guild.name} by ${message.author.tag}.*****`);

        var fieldTitle = `\`!ban`;
        var fieldDes = ``
        var bandays = 0;
        // ensure first argument is a user
        if (message.mentions.users.size == 1 && args[0] == `<@!${message.mentions.users.first().id}>`) {

            // set title, description, user
            const u = message.mentions.users.first();
            const m = message.guild.member(u);
            fieldTitle += ` @${u.tag}\``

            // if member is not bannable, reply and bail
            if (!m.bannable) {
                fieldDes += `${message.author} you hold no dominion over ${m}.`
                embed.setTitle(fieldTitle).setDescription(fieldDes);
                message.reply(embed);
                embed.setTitle('').setDescription('');
                return;
            }

            fieldDes += `${m} has been banned by ${message.author}`;
            args.shift(); // remove command from args
            var bandays = args.shift(); // first remaining arg
            if (isNaN(bandays)) {
                args.unshift(bandays);
                bandays = 3;
            }
            fieldDes += ` for ${bandays} days.`;
            var breason = ``;
            // append reasons
            if (args) {
                fieldDes += `\nReason: `;
                let i = 0;
                while (i < args.length) {
                    breason += ` ${args[i]}`;
                    i++;
                }
            }
            // perform ban
            if (u) {
                if (m) {
                    m
                    .ban({days: bandays, reason: breason})
                    .then(()=>{
                        fieldDes += `${breason}\nLet this be a warning to the rest of you.`
                        embed.setTitle(fieldTitle).setDescription(fieldDes);
                        message.reply(embed);
                        embed.setTitle('').setDescription('');
                    })
                    .catch(err=>{
                        fieldDes = `Unable to ${this.name} ${u}`;
                        embed.setTitle(fieldTitle).setDescription(fieldDes);
                        message.reply(embed);
                        embed.setTitle('').setDescription('');
                        return;
                    });
                }
            }

        } else {

            fieldTitle += ` help\``;
            embed.setTitle(fieldTitle).setDescription(`${this.help}`);
            message.reply(embed);
            embed.setTitle('').setDescription('');

        }

    },
};