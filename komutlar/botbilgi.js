const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setDescription("[DesertHawk BOT](https://discord.gg/Xc5c6gs)")
    .setColor("#15f153")
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
