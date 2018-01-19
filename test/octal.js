import test from 'ava';

const Binarify = require('../');

test('octal escapes', t => {
  t.true(Buffer.from([0x0]).equals(Binarify('\\0')), '\\0 is null byte');
  t.true(Buffer.from([0x0, 0x20]).equals(Binarify('\\0 ')), '\\00  is null byte and a space');
  t.true(Buffer.from([0x0]).equals(Binarify('\\00')), '\\00 is null byte');
  t.true(Buffer.from([0x0, 0x20]).equals(Binarify('\\00 ')), '\\00  is null byte and a space');
  t.true(Buffer.from([0x0]).equals(Binarify('\\000')), '\\000 is null byte');
  t.true(Buffer.from([0x0, 0x30]).equals(Binarify('\\0000')), '\\0000 is null byte, followed by ascii 0');
  t.true(Buffer.from([0x20, 0x30]).equals(Binarify('\\400')), 'Octal sequences with a high MSB are only evaluated to 2 characters');
});

test('All octal values from 0 to 255', t => {
  for (let i = 0; i < 256; i++) {
    t.true(Buffer.from([i]).equals(Binarify('\\' + i.toString(8))));
  }
});
