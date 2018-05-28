const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

const girismesaj = [
  '**DesertHawk BOT sunucunuza eklendi!**',
  '**DesertHawk BOT** sunucunuzdaki insanlara kolaylıklar sağlar.',
  'Bot Yunus Emre F. tarafından geliştirilmektedir (https://yunus.pw)',
  'Botumuzun özelliklerini öğrenmek için d!yardım komutunu kullanabilirsin.',
  '**ÖNEMLİ:** Botun kullanması için mod-log kanalı açın ve deneme için',
  'd!uyar komutunu kullanın.',
  '',
  `**DesertHawk BOT Resmî Discord Sunucusu** https://discord.gg/Xc5c6gs`,
  `**DesertHawk Discord Sunucusu** https://discord.gg/Xc5c6gs`
]

client.on('guildCreate', guild => {
    const generalChannel = guild.defaultChannel
    generalChannel.sendMessage(girismesaj)
	client.user.setGame(prefix + 'yardım | ' + client.guilds.size + ' sunucu | ' + client.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString() + ' kullanıcı');
})
