const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('../ayarlar.json');

exports.run = (client, message) => {
  if (message.channel.type !== 'dm') {
    const ozelmesajkontrol = new Discord.RichEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .setDescription('Özel mesajlarını kontrol et. :postbox:');
    message.channel.sendEmbed(ozelmesajkontrol) }
	const pingozel = new Discord.RichEmbed()
    .setColor(0xFFFFFF)
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .setDescription('Server: **EU West**\nKullanıcı adı:Şifre\nSc2Rusher:Historia29\nmyname208:amplander208\nncbrat321:Callaghan94\nomrlkeab35:qwwq1991\nomer2oo1:10f5418\nonebadguess:qwer99qwer\npLeaseOG:Hurensohn001\npacasi:merlin99\npanelas19:panelas4\npentafied:pikachu123');
    return message.author.sendEmbed(pingozel)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['lol-euw'],
  permLevel: 4
};

exports.help = {
  name: 'lol-hesap',
  description: 'Bot ile ilgili bilgi verir.',
  usage: 'lol-hesap'
};
