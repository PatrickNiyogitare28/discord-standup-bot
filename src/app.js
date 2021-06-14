require('dotenv').config();
const express = require('express');
const Discord = require('discord.js');
const fs = require('fs');
const path = require('path');
const cron = require('cron');
const app = express();

console.log(process.env.TZ);
let msg;
const template = "src/templates/standup.md";
fs.readFile(template, 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  msg = data;
})

const client = new Discord.Client({partials: ['MESSAGE']
});

client.on('ready', () => {
    console.log("Client connected 🚀🚀🚀");
    client.channels.cache.find(channel => channel.name === "standups").send("connected: "+new Date());

});


let scheduledMessage = new cron.CronJob('00 10 22 * * *', () => {
    let channel = client.channels.cache.find(channel => channel.name === "standups");
    if(!channel)
     return;
    channel.send(msg);
  });
  
scheduledMessage.start()
client.login(process.env.BOT_TOKEN);

module.exports = app;