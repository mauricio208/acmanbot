import * as assert from "assert"
import { using, release, accounts } from "./commands.js"
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
  });

  it('releases an account', function () {
    const result = release("cousi")
    assert.strictEqual(result.status, "OK")
  });

  it('return all account that are not locked', function () {
    const result = accounts();
    assert.ok(result.length>0 && (result.filter(i => i[1].locked).length === 0))
  });

  it('return all account that are locked', function () {
    //locks account
    using("cousi", { name: 'mauricio', date: "now"})

    const result = accounts(false);
    console.log(result)
    assert.ok(result.length>0 && (result.filter(i => !i[1].locked).length === 0))
  });
});