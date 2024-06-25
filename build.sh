echo "================================="
rm -rf release
mkdir release
mkdir -p release/logo

rm -rf game.zip

uglifyjs --mangle toplevel external/newgrounds/newgroundsio.min.js lib/ng.js ZzFXMicro.min.js rider.js decode.js sound/soundbox.js sound/wild-horde.js sound/fur-elise.js sound/song.js g.js -o release/gg.js

rm -rf temp/gg.js
mv release/gg.js temp
npx roadroller temp/gg.js -o release/gg.js

cp play.html release/index.html
cp game.css release
cp rider.13k release
cp gamefont.woff2 release
cp khan.png release
cp logo/*.* release/logo
cp ng-sound.ogg release
cp ng-sound-out.ogg release

echo "window.portal='';" > "release/portal.js"
zip -vr game.zip release/ -x "*.DS_Store"

echo "window.portal='newgrounds';" > "release/portal.js"
zip -vr game-newgrounds.zip release/ -x "*.DS_Store"

echo "window.portal='arcadia';" > "release/portal.js"
zip -vr game-arcadia.zip release/ -x "*.DS_Store"


echo "=================================="
echo "Max: 13,312b"
wc -c  game.zip
