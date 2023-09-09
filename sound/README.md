# Setup

```
    <script src=sound/fur-elise.js></script>
    <script src=sound/wild-horde.js></script>
    <script src=sound/soundbox.js></script>
    <script src=sound/song.js></script>
```

# To play a song:

## Wild Horde
```javascript
const song = new Song(wildHorde);
song.prepare();
//  Then later...
song.play();
song.stop();
```

## Fur Elise
```javascript
const song = new Song(furElise);
song.prepare();
//  Then later...
song.play();
song.stop();
```

# Files needed:
- soundbox.js
- song.js
- fur-elise.js / wild-horde.js

# Editing

The songs were produced using https://sb.bitsnbites.eu/. To edit a song, just drag the sbox file in there.

# Credits

The songs are covers of Ennio Moricone's work. (So they likely can't be used commercially).
