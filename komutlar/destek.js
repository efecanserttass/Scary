const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const fs = require('fs');

module.exports = class SupportCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'destek',
			group: 'genel',
			memberName: 'destek',
			description: 'Destek bildirimi açmanızı sağlar.',
			examples: ['destek test'],
			guildOnly: true,
			guarded: true,

		args: [
                {
                    key: 'destek',
                    prompt: 'Lütfen destek bildiriminizi yazın?',
                    type: 'string',
                }
            ]
        });
    }

	async run(msg, args) {
        let isEnabled = false
        let chan = msg.channel
        const client = this.client

        const o = client.guilds.find("id", ``).channels.find("id", ``)

        const collector = this.client.guilds.find("id", ``).channels.find("id", ``).createCollector(message => 
            message.content.startsWith('çağrıyı'), {
                time: 0
            }
        )

        this.client.guilds.find("id", ``).channels.find("id", ``).send(`\`çağrıyı yanıtla\` yazarak çağrıyı yanıtlayabilir, \`çağrıyı reddet\` yazarak çağrıyı reddedebilirsiniz!`)
        collector.on('message', (message) => {
            if (message.content === 'çağrıyı reddet') collector.stop('aborted')
            if (message.content === 'çağrıyı yanıtla') collector.stop('success')
        })
        collector.on('end', (collected, reason) => {
            if (reason === 'aborted') {
                msg.reply(':x: Çağrı reddedildi!')
                o.send(':x: Çağrı başarıyla reddedildi!')
            }
            if (reason === 'success') {
                o.send(':white_check_mark:  Çağrı başarıyla alındı!')
                o.send(':exclamation: Lütfen karşı taraf mesaj yazana kadar siz mesaj yazmayın!')
                o.send(':exclamation: Lütfen karşı tarafı rahatsız edecek mesaj yazmayın!')
                o.send(':exclamation: Lütfen karşı tarafla kişisel meselelerinizi konuşmayın!')
                o.send('\`çağrıyı reddet\` yazarak çağrıyı kapatabilirsin.')
                chan.send(`${msg.author}`)
                chan.send(':white_check_mark:  Çağrın destek ekibimiz tarafından alındı!')
                chan.send('\`çağrıyı reddet\` yazarak çağrıyı kapatabilirsin!')
                setTimeout(() => {
                    chan.send(':star: FlameGUN destek sistemine hoşgeldiniz! Size nasıl yardımcı olabiliriz?');
                }, 1000)
                isEnabled = true
                client.on('message', message => {
                    function contact() {
                        if (message.author.id === client.user.id) return
                        if (message.author.bot) return
                        if (isEnabled === false) return
                        if (message.content.startsWith('çağrıyı reddet')) {
                            if (message.channel.id === chan.id) o.send(':x: Çağrı karşı taraf tarafından reddedildi.')
                            if (message.channel.id === "") chan.send(':x: Çağrı karşı taraf tarafından reddedildi.')
                            return isEnabled = false
                        }
                        if (message.channel.id === chan.id) o.send(`:telephone_receiver: **${message.author.tag}**: ${message.content}`)
                        if (message.channel.id === "") chan.send(`:star: **${message.author.tag}**: ${message.content}`)
                    }
                    contact(client)
                })
            }
        })
	}
}

