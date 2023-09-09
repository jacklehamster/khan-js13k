//  BEGINNING
let q = document.querySelector.bind(document);
document.addEventListener("DOMContentLoaded", () => { 
  q("body").style.backgroundColor = "#100";
  q("h3").style.opacity = 1;
  setTimeout(() => {
let canvas = q("canvas"); let ctx=canvas.getContext("2d");
let cs = canvas.style;
canvas.width = 2000; cs.width = `${canvas.width/2}px`;
canvas.height = 1200; cs.height = `${canvas.height/2}px`;
cs.border = "1px solid black";
cs.backgroundColor = "#efd";
setTimeout(() => cs.opacity = 1, 1000);

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
let locked = true;

const wildHordeMusic = new Song(wildHorde);

let startTime = 0;
// const upgrades = {
//   speedWhileShooting: 0,
//   speed: 0,
//   maxHealth: 0,
//   shield: 0,
//   quickShot: 0,
//   money: 0,
// };

let upgrades = window.upgrades = {
  bow: 0, //  max 1                 [bow]
  speedWhileShooting: 0,  //  max 1 [bow]
  speed: 0, //  max 3               
  maxHealth: 0, //  max 3           
  shield: 0,  //  max 2             
  quickShot: 0, //  max 1           [bow]
  money: 0, // max 3                [bow]
  rickoShot: 0, //  max 3           [bow]
  giantPiercing: 0, //  max 3       [bow]
  treeNav: 0, //  max 3
  rage: 0,  //  max 3               [bow]
  control: 0  //  max 3
};

const hutUpgrades = [
  () => {},
  () => {
    upgrades.bow++;
    foesTotal = 20;
    
    gameOverDiv.textContent = `Level ${hutLevel}\nWelcome`;
    
    // for (hutLevel++;hutLevel < hutUpgrades.length; hutLevel++) {
    //     hutUpgrades[hutLevel]?.();
    // }
    // hutLevel = hutUpgrades.length - 1;
  },
  () => {
    gameOverDiv.textContent = `Level ${hutLevel}\nWelcome`;
    foesTotal = 40;
    soldierSuperSpeed += .2;
  },
  () => {
    gameOverDiv.textContent = `Level ${hutLevel}\nWelcome`;
    foesTotal = 60;
    soldierSuperSpeed += .1;
  },
  () => {
    gameOverDiv.textContent = `Level ${hutLevel}\nWelcome`;
    foesTotal = 80;
    soldierSuperSpeed += .1;
  },
  () => {
    gameOverDiv.textContent = `Level ${hutLevel}\nWelcome`;
    foesTotal = 100;
    soldierSuperSpeed += .1;
  },
  () => {
    gameOverDiv.textContent = `Level ${hutLevel}\n NOTE: This is the right level for story mode ending.`;
    foesTotal = 150;
    soldierSuperSpeed += .1;
  },
  () => {
    gameOverDiv.textContent = `Level ${hutLevel}\nWelcome`;
    foesTotal = 200;
    soldierSuperSpeed += .1;
  },
  () => {
    gameOverDiv.textContent = `Level ${hutLevel}\nWelcome`;
    foesTotal = 300;
    soldierSuperSpeed += .1;
  },
  () => {
    gameOverDiv.textContent = `Level ${hutLevel}\nWelcome`;
    foesTotal = 400;
    soldierSuperSpeed += .1;
  },
  () => {
    gameOverDiv.textContent = `Level ${hutLevel}\nWelcome`;
    foesTotal = 400;
    soldierSuperSpeed += .1;
  },
  () => {
    foesTotal = 400;
    gameOverDiv.textContent = `Level ${hutLevel}\nYou've reached the last supported level.`;
    soldierSuperSpeed += .5;
  },
];
let soldierSuperSpeed = .7;

const defaultmaxHealth = 6;

let health = defaultmaxHealth;
let rage = 0;

const healthDiv = document.body.appendChild(document.createElement("div"));
healthDiv.style.position = "absolute";
healthDiv.style.top = canvas.offsetTop;
healthDiv.style.left = canvas.offsetLeft + 3;
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
moneyDiv.style.top = canvas.offsetTop + 25;
moneyDiv.style.left = canvas.offsetLeft + 5;
moneyDiv.style.color = "#990";
moneyDiv.style
function showMeTheMoney() {
  const s = Math.floor((Date.now() - startTime) / 1000);
  moneyDiv.innerText = (!money ? "" : `Level ${hutLevel}\n⭐ ${money}\n${Math.floor(s/60)}:${(100 + s%60).toString().substring(1)}`);
}

setInterval(showMeTheMoney, 1000);


const gameOverDiv = document.body.appendChild(document.createElement("div"));
gameOverDiv.style.position = "absolute";
gameOverDiv.style.top = canvas.offsetTop + 50;
gameOverDiv.style.left = canvas.offsetLeft + 10;
gameOverDiv.style.color = "snow";
gameOverDiv.textContent = "Press ESC to continue";
gameOverDiv.style.display = "none";
function showGameOver() {
  wildHordeMusic.stop();
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
  wildHordeMusic.pause();
}, false);
window.addEventListener("focus", function(event) { 
  hasFocus = true;
  wildHordeMusic.resume();
}, false);


let root;
function startGame() {
    const byteArray = load_binary_resource("rider.13k");
    root = decodeShape(byteArray);
    console.log(root);
    loop(0);
}

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
      ctx.lineTo(offsetX + x, offsetY + y + (x/w - .5)*10 * ddy + random * (Math.random() - .5));
  } else {
      ctx.moveTo(offsetX + x, offsetY + y + (x/w - .5)*10 * ddy + random * (Math.random() - .5));
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

function hasShield(hero) {
  return upgrades.shield && hero.time - (hero.lastBlock??-20000) > (upgrades.shield === 2 ? 10000 : 20000);
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

function repeatDt(callback, subject) {
  const loops = Math.min(6, Math.max(dt / 8, 1));
  for (let ti = 0; ti < loops; ti++) {
    callback(subject);
  }
}

function processMovement(sprite) {
  const dtt = 0.7;
  const ax = evaluate(sprite.ax, sprite);
  const ay = evaluate(sprite.ay, sprite);
  const da = Math.sqrt(ax*ax + ay * ay);
  if (ax !== 0) {
    sprite.orientation = ax;
  }
  const speed = evaluate(sprite.speed, sprite) * (sprite.dead ? 1.5 : 1) * (sprite.superSoldier && sprite.soldier ? .7 : 1);
  const control = evaluate(sprite.control, sprite) ?? 0;
  const brake = evaluate(sprite.brake, sprite) - control * 0.01;
  if (da) {
    sprite.dx = (sprite.dx + ax / da * speed * (1 + control)) * brake;
    sprite.dy = (sprite.dy + ay / da * speed / 2 * (1 + control)) * brake;
  } else {
    sprite.dx = sprite.dx * (brake);
    sprite.dy = sprite.dy * (brake);      
  }
  if (evaluate(sprite.moving, sprite)) {
    sprite.x += sprite.dx * dtt;
    sprite.y += sprite.dy * dtt;
  }
  const dist = Math.sqrt(sprite.dx * sprite.dx + sprite.dy * sprite.dy);
  sprite.horseFrame += dtt * Math.max(.08, dist / 50);
}

let onExit = null;
function exitHut(hut) {
    hero.x = hut.x;
    hero.y = hut.y + 200;
    hero.dx = 0;
    hero.dy = 0;
    let info = hutInfo(inHut);
    info.closed = true;
    info.onFire = true;
    inHut = null;
    locked = false;
    onExit?.();
    onExit = null;
    showHealth();
    showMeTheMoney();
}

const sprite = {
  parent: true,
  active: () => true,
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
        wildHordeMusic.play();
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
        wildHordeMusic.play();
      }
    }
    if (!health && sprite.hero) {
      return;
    }

    repeatDt(processMovement, sprite);
    if (locked) {
      sprite.x = Math.max(-canvas.width / 2, Math.min(sprite.x, canvas.width / 2));
      sprite.y = Math.max(-canvas.height / 2, Math.min(sprite.y, canvas.height / 2));
    }

    const shooting = evaluate(sprite.shooting, sprite);
    if (!shooting) {
      sprite.archerOrientation = sprite.orientation;
    } else if (upgrades.bow) {
      if (sprite.time > sprite.nextShot) {
        shootArrow(sprite);
        sprite.nextShot = sprite.time + evaluate(sprite.shootPeriod, sprite);
      }
    }
  },
  shootPeriod: 300,
  archerOrientation: 1,
  orientation: 1,
  // direction: undefined,
  brake: .99,
  // speed: .1,
  // speed: .06,
  // speed: .05,
  speed: sprite => (1 + rage * .2) * (.08 + upgrades.speed * 0.03) * (evaluate(sprite.shooting, sprite) && !upgrades.speedWhileShooting ?
    0.5 : 1),
  x: 300, y: 500,
  moving: sprite => Math.abs(sprite.dx) > threshold || Math.abs(sprite.dy) > threshold,
  shooting: () => keys.Space,
  ax: () => (keys.KeyA || keys.ArrowLeft ? -1 : 0) + (keys.KeyD || keys.ArrowRight ? 1 : 0),
  ay: () => (keys.KeyW || keys.ArrowUp ? -1 : 0) + (keys.KeyS || keys.ArrowDown ? 1 : 0),
  dx: 0,
  dy: 0,
  width: 250 * zoom,
  height: 200 * zoom,
  // hotspot: undefined,
  born: 0,
  // animation: undefined,
  // range: undefined,
  // color: undefined,
  horseFrame: 0,
  random: 0,
  riderAnimation: "archer",
  layer: 0,
  // hidden: false,
  // tree: false,
  // cache: false,
  control: () => upgrades.control,
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
      color: sprite => evaluate(sprite.foeColor, sprite)  ?? (sprite.corpse ? sprite.color : sprite.hut ? "#af8" : sprite.tree ? "#270" : "black"),
      direction: (sprite) => Math.sign(evaluate(sprite.archerOrientation, sprite)),
      frame: (sprite) => evaluate(sprite.horseFrame, sprite),
      random: 4,
      hidden: sprite => sprite.dead,
    }, sprite),
    sprite => evaluate({
      ...sprite,
      process: undefined,
      y: sprite => evaluate(sprite.y, sprite),
      parent: false,
      sprites: undefined,
      animation: sprite => sprite.hut ? "hut" : "horse",
      range: (sprite) => sprite.hut ? [0] : evaluate(sprite.moving, sprite) ? [0, 10]: [11],
      hotspot: [.47, .72],
      color: sprite => sprite.hut && hutInfo(sprite).closed ? "#ba6" : sprite.superSoldier ? "#a08" : sprite.foe ? "#004" : "#630",
      direction: (sprite) => Math.sign(sprite.orientation),
      frame: (sprite) => evaluate(sprite.horseFrame, sprite),
      random: sprite => sprite.superSoldier ? 100 : 4,
      hidden: sprite => (sprite.tree && !sprite.hut) || sprite.corpse || sprite.soldier,
    }, sprite),
    sprite => evaluate({
      ...sprite,
      process: undefined,
      y: sprite => evaluate(sprite.y, sprite) + 1,
      parent: false,
      sprites: undefined,
      animation: "shield",
      range: [0],
      hotspot: [.47, .72],
      color: sprite => hasShield(sprite) && upgrades.shield > 1 ? "gold" : "#69f",
      direction: (sprite) => Math.sign(sprite.orientation),
      frame: () => 0,
      hidden: sprite => !hasShield(sprite) || sprite.foe || sprite.corpse || sprite.soldier,
    }, sprite),
    sprite => evaluate({
      ...sprite,
      process: undefined,
      layer: -2,
      parent: false,
      sprites: undefined,
      animation: sprite => sprite.soldier ? "soldier" : sprite.corpse ? "dead" : sprite.hut ? "hut" : sprite.tree ? "tree" : "horse",
      range: (sprite) => sprite.corpse ? evaluate(sprite.rangeOverride, sprite) : sprite.tree ? [0] : evaluate(sprite.moving, sprite) ? [0, 10]: [11],

//      range: sprite => sprite.rangeOverride ?? (evaluate(sprite.shooting, sprite) ? [0, 3] : [0]),

      hotspot: (sprite) => sprite.tree ? [.53, 1] : [.47, .72],
      color: "#999",
      direction: (sprite) => Math.sign(sprite.orientation),
      height: -50,
      frame: (sprite) => evaluate(sprite.horseFrame, sprite),
      hidden: sprite => sprite.dead && sprite.soldier,
    }, sprite),
    ...new Array(5).fill(
      sprite => evaluate({
        ...sprite,
        process: undefined,
        cache: false,
        parent: false,
        sprites: undefined,
        animation: "shield",
        random: 150,
        range: [0],
        hotspot: [.47 + Math.random() - .5, 5],
        width: 200,
        height: 30,
        color: () => Math.random() < .5 ? "gold" : "red",
        direction: (sprite) => Math.sign(sprite.orientation),
        frame: () => 0,
        active: sprite => sprite.hut && hutInfo(sprite).onFire,
      }, sprite)
    ),
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
  sprite.time = time;
  const sprites = evaluate(sprite.sprites, sprite);
  sprites.forEach(sprite => {
    const { x, y, width, height, hotspot, foeIndex, dead, color, foeColor, superSoldier, hidden, tree, active } = sprite;
    if (!active || hidden || (inHut && !tree)) {
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
          const hit = superSoldier ? Math.random() < (.05 + (.2 * upgrades.giantPiercing)) : true;
          const hitFoe = foes[foeIndex];
          if (hit) {
            hitFoe.dead = time;    
            addCorpse(hitFoe, time, arrow.dx, foeColor ?? color);
  
            const gx = hero.x - hitFoe.x;
            const gy = hero.y - hitFoe.y;
            const gdist = Math.sqrt(gx*gx + gy*gy);
            hitFoe.dx = 0;
            hitFoe.dy = 0;
            hitFoe.goal[0] = hitFoe.x + -gx / gdist * 2000;
            hitFoe.goal[1] = hitFoe.y + -gy / gdist * 2000;  

            money += (superSoldier ? 100 : 10) * (1 + .5 * upgrades.money);
            showMeTheMoney();
          } else {
            hitFoe.hitTime = time;
          }

          if (Math.random() < upgrades.rickoShot * .3) {
            arrow.dx *= (Math.random() - .5);
            arrow.dy = - Math.abs(arrow.dy)* .8;
          } else {
            removeArrow(i);
          }
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
    let { x, y, width, height, animation, horseFrame, range, hotspot, color, time, hitTime, dead, direction, dy, random, hidden, cache, hero, hut } = s;
    // if (dead) {
    //   color = "red";
    //   return;
    // }
    if (hut && !hutInfo(s).closed) {
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

  
      let canvas;
      if (!cacheBox[tag]) {
//        console.log(tag);
        canvas = document.createElement("canvas");
        cacheBox[tag] = {
          canvas,
        };
        canvas.width = width;
        canvas.height = height;
        canvas.getContext("2d").lineWidth = 6;
        canvas.getContext("2d").strokeStyle = "black";
// /       document.body.appendChild(cacheBox[tag].canvas);

        showFrame(canvas.getContext("2d"), dir < 0 ? width : 0, height < 0 ? -height : 0, width * dir, height, frame, anim, color, 0, 0);
      }
      canvas = cacheBox[tag].canvas;
      ctx.drawImage(canvas, x - hotspot[0] * width - sh[0], y - (height < 0 ? 0 : hotspot[1] * height) - sh[1] +shake);
      return;
    }
  
    const anim = root.animations.indexOf(animation);
    showFrame(ctx,
      x - hotspot[0] * width * dir - sh[0],
      y - hotspot[1] * height - sh[1] + shake,
      width * dir, height, frame, anim, color, ddy, random);
}

//const fps = 60;
//const period = 1000 / fps;
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
        sprite.x += dx * dt / 1000;
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


//  EASY vvvv
let foesTotal = 0;
// const foesLength = 20;
//  HARD vvvv
const foesLength = 400;
const foes = new Array(foesLength).fill(0).map((_, index) => {
  const angle = Math.random() * Math.PI * 2;
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);

  const superSoldier = index % 20 === 0;
  const soldier = index % 3 <= 1;
  // if (superSoldier) {
  //   console.log(superSoldier, soldier);    
  // }

  const x = cos * (2000 + Math.random()*1000);
  const y = sin * (2000 + Math.random()*1000);
  const mySpeed = soldier ? Math.max(.01, Math.random() / 20) : Math.max(.03, Math.random() / 10);//soldierSuperSpeed
  const foe = {
    ...copy(sprite),
    active: () => index <= foesTotal,
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
    speed: () => mySpeed * soldierSuperSpeed,
    //  MEDIUM vvv
    // speed: soldier ? Math.max(.01, Math.random() / 40) : Math.max(.02, Math.random() / 30),
    //  EASY vvv
    // speed: soldier ? Math.max(.01, Math.random() / 50) : Math.max(.015, Math.random() / 40),
    archerOrientation: (sprite) => Math.sign(evaluate(sprite.dx, sprite)),
    cache: true,
    soldier,
    process: (sprite) => {
      if (!sprite.parent || !evaluate(sprite.active, sprite)) {
        return;
      }
      if (sprite.dead && sprite.time - sprite.dead > 5000) {
        sprite.dead = 0;

        sprite.speed = sprite.soldier ? Math.max(.025, Math.random() / 30) : Math.max(.03, Math.random() / 20);
      }
      repeatDt(processMovement, sprite);
      const gx = sprite.x - sprite.goal[0];
      const gy = sprite.y - sprite.goal[1];
      sprite.gdist = Math.sqrt(gx * gx + gy * gy);

      const hx = sprite.x - hero.x;
      const hy = sprite.y - hero.y;
      const hdist = Math.sqrt(hx * hx + hy * hy);
      if (hdist < 50 && !sprite.dead && health) {
        if (hasShield(hero)) {
          hero.lastBlock = hero.time;
        } else {
          cs.backgroundColor = "#a00";
          health = Math.max(0, health - (superSoldier ? 2 : 1));
          showHealth();
        }
        shakeSize = 40;
        setTimeout(() => {
          cs.backgroundColor = "#efd";
        }, 150);

        if (!health) {
          addCorpse(hero, hero.time, (hero.x - sprite.x) * 2, hero.color);
          hero.dead = hero.time;
          showGameOver();
          wildHordeMusic.stop();
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

const treeCount = 200; //  DENSE
// const treeCount = 30;
const trees = new Array(treeCount).fill(0).map((_, index) => {
  // const angle = Math.random() * Math.PI * 2;
  // const cos = Math.cos(angle);
  // const sin = Math.sin(angle);
  const isHut = index <= 1;
  const repeatDistance = isHut ? 20000 : 4000;
  const repeatCond = repeatDistance / 2 + 500;
  const tree = {
    ...copy(sprite),
    cache: true,
    x: isHut ? index * repeatDistance : 1000 + Math.random() * 4000,
    y: isHut ? index * repeatDistance / 2 : Math.random() * 4000,
    cellX: 0,
    cellY: 0,
    index,
    // x: cos * (2000 + Math.random()*1000),
    // y: sin * (2000 + Math.random()*1000),
    process: (sprite) => {
      if (!sprite.parent || !evaluate(sprite.active, sprite)) {
        return;
      }
      const hx = sprite.x - hero.x;
      const hy = sprite.y - hero.y;
      const hdist = Math.sqrt(hx * hx + hy * hy);
      if (hdist < (isHut ? 80 : 50)) {
//        console.log("TREE", hdist);
        if (isHut && !hutInfo(sprite).closed) {
          if (!inHut) {
            inHut = sprite;
            sprite.enteredHut = sprite.time;
            if (!startTime) {
              startTime = Date.now();
            }

            if (!hutInfo(inHut).level) {
              hutInfo(inHut).level = hutLevel++;
              onExit = hutUpgrades[Math.min(hutLevel, hutUpgrades.length - 1)]?.();
            }
          

            health = defaultmaxHealth + upgrades.maxHealth * 2;
            showHealth();
            showGameOver();
          }
        } else {
          shakeSize = 20;
          hero.x -= hx;
          hero.y -= hy;
          hero.dx *= (upgrades.treeNav * .3);
          hero.dy *= (upgrades.treeNav * .3);
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
    width: (isHut ? 600 : 500) * zoom,
    height: (isHut ? 400 : 350 + Math.random() * 200) * zoom,
    riderAnimation: isHut ? "hut" : "tree",
    foeColor: isHut ? `rgb(${200}, ${100 + index * 55}, ${50 + index * 50})` : `rgb(${Math.random() * 30}, ${Math.random() * 150}, ${Math.random()*20})`,
    tree: true,
    hut: isHut,
    rangeOverride: isHut ? [1] : undefined,
  };
  return tree;
});

//let borte = {...sprite, sprites: [], animation: "borte", color: "white"};

let hutLevel = 0;
function hutInfo(sprite) {
  const tag = `${sprite.cellX}_${sprite.cellY}_${sprite.index}`;
  return huts[tag] ?? (huts[tag] = {});
}

function distSq(a, b) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return dx * dx + dy * dy;
}

function closestHut() {
  const huts = trees.filter(h => h.hut && !hutInfo(h).closed);
  let best = huts[0];
  for (let i = 1; i < huts.length; i++) {
    if (distSq(huts[i], hero) < distSq(best, hero)) {
      best = huts[i];
    }
  }
  return best;
}

const elements = [[hero], foes, corpses, trees];

let indic = null;

//let toggle = 0;
let dt;
function loop(time) {
  requestAnimationFrame(loop);
  // toggle = (toggle + 1) % 3;
  // if (toggle) {
  //   return;
  // }
  if (!hasFocus) {
    return;
  }
  lastframeTime = Math.max(lastframeTime, time - 100);
  dt = time - lastframeTime;
//  console.log(dt);
  lastframeTime = time;


  if (shakeSize) {
    shake = Math.random() * shakeSize;
    shakeSize *= .5;
    if (shakeSize < .1) {
      shakeSize = 0;
    }
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  repeatDt(moveArrows, arrows);


  ctx.beginPath();
  ctx.strokeStyle = "#038";
  ctx.lineWidth = 6;
  const arrdt = .7;
  for (let i = 0; i < arrowSize; i++) {
    const arrow = arrows[i];
    const arrowlen = 50;
    const dist = Math.sqrt(arrow.dx * arrow.dx + arrow.dy * arrow.dy) + 1;
    ctx.moveTo(
      arrow.x - sh[0],
      arrow.y - sh[1] + shake);
    ctx.lineTo(
      arrow.x - sh[0] - arrow.dx / dist * arrowlen,
      arrow.y - sh[1] + shake - arrow.dy / dist * arrowlen);
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
  elements.forEach(e => e.forEach(s => showSprite(s, time, dt, accumulator)));
  accumulator.sort((a, b) => {
    if (a.layer !== b.layer) {
      return a.layer - b.layer;
    }
    return Math.sign(a.y - b.y);
  });
  nearHut = null;  //  display will find hut
  accumulator.forEach(s => display(s, time));

  const ch = closestHut();
  if (ch) {
    const chdx = ch.x - hero.x;
    const chdy = ch.y - hero.y;
    const chdist = Math.sqrt(chdx*chdx + chdy*chdy);
    if (chdist > 2000) {
      if (!indic) {
        indic = [hero.x, hero.y];
      }
      ctx.beginPath();
      const ddd = 2000;
      const ix = hero.x  + chdx / chdist * ddd - sh[0];
      const iy = hero.y  + chdy / chdist * ddd - sh[1];
      indic[0] += (ix - indic[0]) * .1;
      indic[1] += (iy - indic[1]) * .1;
      ctx.arc(Math.min(canvas.width - 80, Math.max(80, indic[0])),
              Math.min(canvas.height - 80, Math.max(80, indic[1])), 15, 0, 2 * Math.PI);
      ctx.fill();  
    }  
  }

  
  if (!health) {
    const deathTime = Math.min(.7, (time - hero.dead) / 3000);
    ctx.fillStyle = `rgb(200,0,0,${deathTime})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fill();
  } else if (!inHut) {
    if (!locked) {
      headStart += ((hero.dx * hero.archerOrientation < 0 ? 0 : hero.dx) / 2 + hero.archerOrientation - headStart) * .05;
      const dt = 20;
      sh[0] += dt / 20 * (hero.x - canvas.width/2 - sh[0] + headStart * 80) * .1;
      sh[1] += dt / 20 * (hero.y - canvas.height/2 - sh[1] + hero.dy * 50) * .1;  
    } else {
      sh[0] =- canvas.width/2;
      sh[1] = -canvas.height/2;  
    }
  } else {
      const hutTime = Math.min(1, (time - inHut.enteredHut) / 500);
      ctx.fillStyle = `rgb(0,0,0,${hutTime})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fill();
      // showSprite(borte, time, dt, accumulator);
      // accumulator.forEach(s => display(s, time));
    }
}

function moveArrows(arrows) {
  const arrdt = .4;
  const arrowlen = 50;
  for (let i = 0; i < arrowSize; i++) {
    const arrow = arrows[i];
    const dist = Math.sqrt(arrow.dx * arrow.dx + arrow.dy * arrow.dy) + 1;
    arrow.dy += .3;
    arrow.x += arrow.dx / dist * arrowlen * arrdt;
    arrow.y += arrow.dy / dist * arrowlen * arrdt;
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








startGame();
}, 3000);
}); /// END
