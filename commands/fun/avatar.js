module.exports.run = (message, embed, args) => {
        var fieldTitle = `\`!avatar`;
        if (args[0] == 'me') {
            fieldTitle += ` me\``;
            embed.setImage(`${message.author.displayAvatarURL({dynamic: true, size: 128})}`);
        } else if (message.mentions.members.size) {
            const userMentioned = message.mentions.users.first();
            fieldTitle += ` \``+ '@' + userMentioned.tag;
            embed.setImage(`${userMentioned.displayAvatarURL({dynamic: true, size: 128})}`);
        } else {
            fieldTitle += ` help\``
            embed.setDescription(`${this.help.usage}`);
        }
        embed.setTitle(`${fieldTitle}`)
        message.reply(embed);
        embed.setImage('').setDescription('');
};

module.exports.help = {
    name: "avatar",
    description: "Look at someone's avatar.",
    usage: "Try using \`!avatar me or @user\`",
    aliases: ["a"],
}