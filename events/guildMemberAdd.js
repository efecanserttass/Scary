client.on('guildMemberAdd', member => {
  member.addRole(member.guild.roles.find(r => r.name.startsWith('')));
  const channel = member.guild.channels.find('name', 's-log');
  if (!channel) return;
 const embed = new Discord.RichEmbed()
 .setColor('RANDOM')
 .setAuthor(member.user.tag, member.user.avatarURL || member.user.defaultAvatarURL)
 .setThumbnail(member.user.avatarURL || member.user.defaultAvatarURL)
 .setTitle('Hey Bro Hoşgelmişen')
 .setDescription(`Sunucuya katıldı Hoşgeldin Bro${member.guild.memberCount} üye]!`)
 .setFooter('Scary', client.user.avatarURL)
 .setTimestamp()
 channel.send(embed);
});

 
  
  
  
  


 

