const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');

var prefix = ayarlar.prefix;

client.on('ready', () => {
  console.log(`BOT: ${client.user.username} adı ile giriş yaptı!`);
});

client.on('message', msg => {
  console.log(`LOG: S: ${msg.guild.name} M: ${msg.content} Y: ${msg.author.tag}`);
  if (msg.author.id === ayarlar.id) return;
  if (msg.author.bot) return;

  if (!msg.content.startsWith(prefix)) {
	  return;
  }
  if (msg.content.toLowerCase() === prefix + 'ping') {
    msg.reply('Pong! **' + client.ping + '** ms');
  }
  if (msg.content.toLowerCase() === prefix + 'sa') {
    msg.reply('Aleyküm selam!');
  }
  if (msg.content.toLowerCase() === prefix + 'yaz') {
    msg.delete();
    msg.channel.sendMessage(msg.content);
  }
  if (msg.content.toLowerCase() === prefix + 'temizle') {
    msg.channel.bulkDelete(100);
    msg.channel.sendMessage("100 adet mesaj silindi!");
  }
  if (msg.content.toLowerCase() === prefix + 'reboot') {
    if (msg.author.id !== ayarlar.sahip) {
      msg.reply('Benim yapımcım değilsin!');
    } else {
      msg.channel.sendMessage(`Bot yeniden başlatılıyor...`).then(msg => {
      console.log(`BOT: Bot yeniden başlatılıyor...`);
      process.exit(0);
    })
   }
  }
});
client.on('guildMemberAdd', member => { let guild = member.guild; let joinRole = guild.roles.find('name', 'Üye'); // Burada girişte verilcek rolu seçelim. member.addRole(joinRole); // seçtiğimiz rolu verelim. const channel = member.guild.channels.find('name', 's-log'); // burda ise kanalı belirleyelim hangi kanala atsın ben mod-log dedim. if (!channel) return; const embed = new Discord.RichEmbed() .setColor('RANDOM') .setAuthor(member.user.username, member.user.avatarURL) .setThumbnail(member.user.avatarURL) .setTitle('📥 | Sunucuya katıldı!') .setTimestamp() channel.sendEmbed(embed); // belirlediğimiz kanala mesaj gönderelim.}); client.on('guildMemberRemove', member => { const channel = member.guild.channels.find('name', 's-log'); if (!channel) return; const embed = new Discord.RichEmbed() .setColor('RANDOM') .setAuthor(member.user.username, member.user.avatarURL) .setThumbnail(member.user.avatarURL) .setTitle('📤 | Sunucudan ayrıldı | Görüşmek üzere!') .setTimestamp() channel.sendEmbed(embed); });

client.login(ayarlar.token);
