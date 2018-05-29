const snekfetch = require('snekfetch');

exports.run = (client, msg, args) => {
  let [title, contents] = args.join(" ").split("|");
  if(!contents) {
    [title, contents] = ["3", title];
  }
  let rnd = Math.floor((Math.random() * 39) + 1);

  if(title.length > 22 || contents.length > 22) return msg.edit("Lütfen Minecraft Skin ismini yazın.").then(msg.delete.bind(msg), 2000);
  const url = `https://crafatar.com/renders/body/${encodeURIComponent(contents)}?scale=${encodeURIComponent(title)}`;
  snekfetch.get(url)
   .then(r=>msg.channel.send("", {files:[{attachment: r.body}]}));
  msg.delete();

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["mc-skin"]
};

exports.help = {
  name: 'mcskins',
  description: '3D Minecraft Skin gösterir.',
  usage: 'mcskins'
};
