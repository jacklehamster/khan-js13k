let q = document.querySelector.bind(document);
let canvas = q("canvas"); let ctx=canvas.getContext("2d");
let cs = canvas.style;
canvas.width = 2000; cs.width = `${canvas.width/2}px`;
canvas.height = 1200; cs.height = `${canvas.height/2}px`;
cs.border = "1px solid black";
cs.backgroundColor = "#efd";
cs.transition = "background-color 0.5s";

const zoom = .75;
const keys = {};
document.addEventListener("keyup", (e) => {
  delete keys[e.code];
});
document.addEventListener("keydown", (e) => {
  keys[e.code] = true;
  e.preventDefault();
});
const accumulator = [];

const sh = [0,0];


// const upgrades = {
//   speedWhileShooting: 0,
//   speed: 0,
//   maxHealth: 0,
//   shield: 0,
//   quickShot: 0,
//   money: 0,
// };

const upgrades = {
  speedWhileShooting: 2,
  speed: 2,
  maxHealth: 2,
  shield: 0,
  quickShot: 1,
  money: 2,
};



const defaultmaxHealth = 6;

let health = defaultmaxHealth;

const healthDiv = document.body.appendChild(document.createElement("div"));
healthDiv.style.position = "absolute";
healthDiv.style.top = "10px";
healthDiv.style.left = "10px";
function showHealth() {
  const maxHealth = defaultmaxHealth + upgrades.maxHealth * 2;
  let str = "";
  for (let i = 0; i < Math.floor(health / 2); i++) {
    str += "❤️";
  }
  if (health % 2) {
    str += "❤️‍🩹";
  }
  for (let i = Math.ceil(health / 2); i < maxHealth / 2; i++) {
    str += "🩶";    
  }
  healthDiv.innerText = str;
}

let money = 0;
const moneyDiv = document.body.appendChild(document.createElement("div"));
moneyDiv.style.position = "absolute";
moneyDiv.style.top = "30px";
moneyDiv.style.left = "10px";
function showMeTheMoney() {
  moneyDiv.textContent = !money ? "" : `⭐ ${money}`;
}


const gameOverDiv = document.body.appendChild(document.createElement("div"));
gameOverDiv.style.position = "absolute";
gameOverDiv.style.top = "50px";
gameOverDiv.style.left = "10px";
gameOverDiv.style.color = "snow";
gameOverDiv.textContent = "Press ESC to continue";
gameOverDiv.style.display = "none";
function showGameOver() {
  gameOverDiv.style.display = "";
}

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
function showFrame(ctx, x, y, w, h, frame, anim, color, ddy, random, debug) {
  const mulW = w/srcWidth;
  const mulH = h/srcHeight;
  ctx.fillStyle = color ?? "black";
  root.shapes.forEach(shape => {
    if (shape.hidden || (shape.anim !== anim)) {
      return;
    }
    const ll = shape.lines[frame % shape.lines.length];
    if (ll) {
      ctx.beginPath();
      moveTo(ctx, x, y, ll[0] * mulW, ll[1] * mulH, false, w, h, ddy, random);
      for (let i = 2; i < ll.length; i+=2) {
        moveTo(ctx, x, y, ll[i] * mulW, ll[i+1] * mulH, true, w, h, ddy, random);
      }
      ctx.closePath();
    }
    ctx.fill();
  });
}

function moveTo(ctx, offsetX, offsetY, x, y, penDown, w, h, ddy, random) {
  if (penDown) {
      ctx.lineTo(offsetX + x, offsetY + y + (x/w - .5)*15 * ddy + random * (Math.random() - .5));
  } else {
      ctx.moveTo(offsetX + x, offsetY + y + (x/w - .5)*15 * ddy + random * (Math.random() - .5));
  }
}

const threshold = .5;

function removeArrow(index) {
  arrows[index].x = arrows[arrowSize - 1].x;
  arrows[index].y = arrows[arrowSize - 1].y;
  arrows[index].dx = arrows[arrowSize - 1].dx;
  arrows[index].dy = arrows[arrowSize - 1].dy;
  arrows[index].born = arrows[arrowSize - 1].born;
  arrowSize--;
}

let arrowSize = 0;
const arrows = [];
function shootArrow(sprite) {
  const {x, y, dx, dy, archerOrientation} = sprite;
  if (arrowSize >= arrows.length) {
    arrows.push({});
  }
  arrows[arrowSize].dx = archerOrientation * 120 + dx * 2;
  arrows[arrowSize].dy = - 5 + dy * 10;
  arrows[arrowSize].x = x + arrows[arrowSize].dx;
  arrows[arrowSize].y = y - 80 * zoom;
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
    const speed = evaluate(sprite.speed, sprite) * (sprite.dead ? 2 : 1) * (sprite.superSoldier && sprite.soldier ? .7 : 1);
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

function exitHut(hut) {
    hero.x = hut.x;
    hero.y = hut.y + 200;
    hero.dx = 0;
    hero.dy = 0;
    hutInfo(inHut).closed = true;
    inHut = null;
}

const sprite = {
  parent: true,
  time: 0,
  nextShot: 0,
  process: (sprite) => {
    if (!sprite.parent) {
      return;
    }
    if (inHut) {
      if (keys.Escape) {
        exitHut(inHut);
        gameOverDiv.style.display = "none";
      } else {
        return;
      }
    }
    if (!health) {
      if (keys.Escape) {
        health = defaultmaxHealth + upgrades.maxHealth * 2;
        money = 0;
        hero.dead = 0;
        gameOverDiv.style.display = "none";
        showMeTheMoney();
        showHealth();
      }
    }
    if (!health && sprite.hero) {
      return;
    }


    processMovement(sprite);

    const shooting = evaluate(sprite.shooting, sprite);
    if (!shooting) {
      sprite.archerOrientation = sprite.orientation;
    } else {
      if (sprite.time > sprite.nextShot) {
        shootArrow(sprite);
        sprite.nextShot = sprite.time + evaluate(sprite.shootPeriod, sprite);
      }
    }
  },
  shootPeriod: 300,
  archerOrientation: 1,
  orientation: 1,
  direction: undefined,
  brake: .99,
  // speed: .1,
  // speed: .06,
  // speed: .05,
  speed: sprite => evaluate(sprite.shooting, sprite) ?
    0.03 + upgrades.speedWhileShooting * 0.02 :
    .05 + upgrades.speed * 0.03,
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
  cache: false,
  sprites: [
    sprite => evaluate({
      ...sprite,
      y: sprite => evaluate(sprite.y, sprite) - .1,
      parent: false,
      sprites: undefined,
      animation: sprite => evaluate(sprite.riderAnimation, sprite),
      range: sprite => evaluate(sprite.rangeOverride, sprite) ?? (evaluate(sprite.shooting, sprite) ? [0, 3] : [0]),
      hotspot: [
        sprite => evaluate(sprite.moving, sprite) ? .5 - sprite.orientation * evaluate(sprite.archerOrientation, sprite) * .05 : .53,
        sprite => evaluate(sprite.moving, sprite) ? .65 + Math.sin(sprite.horseFrame * .7) / 100 : .7,
      ],
      color: sprite => evaluate(sprite.foeColor, sprite)  ?? (sprite.corpse ? sprite.color : sprite.hill ? "#af8" : sprite.tree ? "#270" : "black"),
      direction: (sprite) => Math.sign(evaluate(sprite.archerOrientation, sprite)),
      frame: (sprite) => evaluate(sprite.horseFrame, sprite),
      random: 4,
      hidden: sprite => sprite.dead,
    }, sprite),
    sprite => evaluate({
      ...sprite,
      y: sprite => evaluate(sprite.y, sprite),
      parent: false,
      sprites: undefined,
      animation: sprite => sprite.hill ? "hut" : "horse",
      range: (sprite) => sprite.hill ? [0] : evaluate(sprite.moving, sprite) ? [0, 10]: [11],
      hotspot: [.47, .72],
      color: sprite => sprite.hill && hutInfo(sprite).closed ? "#ba6" : sprite.superSoldier ? "#a08" : sprite.foe ? "#004" : "#630",
      direction: (sprite) => Math.sign(sprite.orientation),
      frame: (sprite) => evaluate(sprite.horseFrame, sprite),
      random: sprite => sprite.superSoldier ? 100 : 4,
      hidden: sprite => (sprite.tree && !sprite.hill) || sprite.corpse || sprite.soldier,
    }, sprite),
    sprite => evaluate({
      ...sprite,
      y: sprite => evaluate(sprite.y, sprite) + 1,
      parent: false,
      sprites: undefined,
      animation: "shield",
      range: [0],
      hotspot: [.47, .72],
      color: () => upgrades.shield > 1 ? "gold" : "#69f",
      direction: (sprite) => Math.sign(sprite.orientation),
      frame: (sprite) => 0,
      hidden: sprite => sprite.foe || sprite.corpse || sprite.soldier || !upgrades.shield,
    }, sprite),
    sprite => evaluate({
      ...sprite,
      layer: -2,
      parent: false,
      sprites: undefined,
      animation: sprite => sprite.soldier ? "soldier" : sprite.corpse ? "dead" : sprite.hill ? "hill" : sprite.tree ? "tree" : "horse",
      range: (sprite) => sprite.corpse ? evaluate(sprite.rangeOverride, sprite) : sprite.tree ? [0] : evaluate(sprite.moving, sprite) ? [0, 10]: [11],

//      range: sprite => sprite.rangeOverride ?? (evaluate(sprite.shooting, sprite) ? [0, 3] : [0]),

      hotspot: (sprite) => sprite.tree ? [.53, 1] : [.47, .72],
      color: "#999",
      direction: (sprite) => Math.sign(sprite.orientation),
      height: -50,
      frame: (sprite) => evaluate(sprite.horseFrame, sprite),
      hidden: sprite => sprite.dead && sprite.soldier,
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
    const { x, y, width, height, hotspot, foeIndex, dead, color, foeColor, superSoldier, hidden, tree } = sprite;
    if (hidden || (inHut && !tree)) {
      return;
    }
    const left = x - hotspot[0] * width - sh[0];
    const top = y - hotspot[1] * height - sh[1];
    const right = left + width;
    const bottom = top + height;
    if (right < 0 || bottom < 0 || left > canvas.width || top > canvas.height) {
      return;
    }
    if (foeIndex !== undefined && !dead) {
      for (let i = arrowSize - 1; i >= 0; i--) {
        const arrow = arrows[i];
        if (arrow.x - sh[0] > left && arrow.x - sh[0] < right && arrow.y - sh[1] > top && arrow.y - sh[1] < bottom) {
          const hit = superSoldier ? Math.random() < .05 : true;

          if (hit) {
            foes[foeIndex].dead = time;    
            addCorpse(foes[foeIndex], time, arrow.dx, foeColor ?? color);
  
            const gx = hero.x - foes[foeIndex].x;
            const gy = hero.y - foes[foeIndex].y;
            const gdist = Math.sqrt(gx*gx + gy*gy);
            foes[foeIndex].dx = 0;
            foes[foeIndex].dy = 0;
            foes[foeIndex].goal[0] = foes[foeIndex].x + -gx / gdist * 2000;
            foes[foeIndex].goal[1] = foes[foeIndex].y + -gy / gdist * 2000;  

            money += (superSoldier ? 6 : 10) * (1 + .5 * upgrades.money);
            showMeTheMoney();
          } else {
            foes[foeIndex].hitTime = time;
          }

          removeArrow(i);
          if (upgrades.quickShot) {
            hero.nextShot = time + 50;
          }
        }
      }  
    }

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

const cacheBox = {};

function display(s) {
    let { x, y, width, height, animation, horseFrame, range, hotspot, color, time, hitTime, dead, direction, dy, random, hidden, cache, hero, hill } = s;
    // if (dead) {
    //   color = "red";
    //   return;
    // }
    if (hill && !hutInfo(s).closed) {
      nearHut = s;
    }
    
    if (hitTime && time - hitTime < 50) {
      color = hero ? "red" : "white";
    }
    let frame = range[0] + (range.length <= 1 ? 0 : Math.floor(horseFrame) % (range[1] - range[0] + 1));
    const dir = evaluate(direction, sprite);
    const ddy = evaluate(dy, sprite);

    // if (animation === "dead") {
    //   //frame = 3;
    //   console.log(animation, horseFrame, frame, color, range);
    //   // console.log(tag);
    // }


    if (cache) {
      const anim = root.animations.indexOf(animation);
      const tag = `${animation}-${frame}-${color}-${dir}-${width}-${height}`;

  

      if (!cacheBox[tag]) {
//        console.log(tag);
        cacheBox[tag] = {
          canvas: document.createElement("canvas"),
        };
        cacheBox[tag].canvas.width = width;
        cacheBox[tag].canvas.height = height;
        cacheBox[tag].canvas.getContext("2d").lineWidth = 6;
        cacheBox[tag].canvas.getContext("2d").strokeStyle = "black";
// /       document.body.appendChild(cacheBox[tag].canvas);

        showFrame(cacheBox[tag].canvas.getContext("2d"), dir < 0 ? width : 0, height < 0 ? -height : 0, width * dir, height, frame, anim, color, 0, 0);
      }
      ctx.drawImage(cacheBox[tag].canvas, x - hotspot[0] * width - sh[0], y - (height < 0 ? 0 : hotspot[1] * height) - sh[1] +shake);
      return;
    }
  
    const anim = root.animations.indexOf(animation);
    showFrame(ctx,
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

const hero = {...copy(sprite), hero: true};

let shake = 0;
let shakeSize = 0;


const corpses = [];

function addCorpse(foe, time, dx, color) {
  const corpse = {
    ...copy(sprite),
    corpse: true,
    horseFrame: 0,
    x: foe.x,
    y: foe.y,
    rangeOverride: [0, 4],
    range: undefined,
    archerOrientation: dx < 0 ? 1 : -1,
    cache: true,
    riderAnimation: "dead",
    born: time,
    color,
    process: (sprite) => {
      const ft = sprite.time - sprite.born;
      const frame = Math.floor(ft / 50);
//      console.log(ft);
      const endFrame = evaluate(sprite.rangeOverride[1], sprite);
      sprite.horseFrame = Math.min(frame, endFrame);
      if (sprite.horseFrame < endFrame) {
        sprite.x += dx * sprite.dt / 1000;
      }
    },
    width: foe.width,
    height: foe.height,
  };
  if (corpses.length > 200) {
    corpses.shift();
  }
  corpses.push(corpse);
  return corpse;
}

let hitCount = 0;

//  EASY vvvv
//const foesLength = 10;
//  HARD vvvv
const foesLength = 100;
const foes = new Array(foesLength).fill(0).map((_, index) => {
  const angle = Math.random() * Math.PI * 2;
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);

  const superSoldier = index / foesLength < .05;
  const soldier = index % 3 <= 1;
  // if (superSoldier) {
  //   console.log(superSoldier, soldier);    
  // }

  const x = cos * (2000 + Math.random()*1000);
  const y = sin * (2000 + Math.random()*1000);
  const foe = {
    ...copy(sprite),
    superSoldier,
    foeIndex: index,
    foeColor: superSoldier ? (soldier ? "blue" : "#a00") : soldier ? "#75f" : "#f0a",
    horseFrame: Math.floor(Math.random() * 100),
    goal: [x, y],
    gdist: 0,
    ax: (sprite) => (sprite.goal[0] - foe.x) / 2000,
    ay: (sprite) => (sprite.goal[1] - foe.y) / 2000,
    x,
    y,
    rangeOverride: sprite => !evaluate(sprite.moving, sprite) ? [0] : soldier ? [0, 4] : [0, 3],
    // speed: Math.max(.03, Math.random() / 15),//sprite => 10 / (evaluate(sprite.gdist, sprite) + 1),
    //  HARD vvv
    speed: soldier ? Math.max(.01, Math.random() / 30) : Math.max(.03, Math.random() / 20),
    //  MEDIUM vvv
    // speed: soldier ? Math.max(.01, Math.random() / 40) : Math.max(.02, Math.random() / 30),
    //  EASY vvv
    // speed: soldier ? Math.max(.01, Math.random() / 50) : Math.max(.015, Math.random() / 40),
    archerOrientation: (sprite) => Math.sign(evaluate(sprite.dx, sprite)),
    cache: true,
    soldier,
    process: (sprite) => {
      if (!sprite.parent) {
        return;
      }
      if (sprite.dead && sprite.time - sprite.dead > 5000) {
        sprite.dead = 0;

        sprite.speed = sprite.soldier ? Math.max(.025, Math.random() / 30) : Math.max(.03, Math.random() / 20);
      }
      processMovement(sprite);
      const gx = sprite.x - sprite.goal[0];
      const gy = sprite.y - sprite.goal[1];
      sprite.gdist = Math.sqrt(gx * gx + gy * gy);

      const hx = sprite.x - hero.x;
      const hy = sprite.y - hero.y;
      const hdist = Math.sqrt(hx * hx + hy * hy);
      if (hdist < 50 && !sprite.dead && health) {
        hitCount+= sprite.superSoldier ? 5 : 1;
        console.log("HIT", hitCount, (hero.time - hero.born) / 1000 + "s");
        health = Math.max(0, health - (superSoldier ? 2 : 1));
        showHealth();
        shakeSize = 40;
        cs.backgroundColor = "#a00";
        setTimeout(() => {
          cs.backgroundColor = "#efd";
        }, 150);

        if (!health) {
          addCorpse(hero, hero.time, (hero.x - sprite.x) * 2, hero.color);
          hero.dead = hero.time;
          showGameOver();
        }

        const angle = Math.random() * Math.PI * 2;
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        sprite.x = hero.x + cos * 2000;
        sprite.y = hero.y + sin * 2000;
        hero.dx = 0;
        hero.dy = 0;
        hero.hitTime = hero.time;

      }

      if (nearHut || !health) {
        if (!sprite.pausing) {
          sprite.pausing = true;
          const dx = sprite.x - (nearHut ?? hero).x;
          const dy = sprite.y - (nearHut ?? hero).y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          sprite.goal[0] = hero.x + dx / dist * 2000;
          sprite.goal[1] = hero.y + dy / dist * 2000;        
        }
      } else {
        if (sprite.pausing) {
          sprite.pausing = false;
        }
        if (hdist > 2500) {
          if (Math.random() < .6 || (!hero.dx && !hero.dy)) {
            const angle = Math.random() * Math.PI * 2;
            const cos = Math.cos(angle);
            const sin = Math.sin(angle);
            sprite.x = hero.x + cos * 1500;
            sprite.y = hero.y + sin * 1500;  
          } else {
            const ddd = Math.sqrt(hero.dx * hero.dx + hero.dy * hero.dy);
            sprite.x = hero.x + hero.dx * (1000 + Math.random() * 500) / ddd + (Math.random() - .5) * 300;
            sprite.y = hero.y + hero.dy * (1000 + Math.random() * 500) / ddd + (Math.random() - .5) * 300;
          }
          if (sprite.dead) {
            sprite.dead = 0;

            sprite.speed = sprite.soldier ? Math.max(.025, Math.random() / 30) : Math.max(.03, Math.random() / 20);
          }
          sprite.gdist = 0;
        }

        if (sprite.gdist < 100 || hdist > (sprite.soldier ? 500 : 3000)) {
          sprite.goal[0] = hero.x + (hero.x - sprite.x) + (Math.random()-.5) * (sprite.soldier ? 200 : 300);
          sprite.goal[1] = hero.y + (hero.y - sprite.y) + (Math.random()-.5) * (sprite.soldier ? 200 : 300);
          // if (sprite.dead) {
          //   sprite.dead = false;
          // }
        }

      }      
    },
    foe: true,
    width: (soldier ? 200 * zoom: 220 * zoom) * (superSoldier ? (soldier ? 2:1.5) : 1),
    height: (soldier ? 180 *zoom: 180 * zoom) * (superSoldier ? (soldier ? 2:1.5) : 1),
    riderAnimation: soldier ? "soldier" : "sword",
  };
  return foe;
});

let nearHut = null;

let inHut = null;

const huts = {};

const treeCount = 30;//200;
const trees = new Array(treeCount).fill(0).map((_, index) => {
  // const angle = Math.random() * Math.PI * 2;
  // const cos = Math.cos(angle);
  // const sin = Math.sin(angle);
  const isHill = index <= 1;
  const repeatDistance = isHill ? 20000 : 4000;
  const repeatCond = repeatDistance / 2 + 500;
  const tree = {
    ...copy(sprite),
    cache: true,
    x: isHill ? index * repeatDistance : Math.random() * 4000 - 2000,
    y: isHill ? index * repeatDistance / 2 : Math.random() * 4000 - 2000,
    cellX: 0,
    cellY: 0,
    // x: cos * (2000 + Math.random()*1000),
    // y: sin * (2000 + Math.random()*1000),
    process: (sprite) => {
      if (!sprite.parent) {
        return;
      }
      const hx = sprite.x - hero.x;
      const hy = sprite.y - hero.y;
      const hdist = Math.sqrt(hx * hx + hy * hy);
      if (hdist < (isHill ? 80 : 50)) {
//        console.log("TREE", hdist);
        if (isHill && !hutInfo(sprite).closed) {
          if (!inHut) {
            inHut = sprite;
            sprite.enteredHut = sprite.time;
            health = defaultmaxHealth + upgrades.maxHealth * 2;
            showHealth();
            showGameOver();
          }
        } else {
          shakeSize = 20;
          hero.x -= hx;
          hero.y -= hy;
          hero.dx = 0;
          hero.dy = 0;
        }
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
      if (hx > repeatCond * 2) {
        sprite.x -= repeatDistance * 2;
        sprite.cellX--;
      } else if (hx < -repeatCond * 2) {
        sprite.x += repeatDistance * 2;
        sprite.cellX++;
      }
      if (hy > repeatCond) {
        sprite.y -= repeatDistance;
        sprite.cellY--;
      } else if (hy < -repeatCond) {
        sprite.y += repeatDistance;
        sprite.cellY++;
      }
    },
    foe: true,
    width: (isHill ? 600 : 500) * zoom,
    height: (isHill ? 400 : 350 + Math.random() * 200) * zoom,
    riderAnimation: isHill ? "hut" : "tree",
    foeColor: isHill ? `rgb(${200}, ${100 + index * 55}, ${50 + index * 50})` : `rgb(${Math.random() * 30}, ${Math.random() * 150}, ${Math.random()*20})`,
    tree: true,
    hill: isHill,
    rangeOverride: isHill ? [1] : undefined,
  };
  return tree;
});

function hutInfo(sprite) {
  if (!huts[`${sprite.cellX}_${sprite.cellY}`]) {
    huts[`${sprite.cellX}_${sprite.cellY}`] = {};
  }
  return huts[`${sprite.cellX}_${sprite.cellY}`];
}



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
    if (time - arrows[i].born > 1500) {
      removeArrow(i);
    }
  }

//  console.log(arrowSize);

  ctx.strokeStyle = "#380";
  ctx.lineWidth = 2;

  accumulator.length = 0;
  drawGround(accumulator);
  showSprite(hero, time, dt, accumulator);
  foes.forEach(foe => {
    showSprite(foe, time, dt, accumulator);
  });
  corpses.forEach(corpse => {
    showSprite(corpse, time, dt, accumulator);
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
  nearHut = null;  //  display will find hut
  accumulator.forEach(s => display(s, time));
  if (!health) {
    const deathTime = Math.min(.7, (time - hero.dead) / 3000);
    ctx.fillStyle = `rgb(200,0,0,${deathTime})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fill();
  } else if (!inHut) {
    headStart += ((hero.dx * hero.archerOrientation < 0 ? 0 : hero.dx) / 2 + hero.archerOrientation * 2 - headStart) * .05;
    sh[0] += hero.dt / 20 * (hero.x + headStart * 80 - canvas.width/2 - sh[0]) * .1;
    sh[1] += hero.dt / 20 * (hero.y + hero.dy * 50 - canvas.height/2 - sh[1]) * .1;
  } else {
      const hutTime = Math.min(1, (time - inHut.enteredHut) / 500);
      ctx.fillStyle = `rgb(0,0,0,${hutTime})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fill();
  }
}


function drawGround() {
  const spacing = 200;
  ctx.beginPath();
  const cell = [Math.round(sh[0] / spacing), Math.round(sh[1] / spacing)];
  for (let y = -15; y < 15; y++) {
    for (let x = -20; x < 20; x++) {
      const xx = x + cell[0];
      const yy = y + cell[1];
      const diffx = Math.sin(xx *123 + yy * 9991) + Math.sin(xx *123 / 10 + yy * 9991 / 100) + Math.sin(xx *123 / 10 + yy * 9991 / 100);
      const diffy = Math.cos(xx *12331 + yy * 2221) + Math.cos(xx *12331 / 10 + yy * 2221 / 10) + Math.cos(xx *12331 / 100 + yy * 2221 / 100);
      const zx = diffx * 500;
      const zy = diffy * 200;
      const posX = xx * spacing - sh[0] + zx;
      const posY = yy * spacing - sh[1] + zy
      ctx.moveTo(posX, posY + shake);
      ctx.lineTo(posX + diffx * 100, posY + shake + 3);
      ctx.lineTo(posX + diffx * 100 + diffy * 100, posY + shake);
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



showHealth();
showMeTheMoney();