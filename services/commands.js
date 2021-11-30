import { getAccount, getAllAccounts, setAccount} from "./db.js"

function using(accountName, userData){
  const account = getAccount(accountName);
  let result = { status: "ERR", desc: "account doesn't exist"}

  let wasLocked = false;
  if (account?.locked) {
    result = { status: "ERR", desc: "account in use", data: {user: account.user}}
    wasLocked = true
  }
  
  if (account && !account.locked) {
    account.locked = true
    account.user = userData
    setAccount(accountName, account)
    result = { status: "OK", desc: `account *${accountName}* locked successfully`}
  }
  
  const text = wasLocked?`\n> In use by *${result.data.user.name}* since ${result.data.user.date}`:`\n> ${result.desc}`
  
  let blocks = [
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": text
      }
    }
  ]
  if (result.status == 'OK') {
    blocks.push({
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": `${account.email} : ${account.pass}`
      }
    })
  }
  const formattedMessage = {
    "blocks": blocks
  }

  return { raw: result, formatted: formattedMessage}
}

function release(accountName){
  const account = getAccount(accountName);
  let result = { status: "INFO", desc: "account available"}

  if (!account) {
    result = { status: "ERR", desc: "account doesn't exist"}
  }

  if (account && account.locked) {
    account.locked = false
    account.user = {}
    setAccount(accountName, account)
    result = { status: "OK", desc: "account released successfully"}
    
  }

  const text = `${result.desc}`
  const formattedMessage = {
    "blocks": [
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": text
        }
      }
    ]
  }

  return { raw: result, formatted: formattedMessage}
}

function accounts( unlocked = true ){

  const allAccounts = Object.entries(getAllAccounts()).filter(e=>Boolean(e[1].locked) != unlocked)

  let text = `> ${unlocked?'Available':'Locked'} accounts`
  if (allAccounts.length == 0) {
    text = unlocked?'*No available accounts*':'*No locked accounts*'
  }
  for( let ac of allAccounts){
    text += unlocked?`\n> *${ac[0]}* -> ${ac[1].email} : ${ac[1].pass}`:  `\n> *${ac[0]}* -> in use by ${ac[1].user.name} since ${ac[1].user.date}`
  }
  const formattedMessage = {
    "blocks": [
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": text
        }
      }
    ]
  }
  return { raw: allAccounts, formatted: formattedMessage }
}


export {
  using,
  release,
  accounts
}