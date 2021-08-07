const h = require('../helpers/helpers2.js');

module.exports.run = (bot, message, args) => {

        var banEmbed = h.createEmbed(bot);

        var fieldTitle = `\`!ban`;
        var fieldDes = ``
        
        // ensure first argument is a user or a member ID
        if ((message.mentions.users.size == 1 && args[0] == `<@!${message.mentions.users.first().id}>`) || /[0-9]{18}/.test(args[0])) {
            let u;
            let m;
            // set title, description, user
            if (message.mentions.users) u = message.mentions.users.first();
            if (/[0-9]{18}/.test(args[0])) {
                message.guild.members.fetch(args[0])
                    .then(mem => u = mem)
                    .catch(err => {
                        h.setEmbed(message, banEmbed, {title: fieldTitle + `\``, dx: err});
                        return;
                    });
            }
            
            if (u) m = message.guild.member(u);
            fieldTitle += ` @${u.tag}\``

            // if member is not bannable, reply and bail
            if (!m.bannable) {
                fieldDes += `${message.author} is unable to ban ${m}.`
                h.setEmbed(message, banEmbed, {title: fieldTitle, dx: fieldDes})
                return;
            }

            args.shift(); // remove member from args
            var bandays = 3;
            if (args.length >= 1) {
                bandays = args.shift(); // first remaining arg
                if (isNaN(bandays)) {
                    args.unshift(bandays);
                    bandays = 3;
                }
            }

            // append reasons
            var breason = ``;
            if (args.length >= 1) {
                breason = `\nReason:`;
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
                        fieldDes += `${m} has been banned by ${message.author} for ${bandays} days.`;
                        if (breason.length) fieldDes += breason;
                        fieldDes += `\nLet this be a warning to the rest of you.`
                        h.setEmbed(message, banEmbed, {title: fieldTitle, dx: fieldDes});
                        console.log(`${message.guild.name}: ${fieldDes}`);
                    })
                    .catch((err)=>{
                        fieldDes = `Unable to ${this.help.name} ${u}`;
                        h.setEmbed(message, banEmbed, {title: fieldTitle, dx: `${fieldDes}\n${err}`});
                        console.log(`${message.guild.name}: ${this.help.name} command issue failed:\n${err}`);
                        return;
                    });
                }
            }

        } else {

            fieldTitle += `\``;
            fieldDes += `For help with this command, type \`${bot.prefix}help ${this.help.name}\``;
            h.setEmbed(message, banEmbed, {title: fieldTitle, dx: fieldDes});

        }

};

module.exports.help = {
    name: "ban",
    description: "Mod tool for banning members.  They can only re-join if they are unbanned.",
    usage: "\`ban @user (days) (reason)\` if no days, defaults to 3 days",
    aliases: ["b"],
};