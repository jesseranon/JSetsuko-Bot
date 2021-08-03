module.exports = {
    name: "channel",
    description: "Mod tool for managing channels",
    help: "\`!channel create|delete type name\`",
    execute(message, embed, args) {
        var fieldTitle = `\`!channel`;
        // if (args[0] != 'create') {
        //     // default to create text channel with args[0] as its name
        // } else if (args[0] == 'delete') {
        //     // delete channel named in args[1]
        // }
        console.log(`Channels evoked.`);
    },
};