# Soundbox songs created for JS13k

## Demo

https://jacklehamster.github.io/khan-js13k/sound/demo.html

## Setup

```html
    <script src=sound/fur-elise.js></script>
    <script src=sound/wild-horde.js></script>
    <script src=sound/soundbox.js></script>
    <script src=sound/song.js></script>
```

## To play a song:

### Wild Horde
```javascript
const song = new Song(wildHorde);
//  Then later...
song.play();
song.stop();
```

### Fur Elise
```javascript
const song = new Song(furElise);
//  Then later...
song.play();
song.stop();
```

## Files needed:
- soundbox.js
- song.js
- fur-elise.js / wild-horde.js

## Editing

The songs were produced using https://sb.bitsnbites.eu/. To edit a song, just drag the sbox file in there.

Then save as JavaScript.

## Credits

- The songs are covers of Ennio Moricone's work. (So they likely can't be used commercially).
- The program used to develop all songs and the player are from: https://sb.bitsnbites.eu/
    Note: soundbox.js is grabbed from https://gitlab.com/mbitsnbites/soundbox/-/blob/master/player-small.js
