echo "================================="
rm -rf release
mkdir release

rm -rf game.zip
# rm -rf temp/rrg.js
# rm -rf temp/rrd.js
# rm -rf temp/rrs.js
# npx roadroller g.js -o temp/rrg.js
# npx roadroller decode.js -o temp/rrd.js
# npx roadroller sound/soundbox.js -o temp/rrs.js
# uglifyjs --mangle toplevel temp/rrg.js temp/rrd.js temp/rrs.js -o release/gg.js

uglifyjs --mangle toplevel g.js decode.js sound/soundbox.js -o release/gg.js
cp play.html release
cp rider.13k release
cp sound/fur-elise.sbox release
cp sound/wild-horde.sbox release
zip -vr game.zip release/ -x "*.DS_Store"
echo "=================================="
ls -lh game.zip
