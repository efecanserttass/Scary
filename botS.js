const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
const yt = require('ytdl-core');
const sql = require('sqlite');
sql.open('./score.sqlite');
require('./util/eventLoader')(client);
const prefix = 'd!';
const allowedUsers = ayarlar.allowedUsers;
const roles = ayarlar.roleToDisco;
const disco = new Discord.Client();

//////////////////////////////////////////////////////////////

//Bota dm atılan mesajlar
// client.on("message", message => {
//    const dmchannel = client.channels.find("name", "bota-dm");
//    if (message.channel.type === "dm") {
//        if (message.author.id === client.user.id) return;
//        dmchannel.sendMessage("", {embed: {
//                color: 3447003,
//                title: `BİR SAPIK YAKALANDI EFENDİM / DM: ${message.author.tag}`,
//                description: `BUYUR ABE: ${message.content}`
//              }})

//////////////////////////////////////////////////////////////

// reklam yasaklayan
// client.on("message", msg => {
//  if (msg.content.toLowerCase().match(/(http|.com|discord.gg|discordapp.com)/g) && !msg.author.bot && msg.channel.type === "text" && msg.channel.permissionsFor(msg.guild.member(client.user)).has("MANAGE_MESSAGES")) {
//     msg.delete(30).then(deletedMsg => {
//       deletedMsg.reply("KÜFÜR Engellendi. :shield:").catch(e => {
//         console.error(e);
//       });
//     }).catch(e => {
//       console.error(e);
//     });
//   }
//});

//////////////////////////////////////////////////////////////

// kufur yasaklayan
// client.on("message", msg => {
//  if (msg.content.toLowerCase().match(/(annan|sikerim|sik|yaram|yarram|orosbu|orospu|orspu|orsbu|am|amcık|aneni|sikerler|Oç|öç|orrospu|Fuck|mother|fucker|Annenizi|sikerim|annenize|sokarım|sok|sokmak|sokarlar|sokarim|ibine|ibne|meme|amını|yalarım|bacını|sakso|porno|sex|seks|31|döl|dol|brazzers|porn|brazers|hub|fake|taxi|cocugu|cocukları|amını|götünü|göt|gotoş|götoş|götos|gotos|sik|sık|amk|aq|ak|mq|ameka|nah|yarrak|bandik|orta|parmak|puşt|pezewenk|pezevenk|Veled|Kudur|Zaa|Reg|amuna|çaktığım|amcık|oglu|oğlu|enay|gay|top|toppik)/g) && !msg.author.bot && msg.channel.type === "text" && msg.channel.permissionsFor(msg.guild.member(client.user)).has("MANAGE_MESSAGES")) {
//     msg.delete(30).then(deletedMsg => {
//       deletedMsg.reply("KÜFÜR Engellendi. :shield:").catch(e => {
//         console.error(e);
//       });
//     }).catch(e => {
//       console.error(e);
//     });
//   }
//});

//////////////////////////////////////////////////////////////

//fs.readdir("./komutlar/", (err, files) => {
//
//  if(err) console.log(err);
//
//  let jsfile = files.filter(f => f.split(".").pop() === "js")
//  if(jsfile.length <= 0){
//    console.log("Komut bulunamadı!");
//    return;
//  }
//
//  jsfile.forEach((f, i) =>{
//    let props = require(`./komutlar/${f}`);
//    console.log(`${f} dosyası başarıyla yüklendi!`);
//    bot.commands.set(props.help.name, props);
//  });
//
//});


/////////////////////////////////////////////////////////////////


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

client.on('message', message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(ayarlar.prefix)) return;

  let command = message.content.split(' ')[0];
  command = command.slice(ayarlar.prefix.length);

  let args = message.content.split(' ').slice(1);

  if(command === "çevir") {
    var translate = require('node-google-translate-skidz');
    let targetLang = args[0];
    if(!targetLang) return message.channel.send(":no_entry_sign: Ne yazacağını demelisin **m!translate tr merhaba** gibi.");
    if(targetLang.length > 2) return message.channel.send(":no_entry_sign: Lütfen bir dil gir **tr, en** gibisinden.");
    var translateText = args.slice(1).join(" ");
    if(!translateText) return message.channel.send(`:no_entry_sign: Çevirmek istediğiniz "${targetLang}" dili yazın..`);

    translate({
      text: translateText,
      target: targetLang
    }, function(result) {
      var translatedText = result.translation
      const embed = new Discord.RichEmbed()
      .setAuthor(`Çeviri`, message.author.avatarURL)
      .setColor(0x00AE86)
      .addField("Mesaj:", "**" + translateText + "**")
      .addField(`Çevrilen Mesaj: ${targetLang}`, "**" + translatedText + "**")
      .setFooter(`${message.author.tag} tarafından istendi!`, client.user.avatarURL)
      message.channel.send({embed})
        .catch(error => message.channel.send(`Üzgünüm ${message.author.tag} Sana embed şeklinde yollayamıyorum: ${error}`))
    });
  }
})

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'amk') {
    msg.reply('Yazık Küfür Etmek Çok Kötü Birşey !');
	msg.react('🖕')
	msg.delete();
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'Amk') {
    msg.reply('Yazık Küfür Etmek Çok Kötü Birşey !');
	msg.react('🖕')
	msg.delete();
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'AMK') {
    msg.reply('Yazık Küfür Etmek Çok Kötü Birşey !');
	msg.react('🖕')
	msg.delete();
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'aMK') {
    msg.reply('Yazık Küfür Etmek Çok Kötü Birşey !');
	msg.react('🖕')
	msg.delete();
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'oc') {
    msg.reply('Yazık Küfür Etmek Çok Kötü Birşey !');
	msg.react('🖕')
	msg.delete();
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'Oc') {
    msg.reply('Yazık Küfür Etmek Çok Kötü Birşey !');
  if (msg.author.bot) return;
  if (msg.content.toLowerCase().includes('oc')) msg.reply('**Yazık Küfür Etmek Çok Kötü Birşey !**');
  if (msg.content.toLowerCase().includes('oruspu')) msg.reply('**Yazık Küfür Etmek Çok Kötü Birşey !**');
  if (msg.content.toLowerCase().includes('pic')) msg.reply('**Yazık Küfür Etmek Çok Kötü Birşey !**');
  if (msg.content.toLowerCase().includes('mk')) msg.reply('**Yazık Küfür Etmek Çok Kötü Birşey !**');
  if (msg.content.toLowerCase().includes('anan')) msg.reply('**Yazık Küfür Etmek Çok Kötü Birşey !**');
  if (msg.content.toLowerCase().includes('yarram')) msg.reply('**Yazık Küfür Etmek Çok Kötü Birşey !**');
  if (msg.content.toLowerCase().includes('yarrak')) msg.reply('**Yazık Küfür Etmek Çok Kötü Birşey !**');
  if (msg.content.toLowerCase().includes('amk')) msg.reply('**Yazık Küfür Etmek Çok Kötü Birşey !**');
  if (msg.content.toLowerCase().includes('top')) msg.reply('**Yazık Küfür Etmek Çok Kötü Birşey !**');
  msg.delete();
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'oç') {
    msg.reply('Yazık Küfür Etmek Çok Kötü Birşey !');
	msg.react('🖕')
	msg.delete();
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'Oç') {
    msg.reply('Yazık Küfür Etmek Çok Kötü Birşey !');
	msg.react('🖕')
	msg.delete();
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'OC') {
    msg.reply('Yazık Küfür Etmek Çok Kötü Birşey !');
	msg.react('🖕')
	msg.delete();
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'OÇ') {
    msg.reply('Yazık Küfür Etmek Çok Kötü Birşey !');
	msg.react('🖕')
	msg.delete();
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'pic') {
    msg.reply('Yazık Küfür Etmek Çok Kötü Birşey !');
	msg.react('🖕')
	msg.delete();
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'piç') {
    msg.reply('Yazık Küfür Etmek Çok Kötü Birşey !');
	msg.react('🖕')
	msg.delete();
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'Pic') {
    msg.reply('Yazık Küfür Etmek Çok Kötü Birşey !');
	msg.react('🖕')
	msg.delete();
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'Piç') {
    msg.reply('Yazık Küfür Etmek Çok Kötü Birşey !');
	msg.react('🖕')
	msg.delete();
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'PİC') {
    msg.reply('Yazık Küfür Etmek Çok Kötü Birşey !');
	msg.react('🖕')
	msg.delete();
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'PİÇ') {
    msg.reply('Yazık Küfür Etmek Çok Kötü Birşey !');
	msg.react('🖕')
	msg.delete();
  }
});




		

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'sa') {
    setTimeout(() => {
	msg.react('🇦');
	},500);
	setTimeout(() => {
	msg.react('🇸');
	},1000);
  };

  if (msg.author.bot) return;
  if (msg.content.toLowerCase().includes('herkese günaydın')) msg.reply('**GÜNAYDIN Güzel Kardeşim Bak Ne Güzel Yaşıyorsun Şükür Et ** :)');
  if (msg.content.toLowerCase().includes('iyi geceler')) msg.reply('**SAHİDEN İYİ Mİ GECELER ?**');
  if (msg.content.toLowerCase().includes('iyi akşamlar')) msg.reply('**EYV. İYİ AKŞAMLAR**');
  if (msg.content.toLowerCase().includes('selamın aleyküm')) msg.reply('**ALEYKÜM SELAM HOŞGELDİN YİĞİDO**');
  if (msg.content.toLowerCase().includes('güle güle')) msg.reply('**GÜLE GÜLE CİĞERİM**');
  if (msg.content.toLowerCase().includes('canım sıkkın')) msg.reply('** :smoking: Hayırdır Be Moruk Kim Sıktı Canını Biz Burdayız Anlat**');
});

client.on('message', msg => {
if (msg.content.toLowerCase() === 'sigara') {
msg.channel.send(':smoking: :cloud::cloud::cloud:')
.then(nmsg => nmsg.edit(':smoking: :cloud::cloud:'))
.then(nmsg => nmsg.edit(':smoking: :cloud:'))
.then(nmsg => nmsg.edit(':smoking: :cloud::cloud:'))
.then(nmsg => nmsg.edit(':smoking: :cloud:'))
.then(nmsg => nmsg.edit('**Sigaram bitti** | **Sigara İçmeyiniz.** :no_smoking: **Sigara Sağlığa Zararlıdır**'));
}
});


client.on('message', message => {
  if (message.author.bot) return;
  if (message.channel.type !== 'text') return;

  sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`).then(row => {
    if (!row) {
      sql.run('INSERT INTO scores (userId, points, level) VALUES (?, ?, ?)', [message.author.id, 1, 0]);
    } else {
      let curLevel = Math.floor(0.3 * Math.sqrt(row.points + 1));
      if (curLevel > row.level) {
        row.level = curLevel;
        sql.run(`UPDATE scores SET points = ${row.points + 1}, level = ${row.level} WHERE userId = ${message.author.id}`);
        const embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setAuthor(message.author.tag, message.author.avatarURL || message.author.defaultAvatarURL)
        .setThumbnail(message.author.avatarURL || message.author.defaultAvatarURL)
        .setTitle('Seviye yükseldi;')
        .setDescription(`Tebrikler! Yeni seviyen ${curLevel}.`)
        .setFooter('DesertHawk', client.user.avatarURL)
        .setTimestamp()
        message.channel.send(embed);
      }
      sql.run(`UPDATE scores SET points = ${row.points + 1} WHERE userId = ${message.author.id}`);
    }
  }).catch(() => {
    console.error;
    sql.run('CREATE TABLE IF NOT EXISTS scores (userId TEXT, points INTEGER, level INTEGER)').then(() => {
      sql.run('INSERT INTO scores (userId, points, level) VALUES (?, ?, ?)', [message.author.id, 1, 0]);
    });
  });
  

  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  let command = message.content.split(' ')[0];
  command = command.slice(prefix.length);
  let args = message.content.split(' ').slice(1);
  let cont = message.content.slice(prefix.length).split(' ');
  let args2 = cont.slice(1);

  if (command === 'like') {
    const embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle('Like;')
    .addField('==★==★==★==★===★==★==★==★==★==★==★==★\n░░░░░░░░░░░░░░░░░░░░░░░▄▄ \n░░░░░░░░░░░░░░░░░░░░░░█░░█ ')
	.addField('░░░░░░░░░░░░░░░░░░░░░░█░░█ \n░░░░░░░░░░░░░░░░░░░░░█░░░█ \n░░░░░░░░░░░░░░░░░░░░█░░░░█ ')
	.addField('░░░░░░░░░░░███████▄▄█░░░░░██████▄\n░░░░░░░░░░░▓▓▓▓▓▓█░░░░░░░░░░░░░░█\n░░░░░░░░░░░▓▓▓▓▓▓█░░░░░░░░░░░░░░█')
	.addField('░░░░░░░░░░░▓▓▓▓▓▓█░░░░░░░░░░░░░░█\n░░░░░░░░░░░▓▓▓▓▓▓█░░░░░░░░░░░░░░█\n░░░░░░░░░░░▓▓▓▓▓▓█░░░░░░░░░░░░░░█')
	.addField('░░░░░░░░░░░▓▓▓▓▓▓█████░░░░░░░░░█ \n░░░░░░░░░░░██████▀░░░░▀▀██████▀ ')
	.addField('◈☻◈☻◈☻◈☻◈☻◈☻◈☻◈☻◈☻◈☻◈☻◈☻◈ \n░█░░░█░█░▄▀░█▀▀░░░░▀█▀░█░█░█░▄▀▀░\n░█░░░█░█▀░░░█▀░░▄▄░░█░░█▀█░█░░▀▄░')
	.addField('░█▄▄░█░█░▀▄░█▄▄░░░░░█░░█░█░█░▄▄▀░')
    .setFooter('DesertHawk', client.user.avatarURL)
    .setTimestamp()
    message.channel.send(embed);
        };
  
  if (command === 'resim-değiştir') {
    if(message.author.id !== '406832593758322688') 
    return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Resim değiştir;').setDescription(message.author.tag + ', bu komutu yalnızca yapımcım kullanabilir.').setFooter('DesertHawk', client.user.avatarURL).setTimestamp());
    if (!message.guild) {
    return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Resim değiştir;').setDescription(message.author.username + ', bu komutu direkt mesajda kullanamazsın.').setFooter('DesertHawk', client.user.avatarURL).setTimestamp()); }
    const sayMessage = args.join(' ');
    if (sayMessage.length < 1) return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Resim değiştir;').setDescription(message.author.tag + ', kullanım: tr!resim-değiştir <bağlantı>.').setFooter('DesertHawk', client.user.avatarURL).setTimestamp());
    client.user.setAvatar(sayMessage);
    const embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle('Resim değiştir;')
    .setDescription(message.author.tag + ', profil resmim başarıyla değiştirildi.')
    .setFooter('DesertHawk', client.user.avatarURL)
    .setTimestamp()
    message.channel.send(embed);
        };
  if (command === 'çeviri') {
    var translate = require('node-google-translate-skidz');
    let targetLang = args[0];
    if(!targetLang) return message.channel.send(":no_entry_sign: Ne yazacağını demelisin **m!translate tr merhaba** gibi.");
    if(targetLang.length > 2) return message.channel.send(":no_entry_sign: Lütfen bir dil gir **tr, en** gibisinden.");
    var translateText = args.slice(1).join(" ");
    if(!translateText) return message.channel.send(`:no_entry_sign: Çevirmek istediğiniz "${targetLang}" dili yazın..`);

    translate({
      text: translateText,
      target: targetLang
    }, function(result) {
      var translatedText = result.translation
      const embed = new Discord.RichEmbed()
      .setAuthor(`Çeviri`, message.author.avatarURL)
      .setColor(0x00AE86)
      .addField("Mesaj:", "**" + translateText + "**")
      .addField(`Çevrilen Mesaj: ${targetLang}`, "**" + translatedText + "**")
      .setFooter(`${message.author.tag} tarafından istendi!`, client.user.avatarURL)
      message.channel.send({embed})
        .catch(error => message.channel.send(`Üzgünüm ${message.author.tag} Sana embed şeklinde yollayamıyorum: ${error}`))
    });
  }
  if (command === 'durum-değiştir') {
    if(message.author.id !== '406832593758322688') 
    return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Durum değiştir;').setDescription(message.author.tag + ', bu komutu yalnızca yapımcım kullanabilir.').setFooter('DesertHawk', client.user.avatarURL).setTimestamp());
    if (!message.guild) {
    return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Durum değiştir;').setDescription(message.author.username + ', bu komutu direkt mesajda kullanamazsın.').setFooter('DesertHawk', client.user.avatarURL).setTimestamp()); }
    const sayMessage = args.join(' ');
    if (sayMessage.length < 1) return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Durum değiştir;').setDescription(message.author.tag + ', kullanım: tr!durum-değiştir <durum>.').setFooter('DesertHawk', client.user.avatarURL).setTimestamp());
    client.user.setStatus(sayMessage);
    const embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle('Durum değiştir;')
    .setDescription(message.author.tag + ', durumum başarıyla değiştirildi.')
    .setFooter('DesertHawk', client.user.avatarURL)
    .setTimestamp()
    message.channel.send(embed);
        };
  
  if (command === 'aktivite-değiştir') {
    if(message.author.id !== '406832593758322688') 
    return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Aktivite değiştir;').setDescription(message.author.tag + ', bu komutu yalnızca yapımcım kullanabilir.').setFooter('DesertHawk', client.user.avatarURL).setTimestamp());
    if (!message.guild) {
    return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Aktivite deği��tir;').setDescription(message.author.username + ', bu komutu direkt mesajda kullanamazsın.').setFooter('DesertHawk', client.user.avatarURL).setTimestamp()); }
    const sayMessage = args.join(' ');
    if (sayMessage.length < 1) return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Aktivite değiştir;').setDescription(message.author.tag + ', kullanım: tr!aktivite-değiştir <mesaj>.').setFooter('DesertHawk', client.user.avatarURL).setTimestamp());
    client.user.setActivity(sayMessage);
    const embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle('Aktivite değiştir;')
    .setDescription(message.author.tag + ', aktivitem başarıyla değiştirildi.')
    .setFooter('DesertHawk', client.user.avatarURL)
    .setTimestamp()
    message.channel.send(embed);
        };
  
  if (command === 'bağlantılar' || command === 'linkler') {
    const embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle('Bağlantılar;')
    .addField('Facebook:', 'https://www.facebook.com/DesertHawk', true)
    .addField('YouTube:', 'https://www.youtube.com/channel/Yok.', true)
    .addField('Twitter:', 'https://twitter.com/DesertHawk`in-Twitteri-Yotkur', true)
    .addField('İnstagram:', 'https://www.instagram.com/Receb_Aydemir', true)
    .addField('Twitch:', 'https://www.twitch.tv/YheRenk', true)
    .addField('Steam:', 'http://steamcommunity.com/profiles/Yok', true)
    .setFooter('DesertHawk', client.user.avatarURL)
    .setTimestamp()
    message.channel.send(embed);
        };
  
  if (command === 'yapımcı') {
    const embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle('Yapımcı;')
    .setDescription('<@406832593758322688>')
    .setFooter('DesertHawk', client.user.avatarURL)
    .setTimestamp()
    message.channel.send(embed);
        };
  
  if (command === 'istatistik' || command === 'i') {
    const embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle('İstatistik;')
    .addField('Gecikme:', client.ping + ' ms', true)
    .addField('Kullanıcılar:', client.guilds.reduce((a, b) => a + b.memberCount, 0), true)
    .addField('Kanallar:', client.channels.size, true)
    .addField('Sunucular:', client.guilds.size, true)
    .addField('Bellek kullanımı:', (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2), true)
    .addField('Discord.JS sürümü:', Discord.version, true)
    .setFooter('DesertHawk', client.user.avatarURL)
    .setTimestamp()
    message.channel.send(embed);
        };
  
  if (command === 'sunucular' || command === 'bot-sunucu') {
    const guildArray = client.guilds.array()
    while (guildArray.length) {
    const embed = new Discord.RichEmbed();
    const guilds = guildArray.splice(0,25);
    for (const guild of guilds) {
      embed.setColor('RANDOM')
      embed.setTitle('Sunucular;')
      embed.setDescription(`Şu an ${client.guilds.size} sunucuda bulunuyorum.`)
      embed.addField(guild.name, guild.memberCount + ' üye.', true)
      embed.setFooter('DesertHawk', client.user.avatarURL)
      embed.setTimestamp()
    }
    message.channel.send({embed: embed});
    
        };
  }
  if (command === 'profil' || command === 'profile') {
    if (!message.guild) {
      return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Eval;').setDescription(message.author.username + ', bu komutu direkt mesajda kullanamazsın.').setFooter('DesertHawk', client.user.avatarURL).setTimestamp()); }
    let user = message.mentions.users.first();
    if (message.mentions.users.size < 1) return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Profil;').setDescription(message.author.tag + ', kullanım: tr!profil <@kullanıcı>.').setFooter('DesertHawk', client.user.avatarURL).setTimestamp());
    sql.get(`SELECT * FROM scores WHERE userId ="${user.id}"`).then(row => {
      if (!row) return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Profil;').setDescription(message.author.tag + ', hiç puanı yok.').setFooter('DesertHawk', client.user.avatarURL));
      economy.fetchBalance(user.id).then((i) => {
    const embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setAuthor(user.tag, user.avatarURL || user.defaultAvatarURL)
    .setThumbnail(user.avatarURL || user.defaultAvatarURL)
    .setTitle('Profil;')
    .addField('Puan:', row.points, true)
    .addField('Seviye:', row.level, true)
    .setFooter('DesertHawk', client.user.avatarURL)
    .setTimestamp()
    message.channel.send(embed);
     })
   })
        };
  
  if (command === 'yapımcı-para') {
    if(message.author.id !== '406832593758322688') 
    return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Yapımcı para;').setDescription(message.author.tag + ', bu komutu yalnızca yapımcım kullanabilir.').setFooter('DesertHawk', client.user.avatarURL).setTimestamp());
      if (!message.guild) {
      return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Eval;').setDescription(message.author.username + ', bu komutu direkt mesajda kullanamazsın.').setFooter('DesertHawk', client.user.avatarURL).setTimestamp()); }
      if(message.author.id === '406832593758322688') {
    economy.updateBalance(message.author.id, parseInt(100000)).then((i) => {
      console.log('+')
    });
    } else {
    const embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle('Yapımcı para;')
    .setDescription(message.author.tag + ', bu komutu yalnızca yapımcım kullanabilir.')
    .setFooter('DesertHawk', client.user.avatarURL)
    .setTimestamp()
    message.channel.send(embed);
   }
  }
  if (command === 'maden') {
    let sayılar = Math.floor(Math.random() * 50)
    message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Maden;').setDescription(message.author.tag + ', maden kazma işi başladı!').setFooter('DesertHawk', client.user.avatarURL).setTimestamp())
      .then(nmsg => nmsg.edit(new Discord.RichEmbed().setColor('RANDOM').setTitle('Maden;').setDescription(message.author.tag + ', maden kazılıyor %25.').setFooter('DesertHawk', client.user.avatarURL).setTimestamp()))
      .then(nmsg => nmsg.edit(new Discord.RichEmbed().setColor('RANDOM').setTitle('Maden;').setDescription(message.author.tag + ', maden kazılıyor %50.').setFooter('DesertHawk', client.user.avatarURL).setTimestamp()))
      .then(nmsg => nmsg.edit(new Discord.RichEmbed().setColor('RANDOM').setTitle('Maden;').setDescription(message.author.tag + ', maden kazılıyor %75.').setFooter('DesertHawk', client.user.avatarURL).setTimestamp()))
      .then(nmsg => nmsg.edit(new Discord.RichEmbed().setColor('RANDOM').setTitle('Maden;').setDescription(message.author.tag + ', maden kazılıyor %100.').setFooter('DesertHawk', client.user.avatarURL).setTimestamp()))
      .then(nmsg => nmsg.edit(new Discord.RichEmbed().setColor('RANDOM').setTitle('Maden;').setDescription(message.author.tag + ', maden kazma işi bitti!').setFooter('DesertHawk', client.user.avatarURL).setTimestamp()))
      .then(nmsg => nmsg.edit(new Discord.RichEmbed().setColor('RANDOM').setTitle('Maden;').setDescription(message.author.tag + ', madenden ' + sayılar + ' ₺ kazandın!').setFooter('DesertHawk', client.user.avatarURL).setTimestamp()))
        };
  
  if (command === 'kullanıcı' || command === 'kullanıcı-bilgi') {
    let user = message.mentions.users.first();
    if (message.mentions.users.size < 1) return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setAuthor(message.author.tag, message.author.avatarURL || message.author.defaultAvatarURL).setThumbnail(message.author.avatarURL || message.author.defaultAvatarURL).setTitle('Kullanıcı;').addField('Oyun:', message.author.presence.game ? message.author.presence.game.name : 'Oyun oynamıyor', true).addField('Kimlik:', message.author.id, true).addField('Bot:', message.author.bot ? '\n Evet' : 'Hayır', true).addField('Rolleri:', message.guild.member(message.author).roles.map(m => m.name).join(' | '), true).addField('Son gönderdiği mesaj:', message.author.lastMessage || 'Yok', true).addField('Son gönderdiği mesajın kimliği:',message.author.lastMessageID || 'Yok', true).addField('Oluşturma tarihi:', message.author.createdAt.toLocaleDateString(), true).setFooter('DesertHawk', client.user.avatarURL).setTimestamp());
      const embed = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setAuthor(user.tag, user.avatarURL || user.defaultAvatarURL)
      .setThumbnail(user.avatarURL || user.defaultAvatarURL)
      .setTitle('Kullanıcı;')
      .addField('Oyun:', user.presence.game ? user.presence.game.name : 'Oyun oynamıyor', true)
      .addField('Kimlik:', user.id, true)
      .addField('Bot:', user.bot ? '\n Evet' : 'Hayır', true)
      .addField('Rolleri:', message.guild.member(user).roles.map(m => m.name).join(' | '), true)
      .addField('Son gönderdiği mesaj:', user.lastMessage || 'Yok', true)
      .addField('Son gönderdiği mesajın kimliği:', user.lastMessageID || 'Yok', true)
      .addField('Oluşturma tarihi:', user.createdAt.toLocaleDateString(), true)
      .setFooter('DesertHawk', client.user.avatarURL)
      .setTimestamp()
      message.channel.send(embed);
        };
  
  if (command === 'profil-resmi' || command === 'pp' || command === 'avatar') {
    let user = message.mentions.users.first();
    if (message.mentions.users.size < 1) return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Profil resmi;').setImage(message.author.avatarURL || message.author.defaultAvatarURL).setFooter('DesertHawk', client.user.avatarURL).setTimestamp());
    const embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle('Profil resmi;')
    .setImage(user.avatarURL || user.defaultAvatarURL)
    .setFooter('DesertHawk', client.user.avatarURL)
    .setTimestamp()
    message.channel.send(embed);
        };
  

  if (command === 'sunucuu' || command === 'sunucu-bilgii') {
    const emojiList = message.guild.emojis.map(e=>e.toString()).join(' ');
    if (!message.guild) {
    return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Sunucu;').setDescription(message.author.tag + ', bu komutu direkt mesajda kullanamazsın.').setFooter('DesertHawk', client.user.avatarURL).setTimestamp()); }
    const embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setAuthor(message.guild.name, message.guild.iconURL)
    .setThumbnail(message.guild.iconURL)
    .setTitle('Sunucu;')
    .addField('İsim kısaltması:', message.guild.nameAcronym, true)
    .addField('Kimliği:', message.guild.id, true)
    .addField('Bölgesi:', message.guild.region, true)
    .addField('Sahibi:', message.guild.owner, true)
    .addField('Doğrulama seviyesi:', message.guild.verificationLevel, true)
    .addField('Emojiler:', emojiList || 'Yok', true)
    .addField('Üyeler:', `${message.guild.members.filter(member => member.user.bot).size} bot / ${message.guild.memberCount} üye`, true)
    .addField('Varsayılan rol:', message.guild.defaultRole, true)
    .addField('Roller:', message.guild.roles.map(role => role.name).join(' | '), true)
    .addField('Kanallar:', `${message.guild.channels.filter(chan => chan.type === 'voice').size} sesli / ${message.guild.channels.filter(chan => chan.type === 'text').size} metin`, true)
    .addField('Kanal sayısı:', message.guild.channels.size, true)
    .addField('Ana kanalı:', message.guild.defaultChannel || 'Yok', true)
    .addField('Sistem kanalı:', message.guild.generalChannel || 'Yok', true)
    .addField('AFK kanalı:', message.guild.afkChannel || 'Yok', true)
    .addField('AFK zaman aşımı:', message.guild.afkTimeout + ' saniye', true)
    .addField('Oluşturma tarihi:', message.guild.createdAt.toLocaleDateString(), true)
    .setFooter('DesertHawk', client.user.avatarURL)
    .setTimestamp()
    message.channel.send(embed);
        };
  
  if (command === 'att' || command === 'kickk') {
    if (!message.guild) {
    return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('At;').setDescription(message.author.tag + ', bu komutu direkt mesajda kullanamazsın.').setFooter('DesertHawk', client.user.avatarURL).setTimestamp()); }
    let guild = message.guild
    let reason = args.slice(1).join(' ');
    let user = message.mentions.users.first();
    let modlog = guild.channels.find('name', 'DesertHawk');
    if (!modlog) return message.guild.createChannel('DesertHawk');
    if (message.mentions.users.size < 1) return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('At;').setDescription(message.author.tag + ', kullanım: tr!at <@kullanıcı> <sebep>.').setFooter('DesertHawk', client.user.avatarURL).setTimestamp());
    if (reason.length < 1) return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('At;').setDescription(message.author.tag + ', kullanım: tr!at <@kullanıcı> sebep>.').setFooter('DesertHawk', client.user.avatarURL).setTimestamp());

    if (!message.guild.member(user).kickable) return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('At;').setDescription(message.author.tag + ', yetkilileri atamam.').setFooter('DesertHawk', client.user.avatarURL).setTimestamp());
    message.guild.member(user).kick();

    const embed = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setTitle('Sunucudan atıldın;')
      .setDescription(message.guild.name + ' adlı sunucudan atıldın.')
      .addField('Yetkili:', message.author.tag, true)
      .addField('Sebep:', reason, true)
      .setFooter('DesertHawk', client.user.avatarURL)
      .setTimestamp()
    user.send(embed);
    const embed2 = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setTitle('At;')
      .setDescription(user.tag + ' adlı kullanıcı başarıyla atıldı.')
      .setFooter('DesertHawk', client.user.avatarURL)
      .setTimestamp()
    message.channel.send(embed2);
    const embed3 = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setTitle('At;')
      .addField('Kullanıcı:', user.tag, true)
      .addField('Yetkili:', message.author.tag, true)
      .addField('Sebep:', reason, true)
      .setFooter('DesertHawk', client.user.avatarURL)
      .setTimestamp()
    return guild.channels.get(modlog.id).send(embed3);
    economy.updateBalance(message.author.id, parseInt(5)).then((i) => {
          console.log('+')
        });
  }
  if (command === 'yasaklaa' || command === 'bann') {
    if (!message.member.permissions.has('BAN_MEMBERS')) return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Yasakla;').setDescription(message.author.tag + ', bu komutu kullanmak için gerekli izinlere sahip değilsin.').setFooter('DesertHawk', client.user.avatarURL).setTimestamp());
    if (!message.guild) {
    return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Yasakla;').setDescription(message.author.tag + ', bu komutu direkt mesajda kullanamazsın.').setFooter('DesertHawk', client.user.avatarURL).setTimestamp()); }
    let guild = message.guild
    let reason = args.slice(1).join(' ');
    let user = message.mentions.users.first();
    let modlog = guild.channels.find('name', 'DesertHawk');
    if (!modlog) return message.guild.createChannel('DesertHawk');
    if (message.mentions.users.size < 1) return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Yasakla;').setDescription(message.author.tag + ', kullanım: tr!yasakla <@kullanıcı> <sebep>.').setFooter('DesertHawk', client.user.avatarURL).setTimestamp());
    if (reason.length < 1) return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Yasakla;').setDescription(message.author.tag + ', kullanım: tr!yasakla <@kullanıcı> <sebep>.').setFooter('DesertHawk', client.user.avatarURL).setTimestamp());

    if (!message.guild.member(user).bannable) return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Yasakla;').setDescription(message.author.tag + ', yetkilileri yasaklayamam.').setFooter('DesertHawk', client.user.avatarURL).setTimestamp());
    message.guild.ban(user, 2);

    const embed = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setTitle('Sunucudan yasaklandın;')
      .setDescription(message.guild.name + ' adlı sunucudan yasaklandın.')
      .addField('Yetkili:', `${message.author.tag}`, true)
      .addField('Sebep:', reason, true)
      .setFooter('DesertHawk', client.user.avatarURL)
      .setTimestamp()
    user.send(embed);
    const embed2 = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setTitle('Yasakla;')
      .setDescription(user.tag + ' adlı kullanıcı başarıyla yasaklandı.')
      .setFooter('DesertHawk', client.user.avatarURL)
      .setTimestamp()
    message.channel.send(embed2);
    const embed3 = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setTitle('Yasakla;')
      .addField('Kullanıcı:', `${user.tag}`, true)
      .addField('Yetkili:', `${message.author.tag}`, true)
      .addField('Sebep:', reason, true)
      .setFooter('DesertHawk', client.user.avatarURL)
      .setTimestamp()
    return guild.channels.get(modlog.id).send(embed3);
    economy.updateBalance(message.author.id, parseInt(5)).then((i) => {
          console.log('+')
        });
  }
  if (command === 'uyar') {
    if (!message.member.permissions.has('KICK_MEMBERS')) return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Uyar;').setDescription(message.author.tag + ', bu komutu kullanmak için gerekli izinlere sahip değilsin.').setFooter('DesertHawk', client.user.avatarURL).setTimestamp());
    if (!message.guild) {
    return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Uyar;').setDescription(message.author.tag + ', bu komutu direkt mesajda kullanamazsın.').setFooter('DesertHawk', client.user.avatarURL).setTimestamp()); }
      let guild = message.guild
      let reason = args.slice(1).join(' ');
      let user = message.mentions.users.first();
      let modlog = guild.channels.find('name', 'DesertHawk');
      if (!modlog) return message.guild.createChannel('DesertHawk');
      if (message.mentions.users.size < 1) return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Uyar;').setDescription(message.author.tag + ', kullanım: tr!uyar <@kullanıcı> <sebep>.').setFooter('DesertHawk', client.user.avatarURL).setTimestamp());
      if (reason.length < 1) return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Uyar;').setDescription(message.author.tag + ', kullanım: tr!uyar <@kullanıcı> <sebep>.').setFooter('DesertHawk', client.user.avatarURL).setTimestamp());

      const embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setTitle('Sunucuda uyarıldın;')
        .setDescription(message.guild.name + ' adlı sunucuda uyarıldın.')
        .addField('Yetkili:', message.author.tag, true)
        .addField('Sebep:', reason, true)
        .setFooter('DesertHawk', client.user.avatarURL)
        .setTimestamp()
      user.send(embed);
      const embed2 = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setTitle('Uyar;')
        .setDescription(user.tag + ' adlı kullanıcı başarıyla uyarıldı.')
        .setFooter('DesertHawk', client.user.avatarURL)
        .setTimestamp()
      message.channel.send(embed2);
      const embed3 = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setTitle('Uyar;')
        .addField('Kullanıcı:', user.tag, true)
        .addField('Yetkili:', message.author.tag, true)
        .addField('Sebep:', reason, true)
        .setFooter('DesertHawk', client.user.avatarURL)
        .setTimestamp()
      return guild.channels.get(modlog.id).send(embed3)
        };
  
  if (command === 'sil') {
    if (!message.member.permissions.has('MANAGE_MESSAGES')) return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Sil;').setDescription(message.author.tag + ', bu komutu kullanmak için gerekli izinlere sahip değilsin.').setFooter('DesertHawk', client.user.avatarURL).setTimestamp());
    if (!message.guild) {
    return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Sil;').setDescription(message.author.tag + ', bu komutu direkt mesajda kullanamazsın.').setFooter('DesertHawk', client.user.avatarURL).setTimestamp()); }
    let guild = message.guild
    let modlog = guild.channels.find('name', 'DesertHawk');
    if (!modlog) return message.guild.createChannel('DesertHawk');
    let mesajsayisi = parseInt(args.join(' '));
    let mesaj = args.slice(0).join(' ');
    if (mesaj.length < 1) return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Sil;').setDescription(message.author.tag + ', kullanım: tr!sil <sayı>.').setFooter('DesertHawk', client.user.avatarURL).setTimestamp());
    if (mesajsayisi > 100) return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Sil;').setDescription(message.author.tag + ', 100 adetden fazla mesaj silemem.').setFooter('DesertHawk', client.user.avatarURL).setTimestamp());
    message.channel.bulkDelete(mesajsayisi + 1);
    const embed = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setTitle('Sil;')
      .setDescription(message.author.tag + ', mesajları başarıyla sildim.')
      .setFooter('DesertHawk', client.user.avatarURL)
      .setTimestamp()
    message.channel.send(embed);
    const embed2 = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setTitle('Sil;')
      .addField('Yetkili:', message.author.tag, true)
      .addField('Kanal:', message.channel.name, true)
      .addField('Mesaj sayısı:', mesajsayisi, true)
      .setFooter('DesertHawk', client.user.avatarURL)
      .setTimestamp()
    return guild.channels.get(modlog.id).send(embed2)
    message.delete()
        };
  
  if (command === 'sunucu-adı-değiştir') {
    if (!message.member.permissions.has('ADMINISTRATOR')) return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Sunucu adı değiştir;').setDescription(message.author.tag + ', bu komutu kullanmak için gerekli izinlere sahip değilsin.').setFooter('DesertHawk', client.user.avatarURL).setTimestamp());
    if (!message.guild) {
    return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Sunucu adı değiştir;').setDescription(message.author.tag + ', bu komutu direkt mesajda kullanamazsın.').setFooter('DesertHawk', client.user.avatarURL).setTimestamp()); }
    const sayMessage = args.join(' ');
    if (sayMessage.length < 1) return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Sunucu adı değiştir;').setDescription(message.author.tag + ', kullanım: tr!sunucu-adı-değiştir <mesaj>.').setFooter('DesertHawk', client.user.avatarURL).setTimestamp());
    message.guild.setName(sayMessage);
    const embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle('Sunucu adı değiştir;')
    .setDescription(message.author.tag + ', sunucu adı başarıyla değiştirildi.')
    .setFooter('DesertHawk', client.user.avatarURL)
    .setTimestamp()
    message.channel.send(embed);
    economy.updateBalance(message.author.id, parseInt(5)).then((i) => {
          console.log('+')
        });
  }
  if (command === 'sunucu-resmi-değiştir') {
    if (!message.member.permissions.has('ADMINISTRATOR')) return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Sunucu resmi değiştir;').setDescription(message.author.tag + ', bu komutu kullanmak için gerekli izinlere sahip değilsin.').setFooter('DesertHawk', client.user.avatarURL).setTimestamp());
    if (!message.guild) {
    return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Sunucu resmi değiştir;').setDescription(message.author.tag + ', bu komutu direkt mesajda kullanamazsın.').setFooter('DesertHawk', client.user.avatarURL).setTimestamp()); }
    const sayMessage = args.join(' ');
    if (sayMessage.length < 1) return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Sunucu resmi değiştir;').setDescription(message.author.tag + ', kullanım: tr!sunucu-resmi-değiştir <bağlantı>.').setFooter('DesertHawk', client.user.avatarURL).setTimestamp());
    message.guild.setIcon(sayMessage);
    const embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle('Sunucu resmi değiştir;')
    .setDescription(message.author.tag + ', sunucu resmi başarıyla değiştirildi.')
    .setFooter('DesertHawk', client.user.avatarURL)
    .setTimestamp()
    message.channel.send(embed);
    economy.updateBalance(message.author.id, parseInt(5)).then((i) => {
          console.log('+')
        });
  }
  if (command === 'kanal-aç') {
    if (!message.member.permissions.has('ADMINISTRATOR')) return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Kanal aç;').setDescription(message.author.tag + ', bu komutu kullanmak için gerekli izinlere sahip değilsin.').setFooter('DesertHawk', client.user.avatarURL).setTimestamp());
    if (!message.guild) {
    return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Kanal aç;').setDescription(message.author.tag + ', bu komutu direkt mesajda kullanamazsın.').setFooter('DesertHawk', client.user.avatarURL).setTimestamp()); }
    let mesaj = args.slice(0).join(' ');
    if (mesaj.length < 1) return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Kanal aç;').setDescription(message.author.tag + ', kullanım: tr!kanal-aç <mesaj>.').setFooter('DesertHawk', client.user.avatarURL).setTimestamp());
    const channel = message.guild.createChannel(mesaj);
    economy.updateBalance(message.author.id, parseInt(5)).then((i) => {
          console.log('+')
        });
  }
  if (command === 'rol-oluştur') {
    if (!message.member.permissions.has('ADMINISTRATOR')) return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Rol oluştur;').setDescription(message.author.tag + ', bu komutu kullanmak için gerekli izinlere sahip değilsin.').setFooter('DesertHawk', client.user.avatarURL).setTimestamp());
    if (!message.guild) {
    return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Rol oluştur;').setDescription(message.author.tag + ', bu komutu direkt mesajda kullanamazsın.').setFooter('DesertHawk', client.user.avatarURL).setTimestamp()); }
    const sayMessage = args.join(' ');
    if (sayMessage.length < 1) return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Rol oluştur;').setDescription(message.author.tag + ', kullanım: tr!rol-oluştur <mesaj>.').setFooter('DesertHawk', client.user.avatarURL).setTimestamp());
    message.guild.createRole({
                    name: sayMessage,
                    color: "#FF4000",
                    permission:[]
            });
    const embed = new Discord.RichEmbed()
     .setColor('RANDOM')
     .setTitle('Rol oluştur;')
     .setDescription(`Başarıyla rol oluşturdum!`)
     .setFooter('DesertHawk', client.user.avatarURL)
     .setTimestamp()
     message.channel.send(embed);
     economy.updateBalance(message.author.id, parseInt(5)).then((i) => {
          console.log('+')
        });
  }
  if(command === 'mc-sunucu') {
    const IPhere = args.join(' ');
    if (IPhere.length < 1) return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Minecraft sunucu;').setDescription(message.author.tag + ', kullanım: tr!mc-sunucu <sunucu IP>.').setFooter('DesertHawk', client.user.avatarURL).setTimestamp());
    var request = require('request');
      request('https://api.mcsrvstat.us/1/' + IPhere, function (error, response, body) {
      if(error) return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Minecraft sunucu;').setDescription(message.author.tag + ', bir şeyler ters gitti.').setFooter('DesertHawk', client.user.avatarURL).setTimestamp());

      var bodyJSON = JSON.parse(body)
      if(bodyJSON.debug.ping !== true) return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Minecraft sunucu;').setDescription(message.author.tag + ', bu sunucu kapalı.').setFooter('DesertHawk', client.user.avatarURL).setTimestamp());
      var serverIP = bodyJSON.ip
      var serverPort = bodyJSON.port
      var motd1 = bodyJSON.motd.clean[0]
      var motd2 = bodyJSON.motd.clean[1]
      if(!motd2){ 
        var motd2 = "No second line.";
      }
      var version = bodyJSON.version
      var onlinePlayers = bodyJSON.players.online
      var maxPlayers = bodyJSON.players.max
      const embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setTitle(motd1)
        .addField('Sunucu IP:', `${serverIP}:${serverPort}`, true)
        .addField('Sürüm:', version, true)
        .addField('Açıklama:', `${motd1}\n${motd2}`)
        .addField('Oyuncular (çevrimiçi/toplam):', `${onlinePlayers}/${maxPlayers}`, true)
        .setFooter('Minecraft sunucu', client.user.avatarURL)
        .setTimestamp()
        message.channel.send({embed})
        .catch(error => message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Minecraft sunucu;').setDescription(message.author.tag + ', bir şeyler ters gitti.').setFooter('DesertHawk', client.user.avatarURL).setTimestamp()));
    });
  }
  
  if (command === 'kısalt') {
    if (!args[0]) return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Kısalt;').setDescription(message.author.tag + ', kullanım: tr!kısalt <bağlantı>.').setFooter('DesertHawk', client.user.avatarURL).setTimestamp());
      if (!args[1]) {
        shorten.shorten(args[0], function(res) {
          message.channel.send(res);
        })
      } else {
        shorten.custom(args[0], args[1], function(res) {
          if (res.startsWith('Error')) return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Kısalt;').setDescription(res).setFooter('DesertHawk', client.user.avatarURL).setTimestamp());
          message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Kısalt;').setDescription(`<${res}>`).setFooter('DesertHawk', client.user.avatarURL).setTimestamp());
        })
      }
  }
  if (command === 'müzik-ara') {
    let mesaj = args.slice(0).join(' ');
    if (mesaj.length < 1) return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Müzik ara;').setDescription(message.author.tag + ', kullanım: tr!müzik-ara <mesaj>.').setFooter('DesertHawk', client.user.avatarURL).setTimestamp());
    genius.search(args.join(' '))
    .then(function(results) {
    return results[0]
      })
      .then(function(result) {
      const embed = new Discord.RichEmbed()
                .setColor('RANDOM')
                .setTitle('Müzik ara;')
                .addField('Müzik adı:', result.title, true)
                .addField('Sanatçı:', result.artist, true)
                .addField('Sözler:', '[Genius]('+result.url+')', true)
                .setFooter('DesertHawk', client.user.avatarURL)
                .setTimestamp()
                message.channel.send(embed);
        });
  }
  if (command === 'youtube') {
    let mesaj = args.slice(0).join(' ');
    if (mesaj.length < 1) return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('YouTube;').setDescription(message.author.tag + ', kullanım: tr!youtube <mesaj>.').setFooter('DesertHawk', client.user.avatarURL).setTimestamp());
   message.channel.send('', {
    embed: {
      type: 'rich',
      title: 'YouTube',
      description: '[' + args.toString().replace(/,/g, ' ') + '](https://www.youtube.com/results?search_query=' + args.toString().replace(/,/g, '+') + ')',
      color: 0xff4000
    }
        });
  }
  if (command === 'twitter') {
    let mesaj = args.slice(0).join(' ');
    if (mesaj.length < 1) return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Twitter;').setDescription(message.author.tag + ', kullanım: tr!twitter <mesaj>.').setFooter('DesertHawk', client.user.avatarURL).setTimestamp());
   message.channel.send('', {
    embed: {
      type: 'rich',
      title: 'Twitter',
      description: '[' + args.toString().replace(/,/g, ' ') + '](https://twitter.com/search?q=' + args.toString().replace(/,/g, '%20') + ')',
      color: 0xff4000
    }
   })
        };
  
  if (command === 'google') {
    let mesaj = args.slice(0).join(' ');
    if (mesaj.length < 1) return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Twitter;').setDescription(message.author.tag + ', kullanım: tr!twitter <mesaj>.').setFooter('DesertHawk', client.user.avatarURL).setTimestamp());
   message.channel.send('', {
    embed: {
      type: 'rich',
      title: 'Google',
      description: '[' + args.toString().replace(/,/g, ' ') + '](https://google.com/search?q=' + args.toString().replace(/,/g, '%20') + ')',
      color: 0xff4000
    }
   })
        };
  
  if (command === 'instagram') {
    let mesaj = args.slice(0).join(' ');
    if (mesaj.length < 1) return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Twitter;').setDescription(message.author.tag + ', kullanım: tr!twitter <mesaj>.').setFooter('DesertHawk', client.user.avatarURL).setTimestamp());
   message.channel.send('', {
    embed: {
      type: 'rich',
      title: 'İnstagram',
      description: '[' + args.toString().replace(/,/g, ' ') + '](https://instagram.com/' + args.toString().replace(/,/g, '%20') + ')',
      color: 0xff4000
    }
   })
        };
  
  if (command === 'github') {
    let mesaj = args.slice(0).join(' ');
    if (mesaj.length < 1) return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('GitHub;').setDescription(message.author.tag + ', kullanım: tr!github <mesaj>.').setFooter('DesertHawk', client.user.avatarURL).setTimestamp());
   message.channel.send('', {
    embed: {
      type: 'rich',
      title: 'GitHub',
      description: '[' + args.toString().replace(/,/g, ' ') + '](https://github.com/search?q=' + args.toString().replace(/,/g, '+') + ')',
      color: 0xff4000
    }
   })
        };
  
  if (command === 'discord-bots') {
    let mesaj = args.slice(0).join(' ');
    if (mesaj.length < 1) return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Twitter;').setDescription(message.author.tag + ', kullanım: tr!twitter <mesaj>.').setFooter('DesertHawk', client.user.avatarURL).setTimestamp());
   message.channel.send('', {
    embed: {
      type: 'rich',
      title: 'Discord Bots',
      description: '[' + args.toString().replace(/,/g, ' ') + '](https://discordbots.org/search?q=' + args.toString().replace(/,/g, '%20') + ')',
      color: 0xff4000
    }
   })
        };
  
    if (command === 'facebook') {
    let mesaj = args.slice(0).join(' ');
    if (mesaj.length < 1) return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Twitter;').setDescription(message.author.tag + ', kullanım: tr!twitter <mesaj>.').setFooter('DesertHawk', client.user.avatarURL).setTimestamp());
   message.channel.send('', {
    embed: {
      type: 'rich',
      title: 'Facebook',
      description: '[' + args.toString().replace(/,/g, ' ') + '](https://facebook.com/search/top/?q=' + args.toString().replace(/,/g, '%20') + ')',
      color: 0xff4000
    }
   })
        };
  

  if (command === '1v1') {
    if (!message.guild) {
      return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Eval;').setDescription(message.author.username + ', bu komutu direkt mesajda kullanamazsın.').setFooter('DesertHawk', client.user.avatarURL).setTimestamp()); }
    let user = message.mentions.users.first();
    if (message.mentions.users.size < 2) return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('2v2;').setDescription(message.author.tag + ', kullanım: tr!2v2 <@kullanıcı> <@kullanıcı>.').setFooter('DesertHawk', client.user.avatarURL).setTimestamp());
      message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('2v2;').setDescription('Savaş başladı!').setFooter('DesertHawk', client.user.avatarURL).setTimestamp())
      .then(nmsg => nmsg.edit(new Discord.RichEmbed().setColor('RANDOM').setTitle('2v2;').setDescription('Savaşılıyor %25.').setFooter('DesertHawk', client.user.avatarURL).setTimestamp()))
      .then(nmsg => nmsg.edit(new Discord.RichEmbed().setColor('RANDOM').setTitle('2v2;').setDescription('Savaşılıyor %50.').setFooter('DesertHawk', client.user.avatarURL).setTimestamp()))
      .then(nmsg => nmsg.edit(new Discord.RichEmbed().setColor('RANDOM').setTitle('2v2;').setDescription('Savaşılıyor %75.').setFooter('DesertHawk', client.user.avatarURL).setTimestamp()))
      .then(nmsg => nmsg.edit(new Discord.RichEmbed().setColor('RANDOM').setTitle('2v2;').setDescription('Savaşılıyor %100.').setFooter('DesertHawk', client.user.avatarURL).setTimestamp()))
      .then(nmsg => nmsg.edit(new Discord.RichEmbed().setColor('RANDOM').setTitle('2v2;').setDescription('Savaş bitti!').setFooter('DesertHawk', client.user.avatarURL).setTimestamp()))
      .then(nmsg => nmsg.edit(new Discord.RichEmbed().setColor('RANDOM').setTitle('2v2;').setDescription('Kazanan: ' + user.tag).setFooter('DesertHawk', client.user.avatarURL).setTimestamp()));
        };
  
  if (command === '2v2') {
    if (!message.guild) {
      return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Eval;').setDescription(message.author.username + ', bu komutu direkt mesajda kullanamazsın.').setFooter('DesertHawk', client.user.avatarURL).setTimestamp()); }
    let user = message.mentions.users.first();
    if (message.mentions.users.size < 3) return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('3v3;').setDescription(message.author.tag + ', kullanım: tr!3v3 <@kullanıcı> <@kullanıcı> <@kullanıcı>.').setFooter('DesertHawk', client.user.avatarURL).setTimestamp());
      message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('3v3;').setDescription('Savaş başladı!').setFooter('DesertHawk', client.user.avatarURL).setTimestamp())
      .then(nmsg => nmsg.edit(new Discord.RichEmbed().setColor('RANDOM').setTitle('3v3;').setDescription('Savaşılıyor %25.').setFooter('DesertHawk', client.user.avatarURL).setTimestamp()))
      .then(nmsg => nmsg.edit(new Discord.RichEmbed().setColor('RANDOM').setTitle('3v3;').setDescription('Savaşılıyor %50.').setFooter('DesertHawk', client.user.avatarURL).setTimestamp()))
      .then(nmsg => nmsg.edit(new Discord.RichEmbed().setColor('RANDOM').setTitle('3v3;').setDescription('Savaşılıyor %75.').setFooter('DesertHawk', client.user.avatarURL).setTimestamp()))
      .then(nmsg => nmsg.edit(new Discord.RichEmbed().setColor('RANDOM').setTitle('3v3;').setDescription('Savaşılıyor %100.').setFooter('DesertHawk', client.user.avatarURL).setTimestamp()))
      .then(nmsg => nmsg.edit(new Discord.RichEmbed().setColor('RANDOM').setTitle('3v3;').setDescription('Savaş bitti!').setFooter('DesertHawk', client.user.avatarURL).setTimestamp()))
      .then(nmsg => nmsg.edit(new Discord.RichEmbed().setColor('RANDOM').setTitle('3v3;').setDescription('Kazanan: ' + user.tag).setFooter('DesertHawk', client.user.avatarURL).setTimestamp()))
        };
  
  if (command === '4v4') {
    if (!message.guild) {
      return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Eval;').setDescription(message.author.username + ', bu komutu direkt mesajda kullanamazsın.').setFooter('DesertHawk', client.user.avatarURL).setTimestamp()); }
    let user = message.mentions.users.first();
    if (message.mentions.users.size < 4) return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('4v4;').setDescription(message.author.tag + ', kullanım: tr!4v4 <@kullanıcı> <@kullanıcı> <@kulanıcı> <@kullanıcı>.').setFooter('DesertHawk', client.user.avatarURL).setTimestamp());
      message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('4v4;').setDescription('Savaş başladı!').setFooter('DesertHawk', client.user.avatarURL).setTimestamp())
      .then(nmsg => nmsg.edit(new Discord.RichEmbed().setColor('RANDOM').setTitle('4v4;').setDescription('Savaşılıyor %25.').setFooter('DesertHawk', client.user.avatarURL).setTimestamp()))
      .then(nmsg => nmsg.edit(new Discord.RichEmbed().setColor('RANDOM').setTitle('4v4;').setDescription('Savaşılıyor %50.').setFooter('DesertHawk', client.user.avatarURL).setTimestamp()))
      .then(nmsg => nmsg.edit(new Discord.RichEmbed().setColor('RANDOM').setTitle('4v4;').setDescription('Savaşılıyor %75.').setFooter('DesertHawk', client.user.avatarURL).setTimestamp()))
      .then(nmsg => nmsg.edit(new Discord.RichEmbed().setColor('RANDOM').setTitle('4v4;').setDescription('Savaşılıyor %100.').setFooter('DesertHawk', client.user.avatarURL).setTimestamp()))
      .then(nmsg => nmsg.edit(new Discord.RichEmbed().setColor('RANDOM').setTitle('4v4;').setDescription('Savaş bitti!').setFooter('DesertHawk', client.user.avatarURL).setTimestamp()))
      .then(nmsg => nmsg.edit(new Discord.RichEmbed().setColor('RANDOM').setTitle('4v4;').setDescription('Kazanan: ' + user.tag).setFooter('DesertHawk', client.user.avatarURL).setTimestamp()))
        };
  
  if (command === 'sunucu-davet') {
    if (!message.guild) {
      return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Eval;').setDescription(message.author.username + ', bu komutu direkt mesajda kullanamazsın.').setFooter('DesertHawk', client.user.avatarURL).setTimestamp()); }
    message.guild.channels.get(message.channel.id).createInvite().then(invite =>
    message.channel.send('Bu sunucunun davet bağlantısı;\n' + invite.url)
   );
    economy.updateBalance(message.author.id, parseInt(5)).then((i) => {
          console.log('+')
        });
  }
  if (command === 'reklam-kontrol') {
    if (!message.guild) {
      return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Eval;').setDescription(message.author.username + ', bu komutu direkt mesajda kullanamazsın.').setFooter('DesertHawk', client.user.avatarURL).setTimestamp()); }
    const members = message.guild.members.filter(member => member.user.presence.game && /(discord\.(gg|io|me|li)\/.+|discordapp\.com\/invite\/.+)/i.test(member.user.presence.game.name))
    return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Reklam kontrol;').setDescription(members.map(member => member.displayName + ' adlı kullanıcının aktivite kısmında sunucu bağlantısı var.').join('\n') || message.author.username + ', kimse aktivite kısmına sunucu bağlantısı koymamış.').setFooter('DesertHawk', client.user.avatarURL).setTimestamp());

        };
  if (command === 'hata' || command === 'bug') {
    let type = args.slice(0).join(' ');
        if (type.length < 1) return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Hata;').setDescription(message.author.tag + ', kullanım: tr!hata <mesaj>.').setFooter('DesertHawk', client.user.avatarURL).setTimestamp());
    const embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle('Hata;')
    .setDescription(message.author.tag + ', hatanız başarıyla gönderildi.')
    .setFooter('DesertHawk', client.user.avatarURL)
    .setTimestamp()
    message.channel.send(embed);
    const embed2 = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle('Hata;')
    .addField('Hata:', type, true)
    .addField('Kullanıcı:', message.author.tag, true)
    .addField('Sunucu:', message.guild.name, true)
    .setFooter('DesertHawk', client.user.avatarURL)
    .setTimestamp()
    client.channels.get('434478811174797313').send(embed2);
        };
  
  if (command === 'oyun-öneri') {
    var cumleler= ['Grand Theft Auto', 'Minecraft', 'ROBLOX', 'Unturned', 'Creativerse', 'Prototype', 'Call of Duty', 'Zula', 'PLAYERUNKNOWNS BATTLEGROUNDS', 'League of Legends', 'Growtopia', 'Team Fortress', 'Counter-Strike', 'Garrys Mod', 'Black Desert Online', 'Rocket Leauge', 'Warframe', 'Battlefield', 'Half-Life', 'Rust', 'H1Z1', 'Fortnite', 'Overwatch', 'World of Tanks'];
    var cumle = cumleler[Math.floor(Math.random() * cumleler.length)];
    const embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle('Oyun öneri;')
    .setDescription(cumle)
    .setFooter('DesertHawk', client.user.avatarURL)
    .setTimestamp()
    message.channel.send(embed);
        };
  
  if (command === 'espri' || command === 'espiri') {
    var espriler = ['Seni görünce; \ngözlerim dolar, \nkulaklarım euro.','Gidenin arkasına bakmayın yoksa geleni göremezsiniz.','+Oğlum canlılara örnek ver. \n-Kedi, köpek. \n+Cansızlara örnek ver. \n-Ölü kedi, ölü köpek.','+Kanka ben banyoya 3 kişi giriyorum. \n-Oha nasıl? \n+Hacı, Şakir ve ben. \n-Defol lan!','+Kocanızla ortak özelliğiniz ne? \n-Aynı gün evlendik.','+Evladım ödevini neden yapmadın? \n-Bilgisayarım uyku modundaydı, uyandırmaya kıyamadım.','+Bizim arkadaş ortamında paranın lafı bile olmaz. \n-Niye ki? \n+Çünkü hiç birimizin parası yok.','Annemin bahsettiği elalem diye bir örgüt var illuminatiden daha tehlikeli yemin ederim.','+Acıkan var mı ya? \n-Yok bizde tatlı kan var.','Yılanlardan korkma, yılmayanlardan kork.','+Baykuşlar vedalaşırken ne der? \n-Bay bay baykuş.','Beni Ayda bir sinemaya götürme, Marsta bir sinemaya götür.','Aaa siz çok terlemişsiniz durun size terlik getireyim.','Aklımı kaçırdım, 100.000 TL fidye istiyorum.'];
    var espri = espriler[Math.floor(Math.random() * espriler.length)];
    const embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle('Espri;')
    .setDescription(espri)
    .setFooter('DesertHawk', client.user.avatarURL)
    .setTimestamp()
    message.channel.send(embed);
        };
  
  if (command === 'rastgele-sayı') {
    let sayılar = Math.floor(Math.random() * 100)
    const embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle('Rastgele sayı;')
    .setDescription(sayılar)
    .setFooter('DesertHawk', client.user.avatarURL)
    .setTimestamp()
    message.channel.send(embed);
        };
  
  if (command === 'rastgele-kullanıcı') {
    if (!message.guild) {
    return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Rastgele kullanıcı;').setDescription(message.author.username + ', bu komutu direkt mesajda kullanamazsın.').setFooter('DesertHawk', client.user.avatarURL).setTimestamp()); }
    const embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle('Rastgele kullanıcı;')
    .setDescription(message.guild.members.random().displayName)
    .setFooter('DesertHawk', client.user.avatarURL)
    .setTimestamp()
    message.channel.send(embed);
    economy.updateBalance(message.author.id, parseInt(5)).then((i) => {
          console.log('+')
        });
  }
  if (command === 'yazı-tura') {
    var result = Math.floor((Math.random() * 2) + 1);
    if (result == 1) {
      const embed = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setTitle('Yazı-tura;')
      .setDescription('Tura.')
      .setImage('https://i.hizliresim.com/MaoYG2.jpg')
      .setFooter('DesertHawk', client.user.avatarURL)
      .setTimestamp()
      message.channel.send(embed);
    } else if (result == 2) {
      const embed = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setTitle('Yazı-tura;')
      .setDescription('Yazı.')
      .setImage('https://i.hizliresim.com/QpvX3G.jpg')
      .setFooter('DesertHawk', client.user.avatarURL)
      .setTimestamp()
      message.channel.send(embed);
    }
        };
  
  if (command === 'taş-kağıt-makas' || command === 'tkm') {
    var cumleler= ['Taş.', 'Kağıt.', 'Makas.'];
    var cumle = cumleler[Math.floor(Math.random() * cumleler.length)];
    const embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle('Taş-kağıt-makas;')
    .setDescription(cumle)
    .setFooter('DesertHawk', client.user.avatarURL)
    .setTimestamp()
    message.channel.send(embed);
        };
  
  if (command === 'sigara') {
    message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Sigara;').setDescription(':smoking: :cloud::cloud::cloud::cloud:').setFooter('DesertHawk', client.user.avatarURL).setTimestamp())
      .then(nmsg => nmsg.edit(new Discord.RichEmbed().setColor('RANDOM').setTitle('Sigara;').setDescription(':smoking: :cloud::cloud::cloud:').setFooter('DesertHawk', client.user.avatarURL).setTimestamp()))
      .then(nmsg => nmsg.edit(new Discord.RichEmbed().setColor('RANDOM').setTitle('Sigara;').setDescription(':smoking: :cloud::cloud:').setFooter('DesertHawk', client.user.avatarURL).setTimestamp()))
      .then(nmsg => nmsg.edit(new Discord.RichEmbed().setColor('RANDOM').setTitle('Sigara;').setDescription(':smoking: :cloud::cloud::cloud:').setFooter('DesertHawk', client.user.avatarURL).setTimestamp()))
      .then(nmsg => nmsg.edit(new Discord.RichEmbed().setColor('RANDOM').setTitle('Sigara;').setDescription(':smoking: :cloud::cloud:').setFooter('DesertHawk', client.user.avatarURL).setTimestamp()))
      .then(nmsg => nmsg.edit(new Discord.RichEmbed().setColor('RANDOM').setTitle('Sigara;').setDescription(':smoking: :cloud:').setFooter('DesertHawk', client.user.avatarURL).setTimestamp()))
      .then(nmsg => nmsg.edit(new Discord.RichEmbed().setColor('RANDOM').setTitle('Sigara;').setDescription('Sigaram bitti.').setFooter('DesertHawk', client.user.avatarURL).setTimestamp()))
      economy.updateBalance(message.author.id, parseInt(5)).then((i) => {
          console.log('+')
        });
  }
  if (command === 'topla') {
    let mesaj = args.slice(0).join(' ');
    if (mesaj.length < 1) return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Topla;').setDescription(message.author.tag + ', kullanım: tr!topla <sayı> <sayı>.').setFooter('DesertHawk', client.user.avatarURL).setTimestamp());
    let numArray = args.map(n=> parseInt(n));
    let total = numArray.reduce( (p, c) => p+c);
    const embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle('Cevap;')
    .setDescription(total || message.author.tag + ', harfler yerine sayılar yaz.')
    .setFooter('DesertHawk', client.user.avatarURL)
    .setTimestamp()
    message.channel.send(embed);
    economy.updateBalance(message.author.id, parseInt(5)).then((i) => {
          console.log('+')
        });
  }
  if (command === 'çıkar') {
    let mesaj = args.slice(0).join(' ');
    if (mesaj.length < 1) return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Çıkar;').setDescription(message.author.tag + ', kullanım: tr!çıkar <sayı> <sayı>.').setFooter('DesertHawk', client.user.avatarURL).setTimestamp());
    let numArray = args.map(n=> parseInt(n));
    let total = numArray.reduce( (p, c) => p-c);
    const embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle('Cevap;')
    .setDescription(total || message.author.tag + ', harfler yerine sayılar yaz.')
    .setFooter('DesertHawk', client.user.avatarURL)
    .setTimestamp()
    message.channel.send(embed);
    economy.updateBalance(message.author.id, parseInt(5)).then((i) => {
          console.log('+')
        });
  }
  if (command === 'çarp') {
    let mesaj = args.slice(0).join(' ');
    if (mesaj.length < 1) return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Çarp;').setDescription(message.author.tag + ', kullanım: tr!çarp <sayı> <sayı>.').setFooter('DesertHawk', client.user.avatarURL).setTimestamp());
    let numArray = args.map(n=> parseInt(n));
    let total = numArray.reduce( (p, c) => p*c);
    const embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle('Cevap;')
    .setDescription(total || message.author.tag + ', harfler yerine sayılar yaz.')
    .setFooter('DesertHawk', client.user.avatarURL)
    .setTimestamp()
    message.channel.send(embed);
    economy.updateBalance(message.author.id, parseInt(5)).then((i) => {
          console.log('+')
        });
  }
  if (command === 'böl') {
    let mesaj = args.slice(0).join(' ');
    if (mesaj.length < 1) return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Böl;').setDescription(message.author.tag + ', kullanım: tr!böl <sayı> <sayı>.').setFooter('DesertHawk', client.user.avatarURL).setTimestamp());
    let numArray = args.map(n=> parseInt(n));
    let total = numArray.reduce( (p, c) => p/c);
    const embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle('Cevap;')
    .setDescription(total || message.author.tag + ', harfler yerine sayılar yaz.')
    .setFooter('DesertHawk', client.user.avatarURL)
    .setTimestamp()
    message.channel.send(embed);
    economy.updateBalance(message.author.id, parseInt(5)).then((i) => {
          console.log('+')
        });
  }
});


client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};



var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);
