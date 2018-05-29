const Discord = require('discord.js');

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

exports.run = (client, message, args) => {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", "https://random.dog/woof.json", true ); // false for synchronous request
    xmlHttp.send( null );
    var obj = JSON.parse(xmlHttp.responseText);
  message.channel.send('');
message.channel.sendEmbed(new Discord.RichEmbed()
.setDescription(`Dog: Hav! Hav!`)
.setFile(`${obj.file}`)
.setColor(0x00ff00));
    }


exports.conf = {
  enabled: false,
  guildOnly: false,
  aliases: ['it'],
  permLevel: 0
};

exports.help = {
  name: 'kopek',
  description: 'Rastgele kopek resmi atar.',
  usage: 'kopek'
};
