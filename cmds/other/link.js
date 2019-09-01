const discord = require("discord.js");

module.exports.name = "link";
module.exports.description = "Gives a link to you to install me";
module.exports.usage = pre => {return `\`${pre}link\` or \`${pre}link 8\``;};
module.exports.args = ["[permissions]"];
module.exports.ex = async (message, args, client) => {
  if (args[0]) {
    if (!isNaN(args[0])) {
      args[0] = parseInt(args[0]);
    }
    await message.author.send(`Here is a link to install me: ${await client.generateInvite(args[0])} `)
    return;
  }
  await message.author.send(`Here is a link to install me: ${await client.generateInvite(268807238)} `)
}