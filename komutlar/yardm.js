Bu benim kullandığım
const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
  let embed = new Discord.RichEmbed()
    .setTitle("Categories")
    .setAuthor("85 Commands", bot.user.displayAvatarURL)
    .addField("Moderation", "`" + message.prefix + "mod`", true)
    .addField("Games", "`" + message.prefix + "games`", true)


    .addField("NSFW", "`" + message.prefix + "nsfw`", true)
  


    .addField("Fun", "`" + message.prefix + "fun`", true)
    .addField("Statistics", "`" + message.prefix + "statistics`", true)
    .addField("Developer", "`" + message.prefix + "dev`", true)
  .setFooter("If you found a bug please report it using " + message.prefix + "bugreport")
    message.channel.send(embed);
}
module.exports.help = {
    name: "yardım"
}
