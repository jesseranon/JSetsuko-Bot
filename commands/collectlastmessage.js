const fs = require('fs');

module.exports = {
    name: "collectlastmessage",
    description: ``,
    memberfacing: false,
    execute(message, embed, args='') {
        // call by having bot send a message to private channel, or internally?
        // if internally, index.js will need to call this directly. perhaps cycle through the guilds in its cache

        // cache object from .json

        // cycle through message's guild members cache
        message.guild.members.cache.forEach(m => { //for each member
            if (!m.user.bot) {
                if (m.user.lastMessageID) { //find the ID of their last message
                    const lm = m.user.lastMessageID;
                    message.channel.messages.fetch(lm) // get the message object of lastMessage
                        .then(lmm => {
                            if (!lmm.author.bot) { // parse info if not a bot
                                // if lmm.author.id exists in jsoncache object, if lmm.createdTimestamp>stored timestamp, update lmm.author.id.lmm.createdTimestamp
                                // else create new user
                                console.log(`Non-bot user ${lmm.author.id} last message ID ${lmm.id} createdTimestamp ${lmm.createdTimestamp}\nin Guild ${lmm.guild.name} ID ${lmm.guild.id}, channel ${lmm.channel.name} ID ${lmm.channel.id}`);
                                console.log(lmm);
                            }
                            
                        })
                        .catch(err=>console.log(err));
                }
            }       
        });

        // check against docObject
        // overwrite any message info where author.id (type: string) exists in docObject and lmm.createdTimestamp (type: integer) > docObject's author.id's existing createdTimestamp
        // re-write docObject to .json file for persistence

        //User.lastMessage.createdAt
        // // write file to .json file
        // fs.writeFile('.users.json', JSON.stringify({test: true}), (err) => {
        //     if (err) console.log(err);
        //     console.log(`check the folder`);
        // })
        console.log(`***** BOT PROCESS ${this.name} EVOKED *****`);
    },
};