const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
require('./util/eventLoader')(client);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'sa') {
        setTimeout(() => {
      msg.react('🇸');
    }, 1000);
            setTimeout(() => {
      msg.react('🇦');
    }, 1500);
    msg.reply('Aleyküm Selam!');
  }
});

client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

client.on ('message', message => {
if (message.content === prefix + "emojiler") {
  const emojiList = message.guild.emojis.map(e=>e.toString()).join(" **|** ");
  message.channel.send(emojiList);
}
})

client.on('message', message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  let command = message.content.split(' ')[0];
  command = command.slice(prefix.length);

  let args = message.content.split(' ').slice(1);

  if (command === 'bug-gönder' || command === 'bug') {
    let str = '<@406832593758322688>';
    let id = str.replace(/[<@!>]/g, '');
    let mesaj = args.slice(0).join(' ');
    if (mesaj.length < 1) return message.reply(`Bulduğunuz bug nedir?`);
    message.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
    .setDescription('<:basarili:442423661190709248> Bug bildirildi! Bug bildirdiğiniz için teşekkür ederiz!'));
    const embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle('Tavsiye bilgileri;')
    .addField('Tavsiye:', mesaj, true)
    .addField('Kullanıcı adı:', message.author.tag, true)
    .addField('Kullanıcı kimliği:', message.author.id, true)
    .addField('Sunucu adı:', message.guild.name, true)
    .addField('Sunucu kimliği:', message.guild.id, true)
    client.fetchUser(id)
    .then(user => {user.send({embed})})
  }
});

client.on('message', msg => {
  if (msg.content.startsWith(prefix + "yaz")) {
    if (msg.channel.type !== "dm"){
    let mesaj = msg.content.substring(2 + 3);
    msg.delete (msg.content == 'yaz' + mesaj)
    let embed = new Discord.RichEmbed()
    .setColor("RANDOM")
       .setDescription(mesaj)
return msg.channel.send({embed})}

    }
    });

     client.on('guildMemberAdd', member => {
  let guild = member.guild;
  let joinRole = guild.roles.find('name', 'Üye'); // Burada girişte verilcek rolu seçelim.
  member.addRole(joinRole); // seçtiğimiz rolu verelim.

  const channel = member.guild.channels.find('name', 's-log'); // burda ise kanalı belirleyelim hangi kanala atsın ben mod-log dedim.
  if (!channel) return;
  const embed = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setAuthor(member.user.username, member.user.avatarURL)
  .setThumbnail(member.user.avatarURL)
  .setTitle('📥 | Sunucua Hoşgelmişen!')
  .setTimestamp()
  channel.sendEmbed(embed); // belirlediğimiz kanala mesaj gönderelim.
});

client.on('guildMemberRemove', member => {
  const channel = member.guild.channels.find('name', 's-log');
  if (!channel) return;
  const embed = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setAuthor(member.user.username, member.user.avatarURL)
  .setThumbnail(member.user.avatarURL)
  .setTitle('📤 | Sunucudan ayrıldı | Görüşmek üzere | Niye Gittin Leyn ~')
  .setTimestamp()
  channel.sendEmbed(embed); 
});

client.on('message', message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(ayarlar.prefix)) return;

  let command = message.content.split(' ')[0];
  command = command.slice(ayarlar.prefix.length);

  let args = message.content.split(' ').slice(1);

  if (command === 'topla') {
    let numArray = args.map(n=> parseInt(n));
    let total = numArray.reduce( (p, c) => p+c);
    message.channel.sendMessage(`${total}`);
  }
  if (command === 'çıkar') {
    let numArray = args.map(n=> parseInt(n));
    let total = numArray.reduce( (p, c) => p-c);
    message.channel.sendMessage(`${total}`);
  }
  if (command === 'çarp') {
    let numArray = args.map(n=> parseInt(n));
    let total = numArray.reduce( (p, c) => p*c);
    message.channel.sendMessage(`${total}`);
  }
  if (command === 'böl') {
    let numArray = args.map(n=> parseInt(n));
    let total = numArray.reduce( (p, c) => p/c);
    message.channel.sendMessage(`${total}`);
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'd!desteksunucusu') {
    msg.channel.send(':inbox_tray: Destek sunucusuna katılmak için "https://discord.gg/Xc5c6gs" adresine tıklayabilirsiniz.');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'd!reklamengelle') {
    msg.channel.send(':white_check_mark: Başarıyla reklam engelleme özelliği aktifleştirildi. Bu özellik "**Kullanıcıları Yasakla**" yetkisi olanlarda çalışmayacaktır. Bundan sonra `Discord sunucu davetleri`, `Facebook linkleri`, `YouTube linkleri`, `Dailymotion linkleri` ve `Google linkleri` gibi linkler engellenecek!');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'd!küfürkoruması') {
    msg.channel.send(':white_check_mark: Başarıyla küfür engelleme özelliği aktifleştirildi. Bu özellik "**Kullanıcıları Yasakla**" yetkisi olanlarda çalışmayacaktır. Bundan sonra kanalda edilen küfürler engellenecek; lütfen bottan mesajları yönet yetkisini kaldırmayın!');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'd!discordbots') {
    msg.channel.send('DesertHawk botunun` discordbots.org` üzerindeki profilini görmek için aşağıdaki linki kullanabilirsiniz; \n https://discordbots.org/bot/421303172766892052 ');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'd!komutlar') {
    msg.channel.send('Bütün komutları ayrıntılı bir şekilde görmek için "http://komutlar.deserthawk.rf.gd/" adresini ziyaret edin :sunglasses:');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'd!blog') {
    msg.channel.send('DesertHawk | Blog \n Tüm güncellemelerden, haberlerden veya hatalardan haberdar olmak istiyorsanız blogumuzu ziyaret edebilirsiniz! \n http://blog.deserthawk.rf.gd');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'd!seviye') {
    msg.channel.send(':warning: Üzgünüm, seviye sistemi botu büyük zararlara uğrattığından dolayı kaldırıldı. Lütfen daha fazla ayrıntı için blogumuzdaki ``(http://blog.deserthawk.rf.gd)`` yazımızı okuyun.');
  }
});

client.on('message', msg => {
 if(msg.content.startsWith(prefix + "kurucu")) {
  msg.channel.sendMessage(`**${msg.guild.name}** adlı Discord sunucusunun kurucusu; ${msg.guild.owner} adlı kullanıcıdır.`)
}
});

client.on('message', msg => {
 if(msg.content.startsWith(prefix + "discrim")) {
  msg.channel.sendMessage(`Eklencek!!!`)
}
});

client.on('message', msg => {
 if(msg.content.startsWith(prefix + "çal")) {
  msg.channel.sendMessage(`Müzik dinleyebilmek için https://discordbots.org/bot/421303172766892052 adresinden bota upvote vermelisiniz. (eğer upvote verdiyseniz 1 dakika beklemelisiniz)`)
}
});

if (msg.content.toLowerCase() === prefix + 'destek') {
	       if(!msg.guild) return
	 msg.reply('Operatorlere bildirim gönderdim!');
    client.channels.get("434669450977869834").sendMessage(`**${msg.author.tag} adlı kişi destek talebi açtı**`);
  }	
});

client.login(process.env.BOT_TOKEN);
