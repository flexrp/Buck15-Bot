const Discord = require('discord.js');

const client = new Discord.Client();

const prefix  = '-'

const fs = require('fs');
const { execute } = require('./commands/twitch');


client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`)
    client.commands.set(command.name , command)
}

client.on('ready' , ()=>{
  console.log('Buck145 Bot is online')
})

client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;




    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLocaleLowerCase()
    
    if(command === 'ping'){
       client.commands.get('ping').execute(message, args)
    }else if (command == 'youtube'){
        client.commands.get('youtube').execute(message, args)
    } else if (command == 'twitch'){
        client.commands.get('twitch').execute(message, args)
    } else if (command == 'sts'){
        client.commands.get('sts').execute(message, args)
    } else if (command == 'unrps'){
        client.commands.get('unrps').execute(message, args)
    }

    })

    client.on('guildMemberAdd', member => {
      const channel = member.guild.channels.cache.find(ch => ch.name === 'joins');
      if (!channel) return;
      channel.send(`Welcome to the server React to the recation in , ${member}`);
    });


      client.on('message', message => {
        if (message.content === 'what is my avatar') {
          message.reply(message.author.displayAvatarURL());
        }
      });



     



















































client.login(process.env.token)
