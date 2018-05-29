const Discord = require('discord.js');
exports.run = function(client, message, args) {
    message.channel.send({embed: {
        color: 0xD97634,
        description: "👑 **Yapımcım**\n\n\n **•》 Yusuf Bülbül =》@☬ Yusuf  ☬ ˢᶜᵃʳʸ#2022 **\n"
      }});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'yapımcım',
  description: 'yappp.',
  usage: 'yapımcım'
};