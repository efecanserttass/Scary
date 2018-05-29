const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setDescription("[Scary]()")
    .setColor("#15f15
    .setThumbnail(bicon)
    .addField("Kullanıcı Adı:", bot.user.username)
    .addField("Kuruluş Tarihi:", bot.user.createdAt)

    message.channel.send(botembed);
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['bot bilgi', 'botbilgi', 'bb', 'botb', 'bbot', 'hakkında', 'bot hakkında', 'bothakkında'],
  permLevel: 0
};

exports.help = {
  name: 'botbilgi',
  description: 'Bot ile ilgili bilgi verir.',
  usage: 'botbilgi'
};
