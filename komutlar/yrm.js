const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('../ayarlar.json');

exports.run = (client, message) => {
  const embed = new Discord.RichEmbed()
  
  .setTitle("Botumuzun Komutları")
  .setAuthor("Cuguli| Bütün Haklar Gizlidir ", "")
  .setColor("RANDOM")
  .setDescription('**davet • Botun davet linkini atar.\nYeni Kodlar Gelicek\nbug • Bottaki bugu bildirmenizi sağlar.\nping • Botun pingini gösterir.\nsunucubilgi • Bu komutu hangi sunucuda kullanıysanız oranın bilgisini verir.\ntavsiye • Botun sahibine verdiğiniz tavsiyeyi gönderir.**\n')
  .setFooter("")
  .setThumbnail("")
  .setTimestamp()
      .addField("[Moderasyon Komutları]", "**ban • Belirttiğiniz kişiyi sunucudan banlar.\nkick • Belirttiğiniz kişiyi sunucudan atar.\nsustur • Belirttiğin kişiyi susturur.\ntemizle • Sohbeti belirttiğin sayı kadar siler.\nunban • Belirttiğin kişinin sunucudaki yasağını kaldırır.\noylama • Oylama Açarsınız.\nhastebin • Hastebine Kod Ekler.**\n")
  	.addField("[Eğlence Komutları]", "**ngif•  Nice Gif.\nçayiç • Çay İçersiniz.\nbayrak • Şanlı Bayrağımız.\nparti • Parti Başlasın\npcaç • Bilgisayarı Açar.\nbanned • Dene Ve Gör.\n8ball • Bende Bilmiyorum.\nağla • Bot Ağlar.\natom • Atom Bombası.\ndeğişikahtapot • Çok Değişik.\nespri • Espri Atar.\nsigara • Sigara İçersiniz.\ntrollgifler • Troll.\nzekam • Zeka Bilgini Gösterir\nşanslı-sayım • Şanslı Sayınız\n", true)
  	.addField("[Kullanıcı Komutları]", "**bbilgi • Botun Bilgileri.\nsbilgi • Sunucu Bilgisi\nkurucu • Sunucunun kurucusunu gösterir.\nkullanıcıbilgim • Bu komutu kullanan her kimse hakkında bilgi verir.**\n", true)
    .addField("[Müzik Komutları Beta KAPALI]", "**çal • Müzik Başlar\ndur •Müzik Durur\ngeç •Müzik Geçer\nkuyruk • Müzik Kuyruğunu Gösterir**\n", true)
    .addField("[Yapımcı Komutları]", "**Burası Güvenlik Nedeni İle Gizlidir**\n", true)
    .addField("[**__Yapımcı Yusuf#2022__**]")
    .addField("[Matematik Komutları]", "topla • Toplama İşlemi Yapar.\nçıkar • Çıkarma İşlemi Yapar.\nçarp • Çarpma İşlemi Yapar.\nböl • Bölme İşlemi Yapar\n", true)
    .addField("[Eklencek]", "Eklencek", true)
  	message.channel.send({embed});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['y', 'help', 'ya', 'yrdm', 'komutlar', 'hakkında', 'bot hakkında', 'bothakkında'],
  permLevel: 0
};

exports.help = {
  name: 'yardım',
  description: 'Bot ile ilgili komut listesini verir.',
  usage: 'yardım'
};
