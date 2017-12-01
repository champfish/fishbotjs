const Discord = require("discord.js");
const client = new Discord.Client();
const token = '-ZgN7xVZlpHDiY-TYpcCLrL0YVgrsdwv'

console.log('Bot Started!');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
});

client.login(token);
