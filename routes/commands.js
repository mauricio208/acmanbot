import * as commands from '../services/commands.js'
import { slackApp } from '../services/slack.js'


const { app, receiver } = slackApp();


app.command('/lock', async ({ command, ack, respond }) => {
  await ack();
  const commandParameters = command.text.split(' ')
  const userData = {
    name :command.user_name,
    date: Math.round(Number(new Date())/1000)
  }
  await respond(commands.using(commandParameters[0], userData).formatted);
});

app.command('/release', async ({ command, ack, respond }) => {
  await ack();
  const commandParameters = command.text.split(' ')
  await respond(commands.release(commandParameters[0]).formatted);
});

app.command('/free', async ({ command, ack, respond }) => {
  await ack();
  // await respond(JSON.stringify(commands.accounts()));
  await respond(commands.accounts().formatted);
});

app.command('/locked', async ({ command, ack, respond }) => {
  await ack();
  await respond(commands.accounts(false).formatted);
});

export { receiver }
