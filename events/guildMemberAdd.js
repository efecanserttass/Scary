module.exports = member => {
    let username = member.user.username;
    member.send('Hoş geldin Bro **' + username + '**!');
    member.guild.defaultChannel.send('hg '+username+'');
};
