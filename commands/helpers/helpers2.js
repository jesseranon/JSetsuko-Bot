const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "helpers",
    test(x) {
        return `This is being emitted from helperMethods inside the ${x} command`;
    },
    createEmbed(bot) {
        const newEmbed = new MessageEmbed()
            // .setAuthor(`@${bot.user.username}`, bot.commands.get('retsuko').help.pics['bot-avatar'])
            // .setThumbnail(bot.commands.get('retsuko').help.pics['bot-avatar'])
            .setColor('ORANGE');
        return newEmbed;
    },
    setEmbed(message, embed, opt={}) {
        //TAKE EMBED, SET OPTIONS ACCORDING TO TYPE;
        if (Object.keys(opt).length) {
            var chanID;
            for (o in opt) {
                switch (o) {
                    case 'img':
                        embed.setImage(opt[o]);
                        break;
                    case 'title':
                        embed.setTitle(opt[o]);
                        break;
                    case 'dx':
                        embed.setDescription(opt[o]);
                        break;
                    case 'cid':
                        chanID = opt[o];
                        break;
                    default:
                        embed.setDescription(`setEmbed failed`);
                        break;
                }
            }
        }
        if (chanID) {
            message.guild.channels.cache.get(chanID).send(embed);
        } else {
            message.reply(embed);    
        }
        return embed.setImage('').setTitle('').setDescription('');
    },
};