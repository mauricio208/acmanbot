import JSONdb from 'simple-json-db'
import * as fs from 'fs';

 
fs.writeFileSync('db.json', process.env.ACCOUNTS);
const db = new JSONdb('db.json')

function getAccount(accountName){
  return db.get(accountName)
}

function setAccount(accountName, accountData) {
  const result = db.set(accountName, accountData)
  db.sync()
  return result
}

function getAllAccounts() {
  return db.JSON()
}

export {db, getAccount, setAccount, getAllAccounts }