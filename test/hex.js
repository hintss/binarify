import test from 'ava';

const Binarify = require('../');

test('hex escapes throw errors properly', t => {
  t.throws(u => {Binarify('\\x')}, 'Invalid hex escape', 'Invalid hex escape error with 0 hex chars');
  t.throws(u => {Binarify('\\x1')}, 'Invalid hex escape', 'Invalid hex escape error with 1 hex char');
  t.throws(u => {Binarify('\\xra')}, 'Invalid hex escape', 'Invalid hex escape error with bad char in first position');
  t.throws(u => {Binarify('\\xar')}, 'Invalid hex escape', 'Invalid hex escape error with bad char in second position');
});

test('Hex values from 0 to 255', t => {
  for (let i = 0; i < 0xFF; i++) {
    let hex = i.toString(16);

    if (hex.length == 1) {
      hex = '0' + hex;
    }

    // test with characters in front/behind the escaped bit too
    t.true(Buffer.from([0x20, i, 0x20]).equals(Binarify(` \\x${hex} `)));
  }
});
