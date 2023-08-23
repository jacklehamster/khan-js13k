let q = document.querySelector.bind(document);
let canvas = q("canvas"); let ctx=canvas.getContext("2d");
let cs = canvas.style;
canvas.width = 2000; cs.width = `${canvas.width/2}px`;
canvas.height = 1200; cs.height = `${canvas.height/2}px`;
cs.border = "1px solid black";
cs.backgroundColor = "#efd";
cs.transition = "background-color 0.5s";

const zoom = 0.6;
const keys = {};
document.addEventListener("keyup", (e) => {
  delete keys[e.code];
});
document.addEventListener("keydown", (e) => {
  keys[e.code] = true;
});
const accumulator = [];

const sh = [0,0];


function load_binary_resource(url) {
  const byteArray = [];
  const req = new XMLHttpRequest();
  req.open('GET', url, false);
  req.overrideMimeType('text/plain; charset=x-user-defined');
  req.send(null);
  if (req.status === 200) {
    for (let i = 0; i < req.responseText.length; ++i) {
      byteArray.push(req.responseText.charCodeAt(i) & 0xff)
    }
  }
  return byteArray;
}

let hasFocus = true;
window.addEventListener("blur", function(event) { 
  hasFocus = false;
}, false);
window.addEventListener("focus", function(event) { 
  hasFocus = true;
}, false);


let root;
document.addEventListener("DOMContentLoaded", () => {
    const byteArray = load_binary_resource("rider.13k");
    root = decodeShape(byteArray);
    console.log(root);
    loop(0);
});

const srcWidth = 1600;
const srcHeight = 1000;
let random = 5;
function showFrame(x, y, w, h, frame, anim, color, ddy, random) {
  const mulW = w/srcWidth;
  const mulH = h/srcHeight;
  ctx.fillStyle = color ?? black;
  root.shapes.forEach(shape => {
    if (shape.hidden || (shape.anim !== anim)) {
      return;
    }
    const ll = shape.lines[frame % shape.lines.length];
    if (ll) {
      ctx.beginPath();
      moveTo(x, y, ll[0] * mulW, ll[1] * mulH, false, w, h, ddy, random);
      for (let i = 2; i < ll.length; i+=2) {
        moveTo(x, y, ll[i] * mulW, ll[i+1] * mulH, true, w, h, ddy, random);
      }
      ctx.closePath();
      ctx.fill();
    }
  });
}

function moveTo(offsetX, offsetY, x, y, penDown, w, h, ddy, random) {
  if (penDown) {
      ctx.lineTo(offsetX + x, offsetY + y + (x/w - .5)*5 * ddy + random * (Math.random() - .5));
  } else {
      ctx.moveTo(offsetX + x, offsetY + y + (x/w - .5)*5 * ddy + random * (Math.random() - .5));
  }
}

const threshold = 1;

let arrowSize = 0;
const arrows = [];
function shootArrow(sprite) {
  const {x, y, dx, dy, archerOrientation} = sprite;
  if (arrowSize >= arrows.length) {
    arrows.push({});
  }
  arrows[arrowSize].x = x;
  arrows[arrowSize].y = y - 80 * zoom;
  arrows[arrowSize].dx = archerOrientation * 120 + dx * 2;
  arrows[arrowSize].dy = - 5 + dy * 10;
  arrows[arrowSize].born = sprite.time;
  arrowSize++;
}

function processMovement(sprite) {
    const dtt = sprite.dt / 20;
    const ax = evaluate(sprite.ax, sprite);
    const ay = evaluate(sprite.ay, sprite);
    const da = Math.sqrt(ax*ax + ay * ay);
    if (ax !== 0) {
      sprite.orientation = ax;
    }
    const speed = evaluate(sprite.speed, sprite);
    const brake = sprite.brake;
    if (da) {
      sprite.dx = (sprite.dx + ax / da * speed) * brake;
      sprite.dy = (sprite.dy + ay / da * speed / 2) * brake;
    } else {
      sprite.dx = sprite.dx * brake;
      sprite.dy = sprite.dy * brake;      
    }
    if (evaluate(sprite.moving, sprite)) {
      sprite.x += sprite.dx * dtt;
      sprite.y += sprite.dy * dtt;
    }
    const dist = Math.sqrt(sprite.dx * sprite.dx + sprite.dy * sprite.dy);
    sprite.horseFrame += dtt * Math.max(.08, dist / 50);
}

const sprite = {
  parent: true,
  time: 0,
  lastShot: 0,
  process: (sprite) => {
    if (!sprite.parent) {
      return;
    }
    processMovement(sprite);

    const shooting = evaluate(sprite.shooting, sprite);
    if (!shooting) {
      sprite.archerOrientation = sprite.orientation;
    } else {
      if (sprite.time - sprite.lastShot > evaluate(sprite.shootPeriod, sprite)) {
        shootArrow(sprite);
        sprite.lastShot = sprite.time;
      }
    }
  },
  shootPeriod: 300,
  archerOrientation: 1,
  orientation: 1,
  direction: undefined,
  brake: .99,
  speed: .1,
  x: 300, y: 500,
  moving: sprite => Math.abs(sprite.dx) > threshold || Math.abs(sprite.dy) > threshold,
  shooting: () => keys.Space,
  ax: () => (keys.KeyA || keys.ArrowLeft ? -1 : 0) + (keys.KeyD || keys.ArrowRight ? 1 : 0),
  ay: () => (keys.KeyW || keys.ArrowUp ? -1 : 0) + (keys.KeyS || keys.ArrowDown ? 1 : 0),
  dx: 0,
  dy: 0,
  width: 250 * zoom,
  height: 200 * zoom,
  hotspot: undefined,
  born: 0,
  animation: undefined,
  range: undefined,
  color: undefined,
  horseFrame: 0,
  random: 0,
  riderAnimation: "archer",
  layer: 0,
  hidden: false,
  tree: false,
  sprites: [
    sprite => evaluate({
      ...sprite,
      y: sprite => evaluate(sprite.y, sprite) - .1,
      parent: false,
      sprites: undefined,
      animation: sprite => evaluate(sprite.riderAnimation, sprite),
      range: sprite => sprite.rangeOverride ?? evaluate(sprite.shooting, sprite) ? [0, 3] : [0],
      hotspot: [
        sprite => evaluate(sprite.moving, sprite) ? .5 - sprite.orientation * evaluate(sprite.archerOrientation, sprite) * .05 : .53,
        sprite => evaluate(sprite.moving, sprite) ? .65 + Math.sin(sprite.horseFrame * .7) / 100 : .7,
      ],
      color: sprite => sprite.tree ? "#270" : sprite.foe ? "#f0a" : "black",
      direction: (sprite) => Math.sign(evaluate(sprite.archerOrientation, sprite)),
      frame: (sprite) => evaluate(sprite.horseFrame, sprite),
      random: 4,
    }, sprite),
    sprite => evaluate({
      ...sprite,
      y: sprite => evaluate(sprite.y, sprite),
      parent: false,
      sprites: undefined,
      animation: "horse",
      range: (sprite) => evaluate(sprite.moving, sprite) ? [0, 10]: [11],
      hotspot: [.47, .72],
      color: sprite => sprite.foe ? "#004" : "#630",
      direction: (sprite) => Math.sign(sprite.orientation),
      frame: (sprite) => evaluate(sprite.horseFrame, sprite),
      random: 4,
      hidden: sprite => sprite.tree,
    }, sprite),
    sprite => evaluate({
      ...sprite,
      y: sprite => evaluate(sprite.y, sprite) + 1,
      parent: false,
      sprites: undefined,
      animation: "shield",
      range: [0],
      hotspot: [.47, .72],
      color: "#69f",
      direction: (sprite) => Math.sign(sprite.orientation),
      frame: (sprite) => 0,
      hidden: sprite => sprite.foe || sprite.foe,
    }, sprite),
    sprite => evaluate({
      ...sprite,
      layer: -2,
      parent: false,
      sprites: undefined,
      animation: sprite => sprite.tree ? "tree" : "horse",
      range: (sprite) => sprite.tree ? [0] : evaluate(sprite.moving, sprite) ? [0, 10]: [11],
      hotspot: (sprite) => sprite.tree ? [.53, 1] : [.47, .72],
      color: "#888",
      direction: (sprite) => Math.sign(sprite.orientation),
      height: -50,
      frame: (sprite) => evaluate(sprite.horseFrame, sprite),
    }, sprite),
  ],
};

function evaluate(value, sprite) {
  if (typeof(value) === "object") {
    if (Array.isArray(value)) {
      return value.map(v => evaluate(v, sprite));
    } else {
      const o = {};
      for (let i in value) {
        o[i] = evaluate(value[i], sprite);
      }
      return o;
    }
  }
  return typeof(value) === "function" ? value(sprite) : value;
}

function showSprite(sprite, time, dt, accumulator) {
  sprite.dt = dt;
  sprite.time = time;
  const sprites = evaluate(sprite.sprites, sprite);
  sprites.forEach(sprite => {
    accumulator.push(sprite);
    // const { x, y, width, height, animation, born, horseFrame, range, hotspot, color, direction, dy, random } = sprite;

    // const frame = range[0] + (range.length <= 1 ? 0 : Math.floor(horseFrame) % (range[1] - range[0]));
    // const anim = root.animations.indexOf(animation);
    // const dir = evaluate(direction, sprite);
    // const ddy = evaluate(dy, sprite);
    // showFrame(
    //   x - hotspot[0] * width * dir - sh[0],
    //   y - hotspot[1] * height - sh[1],
    //   width * dir, height, frame, anim, color, ddy, random);
    // ctx.beginPath();
    // ctx.arc(x - sh[0], y - sh[1], 5, 0, 2 * Math.PI);
    // ctx.stroke();
  });
}

function display(s, time) {
    const { x, y, width, height, animation, born, horseFrame, range, hotspot, color, direction, dy, random, hidden } = s;
    if (hidden) {
      return;
    }

    const frame = range[0] + (range.length <= 1 ? 0 : Math.floor(horseFrame) % (range[1] - range[0]));
    const anim = root.animations.indexOf(animation);
    const dir = evaluate(direction, sprite);
    const ddy = evaluate(dy, sprite);
    showFrame(
      x - hotspot[0] * width * dir - sh[0],
      y - hotspot[1] * height - sh[1] + shake,
      width * dir, height, frame, anim, color, ddy, random);
}

const fps = 60;
const period = 1000 / fps;
let lastframeTime = 0;

let headStart = 0;

function copy(sprite) {
  if (typeof(sprite) === "object") {
    if (Array.isArray(sprite)) {
      const a = [...sprite];
      for (let i = 0; i < a.length; i++) {
        a[i] = copy(sprite[i]);
      }
      return a;
    }
    const s = {...sprite};
    for (let i in s) {
      s[i] = copy(sprite[i]);
    }
    return s;
  }
  return sprite;
}

const hero = copy(sprite);

let shake = 0;
let shakeSize = 0;

const foes = new Array(100).fill(0).map(() => {
  const angle = Math.random() * Math.PI * 2;
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);


  const foe = {
    ...copy(sprite),
    goal: [0, 0],
    gdist: 0,
    ax: (sprite) => (sprite.goal[0] - foe.x) / 2000,
    ay: (sprite) => (sprite.goal[1] - foe.y) / 2000,
    x: cos * (2000 + Math.random()*1000),
    y: sin * (2000 + Math.random()*1000),
    rangeOverride: [0, 3],
    speed: Math.max(.05, Math.random() / 15),//sprite => 10 / (evaluate(sprite.gdist, sprite) + 1),
    archerOrientation: (sprite) => Math.sign(evaluate(sprite.dx, sprite)),
    process: (sprite) => {
      if (!sprite.parent) {
        return;
      }
      processMovement(sprite);
      const gx = sprite.x - sprite.goal[0];
      const gy = sprite.y - sprite.goal[1];
      sprite.gdist = Math.sqrt(gx * gx + gy * gy);

      const hx = sprite.x - hero.x;
      const hy = sprite.y - hero.y;
      const hdist = Math.sqrt(hx * hx + hy * hy);
      if (hdist < 40) {
        console.log("HIT", hdist);
        shakeSize = 40;
        cs.backgroundColor = "#a00";
        setTimeout(() => {
          cs.backgroundColor = "#efd";
        }, 150);
        
        const angle = Math.random() * Math.PI * 2;
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        sprite.x = hero.x + cos * 2000;
        sprite.y = hero.y + sin * 2000;
      }
      if (hdist > 3000) {
        const angle = Math.random() * Math.PI * 2;
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        sprite.x = hero.x + cos * 2000;
        sprite.y = hero.y + sin * 2000;
      }

      if (sprite.gdist < 100 || hdist > 3000) {
        sprite.goal[0] = hero.x + (hero.x - sprite.x) + (Math.random()-.5) * 300;
        sprite.goal[1] = hero.y + (hero.y - sprite.y) + (Math.random()-.5) * 300;
      }
    },
    foe: true,
    width: 220 * zoom,
    height: 180 * zoom,
    riderAnimation: "sword",
  };
  return foe;
});


const trees = new Array(100).fill(0).map(() => {
  const angle = Math.random() * Math.PI * 2;
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const tree = {
    ...copy(sprite),
    x: cos * (2000 + Math.random()*1000),
    y: sin * (2000 + Math.random()*1000),
    process: (sprite) => {
      if (!sprite.parent) {
        return;
      }
      const hx = sprite.x - hero.x;
      const hy = sprite.y - hero.y;
      const hdist = Math.sqrt(hx * hx + hy * hy);
      if (hdist < 50) {
        console.log("TREE", hdist);
        shakeSize = 30;
        hero.x -= hx;
        hero.y -= hy;
        hero.dx = 0;
        hero.dy = 0;
        // cs.backgroundColor = "#a00";
        // setTimeout(() => {
        //   cs.backgroundColor = "#efd";
        // }, 150);
        
        // const angle = Math.random() * Math.PI * 2;
        // const cos = Math.cos(angle);
        // const sin = Math.sin(angle);
        // sprite.x = hero.x + cos * 2000;
        // sprite.y = hero.y + sin * 2000;
      }

    },
    foe: true,
    width: 500 * zoom,
    height: 350 * zoom,
    riderAnimation: "tree",
    tree: true,
  };
  return tree;
});



function loop(time) {
  requestAnimationFrame(loop);
  if (time - lastframeTime <= period || !hasFocus) {
    return;
  }
  lastframeTime = Math.max(lastframeTime, time - 100);
  const dt = time - lastframeTime;
  const dtt = dt / 20;
  lastframeTime = time;


  if (shakeSize) {
    shake = Math.random() * shakeSize;
    shakeSize *= .5;
    if (shakeSize < .1) {
      shakeSize = 0;
    }
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.beginPath();
  ctx.strokeStyle = "#038";
  ctx.lineWidth = 6;
  for (let i = 0; i < arrowSize; i++) {
    const arrow = arrows[i];
    const arrowSize = 50;
    const dist = Math.sqrt(arrow.dx * arrow.dx + arrow.dy * arrow.dy) + 1;
    ctx.moveTo(
      arrow.x - sh[0],
      arrow.y - sh[1] + shake);
    ctx.lineTo(
      arrow.x - sh[0] - arrow.dx / dist * arrowSize,
      arrow.y - sh[1] + shake - arrow.dy / dist * arrowSize);
    arrow.dy += .3;
    arrow.x += arrow.dx / dist * arrowSize * dtt;
    arrow.y += arrow.dy / dist * arrowSize * dtt;
  }
  ctx.stroke();

  for (let i = arrowSize - 1; i >= 0; i--) {
    if (time - arrows[i].born > 1000) {
      arrows[i].x = arrows[arrowSize - 1].x;
      arrows[i].y = arrows[arrowSize - 1].y;
      arrows[i].dx = arrows[arrowSize - 1].dx;
      arrows[i].dy = arrows[arrowSize - 1].dy;
      arrows[i].born = arrows[arrowSize - 1].born;
      arrowSize--;
    }
  }

  ctx.strokeStyle = "#380";
  ctx.lineWidth = 2;

  accumulator.length = 0;
  drawGround(accumulator);
  showSprite(hero, time, dt, accumulator);
  foes.forEach(foe => {
    showSprite(foe, time, dt, accumulator);
  });
  trees.forEach(tree => {
    showSprite(tree, time, dt, accumulator);
  });
  accumulator.sort((a, b) => {
    if (a.layer !== b.layer) {
      return a.layer - b.layer;
    }
    return Math.sign(a.y - b.y);
  });
  accumulator.forEach(s => display(s, time));
  headStart += ((hero.dx * hero.archerOrientation < 0 ? 0 : hero.dx) / 2 + hero.archerOrientation * 2 - headStart) * .05;
  sh[0] += hero.dt / 20 * (hero.x + headStart * 80 - canvas.width/2 - sh[0]) * .1;
  sh[1] += hero.dt / 20 * (hero.y + hero.dy * 50 - canvas.height/2 - sh[1]) * .1;
}


function drawGround() {
  const spacing = 200;
  ctx.beginPath();
  const cell = [Math.round(sh[0] / spacing), Math.round(sh[1] / spacing)];
  for (let y = -20; y < 20; y++) {
    for (let x = -20; x < 20; x++) {
      const xx = x + cell[0];
      const yy = y + cell[1];
      const diffx = Math.sin(xx *123 + yy * 9991);
      const diffy = Math.cos(xx *12331 + yy * 2221);
      const zx = diffx * 500;
      const zy = diffy * 200;
      ctx.moveTo(xx * spacing - sh[0] + zx, yy * spacing - sh[1] + shake + zy);
      ctx.lineTo(xx * spacing + diffx * 100 - sh[0] + zx, yy * spacing - sh[1] + shake + zy + 3);
      ctx.lineTo(xx * spacing + diffx * 100 - sh[0] + zx + diffy * 100, yy * spacing - sh[1] + shake + zy);
    }
  }
  ctx.stroke();  

  // ctx.fillStyle = "#390";
  // ctx.beginPath();
  // const cell = [Math.round(sh[0] / spacing), Math.round(sh[1] / spacing)];
  // for (let y = -20; y < 20; y++) {
  //   for (let x = -20; x < 20; x++) {
  //     const xx = x + cell[0];
  //     const yy = y + cell[1];
  //     const diffx = Math.sin(xx *123 + yy * 9991);
  //     const diffy = Math.cos(xx *12331 + yy * 2221);
  //     const zx = diffx * 500;
  //     const zy = diffy * 200;
  //     ctx.moveTo(xx * spacing - sh[0] + zx, yy * spacing - sh[1] + shake + zy);
  //     ctx.lineTo(xx * spacing + diffx * 100 - sh[0] + zx - diffy * 20, yy * spacing - sh[1] + shake + zy);
  //     ctx.lineTo(xx * spacing + diffx * 100 - sh[0] + zx, yy * spacing - sh[1] + shake + zy + 3);
  //   }
  // }
  // ctx.fill();  

}

