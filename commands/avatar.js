module.exports = {
    name: "avatar",
    description: "Look at someone's avatar.",
    help: "Try using \`!avatar me or @user\`",
    execute(message, embed, args) {
        var fieldTitle = `\`!avatar`;
        if (args[0] == 'me') {
            fieldTitle += ` me\``;
            embed.setTitle(`${fieldTitle}`).setImage(`${message.author.displayAvatarURL()}`);
        } else if (message.mentions.members.size) {
            const userMentioned = message.mentions.users.first();
            fieldTitle += ` ${args[0]}\``;
            embed.setTitle(`${fieldTitle}`).setImage(`${userMentioned.displayAvatarURL()}`);
        } else {
            fieldTitle += ` help\``
            embed.setTitle(`${fieldTitle}`).setDescription(`${this.help}`);
        }

        message.reply(embed);
        embed.setImage('').setDescription('');
    },
};