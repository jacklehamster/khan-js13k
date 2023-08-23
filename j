let q=document.querySelector.bind(document);let c=q("canvas");let ctx=c.getContext("2d");let cs=c.style;c.width=1600;cs.width="800px";c.height=1e3;cs.height="500px";cs.border="1px solid black";const defaultprecision=10;const defaultrandomess=30;const thumby=document.body.appendChild(document.createElement("canvas"));thumby.style.position="absolute";thumby.style.width="80px";thumby.style.height="50px";thumby.width=320;thumby.height=200;thumby.style.backgroundColor="white";thumby.style.border="1px solid black";let lastFrame=-1;const mulDiv=thumby.width/c.width;function thumbLoop(time){thumby.style.top=c.offsetTop;thumby.style.left=c.offsetLeft+c.offsetWidth-thumby.offsetWidth;const frame=Math.floor(time/40)%Math.min(11,maxFrame());if(frame!==lastFrame){const ct=thumby.getContext("2d");ct.clearRect(0,0,ct.canvas.width,ct.canvas.height);shapes.forEach(shape=>{if(shape.hidden||(shape.anim??0)!==(root.anim??0)){return}const ll=reshape(shape.lines[frame]);if(ll){ct.fillStyle="black";ct.beginPath();ct.moveTo(ll[0]*mulDiv,ll[1]*mulDiv);for(let i=2;i<ll.length;i+=2){ct.lineTo(ll[i]*mulDiv,ll[i+1]*mulDiv)}ct.closePath();ct.fill()}})}requestAnimationFrame(thumbLoop)}requestAnimationFrame(thumbLoop);let root=JSON.parse(localStorage.getItem("root")??JSON.stringify(rider));root=decodeShape(encodeShape(root));let shapes=root.shapes;const tabs=document.body.insertBefore(document.createElement("div"),c);tabs.style.display="flex";tabs.style.flexDirection="row";refreshTabs();function refreshTabs(){tabs.textContent="";root.animations.forEach((anim,index)=>{const animIndex=root.anim??0;const tab=tabs.appendChild(document.createElement("div"));tab.textContent=`${anim}`;tab.style.backgroundColor=animIndex===index?"purple":"";tab.style.color=animIndex===index?"white":"";tab.style.cursor="pointer";tab.style.margin="2px";tab.style.borderRadius="20px";tab.style.padding="2px 20px";tab.addEventListener("click",()=>{root.anim=index;shapeId=shapeIds[root.anim??0];onAnimChange();findShape();onUpdatedShape();refreshTabs();onSlideChange()})})}function onAnimChange(){slide=Math.min(slide,maxFrame()-1);refreshFrameButtons()}function findShape(){if((root.shapes[shapeId].anim??0)===(root.anim??0)){return}let s=shapeId;do{s=(s-1+root.shapes.length)%root.shapes.length;const sh=root.shapes[s];if((sh.anim??0)===root.anim){shapeId=shapeIds[root.anim]=s;break}}while(s!==shapeId)}function reshape(lines,precision,randomess){const pre=precision??defaultprecision;return lines?.map(value=>(Math.random()-.5)*(randomess??defaultrandomess)+Math.round(value/pre)*pre)}ctx.lineWidth=2;const img=new Image;img.src="horse.jpg";function findNearestPointOnLine(px,py,ax,ay,bx,by){const atob={x:bx-ax,y:by-ay};const atop={x:px-ax,y:py-ay};const len=atob.x*atob.x+atob.y*atob.y;let dot=atop.x*atob.x+atop.y*atob.y;const t=Math.min(1,Math.max(0,dot/len));dot=(bx-ax)*(py-ay)-(by-ay)*(px-ax);return{x:ax+atob.x*t,y:ay+atob.y*t}}document.addEventListener("keydown",e=>{if(e.target.tagName==="INPUT"){return}if(e.key===" "){}if(e.key==="ArrowLeft"||e.key==="a"){slide=(slide-1+maxFrame())%maxFrame();onSlideChange()}if(e.key==="ArrowRight"||e.key==="d"){slide=(slide+1+maxFrame())%maxFrame();onSlideChange()}if(e.key==="ArrowUp"||e.key==="w"){shapeId=(shapeId-1+shapes.length)%shapes.length;onSlideChange()}if(e.key==="ArrowDown"||e.key==="s"){shapeId=(shapeId+1+shapes.length)%shapes.length;onSlideChange()}e.preventDefault()});let slide=0;let shapeId=0;const shapeIds=new Array(root.animations.length).fill(0);findShape();function onSlideChange(){shapeIds[root.anim]=shapeId;if(!shapes[shapeId].lines[slide]){shapes[shapeId].lines[slide]=JSON.parse(JSON.stringify(shapes[shapeId].lines[0]))}lines=shapes[shapeId].lines[slide];refreshThumb();onUpdatedShape()}function refreshThumb(){for(let i=0;i<maxFrame();i++){document.getElementById(`thumb-${i}`).disabled=slide===i}}let lines=shapes[shapeId].lines[slide];let attachedPoint=null;let anchor=null;document.addEventListener("mousedown",e=>{mouseX=e.pageX*2-12-c.offsetLeft;mouseY=e.pageY*2-34-c.offsetTop;anchor=[mouseX,mouseY];handleMouseDown();const close=closestPoint(mouseX,mouseY);if(close[2]<25){attachedPoint=close}else{const bp=bestPointOnLine(mouseX,mouseY);if(bp[2]<25){lines.splice(bp[3]+2,0,bp[0],bp[1]);attachedPoint=closestPoint(mouseX,mouseY)}}});document.addEventListener("mouseup",e=>{if(e.target===c){const close=closestPoint(mouseX,mouseY);if(close[2]<25){const bp=close[3];lines[bp]=mouseX;lines[bp+1]=mouseY;const bpol=bestPointOnLine(mouseX,mouseY,close[3]);if(bpol[2]<5){lines.splice(bp,2)}}else{}attachedPoint=null;colorIndex=-1;anchor=null;onUpdatedShape()}});function saveWork(){}function onUpdatedShape(){saveWork();shapeDiv.textContent="";shapes.forEach((shape,shapeIndex)=>{const{name,lines,hidden,anim}=shape;if((anim??0)!==(root.anim??0)){return}const group=shapeDiv.appendChild(document.createElement("div"));const input=group.appendChild(document.createElement("input"));input.value=name??"Unnamed";input.addEventListener("change",()=>{shape.name=input.value;saveWork()});group.style.padding="2px";group.style.border="1px solid silver";group.style.backgroundColor=shapeIndex===shapeId?"#ffc":"";const visBox=group.appendChild(document.createElement("input"));visBox.id=`vis_${shapeIndex}`;visBox.type="checkbox";const label=group.appendChild(document.createElement("label"));label.for=`vis_${shapeIndex}`;label.textContent="visible";visBox.checked=!hidden;visBox.addEventListener("click",()=>{shape.hidden=!visBox.checked;onUpdatedShape()});const dropdown=group.appendChild(document.createElement("select"));dropdown.style.marginLeft="10px";root.animations.forEach((animation,index)=>{const option=dropdown.appendChild(document.createElement("option"));option.value=index;option.textContent=animation});dropdown.addEventListener("change",()=>{shape.anim=parseInt(dropdown.value);if(!shape.anim){delete shape.anim}findShape();onUpdatedShape();onSlideChange()});dropdown.value=anim??0;const rrow=group.appendChild(document.createElement("div"));rrow.style.display="flex";rrow.style.flexDirection="row";rrow.style.opacity=hidden?.2:1;lines.forEach((ln,slideIndex)=>{const row=rrow.appendChild(document.createElement("div"));row.style.padding="2px";row.style.backgroundColor=shapeIndex===shapeId&&slide===slideIndex?"yellow":"";const can=row.appendChild(document.createElement("canvas"));can.width=160;can.height=100;can.style.width="60px";can.style.height="37px";can.style.border="1px solid black";can.style.cursor="pointer";const ct=can.getContext("2d");can.addEventListener("mousedown",()=>{slide=slideIndex;shapeId=shapeIndex;onSlideChange()});shapes.forEach((shap,sindex)=>{const ll=shap.lines[slideIndex];if(!ll){return}ct.fillStyle=shapeIndex===sindex?"red":"black";ct.beginPath();ct.moveTo(ll[0]/10,ll[1]/10);for(let i=2;i<ll.length;i+=2){ct.lineTo(ll[i]/10,ll[i+1]/10)}ct.closePath();ct.fill()})});const x=rrow.appendChild(document.createElement("div"));x.style.padding="5px 10px";x.style.margin="5px";x.style.backgroundColor="#ffeecc";x.style.color="red";x.style.cursor="pointer";x.textContent="x";x.style.display=shape.lines.length>1?"":"none";x.addEventListener("mousedown",()=>{shape.lines.pop();slide=Math.min(slide,shape.lines.length-1);refreshFrameButtons();onUpdatedShape();refreshTabs();onSlideChange()});const plus=rrow.appendChild(document.createElement("div"));plus.style.padding="5px 10px";plus.style.margin="5px";plus.style.backgroundColor="#cceeff";plus.style.color="blue";plus.style.cursor="pointer";plus.textContent="+";plus.addEventListener("mousedown",()=>{shapeId=shapeIndex;slide=shape.lines.length;shape.lines.push(JSON.parse(JSON.stringify(shape.lines[shape.lines.length-1])));refreshFrameButtons();onUpdatedShape();refreshTabs();onSlideChange()})});const addGroup=shapeDiv.appendChild(document.createElement("div"));addGroup.style.height="30px";addGroup.style.backgroundColor="#acf";addGroup.style.padding="2px";addGroup.style.margin="5px";addGroup.style.border="1px solid silver";addGroup.style.textAlign="center";addGroup.style.color="blue";addGroup.style.cursor="pointer";addGroup.textContent="Add shape";addGroup.addEventListener("click",()=>{shapes.push({name:"Unnamed",lines:[[0,0,100,100,200,100,200,200]],anim:root.anim});shapeId=shapes.length-1;slide=0;onUpdatedShape();onSlideChange()})}let mouseX=0,mouseY=0;document.addEventListener("mousemove",e=>{mouseX=e.pageX*2-12-c.offsetLeft;mouseY=e.pageY*2-34-c.offsetTop;if(e.buttons){handleMouseDown()}else{anchor=null}});let colorIndex=-1;function handleMouseDown(){const px=mouseX-anchor[0];const py=mouseY-anchor[1];colorIndex=-1;const close=attachedPoint;if(close&&(close[2]<25||close===attachedPoint)){const bp=close[3];lines[bp]=mouseX;lines[bp+1]=mouseY;const bpol=bestPointOnLine(mouseX,mouseY,close[3]);if(bpol[2]<5){colorIndex=bpol[3]}}else{}}const div=document.body.appendChild(document.createElement("div"));const shapeDiv=document.body.appendChild(document.createElement("div"));function maxFrame(){let topFrame=0;for(let i=0;i<root.shapes.length;i++){const shape=root.shapes[i];if((shape.anim??0)!==(root.anim??0)){continue}topFrame=Math.max(topFrame,shape.lines.length)}return topFrame}const buttonsDiv=div.appendChild(document.createElement("div"));function refreshFrameButtons(){buttonsDiv.textContent="";for(let i=0;i<maxFrame();i++){const button=buttonsDiv.appendChild(document.createElement("button"));button.textContent=i;button.id=`thumb-${i}`;const index=i;button.addEventListener("click",()=>{slide=index;onSlideChange()})}}refreshFrameButtons();onSlideChange();const a=[0,0];const d=[0,0];const k=[500,500];let sh=[0,0];const keys={};const followers=[];function closestPoint(x,y){let bestDist=Number.MAX_SAFE_INTEGER;let bestPoint=[lines[0],lines[1],bestDist,0];for(let i=0;i<lines.length;i+=2){const dx=lines[i]-x;const dy=lines[i+1]-y;const dist=Math.sqrt(dx*dx+dy*dy);if(dist<bestDist){bestDist=dist;bestPoint=[lines[i],lines[i+1],bestDist,i]}}return bestPoint}const ll=[];function bestPointOnLine(x,y,ignoreIndex){ll.length=0;for(let i=0;i<lines.length;i+=2){if(i!==ignoreIndex){ll.push(lines[i],lines[i+1])}}let bestDist=Number.MAX_SAFE_INTEGER;let bestPoint=[ll[0],ll[1],bestDist,0];for(let i=0;i<ll.length-2;i+=2){const pp=findNearestPointOnLine(mouseX,mouseY,ll[i],ll[i+1],ll[i+2],ll[i+3]);const dx=pp.x-x;const dy=pp.y-y;const dist=Math.sqrt(dx*dx+dy*dy);if(dist<bestDist){bestDist=dist;bestPoint=[pp.x,pp.y,bestDist,i>=ignoreIndex?i+2:i]}}return bestPoint}function loop(now){requestAnimationFrame(loop);ctx.clearRect(0,0,c.width,c.height);const imgW=104,imgH=68;const sx=slide%4*imgW;const sy=Math.floor(slide/4)*imgH;ctx.drawImage(img,sx,sy,imgW,imgH,0,0,1600,900);ctx.fillStyle="rgba(255, 255, 255, 0.8)";ctx.fillRect(0,0,c.width,c.height);ctx.fillStyle="rgba(0, 0, 0, 0.3)";ctx.strokeStyle="black";ctx.beginPath();ctx.moveTo(lines[0],lines[1]);for(let i=2;i<lines.length;i+=2){ctx.lineTo(lines[i],lines[i+1])}ctx.stroke();ctx.fill();if(colorIndex>=0){ctx.strokeStyle="blue";ctx.beginPath();ctx.moveTo(lines[colorIndex],lines[colorIndex+1]);ctx.lineTo(lines[colorIndex+2],lines[colorIndex+3]);ctx.lineTo(lines[colorIndex+4],lines[colorIndex+5]);ctx.stroke()}ctx.strokeStyle="black";const p=closestPoint(mouseX,mouseY);if(p[2]<25){if(colorIndex<0){ctx.beginPath();ctx.arc(p[0],p[1],10,0,2*Math.PI);ctx.stroke()}}else{const bp=bestPointOnLine(mouseX,mouseY);if(bp[2]<25){ctx.beginPath();ctx.moveTo(bp[0],bp[1]);ctx.lineTo(mouseX,mouseY);ctx.moveTo(bp[0],bp[1]);ctx.arc(bp[0],bp[1],5,0,2*Math.PI);ctx.stroke()}}ctx.fillStyle="black";ctx.font="24px serif";for(let i=0;i<lines.length;i+=2){ctx.fillText(`${i/2+1}`,lines[i],lines[i+1]);ctx.beginPath();ctx.arc(lines[i],lines[i+1],3,0,2*Math.PI);ctx.stroke()}return;a[0]=0;a[1]=0;for(let ke in keys){switch(ke){case"w":a[1]--;break;case"s":a[1]++;break;case"a":a[0]--;break;case"d":a[0]++;break}}const acc=1;const speed=2;const dd=Math.sqrt(a[0]*a[0]+a[1]*a[1]);if(dd){d[0]+=a[0]*acc/dd;d[1]+=a[1]*acc/dd}k[0]+=d[0]*speed;k[1]+=d[1]*speed;const brk=.8;d[0]*=brk;d[1]*=brk;const radius=200*Math.sqrt(followers.length/10);followers.forEach(f=>{const ddx=f.x-k[0];const ddy=f.y-k[1];if(ddx*ddx+ddy*ddy>radius*radius||f.shift){if(!f.shift){const close=.5;for(let i=0;i<5;i++){const rat=.2;const anotherF=followers[Math.floor(Math.random()*followers.length)];const theX=k[0]*rat+anotherF.x*(1-rat);const theY=k[1]*rat+anotherF.y*(1-rat);f.shift=[k[0]*close+f.x*(1-close)+Math.random()*radius*2-radius,k[1]*close+f.y*(1-close)+Math.random()*radius*2-radius]}}const destX=f.shift[0]-f.x;const destY=f.shift[1]-f.y;const dist=Math.sqrt(destX*destX+destY*destY);if(dist*dist>.01){const far=Math.min(15,dist);f.mx+=destX/dist;f.my+=destY/dist;const slow=.5;f.mx*=slow;f.my*=slow;f.x+=f.mx*far;f.y+=f.my*far}else{f.shift=null}}});sh[0]+=(k[0]-500-sh[0])*.3;sh[1]+=(k[1]-500-sh[1])*.3;ctx.clearRect(0,0,1e3,1e3);ctx.beginPath();ctx.arc(k[0]-sh[0],k[1]-sh[1],30,0,2*Math.PI);ctx.arc(k[0]-sh[0],k[1]-sh[1],25,0,2*Math.PI);ctx.stroke();followers.forEach(({x,y})=>{ctx.beginPath();ctx.arc(x-sh[0],y-sh[1],25,0,2*Math.PI);ctx.stroke()});ctx.stroke();const spacing=200;ctx.beginPath();const cell=[Math.round(sh[0]/spacing),Math.round(sh[1]/spacing)];for(let y=-8;y<8;y++){for(let x=-8;x<8;x++){const xx=x+cell[0];const yy=y+cell[1];const diffx=Math.sin(xx*123+yy*9991);const diffy=Math.cos(xx*12331+yy*2221);const zx=diffx*500;const zy=diffy*200;ctx.moveTo(xx*spacing-sh[0]+zx,yy*spacing-sh[1]+zy);ctx.lineTo(xx*spacing+diffx*100-sh[0]+zx,yy*spacing-sh[1]+zy+3);ctx.lineTo(xx*spacing+diffx*100-sh[0]+zx+diffy*100,yy*spacing-sh[1]+zy)}}ctx.stroke()}loop(0);document.addEventListener("keyup",e=>{delete keys[e.key]});document.addEventListener("keydown",e=>{keys[e.key]=true;if(e.key==="f"){followers.push({x:Math.random()*1e3+sh[0],y:Math.random()*1e3+sh[1],mx:0,my:0})}});function penTo(x,y,current,points){let dx=x-current[0];let dy=y-current[1];const excess=Math.max(Math.abs(dx-.5),Math.abs(dy-.5));if(excess>7.5){dx=Math.round(dx/excess*7);dy=Math.round(dy/excess*7)}if(dx<-7||dx>8||dy<-7||dy>8){console.error("Data outside of range",excess,dx,dy)}points.push(dx+7,dy+7);current[0]+=dx;current[1]+=dy;if(current[0]!==x||current[1]!==y){penTo(x,y,current,points)}}function encodeLine(line,result){const l=reshape(line,defaultprecision,0).map(value=>value/defaultprecision);const series=result;const current=[0,0];penTo(l[0],l[1],current,series);series.push(7,7);for(let i=2;i<l.length;i+=2){penTo(l[i],l[i+1],current,series)}series.push(7,7)}function decodeLine(result){const line=[0,0];let x=0,y=0;do{x=result.pop()-7;y=result.pop()-7;line[0]+=x;line[1]+=y}while(x||y);let prex,prey;do{x=result.pop()-7;y=result.pop()-7;if(x||y){const ratio1=prex*y;const ratio2=prey*x;if(Math.abs(ratio1-ratio2)<5){line[line.length-2]+=x;line[line.length-1]+=y}else{line.push(line[line.length-2]+x,line[line.length-1]+y)}prex=x;prey=y}}while(x||y);return line}function encodeLines(lines,result){result.push(lines.length);lines.forEach(line=>{encodeLine(line,result)})}function decodeLines(result){const lines=new Array(result.pop());for(let i=0;i<lines.length;i++){lines[i]=decodeLine(result).map(value=>value*defaultprecision)}return lines}function encodeString(str,result){result.push(str.length);for(let i=0;i<str.length;i++){const ch=str.charCodeAt(i);result.push(ch%16);result.push((ch>>4)%16)}}function decodeString(result){const len=result.pop();const array=[];for(let j=0;j<len;j++){const ch=result.pop()+(result.pop()<<4);array.push(String.fromCharCode(ch))}return array.join("")}function encodeShapes(shapes,result){result.push(shapes.length);shapes.forEach(shape=>{encodeString(shape.name,result);encodeLines(shape.lines,result);result.push(shape.anim??0);result.push(shape.hidden?1:0)})}function decodeShapes(result){const shapes=new Array(result.pop());for(let i=0;i<shapes.length;i++){shapes[i]={};shapes[i].name=decodeString(result);shapes[i].lines=decodeLines(result);shapes[i].anim=result.pop();const p=result.pop();shapes[i].hidden=p===1}return shapes}function encodeAnimations(animations,result){result.push(animations.length);animations.forEach(animation=>{encodeString(animation,result)})}function decodeAnimations(result){const animations=new Array(result.pop());for(let i=0;i<animations.length;i++){animations[i]=decodeString(result)}return animations}function encodeShape(root){const result=[];encodeAnimations(root.animations,result);encodeShapes(root.shapes,result);result.forEach(a=>{if(a<0||a>=16){console.error(a)}});const reduced=reduce(result);console.log(reduced);return reduced}function decodeShape(reduced){const result=expand(reduced);const root={};result.reverse();root.animations=decodeAnimations(result);root.shapes=decodeShapes(result);return root}function reduce(series){const reduced=new Array(Math.ceil(series.length/2));for(let i=0;i<reduced.length;i++){reduced[i]=(series[i*2]??0)+(series[i*2+1]??0)*16}return reduced}function expand(series){const expanded=new Array(Math.ceil(series.length*2));for(let i=0;i<series.length;i++){expanded[i*2]=series[i]%16;expanded[i*2+1]=(series[i]>>4)%16}return expanded}
