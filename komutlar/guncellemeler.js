const Discord = require('discord.js');
exports.run = function(client, message) {
	const ping = new Discord.RichEmbed()
    .setColor(0xFFFF00)
    .addField('Güncellemeler', '1. yazı\n Satır atlamak için \n kullan')
	.addField('Linkler', '[Website](http://www.deserthawk.rf.gd/) - [Blog](http://blog.deserthawk.rf.gd/) - [Davet linki](https://discordapp.com/oauth2/authorize?client_id=421303172766892052&scope=bot&permissions=2146958591) - [Destek Sunucusu](https://discord.gg/Xc5c6gs) - [Discord Bot List](https://discordbots.org/bot/421303172766892052)')
    return  message.channel.sendEmbed(ping)
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'guncellemeler',
  description: '-',
  usage: 'guncellemeler'
};