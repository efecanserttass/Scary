const Discord = require('discord.js');
exports.run = function(client, message, args) {
  const embed = new Discord.RichEmbed()
  .setTitle("Avatarın!  \n")
  /*
   * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
   */
  .setColor("RANDOM")
  .addField('Şu Kullanıcının Avatarı =>', message.author.username + '#' + message.author.discriminator)
  .setImage(message.author.avatarURL)
  .setFooter("♥ 2018 ♥ DesertHawk ♥ BOT ♥ 1.0.0 V ♥", " ")

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
  name: 'avatar',
  description: 'Botun pingini gösterir.',
  usage: 'avatar'
};
