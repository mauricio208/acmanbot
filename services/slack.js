import Bolt from '@slack/bolt';
const { App, ExpressReceiver } = Bolt;

export const slackApp = () =>{
  const receiver = new ExpressReceiver({
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    endpoints: {
      events: '/slack/events',
    },
  })
  const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    receiver
  })
  
  return { app, receiver };
}