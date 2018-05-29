const snekfetch = require('snekfetch');

exports.run = (client, msg, args) => {
  let [yazi, boyut] = args.join(" ").split("|");
  if(!boyut) {
    [yazi, boyut] = ["180", yazi];
  }
  let rnd = Math.floor((Math.random() * 39) + 1);

  if(yazi.length > 999 || boyut.length > 4) return msg.edit("Max Length: 22 Characters. Soz.").then(msg.delete.bind(msg), 2000);
  const url = `http://www.qr-code-generator.com/phpqrcode/getCode.php?cht=qr&chl=${encodeURIComponent(yazi)}&chs=${encodeURIComponent(boyut)}x${encodeURIComponent(boyut)}&choe=UTF-8&chld=L|0`;
  snekfetch.get(url)
   .then(r=>msg.channel.send("", {files:[{attachment: r.body}]}));
  msg.delete();

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["rq"]
};

exports.help = {
  name: 'RQ-yap',
  description: 'RQ Bar kodu yapar.',
  usage: 'RQ-yap'
};
