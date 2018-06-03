BOTA ÖZELDEN YAZILAN ŞEYLERİ GÖSTEREN KOD

    client.on("message", message => {
    const dmchannel = client.channels.find("name", "sapıklogu");
    if (message.channel.type === "dm") {
        if (message.author.id === client.user.id) return;
        dmchannel.sendMessage("", {embed: {
                color: 3447003,
                title: `SİZİ SAPIKLAR SIZI DM: ${message.author.tag}`,
                description: `${message.content}`
              }})
    }
    if (message.channel.bot) return;
});
 



