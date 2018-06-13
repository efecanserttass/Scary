const prefix = "ayarlar.prefix";
const client = new Discord.Client();
 
	exports.run = ('message', msg => {
    	if (msg.content === prefix + 'yardım') {
	const embed = new Discord.RichEmbed()
  	.setTitle("Bot Komutları")
  	.setAuthor("Scary ∞ | Komutlar (s!) İle Başlar", "")
  	.setColor("RANDOM")
  	.setDescription('davet • Botun davet linkini atar.\nYeni Kodlar Gelicek\nbug • Bottaki bugu bildirmenizi sağlar.\nping • Botun pingini gösterir.\nsunucubilgi • Bu komutu hangi sunucuda kullanıysanız oranın bilgisini verir.\ntavsiye • Botun sahibine verdiğiniz tavsiyeyi gönderir.\n')
  	.addField("Moderasyon Komutları", "ban • Belirttiğiniz kişiyi sunucudan banlar.\nkick • Belirttiğiniz kişiyi sunucudan atar.\nsustur • Belirttiğin kişiyi susturur.\ntemizle • Sohbeti belirttiğin sayı kadar siler.\nunban • Belirttiğin kişinin sunucudaki yasağını kaldırır.\noylama • Oylama Açarsınız.\nhastebin • Hastebine Kod Ekler.\n")
  	.addField("Eğlence Komutları", "gif•  Nice Gif.\nçayiç • Çay İçersiniz.\nbayrak • Şanlı Bayrağımız.\nparti • Parti Başlasın\npcaç • Bilgisayarı Açar.\nbanned • Dene Ve Gör.\n8ball • Bende Bilmiyorum.\nağla • Bot Ağlar.\natom • Atom Bombası.\ndeğişikahtapot • Çok Değişik.\nespri • Espri Atar.\nsigara • Sigara İçersiniz.\ntrollgifler • Troll.\n", true)
  	.addField(" Kullanıcı Komutları", "• Yeni Kodlar Gelicek\nkurucu • Sunucunun kurucusunu gösterir.\nkullanıcıbilgim • Bu komutu kullanan her kimse hakkında bilgi verir.\n", true)
  	message.channel.send({embed});
	};
	});	
