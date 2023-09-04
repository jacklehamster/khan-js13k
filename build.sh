echo "================================="
rm game.zip
uglifyjs --mangle toplevel  decode.js g.js sound/soundbox.js -o release/gg.js
cp play.html release
cp rider.13k release
cp sound/fur-elise.sbox
cp sound/wild-horde.sbox
zip -vr game.zip release/ -x "*.DS_Store"
echo "=================================="
ls -lh game.zip
