import express from 'express';
import Discord from 'discord.js';
import isAvalidStandup from './utils/isValidStandup';
import {readStandupTemplate, readReminderTemplate} from './helpers/readTemplates';
import {CronJob} from 'cron';
import {channels} from './channels'
const app = express();

const client = new Discord.Client({partials: ['MESSAGE']
});

client.on('ready', () => {
    console.log("Client connected 🚀🚀🚀");
});

client.on('message', (msg) => {
  if(isAvalidStandup(msg.content) && msg.channel.name=="standups" && !msg.author.bot)
    return msg.react("👍");
  return;
});

let scheduledMessage = new CronJob('00 07 08 * * *', async() => {
    let message = await readStandupTemplate();
    channels.forEach(channelItem => {
      let channel = client.channels.cache.find(channel => channel.name == channelItem.name);
      if(!channel)
       return;
      channel.send(message);
    })
   
});

let scheduledReminder = new CronJob('00 00 11 * * *', async() => {
  let message = await readReminderTemplate();
    channels.forEach(channelItem => {
      let channel = client.channels.cache.find(channel => channel.name == channelItem.name);
      if(!channel)
      return;
      channel.send(message);
    })
});
  
scheduledMessage.start();
scheduledReminder.start();
client.login(process.env.BOT_TOKEN);

module.exports = app;
