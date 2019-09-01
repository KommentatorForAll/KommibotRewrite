const discord = require("discord.js");

module.exports.name = "cute";
module.exports.description = "Tell someone how cute they are :)";
module.exports.usage = pre => {return `\`${pre}cute\``;};
module.exports.ex = async (message, args, client) => {
	try {
		let member = message.mentions.users.first()||client.users.get(args.join(" "));
		message.channel.send(`<@${message.author.id}> finds <@${member.id}> cute!`);
	}
	catch(err) {
		if (args[0]) {
			message.channel.send(`<@${message.author.id}> finds ${args.join(" ")} cute!`);
		}
		else {
			message.channel.send(`<@${message.author.id}> finds ${message.guild.owner.displayName} cute!`);
		}
	}
}
