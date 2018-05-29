const snekfetch = require('snekfetch');

exports.run = (client, msg, args) => {
  let [title, contents] = args.join(" ").split("|");
  if(!contents) {
    [title, contents] = ["Hediyye kutu geldi.", title];
  }
  let rnd = Math.floor((Math.random() * 39) + 1);

  if(title.length > 22 || contents.length > 22) return msg.edit("Max Length: 22 Characters. Soz.").then(msg.delete.bind(msg), 2000);
  const url = `https://www.minecraftskinstealer.com/achievement/a.php?i=17&h=${encodeURIComponent(title)}&t=${encodeURIComponent(contents)}`;
  snekfetch.get(url)
   .then(r=>msg.channel.send("", {files:[{attachment: r.body}]}));
  msg.delete();

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["mc-case"]
};

exports.help = {
  name: 'kutu',
  description: 'Kutu acma oyunu',
  usage: 'kutu'
};
