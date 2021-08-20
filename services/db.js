import config from '../config.js'
import { join } from 'path'
import JSONdb from 'simple-json-db'

const db = new JSONdb('/home/mauricio/as/acman/db.json')

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