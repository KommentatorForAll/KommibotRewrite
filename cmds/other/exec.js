const discord = require("discord.js");

module.exports.name = "exec";
module.exports.description = "executes bash";
module.exports.usage = pre => {return `\`${pre}exec ls\``;};
module.exports.args = ["<code>"];
module.exports.ex = async (message, args, client) => {
  const cmds = client.cmds;
  const pre = client.gi[message.guild.id]["pres"][0];
  if (args.length > 0) {
    let code = args.join(" ");
    let execed = await require("child_process").spawn(code)
    var embed = new discord.RichEmbed();

      embed.setTitle(`${code}`);
      embed.setDescription(require("util").inspect(execed));
      message.channel.send(embed);
      return;
    }

  }
  
//const console = {
//    buffer: '',
//    log: input => console.buffer += input + '\n',
//    real_log: console.log
// };
//zum einlesen der outputs

//ja mit child process.
//dat is ja hilfreich ... was meinst du ...  soll ich childprocess.spawn nehmen? - dann gehen live inputs, etc. das ist exec nict eval xD
//ähh wat machs du da? xD
