import * as assert from "assert"
import { using } from "./commands.js"
import { getAccount, getAllAccounts } from "./db.js"

describe('COMMANDS', function() {
    it('locks an account', function() {
      const result = using("cousi", { name: 'mauricio', date: "now"})
      assert.strictEqual(result.status, "OK")
      assert.ok(getAccount("cousi").locked)
    });

    it('fails because account is already locked', function () {
      const result = using("cousi", { name: 'mauricio', date: "now"})
      assert.strictEqual(result.status, "ERR")
    })
});