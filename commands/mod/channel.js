const h = require('../helpers/helpers2.js');

module.exports.run = (bot, message, args) => {

        var chEmbed = h.createEmbed(bot);

        var fieldTitle = `\`!channel`;
        if (args.length == 3) {

            const act = args.shift();
            if (act != 'create' && act != 'delete') {
                fieldTitle += ` create|delete\``;
                h.setEmbed(message, chEmbed, {title: fieldTitle, dx: `next argument must be called with either create or delete`})
                return;
            }

            const t = args.shift();
            const ts = ['text', 'voice', 'category']
            if (!ts.includes(t)) {
                fieldTitle += ` ${act} (type)\``;
                h.setEmbed(message, chEmbed, {title: fieldTitle, dx: `next argument must be a valid type: text | voice | category`})
                return;
            }

            const cname = args.shift();
            // check for {type} channel with {cname} in guild
            const gc = message.guild.channels.cache.find(channel => channel.name.toLowerCase() == cname && channel.type == t);
            fieldTitle = `\`${message.content}\``;
            chEmbed.setTitle(fieldTitle);
            switch (act) {
                case 'create':
                    if (gc) {
                        h.setEmbed(message, chEmbed, {dx: `${t} channel ${cname} already exists. Leaving it alone.`});
                        return;
                    }
                    //create
                    message.guild.channels.create(cname, {type: t})
                        .then(a => {
                            h.setEmbed(message, chEmbed, {dx: `${t} channel ${a.name} created by ${message.author}`});
                            console.log(`${message.guild.name}: ${t} channel ${a.name} created by ${message.author}`);
                        })
                        .catch(err=>console.log(`${message.guild.name} ${this.help.name} ${act} command issue failed: ${err}`));
                    break;
                case 'delete':
                    if (!gc) {
                        h.setEmbed(message, chEmbed, {dx: `${t} channel ${cname} doesn't exist.`});
                        return;
                    }
                    gc.delete()
                        .then(a => {
                            h.setEmbed(message, chEmbed, {dx: `${t} channel ${a.name} deleted by ${message.author}`});
                            console.log(`${message.guild.name}: ${t} channel ${a.name} deleted by ${message.author}`);
                        })
                        .catch(err=>console.log(`${message.guild.name} ${this.help.name} ${act} command issue failed: ${err}`));
                    //delete
                    break;
                default:
                    console.log(`channel failed to catch an act: ${act}`);
                    return;
            }
            
            
        } else {

            fieldTitle += `\``;
            h.setEmbed(message, chEmbed, {title: fieldTitle, dx: `For help with this command, type \`${bot.prefix}help ${this.help.name}\``})
            
        }

};

module.exports.help = {
    name: "channel",
    description: "Mod tool for managing channels",
    usage: "\`!channel (create|delete) (type) (name)\` must have an argument for each",
    aliases: ["c"],
};