const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const ayarlar = require('./ayarlar.json');

client.on('message', m => {
  if (!m.guild) return;
  if (m.content.startsWith('gir')) {
    const channel = m.guild.channels.get(m.content.split(' ')[1]) || m.member.voiceChannel;
    if (channel && channel.type === 'voice') {
      channel.join().then(conn => {
        conn.player.on('error', (...e) => console.log('player', ...e));
        if (!connections.has(m.guild.id)) connections.set(m.guild.id, { conn, queue: [] });
        m.reply('Geldim!');
      });
    } else {
      m.reply('Sesli Kanalda Degilsin.');
    }
  }