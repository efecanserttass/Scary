

client.on("message", message => {
    const dmchannel = client.channels.find("name", "s-dm");
    if (message.channel.type === "dm") {
        if (message.author.id === client.user.id) return;
        dmchannel.sendMessage("", {embed: {
                color: 3447003,
                title: `Scary'e yazılan DM: ${message.author.tag}`,
                description: `${message.content}`
              }})
    }
    if (message.channel.bot) return;
});
 
