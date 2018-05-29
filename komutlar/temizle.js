const Discord = require('discord.js');
exports.run = function(client, message, args) {

  if (!message.guild) {
    return message.author.send(':no_entry: Bu komutu kullanabilmek için botun "`Mesajları Yönet`" yetkisine sahip olması gerekli!');
  }
  let mesajsayisi = parseInt(args.join(' '));
  if (mesajsayisi.length < 1) return message.channel.send(':no_entry: Lütfen silmek istediğiniz mesaj sayısını belirtin; `d!temizle 50` veya belirli bir kullanıcının mesajlarını silmek için o kullanıcıyı etiketleyin; `d!temizle @DesertHawk`')
  if (mesajsayisi > 100) return message.channel.send(':no_entry: Lütfen `2` ile `100` arasında bir sayı girin. Eğer belirli bir kişinin mesajlarını silmek istiyorsanız o kişiyi etiketleyebilirsiniz; `d!temizle @DesertHawk `');
  message.channel.bulkDelete(mesajsayisi + 1);
  message.channel.send(mesajsayisi +' adet mesaj sildim!')
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['sil'],
  permLevel: 2
};

exports.help = {
  name: 'temizle',
  description: 'Belirlenen miktar mesajı siler.',
  usage: 'temizle <temizlenecek mesaj sayısı>'
};
