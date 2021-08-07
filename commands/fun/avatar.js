const h = require('../helpers/helpers2.js');

module.exports.run = (bot, message, args) => {

        var aEmbed = h.createEmbed(bot);

        var fieldTitle = `\`!avatar`;
        if (args[0] == 'me') {
            fieldTitle += ` me\``;
            aEmbed.setImage(`${message.author.displayAvatarURL({dynamic: true, size: 128})}`);
        } else if (message.mentions.members.size) {
            const m = message.mentions.users.first();
            fieldTitle += ` @${m.tag}\``;
            aEmbed.setImage(`${m.displayAvatarURL({dynamic: true, size: 128})}`);
        } else {
            fieldTitle += `\``
            aEmbed.setDescription(`${this.help.usage}`);
        }
        h.setEmbed(message, aEmbed, {title:fieldTitle});
};

module.exports.help = {
    name: "avatar",
    description: "Look at someone's avatar.",
    usage: "\`!avatar me\` or \`!avatar @user\`",
    aliases: ["a"],
}