const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('../ayarlar.json');

exports.run = (client, message) => {
  const embed = new Discord.RichEmbed()
  
  .setTitle("Ana Komutlar")
  .setAuthor("Fire BOT", "")
  /*
   * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
   */
  .setColor(0x00AE86)
  .setDescription('fb!davet • Botun davet linkini atar.\ntr!botbilgi• Bakımda!.\nfb!partner • Botun partner olduğu sunucuları atar.\nfb!ping • Botun pingini gösterir.\nfb!sunucubilgi • Bu komutu hangi sunucuda kullanırsanız oranın bilgisini verir.\nfb!tavsiye • Botun sahibine verdiğiniz tavsiyeyi gönderir.\n')
  .setFooter("©️ 2018 | Fire BOT", "")

  .setThumbnail("https:")
  /*
   * Takes a Date object, defaults to current date.
   */
  .setTimestamp()
  
  .addField("Moderatör Komutları",
     "fb!ban • Belirttiğiniz kişiyi sunucudan banlar.\nfb!kick • Belirttiğiniz kişiyi sunucudan atar.\nfb!sustur • Belirttiğin kişiyi susturur.\nfb!temizle • Sohbeti belirttiğin sayı kadar siler.\nfb!unban • Belirttiğin kişinin sunucudaki yasağını kaldırır.\n")
  /*
   * Inline fields may not display as inline if the thumbnail and/or image is too big.
   */
  .addField("Eğlence Komutları", "fb!alkış • Etiketlediğiniz kişiyi alkışlar.\nfb!çılgınlık • Çılgınlık ile ilgili bir gif atar.\nfb!yaz • Bota istediğiniz şeyi yazdırır.\n", true)
  .addBlankField(true)
  .addField("Kullanıcı Komutları", "fb!afk • Komut ve afk sebebini yazarsanız afk moda geçersiniz.\nfb!kullanıcıbilgim • Bu komutu kullanan her kimse hakkında bilgi verir.\n", true);


  message.channel.send({embed});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['bot bilgi', 'botbilgi', 'bb', 'botb', 'bbot', 'hakkında', 'bot hakkında', 'bothakkında'],
  permLevel: 0
};

exports.help = {
  name: 'yardım',
  description: 'Bot ile ilgili komut listesini verir.',
  usage: 'yardım'
};
