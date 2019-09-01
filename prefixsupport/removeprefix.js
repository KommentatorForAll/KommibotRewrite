const fs = require("fs");
const discord = require("discord.js");
module.exports.name = "removeprefix";
module.exports.alias = ["deleteprefix"];
module.exports.perm = "MANAGE_GUILD";
module.exports.description = "Removes the given Prefix from my prefixes.";
module.exports.args = ["<prefix>"];
module.exports.usage = pre => {return `\`${pre}removeprefix c!\``;};
module.exports.reload = true;


module.exports.ex = async (message, args, client) => {
  var pres = client.gi[message.guild.id]["pres"];
  if (pres.length < 2) {
    message.channel.send("I cannot have no Prefix!");
    return;
  }
  const prefix = args.join(" ");
  if (pres.indexOf(prefix) == -1) {
    message.channel.send("I never had this Prefix, so why are you trying to remove it?");
    message.channel.send(`Use \`${pres[0]}prefix\` or another valid prefix in combination with \`prefix\` to see all of my current Prefixes.`);
    return;
  }

  var newpres = [];
  for (pre of pres) {
    if(pre != prefix) {
      console.log(pre, "didn't delete")
      newpres.push(pre);
    }
  }
  fs.writeFileSync(`SETTINGS/${message.guild.id}/prefixes.txt`, newpres.join("\n") + "\n");
  message.channel.send("Succesfully removed the Prefix.");
  message.channel.send(`Use \`${newpres[0]}prefix\` or another valid prefix in combination with \`prefix\` to see all of my current Prefixes.`);
}
