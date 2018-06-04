const Discord = require('discord.js');
const client = new Discord.Client();

exports.run = (client, message) => {
   message.channel.send('Zar atılıyor.').then(message => {
      var zar = ['Çıkan sayı 1','Çıkan sayı 2','Çıkan sayı 3','Çıkan sayı 4','Çıkan sayı 5','Çıkan sayı 6'];
      var zar = zar[Math.floor(Math.random() * zar.length)];
            message.edit(${zar});
 });
  }

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['zarat', 'atzar', 'at-zar', 'atbizar'],
  permLevel: 0
};

exports.help = {
  name: 'zar-at',
  description: 'Zar atar.',
  usage: 'zar-at'
};