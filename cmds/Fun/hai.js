const discord = require("discord.js");

module.exports.name = "hai";
module.exports.description = "Responds in a funny way";
module.exports.usage = pre => {return `\`${pre}hai\``;};
module.exports.ex = async (message, args, client) => {
	//commandstuff
	message.channel.send("Wo?!? :shark:");

}
