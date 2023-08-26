echo "================================="
rm game.zip
uglifyjs --mangle toplevel  decode.js g.js -o release/gg.js
cp play.html release
cp rider.13k release
zip -vr game.zip release/ -x "*.DS_Store"
echo "=================================="
ls -lh game.zip
