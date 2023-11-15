//  BEGINNING
let q = document.querySelector.bind(document);
const dadd = document.addEventListener;
const rando = Math.random;
const disto = (dx, dy) => Math.sqrt(dx * dx + dy * dy);


function supports3(e) {
  // using toDataURL() method
  var c = document.createElement('canvas');
  var ctx = c.getContext('2d');
  const em = 16;
  c.width = em;
  c.height = em;

  ctx.clearRect(0, 0, em, em);
  ctx.fillText(e, 0, em);
  let emo = c.toDataURL()

  ctx.clearRect(0, 0, em, em);
  ctx.fillText('\uFFFF', 0, em);
  let bad1 = c.toDataURL()
  ctx.clearRect(0, 0, em, em);
  ctx.fillText('\uFFFF\uFFFF', 0, em);
  let bad2 = c.toDataURL()

  return (emo != bad1) && (emo != bad2)
}

const halfHeart = supports3('❤️‍🩹') ? '❤️‍🩹' : '🔥';
const noHeart = supports3('🩶') ? '🩶' : 'X';

const cutSceneContainer =
    document.body.appendChild(document.createElement('div'));
;
const cutSceneDiv =
    cutSceneContainer.appendChild(document.createElement('div'));
const cds = cutSceneDiv.style;
cds.position = 'absolute';
cds.left = '50%';
cds.top = '50px';
cds.backgroundImage = `url(khan.png)`;
cds.backgroundSize = 'cover';
cds.width = '400px';
cds.height = '400px';
cds.visibility = 'hidden';
cds.marginLeft = '-200px';
cds.zIndex = 1000;
cds.opacity = 0;
cds.transition = 'opacity 2s';


const shopDiv = document.body.appendChild(document.createElement('div'));
const sds = shopDiv.style;
sds.position = 'absolute';
sds.left = '200px';
sds.top = '150px'
// sds.display = "none";
sds.visibility = 'hidden';



function addAG() {
  const agDiv = shopDiv.appendChild(document.createElement('div'));
  agDiv.style.position = 'fixed';
  agDiv.style.right = '10px';
  agDiv.style.bottom = '10px';
  agDiv.style.zIndex = 1000;
  const link = agDiv.appendChild(document.createElement('a'));
  link.href = 'https://www.addictinggames.com';
  link.target = '_blank';

  link.addEventListener('mouseover', () => {
    agImg.src = 'logo/agh.png';
  });
  link.addEventListener('mouseout', () => {
    agImg.src = 'logo/ag.png';
  });

  const agImg = link.appendChild(document.createElement('img'));
  agImg.src = 'logo/ag.png';
  agImg.style.width = '178px';
  agImg.style.height = '71px';
}



dadd('DOMContentLoaded', () => {
  q('body').style.backgroundColor = '#100';
  const startTheGame = () => {
    let gTime;

    // let icons = [];
    let canvas = q('canvas');
    let ctx = canvas.getContext('2d');
    let cs = canvas.style;
    let cvw = canvas.width = 2000;
    cs.width = `100%`;  //`${cvw/2}px`;
    let cvh = canvas.height = 1200;
    cs.height = `100%`;  //`${cvh/2}px`;
    cs.border = '1px solid black';
    cs.backgroundColor = '#efd';
    setTimeout(() => cs.opacity = 1, 1000);
    ctx.font = 'bold 40px gamefont';  //"bold 34px gamefont";


    const costMul = 100;
    const zoom = .75;
    const keys = {};
    dadd('keyup', (e) => {
      delete keys[e.code];
    });

    // const cutSceneContainer =
    // document.body.appendChild(document.createElement("div"));; const
    // cutSceneDiv =
    // cutSceneContainer.appendChild(document.createElement("div")); const cds =
    // cutSceneDiv.style; cds.position = "absolute"; cds.left = "50%"; cds.top =
    // "50px"; cds.backgroundImage = `url(khan.png)`; cds.backgroundSize =
    // "cover"; cds.width = "400px"; cds.height = "400px"; cds.visibility =
    // "hidden"; cds.marginLeft = "-200px"; cds.zIndex = 1000; cds.opacity = 0;
    // cds.transition = "opacity 4s";
    const cutSceneText =
        cutSceneContainer.appendChild(document.createElement('div'));
    cutSceneText.style.position = 'absolute';
    cutSceneText.style.left = '50%';
    cutSceneText.style.width = '60%';
    cutSceneText.style.marginLeft = '-30%';
    cutSceneText.style.top = '450px';
    cutSceneText.style.backgroundColor = 'black';
    cutSceneText.style.display = 'none';
    cutSceneText.style.fontSize = '20pt';
    cutSceneText.style.zIndex = 1100;
    cutSceneDiv.style.pointerEvents = 'none';

    let textInterval = 0;
    let onPostCutScene = null;
    let canSkipCutScene = false;
    let cutSceneIndex = 0;
    let textIndex = 0;
    let numCutScene = 0;
    let inCutScene = false;
    let fadeOutCutScene = false;

    function showCutScene(series, postCutScene) {
      inCutScene = true;
      onPostCutScene = postCutScene;
      cds.display = '';
      cds.visibility = '';
      cutSceneText.style.display = '';
      setTimeout(() => {
        cds.opacity = 1;
      }, 10);

      canSkipCutScene = false;

      cutSceneIndex = 0;
      numCutScene = series.length;

      fadeOutCutScene = false;
      clearInterval(textInterval);
      textIndex = 0;
      textInterval = setInterval(() => {
        const [image, text, borte, fadeOut, highlight] = series[cutSceneIndex];
        fadeOutCutScene = fadeOut;
        const t1 = text.substring(0, textIndex);
        const t2 = text.substring(textIndex);
        cds.backgroundPosition = `${- 400 * image}px`;
        if (textIndex < text.length) {
          if (t1.charAt(t1.length - 1) !== ' ') {
            if (borte) {
              zzfx(
                  ...[1.12, , 860, , .01, 0, 3, 2.38, -85, , , , , , , , ,
                      .84]);  // Blip 120
            } else {
              zzfx(
                  ...[, , 140, , , .01, 4, 2.32, -2.1, , , , , , , .8, , ,
                      .01]);  // Blip 114
            }
          }
        }
        cutSceneText.innerHTML =
            `<span ${
                highlight ?
                    'style=color:white' :
                    borte ?
                    'style=color:pink' :
                    ''}>${t1}</span><span style=color:black>${t2}</span>` +
            (`<br><br><div style=text-align:right;width:100%>${
                textIndex < text.length ? '💬' :
                                          '[press space to continue] ' +
                        (Math.floor(textIndex / 5) % 2 === 0 ?
                             '&nbsp;&nbsp;⏩' :
                             '⏩&nbsp;&nbsp;')}</div>`);
        textIndex += keys.Space ? 5 : 2;
        canSkipCutScene = textIndex >= text.length;
      }, 50);
    }
    window.showCutScene = showCutScene;

    function doneShopping() {
      zzfx(
          ...[2.22, , 120, .04, .3, .41, 4, 3.93, , , , , .17, .9, , .4, .18,
              .44, .06, .02]);  // Boom
      exitHut(inHut);
      closeShop();
      showText('');
      if (!mute) {
        wildHordeMusic.play();
      }
      //  console.log(hutLevel);
      if (hutLevel === 1) {
        document.querySelector('#title').style.visibility = 'visible';
        setTimeout(() => {
          document.querySelector('#title').style.opacity = 0;
        }, 4000);
        setTimeout(() => {
          document.querySelector('#title').style.display = 'none';
        }, 10000);
      }
      return true;
    }

    dadd('mousemove', () => {
      cs.cursor = '';
    });

    let mute;
    function toggleMute() {
      if (wildHordeMusic.playing) {
        mute = !mute;
        window.mute = mute;
        console.log('Mute', mute);
        if (mute) {
          wildHordeMusic.pause();
        } else {
          wildHordeMusic.resume();
        }
      }
    }

    function toggleMuteFX() {
      muteFx = !muteFx;
      console.log('MuteFX', muteFx);
    }

    let firstKey = true;
    let fadingCutScene = false;

    dadd('keydown', (e) => {
      if (keys[e.code]) {
        e.preventDefault();
        return;
      }
      keys[e.code] = true;
      cs.cursor = 'none';
      if (firstKey) {
        enableAudio();
        firstKey = false;

        console.log('Prepare audio');
        wildHordeMusic.audio.volume = 0;
        furEliseMusic.audio.volume = 0;
        wildHordeMusic.play();
        furEliseMusic.play();
        setTimeout(() => {
          wildHordeMusic.pause();
          furEliseMusic.pause();
          wildHordeMusic.audio.volume = 1;
          furEliseMusic.audio.volume = 1;
        }, 10);
      }
      if (shopOpened) {
        const s = shopList;

        let closing = false;
        const bowLess = !upgrades.bow;
        if (keys.KeyW || keys.ArrowUp) {
          shopIndex = Math.max(0, shopIndex - 1);
          zzfx(
              ...[1.04, , 140, , .01, 0, 1, .38, 7.9, , 964, .09, , , , , , .21,
                  .01, .13]);  // Blip 68
        } else if (keys.KeyS || keys.ArrowDown) {
          shopIndex = Math.min(s.length - (bowLess ? 1 : 0), shopIndex + 1);
          zzfx(
              ...[1.04, , 140, , .01, 0, 1, .38, 7.9, , 964, .09, , , , , , .21,
                  .01, .13]);  // Blip 68
        }
        if (keys.Space) {
          //      console.log(purchased, shopIndex)
          if (shopIndex === s.length) {
            closing = doneShopping();
          } else if (!purchased[shopIndex]) {
            const shopItem = shopList[shopIndex];
            if (shopItem && canBuy(shopItem)) {
              purchased[shopIndex] = true;
              const moneySpent = evaluate(shopItem.cost[0]) * costMul;
              money -= moneySpent;
              showMeTheMoney();
              shopItem?.buy(shopItem, moneySpent);
              if (shopItem.name === 'gamble') {
              } else if (shopItem.name === 'bonus') {
                zzfx(
                    ...[, , 140, .07, .15, .43, 1, .54, , -1.3, 472, .05, .06, ,
                        , , , .41, .29]);  // Money
              } else if (shopItem.name === 'health') {
                zzfx(
                    ...[1.28, , 136, .05, .19, .44, , 1.7, 4.4, , , , .09, , ,
                        .1, , .64, .1, .34]);  // Powerup 106
              } else if (shopItem.name === 'maxHealth') {
                zzfx(
                    ...[, , 150, .03, .27, .36, , 1.41, -0.2, , 199, .07, .12,
                        .2, 5.6, , , .92, .14]);  // Powerup 102
              } else {
                zzfx(
                    ...[1.99, , 332, , , .04, , 0, 49, , , , , , , .1, .12, ,
                        .1]);  // bonus
              }

              if (hutInfo(inHut).level === 0) {
                closing = doneShopping();
              }
            } else {
              zzfx(
                  ...[, 0, 130.8128, , .73, .38, , 1.12, , , , , , .3, , .1, ,
                      .32, .16]);  // Note
            }
          } else {
            zzfx(
                ...[, 0, 130.8128, , .73, .38, , 1.12, , , , , , .3, , .1, ,
                    .32, .16]);  // Note
          }
        }
        delete keys[e.code];
        if (!closing) {
          showShop(true);
        }
      } else if (
          cds.display === '' && keys.Space && canSkipCutScene &&
          !fadingCutScene) {
        if (cutSceneIndex < numCutScene - 1) {
          zzfx(
              ...[1.02, , 70, .02, .03, .19, , .18, , -9.1, , , , 1.8, , .3, ,
                  .51, .09]);  // Hit 93
          canSkipCutScene = false;
          if (fadeOutCutScene) {
            cds.opacity = 0;
            fadingCutScene = true;
            setTimeout(() => {
              fadingCutScene = false;
              cutSceneIndex++;
              textIndex = 0;
              cds.opacity = 1;
            }, 1500);
          } else {
            cutSceneIndex++;
            textIndex = 0;
          }
        } else {
          clearInterval(textInterval);
          cds.opacity = 0;
          cutSceneText.style.display = 'none';
          cutSceneText.textContent = '';
          zzfx(
              ...[1.02, , 70, .02, .03, .19, , .18, , -9.1, , , , 1.8, , .3, ,
                  .51, .09]);  // Hit 93
          fadingCutScene = true;
          setTimeout(() => {
            fadingCutScene = false;
            onPostCutScene?.();
            cds.display = 'none';
            inCutScene = false;
          }, 1000);
        }
      }

      if (e.code === 'KeyM') {
        toggleMute();
      } else if (e.code === 'KeyF') {
        toggleMuteFX();
      }

      e.preventDefault();
    });

    function closeShop() {
      shopDiv.style.display = 'none';
      shopOpened = false;
    }

    const accumulator = [];

    const sh = [0, 0];
    let locked = true;

    let wildHordeMusic = new Song(wildHorde);
    const wildHordeBackup = wildHordeMusic;
    window.music = wildHordeMusic;
    const furEliseMusic = new Song(furElise);


    // let startTime = 0;
    //  const upgrades = {
    //    speedWhileShooting: 0,
    //    speed: 0,
    //    maxHealth: 0,
    //    shield: 0,
    //    quickShot: 0,
    //    money: 0,
    //  };

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
      if (!item.bought) {
        item.bought = gTime;
      }
      upgrades[item.name]++;
      item.cost.shift();
      showUpgrades();
    }

    function repeatString(s, num) {
      return new Array(num).fill(s).join('')
    }

    let bowshop;
    const shop = [
      bowshop = {
        name: 'bow',
        title: 'bow and arrows 🏹',
        description: 'Press Space to shoot down enemies and collect 🏵️',
        cost: [0],
        buy,
        priority: () => 2,
        tag: 'B&A',
        color: '#FF5733',
      },
      {
        name: 'speed',
        title: 'speed 💨',
        description: () => `Change hooves for faster horse (${
            repeatString('⭐', upgrades.speed + 1)})`,
        cost: [0, 1, 2],
        buy,
        tag: 'S',
        color: '#0096FF'
      },
      {
        name: 'speedWhileShooting',
        title: 'stable aim',
        description: 'Stabilize bow to shoot without slow down the horse',
        cost: [1],
        req: 'bow',
        buy,
        tag: 'SA',
        color: '#9400D3'
      },
      {
        name: 'maxHealth',
        title: 'max health',
        description: 'Eat food to increases the maximum health by one ❤️',
        cost: [1, 2, 3],
        buy: item => {
          buy(item);
          health =
              Math.min(defaultmaxHealth + upgrades.maxHealth * 2, health + 2);
        },
        tag: 'MH',
        color: '#FFB6C1'
      },
      {
        name: 'shield',
        title: 'shield',
        description: () =>
            `This shield blocks one hit, then is re-usable after ${
                Math.ceil(20 / (upgrades.shield + 1))}s`,
        cost: [1.5, 3],
        buy,
        tag: 'SH',
        color: '#088F8F'
      },
      // { name: "reflect", cost: [2, 4], req: "shield"},
      {
        name: 'quickShot',
        title: 'quickshot',
        description:
            'Learn a skill that lets you shoot immediately after one hit',
        cost: [1.5],
        req: 'bow',
        buy,
        tag: 'QS',
        color: '#FFC300 '
      },
      {
        name: 'money',
        title: 'pillage',
        description: () =>
            `Earn knowledge of finding better loot. Each kill provides more 🏵️ (x${
                1 + .5 * upgrades.money})`,
        cost: [1, 2, 3],
        req: 'bow',
        buy,
        tag: '🏵️',
        color: '#008000'
      },
      {
        name: 'rickoShot',
        title: 'ricoshot',
        description: () => `New shooting technique.\nYour shots have +${
            30 * (upgrades.rickoShot + 1)}% chance to ricochet.`,
        cost: [1.5, 2, 3],
        req: 'bow',
        buy,
        tag: 'RS',
        color: '#7B68EE'
      },
      {
        name: 'giantPiercing',
        title: 'giant piercing',
        description: () =>
            `Sharpened arrows increases the chance of killing a giant from ${
                5 + 20 * (upgrades.giantPiercing)}% to ${
                5 + 20 * (upgrades.giantPiercing + 1)}%`,
        cost: [1, 2, 3],
        req: 'bow',
        buy,
        tag: 'GP',
        color: '#A52A2A'
      },
      {
        name: 'treeNav',
        title: 'forest navigation',
        description: () =>
            `A compass to help navigate more easily in the forest (${
                repeatString('⭐', upgrades.treeNav + 1)})`,
        cost: [1, 2, 3],
        buy,
        tag: 'FN',
        color: '#228B22'
      },
      {
        name: 'control',
        title: 'horse control',
        description: () => `Improved saddle for better control of the horse (${
            repeatString('⭐', upgrades.control + 1)})`,
        cost: [1, 2, 3],
        buy,
        tag: 'HC',
        color: '#8B4513'
      },
      {
        name: 'time',
        title: 'extra time',
        description: 'In exchange of 🏵️, I will delay the boat (⏳ +30s)',
        cost: [1, 2, 3, 4, 5, 6],
        buy: item => {
          //    startTime += 20000;
          tick -= 30;
          showMeTheMoney();
          item.cost.shift();
          showText('This will give you a bit more time to reach <b>Börte</b>.');
        },
        disabled: () => foundBorte,
        priority: () => timeLimit - tick < 60 ? 1 :
            timeLimit - tick > 200            ? -1 :
                                                0
      },
      {
        name: 'health',
        title: 'rejuvinate',
        description: 'Drink kumis, restore ❤️ to max',
        cost: [1, 2, 4, 6, 8, 10],
        buy: item => {
          health = defaultmaxHealth + upgrades.maxHealth * 2;
          showMeTheMoney();
          item.cost.shift();
          showText('This ale will give you energy to go on!');
        },
        disabled: () => health >= defaultmaxHealth + upgrades.maxHealth * 2
      },
      {
        name: 'gamble',
        title: 'gamble',
        description: shopItem =>
            `Dare to go all-in in a game of Shagai? (50% chance to double your 🏵️)`,
        // `30% chance to double your 🏵️`,
        cost: [() => Math.floor(money * 2 / costMul) / 2],
        buy: (item, moneySpent) => {
          if (rando() <= .51) {
            money += moneySpent;
            money *= 2;
            showMeTheMoney();
            showText('Lucky!');
            zzfx(
                ...[, , 140, .07, .15, .43, 1, .54, , -1.3, 472, .05, .06, , , ,
                    , .41, .29]);  // Money
          } else {
            showText('You lost, my friend');
            zzfx(
                ...[, , 638, .08, .13, .39, 2, .3, , -7.4, -22, .05, .17, , , ,
                    , .52, .18]);  // Beedown
          }
        },
        disabled: () => money < costMul
      },
      {
        name: 'bonus',
        title: 'bonus points',
        description: () => `Increase your base score by ${
            (upgrades.bonus + 1) * pointsPerShopBonus}.`,
        cost: [
          5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90,
          100
        ],
        buy,
        tag: 'B',
        color: '#FFC300',
        disabled: () => !beatGame,
      },
      // { name: "shuffle", title: "Re-shuffle", description: "Get another
      // merchant. Resets all shop items", cost: [.25], buy: () => {
      //   showText("I'll get you someone");
      //   showShop(true);
      // }},
      // { name: "shortcut", title: "shortcut", description: "Get closer to
      // finding Börte", cost: [4],
      //   disabled: () => !canShortcut,
      //   buy: () => {
      //   if (canShortcut) {
      //     onExit?.();
      //     hutInfo(inHut).level = hutLevel++;
      //     onExit = hutUpgrades[Math.min(hutLevel, hutUpgrades.length -
      //     1)]?.();
      //   }
      // }},
    ];
    let upgrades = {
      ...Object.fromEntries(shop.map(item => [item.name, 0])),
      borte: 0
    };
    // window.shop = shop;
    // window.upgrades = upgrades;

    function showText(text) {
      gameOverDiv.style.display = text.length ? '' : 'none';
      gameOverDiv.innerHTML = text;
    }

    const merchantText = '“Börte is not here. She must be in another yurt.”';
    const standardLevelUp = (text) => {
      foesTotal += 10;
      soldierSuperSpeed += .25;

      showCutScene([[3, '...'], [5, text ?? merchantText]], () => {
        zzfx(
            ...[1.99, , 238, , .08, .14, 2, 0, , -47, -84, , .15, , , .6, .15, ,
                , .17]);  // Event
        showText(
            'Before going further, purchase some items to help on your journey.');
        showShop();
      });
    };
    // let canShortcut = true;

    const hutUpgrades = [
      () => {},
      () => {
        foesTotal = 20;
        // const text = `“Spare my life, Khan! I will help you find Börte.\nYou
        // should hurry! Jamukha plans to send her away on a boat.”`;
        showCutScene(
            [
              [3, '...'],
              [0, `“Spare my life, Khan! I'll help you find Börte.”`],
              [
                0,
                `“You should hurry! Jamukha plans to send her away on a boat.”`
              ],
              [0, `“Rescue Börte before time runs out!”`, false, false, true],
            ],
            () => {
              zzfx(
                  ...[1.99, , 238, , .08, .14, 2, 0, , -47, -84, , .15, , , .6,
                      .15, , , .17]);  // Event
              showText(
                  'You must find Börte in one of the yurt.\nChoose your first upgrade, then follow the circular sign.\nEach new yurt visited will contain 100🏵️');
              showShop();
            });
        //    const text = `Spare my life, Khan! I'll help you find Börte.\nYou
        //    should hurry! Jamukha plans to send her away on a boat.\nTake one
        //    item, then follow the sign.`;


        // for (hutLevel++;hutLevel < hutUpgrades.length; hutLevel++) {
        //     hutUpgrades[hutLevel]?.();
        // }
        // hutLevel = hutUpgrades.length - 1;
      },
      () => {
        //    gameOverDiv.textContent = `Level ${hutLevel}\nWelcome`;
        foesTotal = 40;
        soldierSuperSpeed += .1;
        showCutScene(
            [
              [3, '...'],
              [5, '“Börte? No, I have not seen her around.”'],
              [5, '“Jamukha must have taken her to another yurt.”'],
              [
                5,
                '“No need to harm me, sir. Let me sell you some valuable items, and I\'ll be on my way.”'
              ],
            ],
            () => {
              zzfx(
                  ...[1.99, , 238, , .08, .14, 2, 0, , -47, -84, , .15, , , .6,
                      .15, , , .17]);  // Event
              showText(
                  'Before going further, purchase some items to help on your journey.');
              showShop();
              unlockMedal('Second hut');
            });
      },
      standardLevelUp,
      standardLevelUp,
      standardLevelUp,
      () => {
        // gameOverDiv.textContent = `Level ${hutLevel}\nWelcome`;
        foesTotal = 100;
        soldierSuperSpeed += .3;
        // const now = Math.max(inHut ? inHut.enteredHut : (screenPaused ||
        // lastframeTime), 0);
        const previousMusic = wildHordeMusic;
        findBorte();
        //    foundBorte = now();
        // upgrades.borte = now;

        showCutScene(
            [
              [3, '“Börte!...”'],
              [1, '“Temüjin!...”', true],
              [3, '“At last, I found you!”'],
              [1, '“Took you long enough!”', true],
              [
                1,
                '“Jamukha escaped. Let\'s go after him, I\'ll ride with you.”',
                true
              ],
              [
                3,
                '“I swear, Börte. I will make him pay for what he did to you!”'
              ],
              [1, '“No, Temüjin.”', true],
              [1, '“I will make him pay.”', true],
            ],
            () => {
              zzfx(
                  ...[1.99, , 238, , .08, .14, 2, 0, , -47, -84, , .15, , , .6,
                      .15, , , .17]);  // Event
              showText(
                  'The timer stopped. Now ride alongside <b>Börte</b> and find <b>Jamukha.</b>');
              showShop();

              unlockMedal('Rescue Börte');
            });


        //     showText(`<b>Börte</b> is found, alive and well.\n<b>Börte</b>:
        //     <pink>"Took you long enough! Jamukha escaped. Let's go after him,
        //     I'll ride with you."</pink>\nThe timer stopped. Now ride
        //     alongside <b>Börte</b> and find <b>Jamukha.</b>`);
        // //    canShortcut = false;
        // //    shop.find(({name}) => name === "time").cost = [];
        //     showShop();

        return () => previousMusic.stop();
      },
      //   () => {
      // //    gameOverDiv.textContent = `Level ${hutLevel}\n NOTE: This is the
      // right level for story mode ending.`;
      //     showText(`You find Jamukha standing in the hut.\nJamukha: "I see
      //     you found Börte. Let's fight to the death, Genghis."\nKhan: "Sure,
      //     I'll make sure to send you to the ancestors."\nBörte: "Back off
      //     Genghis. This time, revenge is mine!"`); foesTotal = 150;
      //     soldierSuperSpeed += .1;
      //   },
      () => {
        if (!beatGame) {
          wildHordeMusic.stop();
          showCutScene(
              [
                [3, '...'],
                [2, '“It is over, Jamukha the Jadaran.”', true],
                [
                  2, '“Show us your fealty, and your life shall be spared.”',
                  true
                ],
                [4, '“You win, Börte! I admit defeat.”'],
                [4, '“Have mercy on me. I swear all my allegiance to you.”'],
                [
                  3,
                  '“Börte, you\'re going to let this vermin live after what he has done to you?”'
                ],
                [3, '“Let me slash his gut open!”'],
                [2, '“Collect yourself, Temüjin.”', true],
                [2, '“I choose to spare him for now.”', true],
                [4, '“Thank you, Börte. God bless your gentle soul.”'],
                [
                  2,
                  '“But know Jamukha, that you will remain as our servant...”',
                  true
                ],
                [2, '“...for the rest of your life.”', true, true],
                [6, 'THE END'],
              ],
              () => {
                zzfx(
                    ...[1.99, , 238, , .08, .14, 2, 0, , -47, -84, , .15, , ,
                        .6, .15, , , .17]);  // Event
                showText(
                    '<b>Congratulations!</b> You beat the game.\n<span style=font-size:14pt>Feel free keep going, see how far you go. You no longer have revival option, <b>death is now permanent</b>. Each new yurt visited still increase the game\'s difficulty.</span>\n<b style=color:#FFD700>Good luck, Khan. May the spirits of the steppe guide your path.</b>');
                showShop();
                unlockMedal('THE END');
              });
          beatGame = true;
          wildHordeMusic = wildHordeBackup;
        } else {
          showCutScene(
              [
                [3, 'You really are The Terror of Mongolia.'],
              ],
              () => {
                zzfx(
                    ...[1.99, , 238, , .08, .14, 2, 0, , -47, -84, , .15, , ,
                        .6, .15, , , .17]);  // Event
                const message = `<b>Level: ${
                    hutLevel}</b>\nLet's see how much further you can go!`;
                // gameOverDiv.textContent = `Level ${hutLevel}\nWelcome`;
                showText(message);
                showShop();
                difficultyPlus++;
              });
        }
        foesTotal = Math.min(foesTotal + 50, 400);
        soldierSuperSpeed += .3;
        // canShortcut = false;
      },
    ];
    let soldierSuperSpeed = .7;
    let beatGame = false;

    const defaultmaxHealth = 6;

    let health = defaultmaxHealth;
    let rage = 0;

    // window.shop = shop;
    window.upgrades = upgrades;

    // const healthDiv =
    // document.body.appendChild(document.createElement("div"));
    // healthDiv.style.position = "absolute";
    // healthDiv.style.top = canvas.offsetTop;
    // healthDiv.style.left = canvas.offsetLeft + 13;
    // function showHealth() {
    // }

    let timeLimit = 360;

    let foundBorte = 0;
    let money = 0;
    const moneyDiv = document.body.appendChild(document.createElement('div'));
    const mds = moneyDiv.style;
    mds.position = 'absolute';
    mds.top = canvas.offsetTop + 25;
    mds.left = canvas.offsetLeft + 40;
    mds.color = '#880';
    mds.fontSize = '14pt';
    mds.whiteSpace = 'pre-wrap';
    mds.pointerEvents = 'none';

    const upgradeDiv = document.body.appendChild(document.createElement('div'));
    const uds = upgradeDiv.style;
    uds.position = 'absolute';
    uds.top = canvas.offsetTop + 150;
    uds.left = canvas.offsetLeft + 40;
    uds.pointerEvents = 'none';
    uds.display = 'flex';
    uds.flexDirection = 'column';

    const ROMAN = [
      '', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'XI', 'X', 'XI',
      'XII', 'XIII'
    ];


    let itemToHide = 0;
    function showUpgrades(hideOne) {
      upgradeDiv.textContent = '';

      if (revival) {
        const revDiv = upgradeDiv.appendChild(document.createElement('div'));
        revDiv.textContent = repeatString('💀', revival);
      }

      const shopItems =
          [...shop]
              .filter(shopItem => upgrades[shopItem.name] && shopItem.tag)
              .sort((a, b) => (a.bought ?? 0) - (b.bought ?? 0));
      itemToHide = hideOne ?
          (Math.max(0, itemToHide) +
           Math.floor(1 + Math.random() * (shopItems.length - 1))) %
              shopItems.length :
          -1;
      shopItems.forEach((shopItem, index) => {
        if (upgrades[shopItem.name] && shopItem.tag) {
          const tagDiv = upgradeDiv.appendChild(document.createElement('div'));
          tagDiv.style.visibility = itemToHide === index ? 'hidden' : '';
          tagDiv.style.color = 'white';
          tagDiv.style.backgroundColor = shopItem.color ?? 'blue';
          tagDiv.style.borderRadius = '8px';
          tagDiv.style.width = '50px';
          tagDiv.style.height = '18px';
          tagDiv.style.boxShadow = '2px 2px black';
          tagDiv.style.textAlign = 'center';
          tagDiv.style.margin = '2px';
          tagDiv.textContent = `${shopItem.tag}${
              upgrades[shopItem.name] > 1 ? ' ' +
                      (ROMAN[upgrades[shopItem.name]] ??
                       upgrades[shopItem.name]) :
                                            ''}`;
        }
      });
    }


    // let now = () => foundBorte ||
    //     Math.max(inHut ? inHut.enteredHut : (screenPaused || lastframeTime));

    let millitick = 0;
    let tick = 0;
    function showMeTheMoney(timer) {
      if (timer && !screenPaused && !inCutScene && !inHut && !foundBorte &&
          !hero.dead) {
        tick++;
        millitick = gTime;

        if (timeLimit - tick < 30 && timer) {
          zzfx(
              ...[2.12, , 1025, .01, .01, 0, 2, .01, 29, , , , .01, , -0.9, ,
                  .05, .72, .01, .16]);  // Blip 100
        }
      }
      const maxHealth = defaultmaxHealth + upgrades.maxHealth * 2;
      let str = '';
      for (let i = 0; i < Math.floor(health / 2); i++) {
        str += '❤️';
      }
      if (health % 2) {
        str += halfHeart;
      }
      for (let i = Math.ceil(health / 2); i < maxHealth / 2; i++) {
        str += noHeart;
      }
      //  healthDiv.innerText = str;

      //  const now = Math.max(inHut ? inHut.enteredHut : (screenPaused ||
      //  lastframeTime), 0);
      const s = Math.max(
          0, timeLimit - tick);  // Math.max(0, timeLimit - Math.floor((now() -
                                 // startTime) / 1000));
      moneyDiv.innerHTML = locked ?
          '' :
          `Level ${hutLevel}\n${str}\n🏵️ ${money}\n${s ? '⏳' : '⌛'} <span ${
              s < 30 ? 'class=blink_me' : ''}>${Math.floor(s / 60)}:${
              (100 + s % 60).toString().substring(1)}</span>`;
      if (health && s <= 0 && hutLevel) {
        health = 0;
        lifeCheck();
      }
    }

    setInterval(showMeTheMoney, 1000, true);


    const gameOverDiv =
        document.body.appendChild(document.createElement('div'));
    const gods = gameOverDiv.style;
    gods.position = 'absolute';
    gods.top = canvas.offsetTop + 10;
    gods.left = canvas.offsetLeft + 150;
    gods.fontSize = '16pt';
    gods.marginRight = '50px';
    gods.whiteSpace = 'pre-wrap';
    gods.pointerEvents = 'none';
    gods.backgroundColor = 'rgba(51, 0, 0, 0.4)';
    gods.padding = '10px';
    gods.minWidth = '640px';

    const gameOverBox =
        document.body.appendChild(document.createElement('div'));
    gameOverBox.style.position = 'absolute';
    gameOverBox.style.bottom = 50;
    gameOverBox.style.left = canvas.offsetLeft + 50;
    const restartButton =
        gameOverBox.appendChild(document.createElement('button'));
    restartButton.textContent = 'Start over';
    restartButton.addEventListener('click', () => {
      window.location.reload();
    });
    let reviving = false;
    const reviveButton =
        gameOverBox.appendChild(document.createElement('button'));
    reviveButton.textContent = 'Revive (ESC)';
    reviveButton.addEventListener('click', () => {
      reviving = true;
      setTimeout(() => {
        reviving = false;
      }, 1000);
    });
    gameOverBox.style.display = 'none';


    const pointsPerShopBonus = 5000;

    let bestScore = parseInt(localStorage.getItem('bestScore') ?? '0');
    // gods.color = "snow";
    //  gameOverDiv.textContent = "Press ESC to continue";
    //  gameOverDiv.style.display = "none";
    showText('');
    function showGameOver() {
      wildHordeMusic.stop();
      const pointsPerLevel = 10000;
      const pointsPerUpgrade = 1000;
      const upgradesCount = Object.values(upgrades).reduce((a, b) => a + b, 0);
      const revivalBonus = Math.max(3 - revival, 0) * 10000;
      const accuracy = !shotsTaken ?
          1.5 :
          Math.ceil((1 - missedShot / shotsTaken) * 1000) / 1000;
      const accuracyBonus = parseFloat((1 + accuracy).toFixed(3));
      const bonusPoints = upgrades.bonus * pointsPerShopBonus;

      // foundBorte
      const s = Math.max(
          0, timeLimit - tick);  // Math.floor((now() - startTime) / 1000));
      const foundBorteBonus =
          foundBorte ? (s % 60) * 100 + Math.floor(s / 60) * 10000 : 0;
      const timeRemaining =
          `${Math.floor(s / 60)}:${(100 + s % 60).toString().substring(1)}`;

      const baseScore = hutLevel * pointsPerLevel + money * 10 +
          upgradesCount * pointsPerUpgrade + revivalBonus + bonusPoints +
          foundBorteBonus;
      const finalScore = Math.ceil(baseScore * accuracyBonus);
      if (finalScore > bestScore) {
        bestScore = finalScore;
        localStorage.setItem('bestScore', bestScore);
      }
      postScore(finalScore, 'High score');
      postScore(money * 100, 'Dying rich!');

      gameOverBox.style.display = 'block';
      reviveButton.disabled = !canContinue();
      showText(
          '<div style=\'font-size: 24pt\'><b>GAME OVER, KHAN</b></div><div style=\'font-size: 18pt\'>' +
          '\n<b>LEVEL</b>: ' + hutLevel + ` (+ ${hutLevel * pointsPerLevel})` +
          '\n<b>UPGRADES</b>: ' + upgradesCount +
          ` (+ ${upgradesCount * pointsPerUpgrade})` +
          '\n<b>MONEY</b>: ' + money + ` (+ ${money * 10})` +
          '\n<b>REVIVALS</b>: ' + revival + ` (+ ${revivalBonus})` +
          (bonusPoints ? '\n<b>BONUS POINTS</b>: +' + bonusPoints : '') +
          (foundBorteBonus ? '\n<b>RESCUED BÖRTE</b>: ⌛ ' + timeRemaining +
                   ` (+ ${foundBorteBonus})` :
                             '') +
          '\n<b>BASE SCORE</b> = ' + baseScore +
          (!shotsTaken ? '\n<b>SHOTLESS</b>: ' :
                         '\n<b>ACCURACY</b>: ' +
                   parseFloat((100 * accuracy).toFixed(1)) + '%') +
          ` (x ${accuracyBonus})` +
          '\n' +
          '\n<b>FINAL SCORE: ' + finalScore + '</b>' +
          '\n<b>BEST</b>: ' + bestScore + '\n\n' +
          (canContinue() ?
               'Press <b>ESC</b> to revive. You will lose all your money and one upgrade.' :
               '') +
          '</div>');
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
    window.addEventListener('blur', function(event) {
      if (!screenPaused) {
        screenPaused = gTime;
        wildHordeMusic.pause();
      }
    }, false);

    window.addEventListener('focus', function(event) {
      if (screenPaused) {
        // if (!foundBorte) {
        //   startTime += (gTime - screenPaused);
        // }
        screenPaused = 0;
        if (!inHut && !hero.dead && gameHasStarted) {
          if (!mute) {
            wildHordeMusic.resume();
          }
        }
      }
    }, false);


    // let root;
    function startGame() {
      // const byteArray = load_binary_resource("rider.13k");
      // root = decodeShape(byteArray);
      // console.log(root);
      console.log(root);
      const load = document.querySelector('#loading-div');
      load?.parentElement?.removeChild(load);
      loop(0);
    }

    const srcWidth = 1600;
    const srcHeight = 1000;
    let random = 5;
    function showFrame(
        ctx, x, y, w, h, frame, anim, color, ddy, random, debug) {
      const mulW = w / srcWidth;
      const mulH = h / srcHeight;
      ctx.fillStyle = color ?? 'black';
      root.shapes.forEach(shape => {
        if (shape.hidden || (shape.anim !== anim)) {
          return;
        }
        const ll = shape.lines[frame % shape.lines.length];
        if (ll) {
          ctx.beginPath();
          moveTo(
              ctx, x, y, ll[0] * mulW, ll[1] * mulH, false, w, h, ddy, random);
          for (let i = 2; i < ll.length; i += 2) {
            moveTo(
                ctx, x, y, ll[i] * mulW, ll[i + 1] * mulH, true, w, h, ddy,
                random);
          }
          ctx.closePath();
        }
        ctx.fill();
      });
    }

    function moveTo(ctx, offsetX, offsetY, x, y, penDown, w, h, ddy, random) {
      if (penDown) {
        ctx.lineTo(
            offsetX + x,
            offsetY + y + (x / w - .5) * 5 * ddy + random * (rando() - .5));
      } else {
        ctx.moveTo(
            offsetX + x,
            offsetY + y + (x / w - .5) * 5 * ddy + random * (rando() - .5));
      }
    }

    const soldierFlash = 400;
    const threshold = .5;

    let shotsTaken = 0;
    let missedShot = 0;

    function removeArrow(index, timedOut) {
      const to = arrows[index];
      if (to.hero && timedOut) {
        missedShot++;
      }

      const from = arrows[arrowSize - 1];
      to.x = from.x;
      to.y = from.y;
      to.dx = from.dx;
      to.dy = from.dy;
      to.born = from.born;
      to.hero = from.hero;
      arrowSize--;
    }

    function removeDust(index) {
      const to = dust[index];
      const from = dust[dustSize - 1];
      to.x = from.x;
      to.y = from.y;
      to.dy = from.dy;
      to.size = from.size;
      to.born = from.born;
      dustSize--;
    }

    function removeBlood(index) {
      const to = blood[index];
      const from = blood[bloodSize - 1];
      to.x = from.x;
      to.y = from.y;
      to.dx = from.dx;
      to.dy = from.dy;
      to.born = from.born;
      to.w = from.w;
      to.h = from.h;
      to.ground = from.ground;
      bloodSize--;
    }

    function hasShield(hero) {
      return upgrades.shield &&
          gTime - (hero.lastBlock ?? -20000) >
          (upgrades.shield === 2 ? 10000 : 20000);
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
      arr.dy = -5 + dy * 10;
      arr.x = x + arr.dx;
      arr.y = y - 80 * zoom;
      arr.born = gTime;
      arr.hero = sprite === hero;
      if (arr.hero) {
        shotsTaken++;
      }
      arrowSize++;
    }

    let dustSize = 0;
    const dust = [];
    function addDust(sprite) {
      if (Math.random() > .3) {
        return;
      }
      const {x, y} = sprite;
      if (dustSize >= dust.length) {
        dust.push({});
      }
      const arr = dust[dustSize];
      arr.dy = -.2;
      arr.x = x + (Math.random() - .5) * 100;
      arr.y = y + (Math.random() - .5) * 20;
      arr.size = Math.random() * 20;
      arr.born = gTime;
      dustSize++;
    }


    let bloodSize = 0;
    const blood = [];
    function addBlood(sprite) {
      const {x, y} = sprite;
      if (bloodSize >= blood.length) {
        blood.push({});
      }
      const arr = blood[bloodSize];
      arr.dx = (Math.random() - .5) * 10;
      arr.dy = -(Math.random()) * 4;
      arr.x = x;
      arr.y = y - 10;
      arr.born = gTime + Math.random() * 10000;
      const size = (Math.random() * 5 + 5) * (sprite.superSoldier ? 2 : 1);
      arr.width = size;
      arr.height = size;
      arr.ground = y + Math.random() * 10;
      bloodSize++;
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
      const da = disto(ax, ay);  // Math.sqrt(ax*ax + ay * ay);
      if (ax !== 0) {
        sprite.orientation = ax;
      }
      const speed = evaluate(sprite.speed, sprite) * (sprite.dead ? 1.5 : 1) *
          (sprite.superSoldier && sprite.soldier ? .8 : 1);
      const control = evaluate(sprite.control, sprite) ?? 0;
      const brake = evaluate(sprite.brake, sprite) - control * 0.01;
      if (da) {
        sprite.dx = (sprite.dx + ax / da * speed * (1 + control)) * brake;
        sprite.dy = (sprite.dy + ay / da * speed / 2 * (1 + control)) * brake;
      } else {
        sprite.dx = sprite.dx * (brake);
        sprite.dy = sprite.dy * (brake);
      }
      sprite.moving =
          Math.abs(sprite.dx) > threshold || Math.abs(sprite.dy) > threshold;
      if (sprite.moving) {
        sprite.x += sprite.dx * dtt;
        sprite.y += sprite.dy * dtt;
      }
      const dist =
          disto(sprite.dx, sprite.dy);  // Math.sqrt(sprite.dx * sprite.dx +
                                        // sprite.dy * sprite.dy);
      sprite.horseFrame += dtt * Math.max(.08, dist / 50);
    }

    let unlockPerfectShot = false;
    let unlockedShotless = false;
    let unlockedFastRescue = false;
    let unlockUntouchable = false;
    let unlockOneLife = false;
    let onExit = null;
    function exitHut(hut) {
      // if (!foundBorte) {
      //   if (locked) {
      //     startTime = lastframeTime;
      //   } else {
      //     startTime += (lastframeTime - inHut.enteredHut);
      //   }
      // }

      if (!shotsTaken && beatGame && !unlockedShotless) {
        unlockedShotless = true;
        unlockMedal('Shotless');
      }

      if (shotsTaken && !missedShot && beatGame && !unlockPerfectShot) {
        unlockPerfectShot = true;
        unlockMedal('Perfect shot');
      }

      if (foundBorte && !beatGame && !unlockedFastRescue) {
        const s = Math.max(
            0, timeLimit - tick);  // Math.floor((now() - startTime) / 1000));
        if (s / 60 >= 2) {
          unlockedFastRescue = true;
          unlockMedal('Speedy mission success');
        }
      }

      if (beatGame && !hitCount && !unlockUntouchable) {
        unlockUntouchable = true;
        unlockMedal('Untouchable');
      }

      if (beatGame && !revival && !unlockOneLife) {
        unlockOneLife = true;
        unlockMedal('You live only once');
      }

      hero.x = hut.x;
      hero.y = hut.y + 200;
      hero.dx = 0;
      hero.dy = 0;
      let info = hutInfo(inHut);
      info.closed = true;
      info.onFire = true;  // hut.level;
      inHut = null;
      locked = false;
      onExit?.();
      onExit = null;
      // showHealth();
      showMeTheMoney();
    }

    function canContinue() {
      return !beatGame &&
          Object.keys(upgrades).filter(k => upgrades[k]).length > 1;
      // return Object.keys(upgrades).filter(k => upgrades[k]).length;
    }

    let revival = 0;
    let shuffling = false;

    const sprite = {
      parent: true,
      active: () => true,
      time: 0,
      nextShot: 0,
      process: (sprite) => {
        if (!sprite.parent) {
          return;
        }
        if (inCutScene || shopOpened) {
          return;
        }
        // if (inHut) {
        //   // if (keys.Escape) {
        //   //   exitHut(inHut);
        //   //   gameOverDiv.style.display = "none";
        //   //   wildHordeMusic.play();
        //   // } else {
        //   //   return;
        //   // }
        // }
        if (!health && (keys.Escape || reviving) && canContinue() &&
            !shuffling) {
          gameOverBox.style.display = 'none';
          shuffling = true;
          let suspense = Math.max(10, Object.values(upgrades).length * 2);
          const interval = setInterval(() => {
            if (suspense <= 0) {
              shuffling = false;
              clearInterval(interval);
              zzfx(
                  ...[, , 150, .03, .27, .36, , 1.41, -0.2, , 199, .07, .12, .2,
                      5.6, , , .92, .14]);  // Powerup 102
              revival++;
              money = 0;
              hero.dead = 0;
              // showText("");
              if (!foundBorte) {
                //        startTime = Math.max(startTime, now() - timeLimit *
                //        1000 + 60000);
                tick = Math.min(tick, timeLimit - 60);
              }
              // showHealth();
              if (!mute) {
                wildHordeMusic.play();
              }
              const upgrade = Object.keys(upgrades)
                                  .filter(k => upgrades[k])
                                  .sort(() => rando() - .5)[0];
              const upgradeLevel = upgrades[upgrade];
              upgrades[upgrade]--;
              showText(
                  'You lost ' +
                  shop.filter(s => s.name === upgrade)[0].title.toUpperCase() +
                  (upgradeLevel > 1 ? ` ${repeatString('I', upgradeLevel)}` :
                                      '') +
                  '\nReach the next yurt to regain new upgrades.');
              // icons.push("-"+upgrade);
              health = defaultmaxHealth + upgrades.maxHealth * 2;
              if (upgrade === 'bow') {
                bowshop.cost.push(0);
              }
              showMeTheMoney();
              showUpgrades();
            } else {
              zzfx(
                  ...[1.04, , 140, , .01, 0, 1, .38, 7.9, , 964, .09, , , , , ,
                      .21, .01, .13]);  // Blip 68
              showUpgrades(true);
              suspense--;
            }
          }, 100);
        }
        if (!health && sprite.hero) {
          return;
        }

        repeatDt(processMovement, sprite);

        const dd = disto(sprite.dx, sprite.dy);
        if (dd > .1) {
          addDust(sprite);
        }

        if (locked) {
          sprite.x = Math.max(-cvw / 2, Math.min(sprite.x, cvw / 2));
          sprite.y = Math.max(-cvh / 2, Math.min(sprite.y, cvh / 2));
        }

        sprite.shooting = keys.Space;
        const shooting = sprite.shooting;  // evaluate(sprite.shooting, sprite);
        if (!shooting) {
          sprite.archerOrientation = sprite.orientation;
        } else if (upgrades.bow) {
          if (gTime > sprite.nextShot) {
            shootArrow(sprite);
            sprite.nextShot = gTime + evaluate(sprite.shootPeriod, sprite);
            zzfx(
                ...[1, , 1570, .06, .06, .08, 4, 1.07, 13, , , , .19, .3, , ,
                    .27, , .01]);  // arrowshot
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
      speed: sprite => (1 + rage * .2) * (.08 + upgrades.speed * 0.03) *
          (sprite.shooting && !upgrades.speedWhileShooting ? 0.5 : 1),
      x: 300,
      y: 500,
      //  moving: sprite => Math.abs(sprite.dx) > threshold ||
      //  Math.abs(sprite.dy) > threshold, shooting: () => keys.Space,
      ax: () => (keys.KeyA || keys.ArrowLeft ? -1 : 0) +
          (keys.KeyD || keys.ArrowRight ? 1 : 0),
      ay: () => (keys.KeyW || keys.ArrowUp ? -1 : 0) +
          (keys.KeyS || keys.ArrowDown ? 1 : 0),
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
      riderAnimation: 'archer',
      layer: 0,
      // hidden: false,
      // tree: false,
      // cache: false,
      control: () => upgrades.control,
      sprites:
          [
            sprite =>
                evaluate(
                    {
                      ...sprite,
                      process: undefined,
                      y: sprite => evaluate(sprite.y, sprite) - .1,
                      parent: false,
                      sprites: undefined,
                      animation: sprite =>
                          evaluate(sprite.riderAnimation, sprite),
                      range: sprite => evaluate(sprite.rangeOverride, sprite) ??
                          (sprite.shooting ? [0, 3] : [0]),
                      hotspot: [
                        sprite => sprite.moving ? .5 -
                                sprite.orientation *
                                    evaluate(sprite.archerOrientation, sprite) *
                                    .05 :
                                                  .53,
                        sprite => sprite.moving ?
                            .65 + Math.sin(sprite.horseFrame * .7) / 100 :
                            .7,
                      ],
                      color: sprite => evaluate(sprite.foeColor, sprite) ??
                          (sprite.corpse   ? sprite.color :
                               sprite.hut  ? '#af8' :
                               sprite.tree ? '#270' :
                                             'black'),
                      direction:
                          (sprite) => Math.sign(
                              evaluate(sprite.archerOrientation, sprite)),
                      frame: (sprite) => evaluate(sprite.horseFrame, sprite),
                      random: 4,
                      hidden: sprite => sprite.dead,
                    },
                    sprite),
            sprite =>
                evaluate(
                    {
                      ...sprite,
                      process: undefined,
                      parent: false,
                      sprites: undefined,
                      animation: sprite => sprite.hut ? 'hut' : 'horse',
                      range: (sprite) => sprite.hut ? [0] :
                          sprite.moving             ? [0, 10] :
                                                      [11],
                      hotspot: [.47, .72],
                      color: sprite => sprite.borte            ? '#f98' :
                          sprite.hut && hutInfo(sprite).closed ? '#ba6' :
                          sprite.superSoldier                  ? '#a08' :
                          sprite.foe                           ? '#004' :
                                                                 '#630',
                      direction: (sprite) => Math.sign(sprite.orientation),
                      frame: (sprite) => evaluate(sprite.horseFrame, sprite),
                      random: sprite => sprite.superSoldier ? 100 : 4,
                      hidden: sprite => (sprite.tree && !sprite.hut) ||
                          sprite.corpse || sprite.soldier,
                    },
                    sprite),
            sprite =>
                evaluate(
                    {
                      ...sprite,
                      process: undefined,
                      y: sprite => evaluate(sprite.y, sprite) + 1,
                      parent: false,
                      sprites: undefined,
                      animation: sprite => sprite.hut ? 'hut' : 'shield',
                      range: sprite => sprite.hut ? [2] : [0],
                      hotspot: sprite => sprite.hut ? [.53, .7] : [.47, .72],
                      color: sprite => sprite.hut                  ? '#960' :
                          hasShield(sprite) && upgrades.shield > 1 ? 'gold' :
                                                                     '#69f',
                      direction: (sprite) => Math.sign(sprite.orientation),
                      frame: () => 0,
                      hidden: sprite => !sprite.hut &&
                          (!hasShield(sprite) || sprite.borte || sprite.foe ||
                           sprite.corpse || sprite.soldier),
                    },
                    sprite),
            sprite =>
                evaluate(
                    {
                      ...sprite,
                      // process: undefined,
                      layer: -2,
                      parent: false,
                      sprites: undefined,
                      animation: sprite => sprite.soldier ? 'soldier' :
                          sprite.corpse                   ? 'dead' :
                          sprite.hut                      ? 'hut' :
                          sprite.tree                     ? 'tree' :
                                                            'horse',
                      range: (sprite) => sprite.corpse ?
                          evaluate(sprite.rangeOverride, sprite) :
                          sprite.tree   ? [0] :
                          sprite.moving ? [0, 10] :
                                          [11],

                      //      range: sprite => sprite.rangeOverride ??
                      //      (evaluate(sprite.shooting, sprite) ? [0, 3] :
                      //      [0]),

                      hotspot: (sprite) => sprite.tree ? [.53, 1] : [.47, .72],
                      color: () => '#999',
                      direction: (sprite) => Math.sign(sprite.orientation),
                      height: -50,
                      frame: (sprite) => evaluate(sprite.horseFrame, sprite),
                      hidden: sprite => sprite.dead && sprite.soldier,
                    },
                    sprite),
          ],
    };

    let coll = false;
    const GG = 'gold', RR = 'red';

    function evaluate(value, sprite) {
      if (typeof (value) === 'object') {
        if (Array.isArray(value)) {
          const AA = [];
          AA.length = value.length;
          for (let i = 0; i < value.length; i++) {
            AA[i] = evaluate(value[i], sprite);
          }
          return AA;
          // return value.map(v => evaluate(v, sprite));
        } else {
          const o = {};
          const active = evaluate(value.active, sprite);
          if (active) {
            o.active = active;
            for (let i in value) {
              o[i] = evaluate(value[i], sprite);
            }
          }
          return o;
        }
      }
      return typeof (value) === 'function' ? value(sprite) : value;
    }

    let killedGiants = 0;

    function doHitFoe(hitFoe) {
      const bonus = Math.floor(
          (hitFoe.superSoldier ? 25 : Math.floor(2 + Math.random() * 4)) *
          (1 + .5 * upgrades.money));
      bubbles.add({
        born: gTime,
        bonus,
        x: hitFoe.x,
        y: hitFoe.y,
      });
      for (let i = Math.floor(Math.random() * 10 + 10) *
               (hitFoe.superSoldier ? 3 : 1);
           i > 0; i--) {
        addBlood(hitFoe);
      }
      if (hitFoe.superSoldier) {
        killedGiants++;
        if (killedGiants === 13) {
          unlockMedal('Headhunter');
        }
      }


      money += bonus;
      showMeTheMoney();
    }

    let difficultyPlus = 0;

    function showSprite(sprite, accumulator) {
      const sprites = evaluate(sprite.sprites, sprite);
      sprites.forEach(sprite => {
        const {
          x,
          y,
          width,
          height,
          hotspot,
          foeIndex,
          dead,
          color,
          foeColor,
          soldier,
          superSoldier,
          hidden,
          tree,
          active,
          born
        } = sprite;
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

        if (soldier && born) {
          const flashChance =
              Math.max(0.3, lastframeTime - born) / soldierFlash;
          if (flashChance > 1) {
            sprite.born = 0;
          } else if (Math.random() > flashChance) {
            return;
          }
        }

        if (foeIndex !== undefined && !dead) {
          for (let i = arrowSize - 1; i >= 0; i--) {
            const arrow = arrows[i];
            if (arrow.x - sh[0] > left && arrow.x - sh[0] < right &&
                arrow.y - sh[1] > top && arrow.y - sh[1] < bottom) {
              const hit = (superSoldier ?
                               rando() < (.05 + (.2 * upgrades.giantPiercing)) :
                               true) &&
                  (Math.random() * difficultyPlus < 1);
              const hitFoe = foes[foeIndex];
              if (hit) {
                hitFoe.dead = gTime;
                addCorpse(hitFoe, arrow.dx, foeColor ?? color);

                const gx = hero.x - hitFoe.x;
                const gy = hero.y - hitFoe.y;
                const gdist = disto(gx, gy);  // Math.sqrt(gx*gx + gy*gy);
                let gdisto = 2000 / gdist;
                hitFoe.dx = 0;
                hitFoe.dy = 0;
                hitFoe.goal[0] = hitFoe.x + -gx * gdisto;
                hitFoe.goal[1] = hitFoe.y + -gy * gdisto;

                if (!superSoldier) {
                  zzfx(
                      ...[Math.min(2, gdisto / 4), , 1, .02, .03, 0, 4, 1.14,
                          51, -46, 37, .05, .05, , -9.5, , .36, ,
                          .05]);  // Blood
                } else {
                  zzfx(
                      ...[1.27, , 416, .01, .08, .12, 2, 1.67, 7.1, .8, , , .05,
                          2, , .3, , .56, .02, .21]);  // Hit 83
                }


                doHitFoe(hitFoe);
              } else {
                zzfx(
                    ...[2.06, , , , .04, .06, 3, 1.22, , , , , .09, .2, , .2,
                        .11, .52, .01]);  // Block
                hitFoe.hitTime = gTime;
              }

              if (rando() < upgrades.rickoShot * .3 * (hit ? 1 : 1.2)) {
                arrow.dx *= (rando() - .5);
                arrow.dy = -Math.abs(arrow.dy) * .8;
                arrow.hero = false;
                zzfx(
                    ...[, , 332, , .01, .01, 4, 2.95, -33, .6, -6, .21, , , , ,
                        , , .02]);  // Ricochet
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
        // const { x, y, width, height, animation, born, horseFrame, range,
        // hotspot, color, direction, dy, random } = sprite;

        // const frame = range[0] + (range.length <= 1 ? 0 :
        // Math.floor(horseFrame) % (range[1] - range[0])); const anim =
        // root.animations.indexOf(animation); const dir = evaluate(direction,
        // sprite); const ddy = evaluate(dy, sprite); showFrame(
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
      let {
        x,
        y,
        width,
        height,
        animation,
        horseFrame,
        range,
        hotspot,
        color,
        hitTime,
        direction,
        dy,
        random,
        hidden,
        cache,
        hero,
        hut
      } = s;
      // if (dead) {
      //   color = "red";
      //   return;
      // }
      if (hut && !hutInfo(s).closed) {
        nearHut = s;
      }
      if (hitTime && gTime - hitTime < 100) {
        color = hero ? 'red' : 'white';
      }
      let frame = range[0] +
          (range.length <= 1 ?
               0 :
               Math.floor(horseFrame) % (range[1] - range[0] + 1));
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
          //        console.log(Math.abs(width), Math.abs(height));
          canvas = new OffscreenCanvas(
              Math.abs(width),
              Math.abs(height));  // document.createElement("canvas");
          cacheBox[tag] = {canvas};
          canvas.getContext('2d').lineWidth = 6;
          canvas.getContext('2d').strokeStyle = 'black';

          // /       document.body.appendChild(cacheBox[tag].canvas);

          showFrame(
              canvas.getContext('2d'), dir < 0 ? width : 0,
              height < 0 ? -height : 0, width * dir, height, frame, anim, color,
              0, 0);
        }
        canvas = cacheBox[tag].canvas;
        ctx.drawImage(
            canvas, x - hotspot[0] * width - sh[0],
            y - (height < 0 ? 0 : hotspot[1] * height) - sh[1] + shake);
        return;
      }

      const anim = root.animations.indexOf(animation);
      showFrame(
          ctx, x - hotspot[0] * width * dir - sh[0],
          y - hotspot[1] * height - sh[1] + shake, width * dir, height, frame,
          anim, color, ddy, random);
    }

    // const fps = 60;
    // const period = 1000 / fps;
    let lastframeTime = 0;

    let headStart = 0;

    function copy(sprite) {
      if (typeof (sprite) === 'object') {
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
        riderAnimation: 'dead',
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
        cs.backgroundColor = '#efd';
      }, 150);

      if (!health) {
        addCorpse(hero, -Math.sign(hero.orientation || 1) * 100, hero.color);
        hero.dead = gTime;
        hero.moving = false;
        showGameOver();
        wildHordeMusic.stop();
      }
    }

    let hitCount = 0;

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

      const RANGE_NO_MOVING = [0];
      const RANGE_SOLDIER = [0, 4];
      const RANGE_RANGE = [0, 3];

      const x = cos * (2000 + rando() * 1000);
      const y = sin * (2000 + rando() * 1000);
      const mySpeed = soldier ?
          Math.max(.01, rando() / 20) :
          Math.max(.03, rando() / 10);  // soldierSuperSpeed
      const foe = {
        ...copy(sprite),
        active: () => index <= foesTotal,
        superSoldier,
        foeIndex: index,
        foeColor: superSoldier ? (soldier ? 'blue' : '#a00') :
            soldier            ? '#75f' :
                                 '#f0a',
        horseFrame: Math.floor(rando() * 100),
        goal: [x, y],
        gdist: 0,
        ax: (sprite) => (sprite.goal[0] - foe.x) / 2000,
        ay: (sprite) => (sprite.goal[1] - foe.y) / 2000,
        x,
        y,
        rangeOverride: sprite => !sprite.moving ? RANGE_NO_MOVING :
            soldier                             ? RANGE_SOLDIER :
                                                  RANGE_RANGE,
        // speed: Math.max(.03, Math.random() / 15),//sprite => 10 /
        // (evaluate(sprite.gdist, sprite) + 1),
        //  HARD vvv
        speed: () => mySpeed * soldierSuperSpeed,
        //  MEDIUM vvv
        // speed: soldier ? Math.max(.01, Math.random() / 40) : Math.max(.02,
        // Math.random() / 30),
        //  EASY vvv
        // speed: soldier ? Math.max(.01, Math.random() / 50) : Math.max(.015,
        // Math.random() / 40),
        archerOrientation: (sprite) => Math.sign(evaluate(sprite.dx, sprite)),
        cache: true,
        soldier,
        process: (sprite) => {
          if (!sprite.parent || !evaluate(sprite.active, sprite)) {
            return;
          }
          if (sprite.dead && gTime - sprite.dead > 5000) {
            sprite.dead = 0;
            sprite.born = lastframeTime;
            sprite.speed = sprite.soldier ? Math.max(.025, rando() / 30) :
                                            Math.max(.03, rando() / 20);
          }
          repeatDt(processMovement, sprite);
          const soldierAppearing = soldier && sprite.born &&
              lastframeTime - sprite.born < soldierFlash;
          if (!soldier || soldierAppearing) {
            addDust(sprite);
          }

          const gx = sprite.x - sprite.goal[0];
          const gy = sprite.y - sprite.goal[1];
          sprite.gdist = disto(gx, gy);  // Math.sqrt(gx * gx + gy * gy);

          const hx = sprite.x - hero.x;
          const hy = sprite.y - hero.y;
          const hdist = disto(hx, hy);  // Math.sqrt(hx * hx + hy * hy);
          if (hdist < 50 && !sprite.dead && health) {
            if (soldierAppearing) {
              //  ignore collision
            } else {
              if (hasShield(hero)) {
                hero.lastBlock = gTime;
                zzfx(
                    ...[1.75, , 279, , .02, .09, , .76, -3.5, .3, , , , .2, ,
                        .3, .01, .93, .01, .12]);  // Shield
              } else {
                hitCount++;
                cs.backgroundColor = '#a00';
                health = Math.max(0, health - (superSoldier ? 2 : 1));
                showMeTheMoney();
                // showHealth();
                zzfx(
                    ...[1.99, , 70, .02, .03, .19, , .18, , -9.1, , , , 1.8, ,
                        .3, , .51, .09]);  // Hurt
              }
              shakeSize = 40;
              setTimeout(() => {
                cs.backgroundColor = '#efd';
              }, 150);

              lifeCheck();

              const angle = rando() * Math.PI * 2;
              const cos = Math.cos(angle);
              const sin = Math.sin(angle);
              sprite.x = hero.x + cos * 2000;
              sprite.y = hero.y + sin * 2000;
              hero.dx = 0;
              hero.dy = 0;
              if (soldier) {
                sprite.born = lastframeTime;
              }
              //        console.log(gTime);
              hero.hitTime = gTime;

              doHitFoe(sprite);
            }
          }

          if (nearHut || !health) {
            if (!sprite.pausing) {
              sprite.pausing = true;
              const dx = sprite.x - (nearHut ?? hero).x;
              const dy = sprite.y - (nearHut ?? hero).y;
              const gd = 2000 / disto(dx, dy);  // Math.sqrt(dx * dx + dy * dy);
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
                const ddd =
                    disto(hero.dx, hero.dy);  // Math.sqrt(hero.dx * hero.dx +
                                              // hero.dy * hero.dy);
                sprite.x = hero.x + hero.dx * (1000 + rando() * 500) / ddd +
                    (rando() - .5) * 300;
                sprite.y = hero.y + hero.dy * (1000 + rando() * 500) / ddd +
                    (rando() - .5) * 300;
                sprite.born = lastframeTime;
              }
              if (sprite.dead) {
                sprite.dead = 0;
                sprite.born = lastframeTime;
                sprite.speed = sprite.soldier ? Math.max(.025, rando() / 30) :
                                                Math.max(.03, rando() / 20);
              }
              sprite.gdist = 0;
            }

            if (sprite.gdist < 100 || hdist > (sprite.soldier ? 500 : 3000)) {
              sprite.goal[0] = hero.x + (hero.x - sprite.x) +
                  (rando() - .5) * (sprite.soldier ? 200 : 300);
              sprite.goal[1] = hero.y + (hero.y - sprite.y) +
                  (rando() - .5) * (sprite.soldier ? 200 : 300);
              // if (sprite.dead) {
              //   sprite.dead = false;
              // }
            }
          }
        },
        foe: true,
        width: (soldier ? 200 * zoom : 220 * zoom) *
            (superSoldier ? (soldier ? 2 : 1.5) : 1),
        height: (soldier ? 180 * zoom : 180 * zoom) *
            (superSoldier ? (soldier ? 2 : 1.5) : 1),
        riderAnimation: soldier ? 'soldier' : 'sword',
      };
      return foe;
    });


    function canBuy(item) {
      if (item.disabled?.()) {
        return false;
      }
      return item.cost?.length && money >= evaluate(item.cost[0]) * costMul;
    }

    // const shopDiv = document.body.appendChild(document.createElement("div"));
    // const sds = shopDiv.style;
    // sds.position = "absolute";
    // sds.left = "200px";
    // sds.top = "150px"
    // // sds.display = "none";
    // sds.visibility = "hidden";

    // function addAG() {
    //   const agDiv = shopDiv.appendChild(document.createElement("div"));
    //   agDiv.style.position = "fixed";
    //   agDiv.style.right = "10px";
    //   agDiv.style.bottom = "10px";
    //   agDiv.style.zIndex = 1000;
    //   const link = agDiv.appendChild(document.createElement("a"));
    //   link.href = "https://www.addictinggames.com";
    //   link.target = "_blank";

    //   link.addEventListener("mouseover", () => {
    //     agImg.src = "logo/agh.png";
    //   });
    //   link.addEventListener("mouseout", () => {
    //     agImg.src = "logo/ag.png";
    //   });

    //   const agImg = link.appendChild(document.createElement("img"));
    //   agImg.src = "logo/ag.png";
    //   agImg.style.width = "178px";
    //   agImg.style.height = "71px";
    // }

    const shopDivs = new Array(6).fill(null).map(() => {
      const s = shopDiv.appendChild(document.createElement('div'));
      const ssd = s.style;
      ssd.backgroundColor = '#444';
      ssd.margin = '10px';
      ssd.padding = '20px 10px';
      return s;
    });

    const purchased = shopDivs.map(() => null);
    let shopIndex = 0;
    let shopList = [];
    let shopOpened = false;
    function showShop(refresh) {
      if (!refresh) {
        shopIndex = 0;
        shop.sort((a, b) => {
          const pria = a.priority?.() ?? 0;
          const prib = b.priority?.() ?? 0;
          if (pria !== prib) {
            return prib - pria;
          }
          return rando() - .5;
        });
        shopList = [...shop].filter(canBuy).slice(0, shopDivs.length - 1);
      }
      const s = shopList;
      shopOpened = true;
      shopDiv.style.display = '';
      shopDiv.style.visibility = '';
      for (let i = 0; i < shopDivs.length; i++) {
        if (!refresh) {
          purchased[i] = false;
        }
        const sd = shopDivs[i];
        sd.style.backgroundColor = purchased[i] ? '#6F6' :
            i === shopIndex                     ? '#480' :
                                                  '#222';
        sd.style.padding = '10px';
        sd.style.width = '500px';
        sd.style.outline = i === shopIndex ? '4px solid green' : '';
        sd.style.display = i > s.length - (!upgrades.bow ? 1 : 0) ? 'none' : '';
        sd.style.opacity =
            i === s.length || s[i] && canBuy(s[i]) || purchased[i] ? 1 : .5;
        sd.style.color = purchased[i] ? 'green' : '';
        sd.style.whiteSpace = 'pre-wrap';
        const upgradeLevel =
            (upgrades[s[i]?.name] ?? 0) + (purchased[i] ? 0 : 1);
        sd.innerHTML = i === s.length ?
            'Exit' :
            !s[i] ?
            '' :
            `<b>${
                s[i].title.toUpperCase() +
                (upgradeLevel > 1 ? ` ${repeatString('I', upgradeLevel)}` :
                                    '')}</b> ${
                purchased[i] ?
                    '✔️' :
                    !evaluate(s[i].cost[0]) ?
                    '' :
                    `(Cost: ${evaluate(s[i].cost[0]) * costMul} 🏵️)`}\n${
                evaluate(s[i].description, s[i])}`;
      }
      // if (refresh) {
      //   showText(evaluate(shopList[shopIndex].description,
      //   shopList[shopIndex]));
      // }
    }
    // window.showShop = showShop;


    let gameHasStarted = false;
    let nearHut = null;

    let inHut = null;

    const huts = {};

    function calcTag(sprite) {
      return `${sprite.cellX}_${sprite.cellY}_${sprite.index}`;
    }

    const treeCount = 200;  //  DENSE
    // const treeCount = 30;
    const trees = new Array(treeCount).fill(0).map((_, index) => {
      // const angle = Math.random() * Math.PI * 2;
      // const cos = Math.cos(angle);
      // const sin = Math.sin(angle);
      const isHut = index <= 1;
      const repeatDistance = isHut ? 18000 * (1.2) : 4000;
      const repeatCond = repeatDistance / 2 + 500;
      const tree = {
        ...copy(sprite),
        cache: true,
        ax: () => 0,
        ay: () => 0,
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
          const hdist = disto(hx, hy);  // Math.sqrt(hx * hx + hy * hy);
          if (hdist < (isHut ? 80 : 45 - (upgrades.treeNav * 2))) {
            //        console.log("TREE", hdist);
            if (isHut && !hutInfo(sprite).closed) {
              if (!inHut) {
                gameHasStarted = true;
                showText('');
                zzfx(
                    ...[1.99, , 238, , .08, .14, 2, 0, , -47, -84, , .15, , ,
                        .6, .15, , , .17]);  // Event
                inHut = sprite;
                sprite.enteredHut = gTime;

                if (!hutInfo(inHut).level) {
                  hutInfo(inHut).level = hutLevel++;
                  if (hutInfo(inHut).level > 0) {
                    money += 100;
                  }
                  showMeTheMoney();
                  onExit =
                      hutUpgrades[Math.min(hutLevel, hutUpgrades.length - 1)]
                          ?.();
                }

                //            health = defaultmaxHealth + upgrades.maxHealth *
                //            2;
                // showHealth();
                // showGameOver();
                wildHordeMusic.stop();
                // showShop();
              }
            } else {
              zzfx(
                  ...[, , 457, .01, .02, .02, 2, 2.34, 4.7, -0.1, 5, .23, , ,
                      9.8]);  // Wood
              shakeSize = 20;
              hero.x -= hx;
              hero.y -= hy;
              hero.dx *= (upgrades.treeNav * .25 + .2);
              hero.dy *= (upgrades.treeNav * .25 + .2);
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
          sprite.tag = calcTag(sprite);
        },
        foe: true,
        width: (isHut ? 600 : 500) * zoom,
        height: (isHut ? 400 : 350 + rando() * 200) * zoom,
        riderAnimation: isHut ? 'hut' : 'tree',
        foeColor: isHut ?
            `rgb(${200}, ${100 + index * 55}, ${50 + index * 50})` :
            `rgb(${rando() * 30}, ${rando() * 150}, ${rando() * 20})`,
        tree: true,
        hut: isHut,
        rangeOverride: isHut ? [1] : undefined,
      };

      if (tree.hut) {
        tree.sprites.push(...new Array(3).fill(
            sprite => evaluate(
                {
                  ...sprite,
                  process: undefined,
                  cache: false,
                  parent: false,
                  sprites: undefined,
                  animation: 'shield',
                  random: 150,
                  range: [0],
                  hotspot: [.47 + rando() - .5, 5],
                  width: 200,
                  height: 30,
                  color: () => (coll = !coll) ? GG : RR,
                  direction: (sprite) => Math.sign(sprite.orientation),
                  frame: () => 0,
                  active: sprite => sprite.hut && hutInfo(sprite).onFire,
                },
                sprite)));
      }

      return tree;
    });

    function unlockMedal(name) {
      window?.getMedal(name);
    }

    function findBorte() {
      foundBorte = gTime;  // now();
      borte.x = hero.x;
      borte.y = hero.y;
      wildHordeMusic = furEliseMusic;
      postScore(
          tick * 1000 + Math.max(0, Math.min(gTime - millitick, 999)),
          'Fastest rescue');
    }
    window.findBorte = findBorte;

    let borte = {
      ...sprite,
      borte: true,
      foeColor: () => 'red',
      active: () => foundBorte,  // upgrades.borte,
      shootPeriod: 1000,
      ax: sprite => sprite.dd > 300 ? (hero.x - sprite.x) * .01 : 0,
      ay: sprite => sprite.dd > 300 ? (hero.y - sprite.y) * .01 : 0,
      process: sprite => {
        if (!sprite.parent || !evaluate(sprite.active, sprite)) {
          return;
        }
        const ddx = hero.x - sprite.x;
        const ddy = hero.y - sprite.y;
        const dd = disto(ddx, ddy);  // Math.sqrt(ddx * ddx + ddy * ddy);
        sprite.dd = dd;
        // if(dd > 300) {
        //   sprite.ax = ddx * .01;
        //   sprite.ay = ddy * .01;
        // } else {
        //   sprite.ax = 0;
        //   sprite.ay = 0;
        // }
        if (dd > .1) {
          addDust(sprite);
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
      return huts[sprite.tag] ?? (huts[sprite.tag] = {});
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

    // let toggle = 0;
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
      repeatDt(moveDust, dust);
      repeatDt(moveBlood, blood);


      ctx.beginPath();
      ctx.strokeStyle = '#038';
      ctx.lineWidth = 6;
      //  const arrdt = .7;
      for (let i = 0; i < arrowSize; i++) {
        const arrow = arrows[i];
        const arrowlen = 50;
        const dist =
            disto(arrow.dx, arrow.dy);  // Math.sqrt(arrow.dx * arrow.dx +
                                        // arrow.dy * arrow.dy) + 1;
        ctx.moveTo(arrow.x - sh[0], arrow.y - sh[1] + shake);
        ctx.lineTo(
            arrow.x - sh[0] - arrow.dx / dist * arrowlen,
            arrow.y - sh[1] + shake - arrow.dy / dist * arrowlen);
      }
      ctx.stroke();

      ctx.fillStyle = '#eea';
      for (let i = 0; i < dustSize; i++) {
        const arrow = dust[i];
        ctx.beginPath();
        ctx.arc(
            arrow.x - sh[0], arrow.y - sh[1], arrow.size, 0, 2 * Math.PI,
            false);
        ctx.fill();
      }

      ctx.fillStyle = '#ca0303';
      for (let i = 0; i < bloodSize; i++) {
        const arrow = blood[i];
        //    ctx.beginPath();
        ctx.fillRect(
            arrow.x - sh[0], arrow.y - sh[1], arrow.width, arrow.height);
        // ctx.arc(arrow.x - sh[0], arrow.y - sh[1], 4, 0, 2 * Math.PI, false);
        // ctx.fill();
      }

      for (let i = dustSize - 1; i >= 0; i--) {
        if (time - dust[i].born > 800) {
          removeDust(i);
        }
      }

      for (let i = arrowSize - 1; i >= 0; i--) {
        if (time - arrows[i].born > 1500) {
          removeArrow(i, true);
        }
      }

      for (let i = bloodSize - 1; i >= 0; i--) {
        if (time - blood[i].born > 2500) {
          removeBlood(i);
        }
      }

      //  console.log(arrowSize);

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
        const chdist = disto(chdx, chdy);  // Math.sqrt(chdx*chdx + chdy*chdy);
        if (chdist > 2000) {
          if (!indic) {
            indic = [hero.x, hero.y];
          }
          ctx.beginPath();
          const ddd = 2000;
          const ix = hero.x + chdx / chdist * ddd - sh[0];
          const iy = hero.y + chdy / chdist * ddd - sh[1];
          indic[0] += (ix - indic[0]) * .1;
          indic[1] += (iy - indic[1]) * .1;
          const wiggle = 10;
          const wave = Math.sin(time / 200) * wiggle - 1;
          const ppx = Math.min(cvw - 80 + wave, Math.max(50 - wave, indic[0]));
          const ppy = Math.min(cvh - 80 + wave, Math.max(50 - wave, indic[1]));
          //  indicator
          ctx.arc(ppx, ppy, 20, 0, 2 * Math.PI);
          ctx.fill();
          ctx.fillText(`${Math.round(chdist / 100) - 10}`, ppx - 20, ppy + 50);
        }
      }

      // ctx.font = "28px serif";
      for (let b of bubbles) {
        // ctx.fillText("TESTING", 100, 100);
        const t = time - b.born;
        ctx.fillText(`+${b.bonus}🏵️`, b.x - sh[0], b.y - sh[1] - t / 50);
        if (t > 2000) {
          bubbles.delete(b);
        }
      }



      if (!health) {
        const deathTime = Math.min(.7, (gTime - hero.dead) / 3000);
        ctx.fillStyle = `rgb(200,0,0,${deathTime})`;
        ctx.fillRect(0, 0, cvw, cvh);
        ctx.fill();
      } else if (!inHut) {
        if (!locked) {
          headStart +=
              ((hero.dx * hero.archerOrientation < 0 ? 0 : hero.dx) / 2 +
               hero.archerOrientation - headStart) *
              .05;
          const dt = 20;
          sh[0] += dt / 20 * (hero.x - cvw / 2 - sh[0] + headStart * 80) * .1;
          sh[1] += dt / 20 * (hero.y - cvh / 2 - sh[1] + hero.dy * 50) * .1;
        } else {
          sh[0] = -cvw / 2;
          sh[1] = -cvh / 2;
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
        const dist = disto(arrow.dx, arrow.dy) +
            1;  // Math.sqrt(arrow.dx * arrow.dx + arrow.dy * arrow.dy) + 1;
        arrow.dy += .3;
        let di = arrowlen * arrdt / dist;
        arrow.x += arrow.dx * di;
        arrow.y += arrow.dy * di;
      }
    }

    function moveDust(dust) {
      for (let i = 0; i < dustSize; i++) {
        const arrow = dust[i];
        arrow.y += arrow.dy;
        arrow.size *= .995;
      }
    }

    function moveBlood(blood) {
      for (let i = 0; i < bloodSize; i++) {
        const arrow = blood[i];
        if (arrow.dx || arrow.dy) {
          arrow.y = Math.min(arrow.y + arrow.dy, arrow.ground);
          if (arrow.y < arrow.ground) {
            arrow.x += arrow.dx;
            arrow.dy += .15;
          } else {
            arrow.dx = 0;
            arrow.dy = 0;
            arrow.x -= arrow.width / 2;
            arrow.width *= 3;
            arrow.height /= 3;
          }
        }
      }
    }

    function drawGround() {
      const spacing = 200;
      ctx.strokeStyle = '#ab6'  //"#380";
      ctx.lineWidth = 2;

      ctx.beginPath();
      const cell = [Math.round(sh[0] / spacing), Math.round(sh[1] / spacing)];
      for (let y = -15; y < 15; y++) {
        for (let x = -20; x < 20; x++) {
          const xx = x + cell[0];
          const yy = y + cell[1];
          const diffx = Math.sin(xx * 123 + yy * 9991) +
              Math.sin(xx * 123 / 10 + yy * 9991 / 100) +
              Math.sin(xx * 123 / 10 + yy * 9991 / 100);
          const diffy = Math.cos(xx * 12331 + yy * 2221) +
              Math.cos(xx * 12331 / 10 + yy * 2221 / 10) +
              Math.cos(xx * 12331 / 100 + yy * 2221 / 100);
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
      // const cell = [Math.round(sh[0] / spacing), Math.round(sh[1] /
      // spacing)]; for (let y = -20; y < 20; y++) {
      //   for (let x = -20; x < 20; x++) {
      //     const xx = x + cell[0];
      //     const yy = y + cell[1];
      //     const diffx = Math.sin(xx *123 + yy * 9991);
      //     const diffy = Math.cos(xx *12331 + yy * 2221);
      //     const zx = diffx * 500;
      //     const zy = diffy * 200;
      //     ctx.moveTo(xx * spacing - sh[0] + zx, yy * spacing - sh[1] + shake
      //     + zy); ctx.lineTo(xx * spacing + diffx * 100 - sh[0] + zx - diffy *
      //     20, yy * spacing - sh[1] + shake + zy); ctx.lineTo(xx * spacing +
      //     diffx * 100 - sh[0] + zx, yy * spacing - sh[1] + shake + zy + 3);
      //   }
      // }
      // ctx.fill();
      window.showText = showText;
    }



    startGame();
  };

  //  Uncomment when released on AG.
  // addAG();

  window.addEventListener('load', () => {
    setTimeout(startTheGame, 1000);
  });
});  /// END
