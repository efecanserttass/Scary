const Discord = require('discord.js');
const client = new Discord.Client();

exports.run = (client, message) => {
 message.channel.send({embed: {
               author: {
                   name: "Genel Sürüm : 1.0 - Yapılan değişiklikler",
                   icon_url: ""
                 },
               color: 0xD97634,
               description: "**atombom komutu yenilendi \nçayiç komutu yenilendi \nnicegif komutu eklendi \nherkesebendençay komutu yenilendi \nailemiz Komutu Eklendi** \n__***Botumuz Artık 7/24 Aktif***__"
             }});
};

exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: ['p'],
 permLevel: 0
};

exports.help = {
 name: 'değişiklikler',
 description: 'Değişiklikleri gösterir.',
 usage: 'değişiklikler'
};
