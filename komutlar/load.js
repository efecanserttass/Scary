exports.run = (client, message, args) => {
  if (message.author.id === "419428992752549909")
    var command = args[0];
    message.channel.send("`" + command + "` adlı komut yükleniyor...")
      .then(m => {
        client.load(command)
          .then(() => {
            m.edit("`" + command + "` adlı komut başarıyla yüklendi.");
          })
          .catch(e => {
            m.edit(`Komut yüklenirken bir hata oluştu: ${command}\n\`\`\`${e.stack}\`\`\``);
          });
      });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['l'],
  permLevel: 4
};

exports.help = {
  name: 'load',
  description: 'Yeni eklenen komutu yükler.',
  usage: 'load <komut adı>'
};
