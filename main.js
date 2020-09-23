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
  console.log('Buck145 Test Bot is online')
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

    const invites = {};

    // A pretty useful method to create a delay without blocking the whole script.
    const wait = require('util').promisify(setTimeout);
    
    client.on('ready', async () => {
      // "ready" isn't really ready. We need to wait a spell.
      await wait(1000);
    
      // Load all invites for all guilds and save them to the cache.
      client.guilds.cache.forEach(g => {
        g.fetchInvites().then(guildInvites => {
          invites[g.id] = guildInvites;
        });
      });
    });

    client.on('guildMemberAdd', member => {
        // To compare, we need to load the current invite list.
        member.guild.fetchInvites().then(guildInvites => {
          // This is the *existing* invites for the guild.
          const ei = invites[member.guild.id];
          // Update the cached invites for the guild.
          invites[member.guild.id] = guildInvites;
          // Look through the invites, find the one for which the uses went up.
          const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);
          // This is just to simplify the message being sent below (inviter doesn't have a tag property)
          const inviter = client.users.cache.get(invite.inviter.id);
          // Get the log channel (change to your liking)
          const logChannel = member.guild.channels.cache.find(channel => channel.name === "joins");
          // A real basic message with the information we need. 
          logChannel.send(`Welcome to the server Please read the rules and react to get in to the server ${inviter.username}`)
          

          
        });
      });


      client.on('message', message => {
        if (message.content === 'what is my avatar') {
          message.reply(message.author.displayAvatarURL());
        }
      });



     



















































client.login(process.env.token)
