const fs = require('fs');
const h = require('../helpers/helpers2.js');

module.exports.run = (message, embed, args='') => {
        // const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
        // if (this.description == '') {
        //     for (const file of commandFiles) {
        //         const command = require(`./${file}`);
        //         if (command.name != 'help' && command.memberfacing) {
        //             this.description += `\`!${command.name}\` => ${command.description}\n`;
        //         }
        //     }
        // }
        // embed.setTitle(`\`@JSetsuko-Bot\` or \`!help\``).setDescription(`${this.description}`);
        // message.reply(embed);
        // //reset embed
        // embed.setDescription('');
        const des = h.test();
        console.log(des);
        const r = h.setEmbed(message, embed, {dx: des, title: `I am leet hax0r`});
        console.log(r);
        message.reply(r);
};

module.exports.help = {
    name: "help",
    description: `Shows commands`,
    aliases: ["h"],
};