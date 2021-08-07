module.exports = {
    name: "helpers",
    test() {
        return 'This is being emitted from helperMethods inside ./helpers/helpers.js';
    },
    setEmbed(message, embed, opt) {
        //TAKE EMBED, SET OPTIONS ACCORDING TO TYPE
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
        message.reply(embed);
        return embed.setImage('').setTitle('').setDescription('');
    },
};