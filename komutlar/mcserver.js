const Discord = require('discord.js');
const request = require('request');
var mcPort = 25565
var prefix = "d!";
exports.run = (client, message, args) => {
  if (message.content.startsWith(prefix + "mcserver")) {
      var url = 'http://mcapi.us/server/status?ip=' + args[0] + '&port=' + mcPort;
		let reason = args.slice(0).join(' ');
        request(url, function (err, response, body) {
            if (err) {
                console.log(err);
                return message.channel.sendEmbed(new Discord.RichEmbed().setTitle('Hata!').addField('Sunucu bilgileri alınırken beklenmedik bir hatayla karşılaştık.').setThumbnail("https://i.hizliresim.com/OyBm5D.png").setAuthor("TheFunt").setFooter('Copyright TheFunt-Bot-2017').setColor(0x00AE86).setTimestamp());
            }
            body = JSON.parse(body);
            var status = '**〉** Sunucu » **' + reason + '**\n\n**〉** Sunucu şu anda aktif mi » **Hayır**\n\n**〉** Bu IP adresi bir sunucuya ait değil veya sunucu şu anda kapalı.';
            if (body.online) {
			status = '**〉** Sunucu adı » **' + reason + '**\n\n**〉** Sunucu şu anda aktif mi » **Evet**\n\n**〉** Sunucu versiyonu » **'+ body.server.name +'**\n\n';
                if (body.players.now) {
                    status += '**〉** Aktif oyuncu sayısı » **' + body.players.now + '/'+ body.players.max +'**\n\n**〉** Açıklama » **' + body.motd +'**';
					} else {
						status += '**〉** Şu anda sunucuda kimse yok.';
                }
            }
            message.channel.sendEmbed(new Discord.RichEmbed().setDescription(status).setThumbnail('https://i.hizliresim.com/ByrQRG.png').setColor('RANDOM').setFooter('' + body.motd + ''));
        });
    }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['mcserver', 'mc server'],
  permLevel: 0
};

exports.help = {
  name: 'mcserver',
  description: 'Minecraft sunucu bilgisini verir.',
  usage: 'mcserver <sunucu IP>'
};