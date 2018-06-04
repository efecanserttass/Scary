

	const Discord = require("discord.js");
	const botconfig = require("./botconfig.json");
	const fs = require("fs");
	let bot = new Discord.Client();
	bot.commands = new Discord.Collection();
	const coins = require("./coins.json");
	const xp = require("./xp.json");
	const db = require('quick.db');
        const DBL = require("dblapi.js");
        const dbl = new DBL(process.env.DBL_TOKEN, bot);

	bot.on('ready', () => {
	console.log("Yukleniyor...");
	setTimeout(function(){
	console.log("Scary basariyla yuklendi.");
	}, 1000);
	function botStatus() {
        let status = [
            `Benim Prefixim: ${botconfig.prefix}`,
            `Teşekkürler: ${bot.guilds.size} sunucu.`,
            `♥ Scary ♥`,
            `Sahibi: Yusuf`,
            `Hizmet veriyor: ${bot.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString()} Kullanıcıya`
        ];
        let rstatus = Math.floor(Math.random() * status.length);

        bot.user.setActivity(status[rstatus], {Type: 'STREAMING'});        // BOT STATUS
      }; setInterval(botStatus, 20000)
        setInterval(() => {
        dbl.postStats(bot.guilds.size)
        }, 1800000);
	})

	fs.readdir("./komutlar/", (err, files) => {
    console.log(`Yuklendi ${files.length} komut.`)
	if(err) console.log(err);
	let jsfile = files.filter(f => f.split(".").pop() === "js");
	if(jsfile.length <= 0){
	console.log("Komut bulunamadı.");
	return;
	}


	jsfile.forEach((f, i) =>{
	let props = require(`./komutlar/${f}`);
	console.log(`${f} yuklendi.`);
	bot.commands.set(props.help.name, props);
	});
	});

	bot.on("message", async message => {
      let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
  if(!prefixes[message.guild.id]){
    prefixes[message.guild.id] = {
      prefixes: botconfig.prefix
    };
  }

    let prefix = prefixes[message.guild.id].prefixes;
	if(message.author.bot) return undefined;
	if(message.channel.type === 'dm') return ;
        if(message.content.toLowerCase() === '<@419936204117770241>'){
        let embed = new Discord.RichEmbed()
       .setTitle("Zappara Pro")
       .addField("Prefix", `\`${prefix}\``, true)
       .addField("Yardım", `\`${prefix}yardım\``, true)
       .setThumbnail(bot.user.displayAvatarURL)
       .setColor(`${message.guild.me.displayHexColor!=='#000000' ? message.guild.me.displayHexColor : 0xffffff}`);
        message.channel.send(embed);
        }

	let args = message.content.slice(prefix.length).trim().split(" ");
	let cmd = args.shift().toLowerCase();
	if(message.author.bot) return undefined;
	if(!message.content.startsWith(prefix)) return undefined;
   message.prefix = prefix;


	try {
	let commandFile = require(`./komutlar/${cmd}.js`);
	commandFile.run(bot, message, args);
	if(!commandFile) return message.channel.send("Bu isimde hiçbir komut bulunamadı.");
	} catch (e) { console.log(e) }

	if(!coins[message.author.id]){
	coins[message.author.id] = {
	coins: 0
	};
	}

	let coinAmt = Math.floor(Math.random() * 15) + 14;
	let baseAmt = Math.floor(Math.random() * 15) + 14;
 



	if(coinAmt === baseAmt){
	coins[message.author.id] = {
	coins: coins[message.author.id].coins + coinAmt
	};
	fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
	if (err) console.log(err)
	});

	}

	let xpAdd = Math.floor(Math.random() * 15) + 14;


	if(!xp[message.author.id]){
	xp[message.author.id] = {
	xp: 0,
	level: 1
	};
	}


	let curxp = xp[message.author.id].xp;
	let curlvl = xp[message.author.id].level;
	let nxtLvl = xp[message.author.id].level * 300;
	xp[message.author.id].xp =  curxp + xpAdd;
	if(nxtLvl <= xp[message.author.id].xp){
	xp[message.author.id].level = curlvl + 1;

	}
	fs.writeFile("./xp.json", JSON.stringify(xp), (err) => {
	if(err) console.log(err)
	});


	});
	bot.on('guildMemberAdd', member => {
    bot.channels.get('451091996287696910').setName(`Toplam Üye: ${member.guild.memberCount}`)
    let humans = member.guild.members.filter(m => !m.user.bot).size;
    bot.channels.get('453198762102489098').setName(`Üye Sayısı: ${humans}`)
    let bots = member.guild.members.filter(m => m.user.bot).size;
    bot.channels.get('453199063958159370').setName(`Bot Sayısı: ${bots}`)
	const members = member.guild.memberCount;
	const channel = member.guild.channels.find('name', 's-ekleyenler');
	if (!channel) return;

       let Role = member.guild.roles.find(`name`, "Bot");
       if(member.user.bot){
	member.addRole(Role.id)
       }else{
      let role = member.guild.roles.find(`name`, "Üye");
	member.addRole(role.id)
       }
 
	let Embed = new Discord.RichEmbed()
	.setFooter(`Katıldı | Üye- ${member.guild.memberCount}`)
	.setColor("#cde246")    
	.setAuthor(`**${member.displayName}** isimli üye **${member.guild.name}** sunucusuna katıldı.`, member.user.displayAvatarURL)
	.setTimestamp()
	channel.send(Embed);
	});
	bot.on('guildMemberRemove', member => {
    bot.channels.get('453199237459738625').setName(`Toplam Üye: ${member.guild.memberCount}`)
    let humans = member.guild.members.filter(m => !m.user.bot).size;
    bot.channels.get('453199322255851521').setName(`Üye Sayısı: ${humans}`)
    let bots = member.guild.members.filter(m => m.user.bot).size;
    bot.channels.get('453199491835887616').setName(`Bot Sayısı: ${bots}`)
	const channel = member.guild.channels.find(`name`, 's-atanlar');
	if(!channel) return; 
	let Embed = new Discord.RichEmbed()
	.setColor("#e26346")
	.setAuthor(`**${member.displayName}** isimli üye **${member.guild.name}** isimli sunucudan ayrıldı`, member.user.displayAvatarURL)
	.setTimestamp()
	.setFooter(`Ayrıldı | Üyeler- ${member.guild.memberCount}`)
	channel.send(Embed);
	});

	bot.on('guildCreate', guild => {
	      let channel = bot.channels.get("453206226390745098")
        const embed = new Discord.RichEmbed()
        .setColor("#cde246")
        .setAuthor(`Katıldım - ${guild.name}`)
        .setThumbnail(guild.iconURL)
        .addField("Sahibi", guild.owner.user.tag)
        .addField("ID", guild.id, true)
        .addField("Üye Sayısı", guild.memberCount, true)
        .addField("Kanal Sayısı", guild.channels.size, true)
         channel.send(embed);
	});
	bot.on('guildDelete', guild => {
	      let channel = bot.channels.get("453206192718872577")
        const embed = new Discord.RichEmbed()
        .setColor("#cde246")
        .setAuthor(`Ayrıldım - ${guild.name}`)
        .setThumbnail(guild.iconURL)
        .addField("Sahibi", guild.owner.user.tag)
        .addField("ID", guild.id, true)
        .addField("Üye Sayısı", guild.memberCount, true)
        .addField("Kanal Sayısı", guild.channels.size, true)
         channel.send(embed);
	});
	bot.login(process.env.BOT_TOKEN);
