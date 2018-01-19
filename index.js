module.exports = function(input) {
  let output = Buffer.allocUnsafe(input.length);
  let count = 0;

  for (let i = 0; i < input.length; i++) {
    if (input[i] == '\\') {
      i++;

      if (input[i] == 'a') {
        output[count] = 0x07;
      } else if (input[i] == 'b') {
        output[count] = 0x08;
      } else if (input[i] == 'e') {
        output[count] = 0x1B;
      } else if (input[i] == 'f') {
        output[count] = 0x0C;
      } else if (input[i] == 'n') {
        output[count] = 0x0A;
      } else if (input[i] == 'r') {
        output[count] = 0x0D;
      } else if (input[i] == 't') {
        output[count] = 0x09;
      } else if (input[i] == 'v') {
        output[count] = 0x0B;
      } else if (input[i] == '\\') {
        output[count] = 0x5C;
      } else if (input[i] == '\'') {
        output[count] = 0x27;
      } else if (input[i] == '\"') {
        output[count] = 0x22;
      } else if (input[i] == '\?') {
        output[count] = 0x3F;
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
