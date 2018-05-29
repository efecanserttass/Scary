const Discord = require('discord.js');
const client = new Discord.Client();

exports.run = (client, message) => {
 message.channel.send({embed: {
               author: {
                   name: "Genel Sürüm : 1.0 - Yapılan değişiklikler",
                   icon_url: ""
                 },
               color: 0xD97634,
               description: "**atombom komutu yenilendi \nçayiç komutu yenilendi \nngif komutu eklendi \nherkesebendençay komutu yenilendi \nayrılıkgif komutu eklendi** \n__***Her Hafta bu komutu kullanın lütfen***__"
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
