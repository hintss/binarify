const escapes = {
  'a': 0x07,
  'b': 0x08,
  'e': 0x1B,
  'f': 0x0C,
  'n': 0x0A,
  'r': 0x0D,
  't': 0x09,
  'v': 0x0B
};

module.exports = function(input) {
  let output = Buffer.allocUnsafe(input.length);
  let count = 0;

  for (let i = 0; i < input.length; i++) {
    if (input[i] == '\\') {
      i++;

      if (escapes.hasOwnProperty(input[i])) {
        output[count] = escapes[input[i]];
      } else if (isOctal(input[i])) {
        let length = 3;

        if (input[i] > '3') { // since 3 oct digits is 9 bits, we shorten search if first bit is 1
          length = 2;
        }

        length = Math.min(length, input.length - i); // don't over-read the input

        let stop = i + length - 1;
        let oct = input[i];

        while (i < stop) {
          i++;

          if (isOctal(input[i])) {
            oct += input[i];
          } else {
            i--;
            stop = 0;
          }
        }

        output[count] = parseInt(oct, 8);
      } else if (input[i] == 'x') { // node behavior is to always expect 2, not sure about other langs
        if (input.length < i + 3) {
          throw new Error('Invalid hex escape');
        }

        let hex = input.slice(i + 1, i + 3);

        if (isHex(hex[0]) && isHex(hex[1])) {
          output[count] = parseInt(hex, 16);

          i += 2;
        } else {
          throw new Error('Invalid hex escape');
        }
      } else {
        count--;
        i--;
      }
    } else {
      output[count] = input.charCodeAt(i);
    }

    count++;
  }

  return output.slice(0, count);
}

function isOctal(value) {
  i = value.charCodeAt(0);
  return (i > 0x29 && i < 0x38);
}

function isHex(value) {
  i = value.charCodeAt(0);
  return ((i > 0x29 && i < 0x3A) || (i > 0x40 && i < 0x47) || (i > 0x60 && i < 0x67));
}
