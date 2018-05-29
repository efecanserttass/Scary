const Discord = require('discord.js');
exports.run = function(client, message, args) {
  const embed = new Discord.RichEmbed()
  .setTitle("Sunucu Icon!  \n")
  /*
   * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
   */
  .setColor("RANDOM")
  .setImage(message.guild.iconURL)
  .setFooter("♥ 2018 ♥ DesertHawk ♥ BOT ♥ 0.0.1 V ♥", " ")
  /*
   * Takes a Date object, defaults to current date.
   */

  message.channel.send({embed});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'sunucu-icon',
  description: 'Botun pingini gösterir.',
  usage: 'sunucu-icon'
};