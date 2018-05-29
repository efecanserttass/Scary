const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

exports.run = (client, message, params) => {
	if (!message.guild) {
    const ozelmesajuyari = new Discord.RichEmbed()
    .setColor(0xFF0000)
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .addField('Alk谋艧')
    return message.author.sendEmbed(ozelmesajuyari); }
    if (message.channel.type !== '..') {
      const sunucubilgi = new Discord.RichEmbed()
    .setAuthor('Alk谋艧 馃憦馃憛')
    .setColor(3447003)
    .setTimestamp()
    .setDescription('')
		.setImage(`https://thumbs.gfycat.com/WarpedAdmiredCormorant-size_restricted.gif`)
    return message.channel.sendEmbed(sunucubilgi);
    }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'alk谋艧',
  description: 'Alk谋艧 gifi g枚nderir.',
  usage: 'alk谋艧'
};
