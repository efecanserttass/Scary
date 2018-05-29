const Discord = require('discord.js');

exports.run = (client, message, args) => {
if (!message.guild) {
const ozelmesajuyari = new Discord.RichEmbed()
  .setColor("#ffffff")
  .setTimestamp()
  .setAuthor(message.author.username, message.author.avatarURL)
  .addField('`tavsiye` komutu sunucularda kullanılabilir!')
return message.author.sendEmbed(ozelmesajuyari); }
let guild = message.guild
let mesaj = args.slice(0).join(' ');
  if (mesaj.length < 1) return message.channel.send(new Discord.RichEmbed().setColor("RANDOM").setDescription(':no_entry_sign: :pencil: Tavsiye için bana birşey yazman gerek!'));
  const tavsiye1 = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(message.author.username + ', <:basarili:419428992752549909>  Tavsiyeniz bildirildi! Tavsiyenizi bildirdiğiniz için teşekkür ederiz!')
  message.channel.send(tavsiye1);
const tavsiye = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setThumbnail(message.author.avatarURL)
  .setDescription(':newspaper2: **' + message.author.tag + '** adlı kullanıcının önerisi;')
  .addField(':envelope: Kullanıcı Bilgileri', '✭ ID: ' + message.author.id + '\n✭ Adı: ' + message.author.username + '\n✭ Tagı: ' + message.author.discriminator + '')
  .addField(':pencil: Tavsiye', mesaj)
return client.channels.get("419428992752549909").send(tavsiye);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'tavsiye',
  description: 'Bota eklenmesini istediğiniz şeyi tavsiye etmenizi sağlar',
  usage: 'tavsiye [tavsiye]'
};