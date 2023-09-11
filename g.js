//  BEGINNING
let q = document.querySelector.bind(document);
dadd = document.addEventListener;
const rando = Math.random;
const disto = (dx, dy) => Math.sqrt(dx*dx+dy*dy);

dadd("DOMContentLoaded", () => { 
  q("body").style.backgroundColor = "#100";
setTimeout(() => {
  let gTime;

  //let icons = [];
let canvas = q("canvas"); let ctx=canvas.getContext("2d");
let cs = canvas.style;
let cvw = canvas.width = 2000; cs.width = `${cvw/2}px`;
let cvh = canvas.height = 1200; cs.height = `${cvh/2}px`;
cs.border = "1px solid black";
cs.backgroundColor = "#efd";
setTimeout(() => cs.opacity = 1, 1000);

const costMul = 200;
const zoom = .75;
const keys = {};
dadd("keyup", (e) => {
  delete keys[e.code];
});

function doneShopping() {
  exitHut(inHut);
  closeShop();
  showText("");
  wildHordeMusic.play();
  return true;
}

dadd("mousemove", () => {
  cs.cursor = "";
});

dadd("keydown", (e) => {
  keys[e.code] = true;
  cs.cursor = "none";
  if(shopDiv.style.display === "") {
    const s = shopList;

    let closing = false;
    const bowLess = !upgrades.bow;
    if (keys.KeyW || keys.ArrowUp)
    shopIndex = Math.max(0, shopIndex - 1);
    if (keys.KeyS || keys.ArrowDown)
      shopIndex = Math.min(s.length - (bowLess ? 1 : 0), shopIndex + 1);
    if (keys.Space) {
      if (shopIndex === s.length) {
        closing = doneShopping();
      } else if (!purchased[shopIndex]) {
        const shopItem = [...shop].filter(canBuy)[shopIndex];
        if (shopItem) {
          purchased[shopIndex] = true;
          money -= shopItem.cost[0] * costMul;
          showMeTheMoney();
          shopItem?.buy(shopItem);  
          if (bowLess) {
            closing = doneShopping();          
          }  
        }
      }
    }
    delete keys[e.code];
    if (!closing) {
      showShop(true);
    }
  }
  e.preventDefault();
});

function closeShop() {
  shopDiv.style.display = "none";  
}

const accumulator = [];

const sh = [0,0];
let locked = true;

let wildHordeMusic = new Song(wildHorde);
const furEliseMusic = new Song(furElise);

let startTime = 0;
// const upgrades = {
//   speedWhileShooting: 0,
//   speed: 0,
//   maxHealth: 0,
//   shield: 0,
//   quickShot: 0,
//   money: 0,
// };

// let upgrades = window.upgrades = {
//   bow: 0, //  max 1                 [bow]
//   speedWhileShooting: 0,  //  max 1 [bow]
//   speed: 0, //  max 3               
//   maxHealth: 0, //  max 3           
//   shield: 0,  //  max 2
//   quickShot: 0, //  max 1           [bow]
//   money: 0, // max 3                [bow]
//   rickoShot: 0, //  max 3           [bow]
//   giantPiercing: 0, //  max 3       [bow]
//   treeNav: 0, //  max 3
//   // rage: 0,  //  max 3               [bow]
//   control: 0,  //  max 3
//   borte: 0,
// };

function buy(item) {
  // icons.push("+"+item.name);
  upgrades[item.name]++;
  if (!item.recurring) {
    item.cost.shift();
  }
}

function repeatString(s, num) {
  return new Array(num).fill(s).join("")
}

let bowshop;
const shop = [
  bowshop = { name: "bow", title: "bow and arrows", description: "(Recommended) Press Space to shoot down enemies and collect 🏵️", cost: [0], buy },
  { name: "speed", title: "speed", description: () => `Change hoof for faster horse (${repeatString("⭐", upgrades.speed + 1)})`, cost: [0,2,3], buy},
  { name: "speedWhileShooting", title: "stable aim", description: "Stabilize bow to shoot without slow down the horse", cost: [2], req: "bow", buy},
  { name: "maxHealth", title: "max health", description: "Eat foot to increases the maximum health by one ❤️", cost: [2, 3, 4], buy: item => {
    buy(item);
    health = Math.min(defaultmaxHealth + upgrades.maxHealth * 2, health + 1);
  }},
  { name: "shield", title: "shield", description: () => `This shield blocks one hit. Re-usable after ${20 / (upgrades.shield+1)}s`, cost: [2, 4], buy},
  // { name: "reflect", cost: [2, 4], req: "shield"},
  { name: "quickShot", title: "quickshot", description: "Learn skill. Shoot immediately after one hit", cost: [2], req: "bow", buy},
  { name: "money", title: "pillage", description: () => `Earn knowledge of finding loot. Each kill provides more 🏵️ (x${2 + upgrades.money})`, cost: [1, 2, 3], req: "bow", buy},
  { name: "rickoShot", title: "rickoshot", description: () => `Learn skill. Arrow aimed properly has +${30 * (upgrades.rickoShot + 1)}% chance to rickochet after hitting.`, cost: [1, 2, 3], req: "bow", buy},
  { name: "giantPiercing", title: "giant piercing", description: () => `Sharpened arrows increases chance of killing a giant to ${5 + 20 * (upgrades.giantPiercing+1)}%`, cost: [1, 2, 3], req: "bow", buy},
  { name: "treeNav", title: "forest navigation", description: () => `A compass to help navigate in the forest (${repeatString("⭐", upgrades.treeNav + 1)})`, cost: [1, 2, 3], buy},
  { name: "control", title: "horse control", description: () => `Improved saddle for better control (${repeatString("⭐", upgrades.control + 1)})`, cost: [1, 2, 3], buy},
  { name: "time", title: "extra time", description: "In exchange of 🏵️, I will delay the boat (+15s)", recurring: 1, cost: [.5], buy: () => {
    startTime += 15000;
    showMeTheMoney();
    showText("This will give you a bit more time.");
  }},
  { name: "health", title: "rejuvinate", description: "Drink kumis, restore ❤️ to max", recurring: 1, cost: [1], buy: () => {
    health = defaultmaxHealth + upgrades.maxHealth * 2;
    showMeTheMoney();
    // showText("This ale should give you energy to go on!");
  }},
  { name: "gamble", title: "gamble", description: shopItem => 
      `Play a game of Shagai. (30% chance to double your 🏵️)`,
      // `30% chance to double your 🏵️`,
      reccurring: 1, cost: [.5], buy: () => {
    if (rando() <= .35) {
      money += costMul;
      money *= 2;
      showMeTheMoney();
      showText("Lucky!");
    } else {
      showText("You lost, my friend");
    }
  }},
  // { name: "shuffle", title: "Re-shuffle", description: "Get another merchant. Resets all shop items", reccurring: 1, cost: [.25], buy: () => {
  //   showText("I'll get you someone");
  //   showShop(true);
  // }},
];
let upgrades = {...Object.fromEntries(shop.map(item => [item.name, 0])), borte: 0};
//window.shop = shop;
//window.upgrades = upgrades;

function showText(text) {
  gameOverDiv.style.display = text.length ? "" : "none";
  gameOverDiv.innerText = text;
 
}

const merchantText = "Börte is in another hut.";
const hutUpgrades = [
  () => {},
  () => {
    foesTotal = 20;
    const text = `Spare my life, Khan! I'll help you find Börte.\nYou should hurry! Jamukha plans to send her away on a boat.\nTake one item, then follow the sign.`;
    showText(text);
    // for (hutLevel++;hutLevel < hutUpgrades.length; hutLevel++) {
    //     hutUpgrades[hutLevel]?.();
    // }
    // hutLevel = hutUpgrades.length - 1;
  },
  () => {
//    gameOverDiv.textContent = `Level ${hutLevel}\nWelcome`;
    foesTotal = 40;
    soldierSuperSpeed += .1;
    showText(merchantText);
  },
  () => {
//    gameOverDiv.textContent = `Level ${hutLevel}\nWelcome`;
    foesTotal = 50;
    soldierSuperSpeed += .2;
    showText(merchantText);
  },
  () => {
    // gameOverDiv.textContent = `Level ${hutLevel}\nWelcome`;
    foesTotal = 60;
    soldierSuperSpeed += .1;
    showText(merchantText);
  },
  () => {
    // gameOverDiv.textContent = `Level ${hutLevel}\nWelcome`;
    foesTotal = 70;
    showText(merchantText);
  },
  () => {
    // gameOverDiv.textContent = `Level ${hutLevel}\nWelcome`;
    foesTotal = 80;
    soldierSuperSpeed += .1;
    showText(merchantText);
  },
  () => {
    // gameOverDiv.textContent = `Level ${hutLevel}\nWelcome`;
    foesTotal = 100;
    soldierSuperSpeed += .1;
    // const now = Math.max(inHut ? inHut.enteredHut : (screenPaused || lastframeTime), 0);
    const previousMusic = wildHordeMusic;
    findBorte();
//    foundBorte = now();
    // upgrades.borte = now;
    showText(`Börte is found, alive and well.\nBörte: "Took you long enough! Jamukha escaped. Let's go after him, I'll ride with you."`);
    return () => previousMusic.stop();
  },
//   () => {
// //    gameOverDiv.textContent = `Level ${hutLevel}\n NOTE: This is the right level for story mode ending.`;
//     showText(`You find Jamukha standing in the hut.\nJamukha: "I see you found Börte. Let's fight to the death, Genghis."\nKhan: "Sure, I'll make sure to send you to the ancestors."\nBörte: "Back off Genghis. This time, revenge is mine!"`);
//     foesTotal = 150;
//     soldierSuperSpeed += .1;
//   },
  () => {
    // gameOverDiv.textContent = `Level ${hutLevel}\nWelcome`;
    beatGame = true;
    showText(`Level ${hutLevel}\nBörte found Jamukha and took her revenge.\n\nCongratulations! You beat the game. Feel free keep going, see how far you go.`);
    // gameOverDiv.textContent = `Level ${hutLevel}\n.(You beat the game, but can keep going)`;
    foesTotal = Math.min(foesTotal + 50, 400);
    soldierSuperSpeed += .1;
  },
];
let soldierSuperSpeed = .7;
let beatGame = false;

const defaultmaxHealth = 6;

let health = defaultmaxHealth;
let rage = 0;

// const healthDiv = document.body.appendChild(document.createElement("div"));
// healthDiv.style.position = "absolute";
// healthDiv.style.top = canvas.offsetTop;
// healthDiv.style.left = canvas.offsetLeft + 13;
// function showHealth() {
// }

let timeLimit = 300;

let foundBorte = 0;
let money = 0;
const moneyDiv = document.body.appendChild(document.createElement("div"));
const mds = moneyDiv.style;
mds.position = "absolute";
mds.top = canvas.offsetTop + 25;
mds.left = canvas.offsetLeft + 20;
mds.color = "#880";

let now = () => foundBorte || Math.max(inHut ? inHut.enteredHut : (screenPaused || lastframeTime));

function showMeTheMoney() {
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
//  healthDiv.innerText = str;

//  const now = Math.max(inHut ? inHut.enteredHut : (screenPaused || lastframeTime), 0);
  const s = Math.max(0, timeLimit - Math.floor((now() - startTime) / 1000));
  moneyDiv.innerText = locked? "" : `Level ${hutLevel}\n${str}\n🏵️ ${money}\n${s?'⏳':'⌛'} ${Math.floor(s/60)}:${(100 + s%60).toString().substring(1)}`;
  if (health && s <= 0) {
    health = 0;
    lifeCheck();
  }
}

setInterval(showMeTheMoney, 1000);


const gameOverDiv = document.body.appendChild(document.createElement("div"));
const gods = gameOverDiv.style;
gods.position = "absolute";
gods.top = canvas.offsetTop + 50;
gods.left = canvas.offsetLeft + 150;
//gods.color = "snow";
// gameOverDiv.textContent = "Press ESC to continue";
// gameOverDiv.style.display = "none";
showText("");
function showGameOver() {
  wildHordeMusic.stop();
  showText("GAME OVER, KHAN" + (canContinue() ? "\nESC to continue. You will lose your money and one upgrade." : ""));
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

let screenPaused = 0;
window.addEventListener("blur", function(event) { 
  if (!screenPaused) {
    screenPaused = lastframeTime;
    wildHordeMusic.pause();  
  }
}, false);

window.addEventListener("focus", function(event) {
  if (screenPaused) {
    startTime += (lastframeTime - screenPaused);
    screenPaused = 0;
    if (!inHut && !hero.dead) {
      wildHordeMusic.resume();  
    }
  }
}, false);


let root;
function startGame() {
    const byteArray = load_binary_resource("rider.13k");
    root = decodeShape(byteArray);
    // console.log(root);
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
      ctx.lineTo(offsetX + x, offsetY + y + (x/w - .5)*5 * ddy + random * (rando() - .5));
  } else {
      ctx.moveTo(offsetX + x, offsetY + y + (x/w - .5)*5 * ddy + random * (rando() - .5));
  }
}

const threshold = .5;

function removeArrow(index) {
  const to = arrows[index];
  const from = arrows[arrowSize - 1];
  to.x = from.x;
  to.y = from.y;
  to.dx = from.dx;
  to.dy = from.dy;
  to.born = from.born;
  arrowSize--;
}

function hasShield(hero) {
  return upgrades.shield && gTime - (hero.lastBlock??-20000) > (upgrades.shield === 2 ? 10000 : 20000);
}

let arrowSize = 0;
const arrows = [];
function shootArrow(sprite) {
  const {x, y, dx, dy, archerOrientation} = sprite;
  if (arrowSize >= arrows.length) {
    arrows.push({});
  }
  const arr = arrows[arrowSize];
  arr.dx = evaluate(archerOrientation, sprite) * 120 + dx * 2;
  arr.dy = - 5 + dy * 10;
  arr.x = x + arr.dx;
  arr.y = y - 80 * zoom;
  arr.born = gTime;
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
  const da = disto(ax, ay);//Math.sqrt(ax*ax + ay * ay);
  if (ax !== 0) {
    sprite.orientation = ax;
  }
  const speed = evaluate(sprite.speed, sprite) * (sprite.dead ? 1.5 : 1) * (sprite.superSoldier && sprite.soldier ? .8 : 1);
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
  const dist = disto(sprite.dx, sprite.dy);//Math.sqrt(sprite.dx * sprite.dx + sprite.dy * sprite.dy);
  sprite.horseFrame += dtt * Math.max(.08, dist / 50);
}

let onExit = null;
function exitHut(hut) {
  if (locked) {
    startTime = lastframeTime;
  } else {
    startTime += (lastframeTime - inHut.enteredHut);
  }

  hero.x = hut.x;
  hero.y = hut.y + 200;
  hero.dx = 0;
  hero.dy = 0;
  let info = hutInfo(inHut);
  info.closed = true;
  info.onFire = true;// hut.level;
  inHut = null;
  locked = false;
  onExit?.();
  onExit = null;
  // showHealth();
  showMeTheMoney();
}

function canContinue() {
  return !beatGame && Object.keys(upgrades).filter(k => upgrades[k]).length;
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
      // if (keys.Escape) {
      //   exitHut(inHut);
      //   gameOverDiv.style.display = "none";
      //   wildHordeMusic.play();
      // } else {
      //   return;
      // }
    }
    if (!health && keys.Escape && canContinue()) {
      health = defaultmaxHealth + upgrades.maxHealth * 2;
      money = 0;
      hero.dead = 0;
      // showText("");
      startTime = Math.max(startTime, now() - timeLimit * 1000 + 60000);
      // showHealth();
      wildHordeMusic.play();
      const upgrade = Object.keys(upgrades).filter(k => upgrades[k]).sort(() => rando() - .5)[0];
      upgrades[upgrade]--;
      showText("You lost " + shop.filter(s => s.name === upgrade)[0].title.toUpperCase());
      //icons.push("-"+upgrade);
      if (upgrade === "bow") {
        bowshop.cost.push(0);
      }
      showMeTheMoney();
    }
    if (!health && sprite.hero) {
      return;
    }

    repeatDt(processMovement, sprite);
    if (locked) {
      sprite.x = Math.max(-cvw / 2, Math.min(sprite.x, cvw / 2));
      sprite.y = Math.max(-cvh / 2, Math.min(sprite.y, cvh / 2));
    }

    const shooting = evaluate(sprite.shooting, sprite);
    if (!shooting) {
      sprite.archerOrientation = sprite.orientation;
    } else if (upgrades.bow) {
      if (gTime > sprite.nextShot) {
        shootArrow(sprite);
        sprite.nextShot = gTime + evaluate(sprite.shootPeriod, sprite);
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
      parent: false,
      sprites: undefined,
      animation: sprite => sprite.hut ? "hut" : "horse",
      range: (sprite) => sprite.hut ? [0] : evaluate(sprite.moving, sprite) ? [0, 10]: [11],
      hotspot: [.47, .72],
      color: sprite => sprite.borte ? "#f98" : sprite.hut && hutInfo(sprite).closed ? "#ba6" : sprite.superSoldier ? "#a08" : sprite.foe ? "#004" : "#630",
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
      hidden: sprite => !hasShield(sprite) || sprite.borte || sprite.foe || sprite.corpse || sprite.soldier,
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
        hotspot: [.47 + rando() - .5, 5],
        width: 200,
        height: 30,
        color: () => rando() < .5 ? "gold" : "red",
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

function showSprite(sprite, accumulator) {
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
    if (right < 0 || bottom < 0 || left > cvw || top > cvh) {
      return;
    }
    if (foeIndex !== undefined && !dead) {
      for (let i = arrowSize - 1; i >= 0; i--) {
        const arrow = arrows[i];
        if (arrow.x - sh[0] > left && arrow.x - sh[0] < right && arrow.y - sh[1] > top && arrow.y - sh[1] < bottom) {
          const hit = superSoldier ? rando() < (.05 + (.2 * upgrades.giantPiercing)) : true;
          const hitFoe = foes[foeIndex];
          if (hit) {
            hitFoe.dead = gTime;    
            addCorpse(hitFoe, arrow.dx, foeColor ?? color);
  
            const gx = hero.x - hitFoe.x;
            const gy = hero.y - hitFoe.y;
            const gdist = disto(gx, gy);//Math.sqrt(gx*gx + gy*gy);
            let gdisto = 2000 / gdist;
            hitFoe.dx = 0;
            hitFoe.dy = 0;
            hitFoe.goal[0] = hitFoe.x + -gx * gdisto;
            hitFoe.goal[1] = hitFoe.y + -gy * gdisto;  
            const bonus = (superSoldier ? 40 : 8) * (1 + upgrades.money);
            bubbles.add({
              born: gTime,
              bonus,
              x: hitFoe.x,
              y: hitFoe.y,
            });
            money += bonus;
            showMeTheMoney();
          } else {
            hitFoe.hitTime = gTime;
          }

          if (rando() < upgrades.rickoShot * .3) {
            arrow.dx *= (rando() - .5);
            arrow.dy = - Math.abs(arrow.dy)* .8;
          } else {
            removeArrow(i);
          }
          if (upgrades.quickShot) {
            hero.nextShot = gTime + 50;
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
    let { x, y, width, height, animation, horseFrame, range, hotspot, color, hitTime, direction, dy, random, hidden, cache, hero, hut } = s;
    // if (dead) {
    //   color = "red";
    //   return;
    // }
    if (hut && !hutInfo(s).closed) {
      nearHut = s;
    }
    if (hitTime && gTime - hitTime < 100) {
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
        cacheBox[tag] = {canvas};
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

function addCorpse(foe, dx, color) {
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
    born: gTime,
    color,
    process: (sprite) => {
      const ft = gTime - sprite.born;
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
function lifeCheck() {
  shakeSize = 40;
  setTimeout(() => {
    cs.backgroundColor = "#efd";
  }, 150);

  if (!health) {
    addCorpse(hero, (hero.x - sprite.x) * 2, hero.color);
    hero.dead = gTime;
    showGameOver();
    wildHordeMusic.stop();
  }
}

//  EASY vvvv
let foesTotal = 0;
// const foesLength = 20;
//  HARD vvvv
const foesLength = 400;
const foes = new Array(foesLength).fill(0).map((_, index) => {
  const angle = rando() * Math.PI * 2;
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);

  const superSoldier = index % 20 === 0 && index > 30;
  const soldier = index % 3 <= 1;
  // if (superSoldier) {
  //   console.log(superSoldier, soldier);    
  // }

  const x = cos * (2000 + rando()*1000);
  const y = sin * (2000 + rando()*1000);
  const mySpeed = soldier ? Math.max(.01, rando() / 20) : Math.max(.03, rando() / 10);//soldierSuperSpeed
  const foe = {
    ...copy(sprite),
    active: () => index <= foesTotal,
    superSoldier,
    foeIndex: index,
    foeColor: superSoldier ? (soldier ? "blue" : "#a00") : soldier ? "#75f" : "#f0a",
    horseFrame: Math.floor(rando() * 100),
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
      if (sprite.dead && gTime - sprite.dead > 5000) {
        sprite.dead = 0;

        sprite.speed = sprite.soldier ? Math.max(.025, rando() / 30) : Math.max(.03, rando() / 20);
      }
      repeatDt(processMovement, sprite);
      const gx = sprite.x - sprite.goal[0];
      const gy = sprite.y - sprite.goal[1];
      sprite.gdist = disto(gx, gy);// Math.sqrt(gx * gx + gy * gy);

      const hx = sprite.x - hero.x;
      const hy = sprite.y - hero.y;
      const hdist = disto(hx, hy);// Math.sqrt(hx * hx + hy * hy);
      if (hdist < 50 && !sprite.dead && health) {
        if (hasShield(hero)) {
          hero.lastBlock = gTime;
        } else {
          cs.backgroundColor = "#a00";
          health = Math.max(0, health - (superSoldier ? 2 : 1));
          showMeTheMoney();
          // showHealth();
        }
        shakeSize = 40;
        setTimeout(() => {
          cs.backgroundColor = "#efd";
        }, 150);

        lifeCheck();

        const angle = rando() * Math.PI * 2;
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        sprite.x = hero.x + cos * 2000;
        sprite.y = hero.y + sin * 2000;
        hero.dx = 0;
        hero.dy = 0;
//        console.log(gTime);
        hero.hitTime = gTime;

      }

      if (nearHut || !health) {
        if (!sprite.pausing) {
          sprite.pausing = true;
          const dx = sprite.x - (nearHut ?? hero).x;
          const dy = sprite.y - (nearHut ?? hero).y;
          const gd = 2000 / disto(dx, dy);// Math.sqrt(dx * dx + dy * dy);
          sprite.goal[0] = hero.x + dx * gd;
          sprite.goal[1] = hero.y + dy * gd;        
        }
      } else {
        if (sprite.pausing) {
          sprite.pausing = false;
        }
        if (hdist > 2500) {
          if (rando() < .6 || (!hero.dx && !hero.dy)) {
            const angle = rando() * Math.PI * 2;
            const cos = Math.cos(angle);
            const sin = Math.sin(angle);
            sprite.x = hero.x + cos * 1500;
            sprite.y = hero.y + sin * 1500;  
          } else {
            const ddd = disto(hero.dx, hero.dy);//Math.sqrt(hero.dx * hero.dx + hero.dy * hero.dy);
            sprite.x = hero.x + hero.dx * (1000 + rando() * 500) / ddd + (rando() - .5) * 300;
            sprite.y = hero.y + hero.dy * (1000 + rando() * 500) / ddd + (rando() - .5) * 300;
          }
          if (sprite.dead) {
            sprite.dead = 0;

            sprite.speed = sprite.soldier ? Math.max(.025, rando() / 30) : Math.max(.03, rando() / 20);
          }
          sprite.gdist = 0;
        }

        if (sprite.gdist < 100 || hdist > (sprite.soldier ? 500 : 3000)) {
          sprite.goal[0] = hero.x + (hero.x - sprite.x) + (rando()-.5) * (sprite.soldier ? 200 : 300);
          sprite.goal[1] = hero.y + (hero.y - sprite.y) + (rando()-.5) * (sprite.soldier ? 200 : 300);
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


function canBuy(item) {
  return item.cost?.length && money >= item.cost[0] * costMul;
}

const shopDiv = document.body.appendChild(document.createElement("div"));
const sds = shopDiv.style;
sds.position = "absolute";
sds.left = "200px";
sds.top = "200px"
sds.display = "none";
const shopDivs = new Array(5).fill(null).map(() => {
  const s = shopDiv.appendChild(document.createElement("div"));
  const ssd = s.style;
  ssd.backgroundColor = "#444";
  ssd.margin = "10px";
  ssd.padding = "20px 10px";
  return s;
});

const purchased = shopDivs.map(() => null);
let shopIndex = 0;
let shopList = [];
function showShop(refresh) {
  if (!refresh) {
    shopIndex = 0;
    shop.sort((a, b) => {
      if (a.name === "bow") {
        return -1;
      } else if (b.name === "bow") {
        return 1;
      }
      return rando() - .5;
    });
    shopList = [...shop].filter(canBuy).slice(0, shopDivs.length-1);
  }
  const s = shopList;
  shopDiv.style.display = "";
  for (let i = 0; i < shopDivs.length; i++) {
    if (!refresh) {
      purchased[i] = false;
    }
    const sd = shopDivs[i];
    sd.style.backgroundColor = purchased[i] ? "#6F6" : i === shopIndex ? "#480" : "#222";
    sd.style.padding = "10px";
    sd.style.width = "500px";
    sd.style.outline = i === shopIndex ? "4px solid green" : "";
    sd.style.display = i > s.length - (!upgrades.bow ? 1 : 0) ? "none" : "";
    sd.style.opacity = i===s.length || s[i] && canBuy(s[i]) || purchased[i] ? 1 : .5;
    sd.style.color = purchased[i] ? "green" : "";
    sd.innerText = i===s.length ? "Exit" : !s[i] ? "" : `${s[i].title.toUpperCase()} ${purchased[i] ? "✔️" : !s[i].cost[0] ? "" : `(Cost: ${s[i].cost[0]*costMul} 🏵️)`}\n${evaluate(s[i].description, s[i])}`;
  }
  // if (refresh) {
  //   showText(evaluate(shopList[shopIndex].description, shopList[shopIndex]));
  // }
}
//window.showShop = showShop;



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
  const repeatDistance = isHut ? 18000 : 4000;
  const repeatCond = repeatDistance / 2 + 500;
  const tree = {
    ...copy(sprite),
    cache: true,
    x: isHut ? index * repeatDistance : 1000 + rando() * 4000,
    y: isHut ? index * repeatDistance / 2 : rando() * 4000,
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
      const hdist = disto(hx, hy);// Math.sqrt(hx * hx + hy * hy);
      if (hdist < (isHut ? 80 : 50)) {
//        console.log("TREE", hdist);
        if (isHut && !hutInfo(sprite).closed) {
          if (!inHut) {
            inHut = sprite;
            sprite.enteredHut = gTime;

            if (!hutInfo(inHut).level) {
              hutInfo(inHut).level = hutLevel++;
              onExit = hutUpgrades[Math.min(hutLevel, hutUpgrades.length - 1)]?.();
            }
          

//            health = defaultmaxHealth + upgrades.maxHealth * 2;
            showMeTheMoney();
            // showHealth();
            //showGameOver();
            wildHordeMusic.stop();
            showShop();
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
    height: (isHut ? 400 : 350 + rando() * 200) * zoom,
    riderAnimation: isHut ? "hut" : "tree",
    foeColor: isHut ? `rgb(${200}, ${100 + index * 55}, ${50 + index * 50})` : `rgb(${rando() * 30}, ${rando() * 150}, ${rando()*20})`,
    tree: true,
    hut: isHut,
    rangeOverride: isHut ? [1] : undefined,
  };
  return tree;
});

function findBorte() {
  foundBorte = now();
  borte.x = hero.x;
  borte.y = hero.y;
  wildHordeMusic = furEliseMusic;
}
window.findBorte = findBorte;

let borte = {...sprite,
  borte: true,
  foeColor: "red",
  active: () => foundBorte,//upgrades.borte,
  shootPeriod: 1000,
  process: sprite => {
  if (!sprite.parent || !evaluate(sprite.active, sprite)) {
    return;
  }
  const ddx = hero.x - sprite.x;
  const ddy = hero.y - sprite.y;
  const dd = disto(ddx, ddy);// Math.sqrt(ddx * ddx + ddy * ddy);
  if(dd > 300) {
    sprite.ax = ddx * .01;
    sprite.ay = ddy * .01;  
  } else {
    sprite.ax = 0;
    sprite.ay = 0;
  }
  if (gTime > sprite.nextShot) {
    shootArrow(sprite);
    sprite.nextShot = gTime + evaluate(sprite.shootPeriod, sprite);
  }

  repeatDt(processMovement, sprite);
  sprite.orientation = Math.sign(sprite.dx ?? 1) * 2;
  },
  archerOrientation: sprite => Math.sign(sprite.dx || 1),
};

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

const bubbles = new Set();

const elements = [[hero, borte], foes, corpses, trees];

let indic = null;

//let toggle = 0;
let dt;
function loop(time) {
  requestAnimationFrame(loop);
  // toggle = (toggle + 1) % 3;
  // if (toggle) {
  //   return;
  // }
  lastframeTime = Math.max(lastframeTime, time - 100);
  gTime = time;
  if (screenPaused) {
    return;
  }
  dt = time - lastframeTime;
//  console.log(dt);
  lastframeTime = time;


  if (shakeSize) {
    shake = rando() * shakeSize;
    shakeSize *= .5;
    if (shakeSize < .1) {
      shakeSize = 0;
    }
  }

  ctx.clearRect(0, 0, cvw, cvh);

  repeatDt(moveArrows, arrows);


  ctx.beginPath();
  ctx.strokeStyle = "#038";
  ctx.lineWidth = 6;
//  const arrdt = .7;
  for (let i = 0; i < arrowSize; i++) {
    const arrow = arrows[i];
    const arrowlen = 50;
    const dist = disto(arrow.dx, arrow.dy);// Math.sqrt(arrow.dx * arrow.dx + arrow.dy * arrow.dy) + 1;
    ctx.moveTo(
      arrow.x - sh[0],
      arrow.y - sh[1] + shake);
    ctx.lineTo(
      arrow.x - sh[0] - arrow.dx / dist * arrowlen,
      arrow.y - sh[1] + shake - arrow.dy / dist * arrowlen);
  }
  ctx.stroke();

//  ctx.fill();

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
  elements.forEach(e => e.forEach(s => showSprite(s, accumulator)));
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
    const chdist = disto(chdx, chdy);// Math.sqrt(chdx*chdx + chdy*chdy);
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
      ctx.arc(Math.min(cvw - 80, Math.max(80, indic[0])),
              Math.min(cvh - 80, Math.max(80, indic[1])), 15, 0, 2 * Math.PI);
      ctx.fill();  
    }  
  }

  ctx.font = "28px serif";
  for (let b of bubbles) {
    // ctx.fillText("TESTING", 100, 100);
    const t = time - b.born;
    ctx.fillText(`+${b.bonus}🏵️`, b.x - sh[0], b.y - sh[1] - t / 50);
    if (t > 2000) {
      bubbles.delete(b);
    }
  }


  
  if (!health) {
    const deathTime = Math.min(.7, (time - hero.dead) / 3000);
    ctx.fillStyle = `rgb(200,0,0,${deathTime})`;
    ctx.fillRect(0, 0, cvw, cvh);
    ctx.fill();
  } else if (!inHut) {
    if (!locked) {
      headStart += ((hero.dx * hero.archerOrientation < 0 ? 0 : hero.dx) / 2 + hero.archerOrientation - headStart) * .05;
      const dt = 20;
      sh[0] += dt / 20 * (hero.x - cvw/2 - sh[0] + headStart * 80) * .1;
      sh[1] += dt / 20 * (hero.y - cvh/2 - sh[1] + hero.dy * 50) * .1;  
    } else {
      sh[0] =- cvw/2;
      sh[1] = -cvh/2;  
    }
  } else {
      const hutTime = Math.min(1, (time - inHut.enteredHut) / 500);
      ctx.fillStyle = `rgb(0,0,0,${hutTime})`;
      ctx.fillRect(0, 0, cvw, cvh);
      ctx.fill();
    }
}

function moveArrows(arrows) {
  const arrdt = .4;
  const arrowlen = 50;
  for (let i = 0; i < arrowSize; i++) {
    const arrow = arrows[i];
    const dist = disto(arrow.dx, arrow.dy) + 1;// Math.sqrt(arrow.dx * arrow.dx + arrow.dy * arrow.dy) + 1;
    arrow.dy += .3;
    let di = arrowlen * arrdt / dist;
    arrow.x += arrow.dx * di;
    arrow.y += arrow.dy * di;
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
