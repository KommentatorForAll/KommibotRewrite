const fs = require("fs");
const discord = require("discord.js");
module.exports.name = "addprefix";
module.exports.perm = "MANAGE_GUILD";
module.exports.description = "Adds the given Prefix to my prefixes.";
module.exports.args = ["<prefix>"];
module.exports.usage = pre => {return `\`${pre}addprefix c!\``;};
module.exports.reload = true


module.exports.ex = async (message, args, client) => {
  try {
    var pres = fs.readFileSync(`SETTINGS/${message.guild.id}/prefixes.txt`, "utf8").split("\n");
  }catch(err){}
  pres.pop();
  var prefix = args.join(" ");
  if (prefix.endsWith(">")) {prefix += " "}
  if (pres.indexOf(prefix) != -1) {
    message.channel.send("I already have this Prefix.");
    message.channel.send(`Use \`${prefix}prefix\` or another valid prefix in combination with \`prefix\` to see all of my current Prefixes.`);
    return;
  }
  if (prefix == "") {
    message.channel.send("I don't want to have an empty Prefix");
    return;
  }
  pres.push(prefix);
  try{
    fs.writeFileSync(`SETTINGS/${message.guild.id}/prefixes.txt`, pres.join("\n") + "\n");
  }catch(e){}
  message.channel.send("Succesfully added the Prefix.");
  message.channel.send(`Use \`${prefix}prefix\` or another valid prefix in combination with \`prefix\` to see all of my current Prefixes.`);
}
