import test from 'ava';

const Binarify = require('../');

test('Outputs an input string', t => {
  t.true(Buffer.from('loltest').equals(Binarify('loltest')));
});

test('Lone backslash doesn\'t break anything', t => {
  t.true(Buffer.from('  ').equals(Binarify(' \\ ')));
});

test('\\a', t => {
  t.true(Buffer.from([0x07]).equals(Binarify('\\a')));
});

test('\\b', t => {
  t.true(Buffer.from('\b').equals(Binarify('\\b')));
});

test('\\e', t => {
  t.true(Buffer.from([0x1B]).equals(Binarify('\\e')));
});

test('\\f', t => {
  t.true(Buffer.from('\f').equals(Binarify('\\f')));
});

test('\\n', t => {
  t.true(Buffer.from('\n').equals(Binarify('\\n')));
});

test('\\r', t => {
  t.true(Buffer.from('\r').equals(Binarify('\\r')));
});

test('\\t', t => {
  t.true(Buffer.from('\t').equals(Binarify('\\t')));
});

test('\\v', t => {
  t.true(Buffer.from('\v').equals(Binarify('\\v')));
});

test('\'', t => {
  t.true(Buffer.from('\'').equals(Binarify('\\\'')));
});

test('\"', t => {
  t.true(Buffer.from('\"').equals(Binarify('\\\"')));
});

test('\?', t => {
  t.true(Buffer.from('\?').equals(Binarify('\\?')));
});
