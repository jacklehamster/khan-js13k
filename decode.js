function expand(series) {
  const expanded = new Array(Math.ceil(series.length * 2));
  for (let i = 0; i < series.length; i++) {
    expanded[i*2] = series[i] % 16;
    expanded[i*2 + 1] = (series[i] >> 4) % 16;
  }
  return expanded;
}

function decodeLine(result) {
  const line = [0, 0];
  let x = 0, y = 0;
  do {
    x = result.pop() - 7;
    y = result.pop() - 7;
    line[0] += x;
    line[1] += y;
  } while(x || y);

  let prex, prey;
  do {
    x = result.pop() - 7;
    y = result.pop() - 7;
    if (x || y) {
      const ratio1 = prex*y;
      const ratio2 = prey*x;
      if (Math.abs(ratio1-ratio2) < 5) {
        line[line.length-2] += x;
        line[line.length-1] += y;
      } else {
        line.push(line[line.length-2] + x, line[line.length-1] + y);
      }
      prex = x;
      prey = y;
    }
  } while(x || y);
  return line;
}

function decodeLines(result, precision) {
  const lines = new Array(result.pop());
  for (let i = 0; i < lines.length; i++) {
    lines[i] = decodeLine(result).map(value => value * precision);
  }
  return lines;
}

function decodeString(result) {
    const len = result.pop();
    const array = [];
    for (let j = 0; j < len; j++) {
      const ch = result.pop() + (result.pop() << 4);
      array.push(String.fromCharCode(ch));
    }
    return array.join("");  
}

function decodeShapes(result, precision) {
  const shapes = new Array(result.pop());
  for (let i = 0; i < shapes.length; i++) {
    shapes[i] = {};
    shapes[i].name = decodeString(result);
    shapes[i].lines = decodeLines(result, precision);
    shapes[i].anim = result.pop();
    const p = result.pop();
    shapes[i].hidden = p === 1;
  }
  return shapes;
}


function decodeAnimations(result) {
  const animations = new Array(result.pop());
  for (let i = 0; i < animations.length; i++) {
    animations[i] = decodeString(result);
  }
  return animations;
}

function decodeShape(reduced) {
  const result = expand(reduced);
  const root = {};
  console.log(result);
  result.reverse();
  const precision = result.pop();
  root.animations = decodeAnimations(result);
  console.log(result.reverse());
  result.reverse();
  root.shapes = decodeShapes(result, precision);
  return root;
}
