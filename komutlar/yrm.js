const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('../ayarlar.json');

exports.run = (client, message) => {
  const embed = new Discord.RichEmbed()
  
  .setTitle("Botumuzun Komutları")
  .setAuthor("Scary | Bütün Haklar Gizlidir ", "")
  .setColor("RANDOM")
  .setDescription('**s!davet • Botun davet linkini atar.\nYeni Kodlar Gelicek\ns!bug • Bottaki bugu bildirmenizi sağlar.\ns!ping • Botun pingini gösterir.\ns!sunucubilgi • Bu komutu hangi sunucuda kullanıysanız oranın bilgisini verir.\ns!tavsiye • Botun sahibine verdiğiniz tavsiyeyi gönderir.**\n')
  .setFooter("")
  .setThumbnail("")
  .setTimestamp()
      .addField("Moderasyon Komutları", "**ban • Belirttiğiniz kişiyi sunucudan banlar.\nkick • Belirttiğiniz kişiyi sunucudan atar.\nsustur • Belirttiğin kişiyi susturur.\ntemizle • Sohbeti belirttiğin sayı kadar siler.\nunban • Belirttiğin kişinin sunucudaki yasağını kaldırır.\noylama • Oylama Açarsınız.\nhastebin • Hastebine Kod Ekler.**\n")
  	.addField("Eğlence Komutları", "**ngif•  Nice Gif.\nçayiç • Çay İçersiniz.\nbayrak • Şanlı Bayrağımız.\nparti • Parti Başlasın\npcaç • Bilgisayarı Açar.\nbanned • Dene Ve Gör.\n8ball • Bende Bilmiyorum.\nağla • Bot Ağlar.\natom • Atom Bombası.\ndeğişikahtapot • Çok Değişik.\nespri • Espri Atar.\nsigara • Sigara İçersiniz.\ntrollgifler • Troll.**\n", true)
  	.addField(" Kullanıcı Komutları", "**• Yeni Kodlar Gelicek\nkurucu • Sunucunun kurucusunu gösterir.\nkullanıcıbilgim • Bu komutu kullanan her kimse hakkında bilgi verir.**\n", true)
    .addField("Müzik Komutları Beta [KAPALI]", "**çal • Müzik Başlar\ndur •Müzik Durur\ngeç •Müzik Geçer\nkuyruk • Müzik Kuyruğunu Gösterir**\n", true)
    .addField("Yapımcı Komutları", "**Burası Güvenlik Nedeni İle Gizlidir**\n", true)
    .addField("**__Yapımcı Yusuf#2022 Destekleyici Oxygen#7035__**")
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
