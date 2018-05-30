client.on('guildMemberRemove', member => {
  const channel = member.guild.channels.find('name', 'scary');
  if (!channel) return;
  const embed = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setAuthor(member.user.username, member.user.avatarURL)
  .setThumbnail(member.user.avatarURL)
  .setTitle('📤 | Bir Kaybımız Var Yastayız 😔| Görüşmek üzere!')
  .setTimestamp()
  channel.sendEmbed(embed); 
});


