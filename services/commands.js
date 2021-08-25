import { getAccount, getAllAccounts, setAccount} from "./db.js"

function using(accountName, userData){
  const account = getAccount(accountName);
  if (account && !account.locked) {
    account.locked = true
    account.user = userData
    setAccount(accountName, account)
    return { status: "OK", desc: "account locked successfully"}
  }

  if (account?.locked) {
    return { status: "ERR", desc: "account already locked", data: {user: account.user}}
  }
  
  return { status: "ERR", desc: "account doesn't exist"}
}

function release(accountName){
  const account = getAccount(accountName);
  if (account && account.locked) {
    account.locked = false
    account.user = {}
    setAccount(accountName, account)
    return { status: "OK", desc: "account released successfully"}
  }

  if (!account) {
    return { status: "ERR", desc: "account doesn't exist"}
  }
  
  return { status: "INFO", desc: "account free"}
}

function accounts( unlocked = true ){
  const allAccounts = getAllAccounts();
  return Object.entries(allAccounts).filter(e=>Boolean(e[1].locked) != unlocked)
}

export {
  using,
  release,
  accounts
}