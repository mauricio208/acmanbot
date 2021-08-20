import * as assert from "assert"
import { db, getAccount, getAllAccounts } from "./db.js"

describe('DB', function() {
    it('get account data', function() {
      assert.notStrictEqual(getAccount("cousi"), {
        "email": "email@example.com",
        "pass": "123123"
      })
    });

    it('get all accounts data', function() {
      assert.ok(Object.keys(getAllAccounts("cousi")).length > 1)
    });
});