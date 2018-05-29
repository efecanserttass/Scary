const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('../ayarlar.json');
client.on("message", (message) => {
    const arg = message.content.slice(prefix.length).trim().split(/ +/g);
    const komut = arg.shift().toLowerCase();
    if(komut === "çevir") {
            var cevir = require('node-google-translate-skidz');
            let hdil = arg[0];
            if(!hdil) return message.channel.send("**Hata,** şöyle yazmalısın: `$çevir [tr/en vs.] [kelime]`");
            if(hdil.length > 2) return message.channel.send("**Hata,** şöyle yazmalısın: `$çevir [tr/en vs.] [kelime]`");
            var cevrt = arg.slice(1).join(" ");
            if(!cevrt){
                message.channel.send("Çevirmek istediğin dili yazmalıydın!");
            }
            cevir({
                text: cevrt,
                target: hdil
            }, function(result) {
                var dl = result.translation
                const embed = new Discord.Richçevir()
                .setColor(0x00AE86)
                .addField("Çevrilmek istenen metin:", cevrt)
                .addField("Çevrilen Metin:", dl)
                .setFooter("Çeviri", message.author.avatarURL)
                 message.channel.send({çevir})
                    .catch(error => message.channel.send("Bir hata oluştu!"))
            });
            }
});
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['bot bilgi', 'botbilgi', 'bb', 'botb', 'bbot', 'hakkında', 'bot hakkında', 'bothakkında'],
    permLevel: 0
  };
  
  exports.help = {
    name: 'çevir',
    description: 'Bot ile ilgili bilgi verir.',
    usage: 'çevir'
  };
  