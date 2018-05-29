const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('../ayarlar.json');

exports.run = (client, message) => {
  const embed = new Discord.RichEmbed()
  .setTitle("Tıkla ve Fcary'i Davet Et !")
  .setAuthor("Fcary", "")
  /*
   * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
   */
  .setColor(0xff8080)
  .setDescription(" Fcary'i Çok Seviceksiniz Botumuz Yeni Yapılmıştır Eklerseniz Seviniriz.")
  .setFooter("©️ 2018 Fcary | Yusuf | Murat ® ", "")
  .setThumbnail("")
  /*
   * Takes a Date object, defaults to current date.
   */
  .setTimestamp()
  .setURL('https://discordapp.com/oauth2/authorize?client_id=450551931950333962&scope=bot&permissions=805665854')
  
  message.channel.send({embed});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['bot bilgi', 'botbilgi', 'bb', 'botb', 'bbot', 'hakkında', 'bot hakkında', 'bothakkında'],
  permLevel: 0
};

exports.help = {
  name: 'davet',
  description: 'Bot ile ilgili bilgi verir.',
  usage: 'davet'
};
