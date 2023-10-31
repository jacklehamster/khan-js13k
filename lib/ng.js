

const globalData = {
  config: {
    "newgrounds": {
      "game": "The Terror of Mongolia",
      "url": "https://www.newgrounds.com/projects/games/5154237/preview",
      "key": "57201:pZmbwnHM",
      "skey": "eRLTKKAFdEaIMDnVcaKg5Q=="
    },
  },
}

class Ng {
  //  Dummy.
}

window.addEventListener("DOMContentLoaded", () => {
  function getMedal(medal_name, callback) {
    unlockMedal(ngio, medal_name, (medal, unlocked) => {
      if (unlocked) {
        console.log("Unlock:" + medal.name);
        showReceivedMedal(medal);
        //audio.play();
        if (callback) {
          callback(medal.name);
        }
      }
    });
  }
  window.getMedal = getMedal;

  function postScore(score, boardname, callback) {
    postNGScore(ngio, score, boardname, (result) => {
      console.log("post score result: ", result);
      if (callback) {
        callback(result);
      }
    });
  }
  window.postScore = postScore;

  const { config } = globalData;
  const { key, skey } = config.newgrounds;
  if (!key || !skey) {
    console.warn("No newgrounds key or skey configured.");
    return;
  }
  const ngio = new Newgrounds.io.core(key, skey);
  const audio = new Audio("ng-sound.ogg");
  const audioOut = new Audio("ng-sound-out.ogg");

  function onLoggedIn() {
    console.log(
      "Welcome %c  ",
      `font-size:25px;`,
      ngio.user.name + "!",
    );
    // console.log(ngio.user.icons.small);
    // const button = document.body.appendChild(document.createElement('button'));
    // button.classList.add('button');
    // button.innerText = "lock medals";
    // button.addEventListener('click', e => {
    //  fetchMedals(ngio, medals => {
    //      medals.forEach(medal => medal.unlocked = false);
    //      console.log(medals);
    //  })
    // });
    // Game.onTrigger(action => {
    //  unlockMedal(ngio, action.medal, medal => console.log(medal.name, 'unlocked'));
    // });
    fetchMedals(ngio, () => {
      // do nothing
    });
    fetchScoreboards(ngio, () => {
      // do nothing
    });
  }

  function onLoginFailed() {
    console.log("There was a problem logging in: ".ngio?.login_error?.message);
    const button = document.getElementById("newgrounds-login");
    if (button) {
      button.style.display = "";
    }
  }

  function onLoginCancelled() {
    console.log("The user cancelled the login.");
    const button = document.getElementById("newgrounds-login");
    if (button) {
      button.style.display = "";
    }
  }

  /*
   * Before we do anything, we need to get a valid Passport session.  If the player
   * has previously logged in and selected 'remember me', we may have a valid session
   * already saved locally.
   */
  function initSession() {
    ngio.getValidSession(function () {
      const button = document.body.appendChild(document.createElement("button"));
      button.id = "newgrounds-login";
      button.style.display = window.engine?.debug ? "" : "none";
      button.style.position = "absolute";
      button.style.top = "5px";
      button.style.right = "5px";
      button.style.height = "24px";
      button.style.fontSize = "10pt";
      button.style.zIndex = 1000;
      button.classList.add("button");
      button.innerText = "login newgrounds";
      button.addEventListener("click", (e) => {
        requestLogin();
        e.stopPropagation();
      });

      if (ngio.user) {
        button.style.display = "none";
        onLoggedIn();
      } else {
        // console.log("Not logged in Newgrounds.");
      }
    });
  }

  /*
   * Call this when the user clicks a 'sign in' button from your game.  It MUST be called from
   * a mouse-click event or pop-up blockers will prevent the Newgrounds Passport page from loading.
   */
  function requestLogin() {
    ngio.requestLogin(onLoggedIn, onLoginFailed, onLoginCancelled);
    /* you should also draw a 'cancel login' buton here */
    const button = document.getElementById("newgrounds-login");
    if (button) {
      button.style.display = "none";
    }
  }

  /*
   * Call this when the user clicks a 'cancel login' button from your game.
   */
  function cancelLogin() {
    /*
     * This cancels the login request made in the previous function.
     * This will also trigger your onLoginCancelled callback.
     */
    ngio.cancelLoginRequest();
  }

  /*
   * If your user is logged in, you should also draw a 'sign out' button for them
   * and have it call this.
   */
  function logOut() {
    ngio.logOut(function () {
      /*
       * Because we have to log the player out on the server, you will want
       * to handle any post-logout stuff in this function, wich fires after
       * the server has responded.
       */
    });
  }

  initSession();

  let medals = null;
  let medalCallbacks = null;
  function fetchMedals(ngio, callback) {
    if (medals) {
      callback?.(medals);
    } else if (medalCallbacks) {
      medalCallbacks.push(callback);
    } else {
      medalCallbacks = [callback];
      ngio.callComponent("Medal.getList", {}, (result) => {
        if (result.success) {
          medals = result.medals;
          const style = "font-weight: bold;";
          console.log(
            "%c Unlocked:",
            style,
            medals
              .filter(({ unlocked }) => unlocked)
              .map(({ name }) => name)
              .join(", "),
          );
          console.log(
            "%c Locked:",
            style,
            medals
              .filter(({ unlocked }) => !unlocked)
              .map(({ name }) => name)
              .join(", "),
          );
          medalCallbacks.forEach((callback) => callback?.(medals));
          medalCallbacks = null;
        }
      });
    }
  }

  const medalDiv = document.body.appendChild(document.createElement("div"));
  medalDiv.style.display = "none";
  medalDiv.style.position = "absolute";
  medalDiv.style.right = "10px";
  medalDiv.style.top = "10px";
  medalDiv.style.padding = "5px 10px";
  medalDiv.style.border = "2px solid #880";
  medalDiv.style.backgroundColor = "#553";
  medalDiv.style.boxShadow = "2px 2px black";
  medalDiv.style.flexDirection = "row";
  medalDiv.style.transition = "opacity .5s, margin-right .3s";
  medalDiv.style.opacity = 0;
  medalDiv.style.marginRight = "-300px";
  medalDiv.style.zIndex = 3000;
  let medalTimeout = 0;
  function showReceivedMedal(medal) {
    clearTimeout(medalTimeout);
    medalDiv.style.display = "flex";
    medalDiv.innerText = "";
    const img = medalDiv.appendChild(document.createElement("img"));
    img.addEventListener("load", () => {
      medalDiv.style.display = "flex";
      medalDiv.style.opacity = 1;
      medalDiv.style.marginRight = 0;
      if (!window.mute) {
        audio.play();
      }
      medalTimeout = setTimeout(() => {
        if (!window.mute) {
          audioOut.play();
        }
        medalDiv.style.opacity = 0;
        medalTimeout = setTimeout(() => {
          medalDiv.style.display = "none";
          medalDiv.style.marginRight = "-300px";
        }, 1000);
  
      }, 5000);
    });
    img.style.width = "50px";
    img.style.height = "50px";
    img.src = medal.icon;

    const divDetails = medalDiv.appendChild(document.createElement("div"));
    divDetails.style.marginLeft = "5px";

    const divText = divDetails.appendChild(document.createElement("div"));
    divText.style.fontWeight = "bold";
    divText.style.fontSize = "12pt";
    divText.style.color = "gold";
    divText.style.margin = "5px";
    divText.innerText = `🏆 ${medal.name}`;

    const divDesc = divDetails.appendChild(document.createElement("div"));
    divDesc.style.fontSize = "10pt";
    divDesc.style.color = "silver";
    divDesc.innerText = medal.description;
  }
  window.showReceivedMedal = showReceivedMedal;

  function getMedals(callback) {
    fetchMedals(ngio, callback)
  }
//  window.getMedals = getMedals;

  function getScores(callback) {
    fetchScoreboards(ngio, callback);
  }
  window.getScores = getScores;

  let scoreboards = null;
  let scoreBoardsCallback = null;
  function fetchScoreboards(ngio, callback) {
    if (scoreboards) {
      callback?.(scoreboards);
    } else if (scoreBoardsCallback) {
      scoreBoardsCallback.push(callback);
    } else {
      scoreBoardsCallback = [callback];
      ngio.callComponent("ScoreBoard.getBoards", {}, (result) => {
        if (result.success) {
          scoreboards = result.scoreboards;
          scoreboards.forEach((scoreboard) => console.log("Scoreboard:", scoreboard.name, scoreboard.id));
          scoreBoardsCallback.forEach((callback) => callback?.(scoreboards));
          scoreBoardsCallback = null;
        }
      });
    }
  }

  function postNGScore(ngio, value, boardname, callback) {
    fetchScoreboards(ngio, (scoreboards) => {
      const scoreboard = boardname ? scoreboards.find(board => board.name === boardname) : scoreboards[0];
      ngio.callComponent("ScoreBoard.postScore", { id: scoreboard.id, value }, callback);
    });
  }

  const cacheUnlocked = {};
  function unlockMedal(ngio, medal_name, callback) {
    console.log("unlocking", medal_name, "for", ngio.user);
    /* If there is no user attached to our ngio object, it means the user isn't logged in and we can't unlock anything */
    if (!ngio.user) return;
    fetchMedals(ngio, (medals) => {
      const medal = medals.filter((medal) => medal.name === medal_name)[0];
      if (medal) {
        if (!medal.unlocked && !cacheUnlocked[medal.id]) {
          ngio.callComponent("Medal.unlock", { id: medal.id }, (result) => {
            cacheUnlocked[medal.id] = true;
            if (callback) callback(result.medal, true);
          });
        } else {
          if (callback) callback(medal, false);
        }
      } else {
        console.warn(`Medal doesn't exist: ${medal_name}`);
      }
    });
  }
});
