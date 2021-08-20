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
  // mark account in db as unlocked
}

function free(){
  // search on db and return non locked accounts
}

function onuse() {
  // search on db and return u
}

export {
  using,
  release,
  free,
  onuse
}