const discord = require("discord.js");

module.exports.name = "ipad";
module.exports.description = "Sends you some useful information on the Shieka Stone";
module.exports.usage = pre => {return `\`${pre}ipad\``;};
module.exports.ex = async (message, args, client) => {
	message.channel.send("Der Shiekah Stein, liebevoll auch ~~Chickennugget~~ ähhmmm IPad genannt, hat viele tolle Apps wie zum Beispiel Teleportationen, Fernglas, HyruleMaps und viele weitere.");

}
