const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "helpers",
    test() {
        return 'This is being emitted from helperMethods inside ./helpers/helpers.js';
    },
    createEmbed(bot) {
        const newEmbed = new MessageEmbed()
            .setAuthor(`@${bot.user.username}`, bot.commands.get('retsuko').help.pics['bot-avatar'])
            .setThumbnail(bot.commands.get('retsuko').help.pics['bot-avatar'])
            .setColor('ORANGE');
        return newEmbed;
    },
    setEmbed(message, embed, opt={}) {
        //TAKE EMBED, SET OPTIONS ACCORDING TO TYPE
        if (Object.keys(opt).length) {
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
                    default:
                        embed.setDescription(`setEmbed failed`);
                        break;
                }
            }
        }
        message.reply(embed);
        return embed.setImage('').setTitle('').setDescription('');
    },
};