function i(t){const n=new Array(Math.ceil(t.length*2));for(let e=0;e<t.length;e++){n[e*2]=t[e]%16;n[e*2+1]=(t[e]>>4)%16}return n}function a(e){const t=[0,0];let n=0,o=0;do{n=e.pop()-7;o=e.pop()-7;t[0]+=n;t[1]+=o}while(n||o);let r,i;do{n=e.pop()-7;o=e.pop()-7;if(n||o){const a=r*o;const s=i*n;if(Math.abs(a-s)<5){t[t.length-2]+=n;t[t.length-1]+=o}else{t.push(t[t.length-2]+n,t[t.length-1]+o)}r=n;i=o}}while(n||o);return t}function b(t,n){const o=new Array(t.pop());for(let e=0;e<o.length;e++){o[e]=a(t).map(e=>e*n)}return o}function w(t){const n=t.pop();const o=[];for(let e=0;e<n;e++){const r=t.pop()+(t.pop()<<4);o.push(String.fromCharCode(r))}return o.join("")}function v(t,n){const o=new Array(t.pop());for(let e=0;e<o.length;e++){o[e]={};o[e].name=w(t);o[e].lines=b(t,n);o[e].anim=t.pop();const r=t.pop();o[e].hidden=r===1}return o}function S(t){const n=new Array(t.pop());for(let e=0;e<n.length;e++){n[e]=w(t)}return n}function K(e){const t=i(e);const n={};t.reverse();const o=t.pop();n.animations=S(t);n.shapes=v(t,o);return n}let j=document.querySelector.bind(document);let $=j("canvas");let A=$.getContext("2d");let h=$.style;$.width=2e3;h.width=`${$.width/2}px`;$.height=1200;h.height=`${$.height/2}px`;h.border="1px solid black";h.backgroundColor="#efd";h.transition="background-color 0.5s";const l=.75;const n={};document.addEventListener("keyup",e=>{delete n[e.code]});document.addEventListener("keydown",e=>{n[e.code]=true;e.preventDefault()});const s=[];const C=[0,0];const k={speedWhileShooting:2,speed:2,maxHealth:2,shield:0,quickShot:1,money:2};const d=6;let f=d;const e=document.body.appendChild(document.createElement("div"));e.style.position="absolute";e.style.top="10px";e.style.left="10px";function u(){const t=d+k.maxHealth*2;let n="";for(let e=0;e<Math.floor(f/2);e++){n+="❤️"}if(f%2){n+="❤️‍🩹"}for(let e=Math.ceil(f/2);e<t/2;e++){n+="🩶"}e.innerText=n}let E=0;const t=document.body.appendChild(document.createElement("div"));t.style.position="absolute";t.style.top="30px";t.style.left="10px";function O(){t.textContent=!E?"":`⭐ ${E}`}const o=document.body.appendChild(document.createElement("div"));o.style.position="absolute";o.style.top="50px";o.style.left="10px";o.style.color="snow";o.textContent="Press ESC to continue";o.style.display="none";function _(){o.style.display=""}function G(e){const t=[];const n=new XMLHttpRequest;n.open("GET",e,false);n.overrideMimeType("text/plain; charset=x-user-defined");n.send(null);if(n.status===200){for(let e=0;e<n.responseText.length;++e){t.push(n.responseText.charCodeAt(e)&255)}}return t}let c=true;window.addEventListener("blur",function(e){c=false},false);window.addEventListener("focus",function(e){c=true},false);let T;document.addEventListener("DOMContentLoaded",()=>{const e=G("rider.13k");T=K(e);console.log(T);ce(0)});const U=1600;const z=1e3;let B=5;function J(n,o,r,i,a,s,d,e,l,c,t){const h=i/U;const f=a/z;n.fillStyle=e??"black";T.shapes.forEach(e=>{if(e.hidden||e.anim!==d){return}const t=e.lines[s%e.lines.length];if(t){n.beginPath();N(n,o,r,t[0]*h,t[1]*f,false,i,a,l,c);for(let e=2;e<t.length;e+=2){N(n,o,r,t[e]*h,t[e+1]*f,true,i,a,l,c)}n.closePath()}n.fill()})}function N(e,t,n,o,r,i,a,s,d,l){if(i){e.lineTo(t+o,n+r+(o/a-.5)*15*d+l*(Math.random()-.5))}else{e.moveTo(t+o,n+r+(o/a-.5)*15*d+l*(Math.random()-.5))}}const Q=.5;function V(e){F[e].x=F[q-1].x;F[e].y=F[q-1].y;F[e].dx=F[q-1].dx;F[e].dy=F[q-1].dy;F[e].born=F[q-1].born;q--}let q=0;const F=[];function Z(e){const{x:t,y:n,dx:o,dy:r,archerOrientation:i}=e;if(q>=F.length){F.push({})}F[q].dx=i*120+o*2;F[q].dy=-5+r*10;F[q].x=t+F[q].dx;F[q].y=n-80*l;F[q].born=e.time;q++}function ee(e){const t=e.dt/20;const n=H(e.ax,e);const o=H(e.ay,e);const r=Math.sqrt(n*n+o*o);if(n!==0){e.orientation=n}const i=H(e.speed,e)*(e.dead?2:1)*(e.superSoldier&&e.soldier?.7:1);const a=e.brake;if(r){e.dx=(e.dx+n/r*i)*a;e.dy=(e.dy+o/r*i/2)*a}else{e.dx=e.dx*a;e.dy=e.dy*a}if(H(e.moving,e)){e.x+=e.dx*t;e.y+=e.dy*t}const s=Math.sqrt(e.dx*e.dx+e.dy*e.dy);e.horseFrame+=t*Math.max(.08,s/50)}function te(e){I.x=e.x;I.y=e.y+200;I.dx=0;I.dy=0;D(R).closed=true;R=null}const P={parent:true,time:0,nextShot:0,process:e=>{if(!e.parent){return}if(R){if(n.Escape){te(R);o.style.display="none"}else{return}}if(!f){if(n.Escape){f=d+k.maxHealth*2;E=0;I.dead=0;o.style.display="none";O();u()}}if(!f&&e.hero){return}ee(e);const t=H(e.shooting,e);if(!t){e.archerOrientation=e.orientation}else{if(e.time>e.nextShot){Z(e);e.nextShot=e.time+H(e.shootPeriod,e)}}},shootPeriod:300,archerOrientation:1,orientation:1,direction:undefined,brake:.99,speed:e=>H(e.shooting,e)?.03+k.speedWhileShooting*.02:.05+k.speed*.03,x:300,y:500,moving:e=>Math.abs(e.dx)>Q||Math.abs(e.dy)>Q,shooting:()=>n.Space,ax:()=>(n.KeyA||n.ArrowLeft?-1:0)+(n.KeyD||n.ArrowRight?1:0),ay:()=>(n.KeyW||n.ArrowUp?-1:0)+(n.KeyS||n.ArrowDown?1:0),dx:0,dy:0,width:250*l,height:200*l,hotspot:undefined,born:0,animation:undefined,range:undefined,color:undefined,horseFrame:0,random:0,riderAnimation:"archer",layer:0,hidden:false,tree:false,cache:false,sprites:[e=>H({...e,y:e=>H(e.y,e)-.1,parent:false,sprites:undefined,animation:e=>H(e.riderAnimation,e),range:e=>H(e.rangeOverride,e)??(H(e.shooting,e)?[0,3]:[0]),hotspot:[e=>H(e.moving,e)?.5-e.orientation*H(e.archerOrientation,e)*.05:.53,e=>H(e.moving,e)?.65+Math.sin(e.horseFrame*.7)/100:.7],color:e=>H(e.foeColor,e)??(e.corpse?e.color:e.hill?"#af8":e.tree?"#270":"black"),direction:e=>Math.sign(H(e.archerOrientation,e)),frame:e=>H(e.horseFrame,e),random:4,hidden:e=>e.dead},e),e=>H({...e,y:e=>H(e.y,e),parent:false,sprites:undefined,animation:e=>e.hill?"hut":"horse",range:e=>e.hill?[0]:H(e.moving,e)?[0,10]:[11],hotspot:[.47,.72],color:e=>e.hill&&D(e).closed?"#ba6":e.superSoldier?"#a08":e.foe?"#004":"#630",direction:e=>Math.sign(e.orientation),frame:e=>H(e.horseFrame,e),random:e=>e.superSoldier?100:4,hidden:e=>e.tree&&!e.hill||e.corpse||e.soldier},e),e=>H({...e,y:e=>H(e.y,e)+1,parent:false,sprites:undefined,animation:"shield",range:[0],hotspot:[.47,.72],color:()=>k.shield>1?"gold":"#69f",direction:e=>Math.sign(e.orientation),frame:e=>0,hidden:e=>e.foe||e.corpse||e.soldier||!k.shield},e),e=>H({...e,layer:-2,parent:false,sprites:undefined,animation:e=>e.soldier?"soldier":e.corpse?"dead":e.hill?"hill":e.tree?"tree":"horse",range:e=>e.corpse?H(e.rangeOverride,e):e.tree?[0]:H(e.moving,e)?[0,10]:[11],hotspot:e=>e.tree?[.53,1]:[.47,.72],color:"#999",direction:e=>Math.sign(e.orientation),height:-50,frame:e=>H(e.horseFrame,e),hidden:e=>e.dead&&e.soldier},e)]};function H(t,n){if(typeof t==="object"){if(Array.isArray(t)){return t.map(e=>H(e,n))}else{const o={};for(let e in t){o[e]=H(t[e],n)}return o}}return typeof t==="function"?t(n):t}function y(e,v,t,S){e.dt=t;e.time=v;const n=H(e.sprites,e);n.forEach(e=>{const{x:t,y:n,width:o,height:r,hotspot:i,foeIndex:a,dead:s,color:d,foeColor:l,superSoldier:c,hidden:h,tree:f}=e;if(h||R&&!f){return}const u=t-i[0]*o-C[0];const y=n-i[1]*r-C[1];const m=u+o;const p=y+r;if(m<0||p<0||u>$.width||y>$.height){return}if(a!==undefined&&!s){for(let e=q-1;e>=0;e--){const x=F[e];if(x.x-C[0]>u&&x.x-C[0]<m&&x.y-C[1]>y&&x.y-C[1]<p){const g=c?Math.random()<.05:true;if(g){W[a].dead=v;ie(W[a],v,x.dx,l??d);const M=I.x-W[a].x;const b=I.y-W[a].y;const w=Math.sqrt(M*M+b*b);W[a].dx=0;W[a].dy=0;W[a].goal[0]=W[a].x+-M/w*2e3;W[a].goal[1]=W[a].y+-b/w*2e3;E+=(c?6:10)*(1+.5*k.money);O()}else{W[a].hitTime=v}V(e);if(k.quickShot){I.nextShot=v+50}}}}S.push(e)})}const L={};function ne(e){let{x:t,y:n,width:o,height:r,animation:i,horseFrame:a,range:s,hotspot:d,color:l,time:c,hitTime:h,dead:f,direction:u,dy:y,random:m,hidden:p,cache:x,hero:g,hill:M}=e;if(M&&!D(e).closed){Y=e}if(h&&c-h<50){l=g?"red":"white"}let b=s[0]+(s.length<=1?0:Math.floor(a)%(s[1]-s[0]+1));const w=H(u,P);const v=H(y,P);if(x){const S=T.animations.indexOf(i);const $=`${i}-${b}-${l}-${w}-${o}-${r}`;if(!L[$]){L[$]={canvas:document.createElement("canvas")};L[$].canvas.width=o;L[$].canvas.height=r;L[$].canvas.getContext("2d").lineWidth=6;L[$].canvas.getContext("2d").strokeStyle="black";J(L[$].canvas.getContext("2d"),w<0?o:0,r<0?-r:0,o*w,r,b,S,l,0,0)}A.drawImage(L[$].canvas,t-d[0]*o-C[0],n-(r<0?0:d[1]*r)-C[1]+X);return}const S=T.animations.indexOf(i);J(A,t-d[0]*o*w-C[0],n-d[1]*r-C[1]+X,o*w,r,b,S,l,v,m)}const oe=60;const re=1e3/oe;let m=0;let p=0;function x(t){if(typeof t==="object"){if(Array.isArray(t)){const o=[...t];for(let e=0;e<o.length;e++){o[e]=x(t[e])}return o}const n={...t};for(let e in n){n[e]=x(t[e])}return n}return t}const I={...x(P),hero:true};let X=0;let g=0;const M=[];function ie(e,t,r,n){const o={...x(P),corpse:true,horseFrame:0,x:e.x,y:e.y,rangeOverride:[0,4],range:undefined,archerOrientation:r<0?1:-1,cache:true,riderAnimation:"dead",born:t,color:n,process:e=>{const t=e.time-e.born;const n=Math.floor(t/50);const o=H(e.rangeOverride[1],e);e.horseFrame=Math.min(n,o);if(e.horseFrame<o){e.x+=r*e.dt/1e3}},width:e.width,height:e.height};if(M.length>200){M.shift()}M.push(o);return o}let ae=0;const se=100;const W=new Array(se).fill(0).map((e,t)=>{const n=Math.random()*Math.PI*2;const o=Math.cos(n);const r=Math.sin(n);const c=t/se<.05;const i=t%3<=1;const a=o*(2e3+Math.random()*1e3);const s=r*(2e3+Math.random()*1e3);const d={...x(P),superSoldier:c,foeIndex:t,foeColor:c?i?"blue":"#a00":i?"#75f":"#f0a",horseFrame:Math.floor(Math.random()*100),goal:[a,s],gdist:0,ax:e=>(e.goal[0]-d.x)/2e3,ay:e=>(e.goal[1]-d.y)/2e3,x:a,y:s,rangeOverride:e=>!H(e.moving,e)?[0]:i?[0,4]:[0,3],speed:i?Math.max(.01,Math.random()/30):Math.max(.03,Math.random()/20),archerOrientation:e=>Math.sign(H(e.dx,e)),cache:true,soldier:i,process:o=>{if(!o.parent){return}if(o.dead&&o.time-o.dead>5e3){o.dead=0;o.speed=o.soldier?Math.max(.025,Math.random()/30):Math.max(.03,Math.random()/20)}ee(o);const e=o.x-o.goal[0];const t=o.y-o.goal[1];o.gdist=Math.sqrt(e*e+t*t);const n=o.x-I.x;const r=o.y-I.y;const i=Math.sqrt(n*n+r*r);if(i<50&&!o.dead&&f){ae+=o.superSoldier?5:1;console.log("HIT",ae,(I.time-I.born)/1e3+"s");f=Math.max(0,f-(c?2:1));u();g=40;h.backgroundColor="#a00";setTimeout(()=>{h.backgroundColor="#efd"},150);if(!f){ie(I,I.time,(I.x-o.x)*2,I.color);I.dead=I.time;_()}const e=Math.random()*Math.PI*2;const t=Math.cos(e);const n=Math.sin(e);o.x=I.x+t*2e3;o.y=I.y+n*2e3;I.dx=0;I.dy=0;I.hitTime=I.time}if(Y||!f){if(!o.pausing){o.pausing=true;const a=o.x-(Y??I).x;const s=o.y-(Y??I).y;const d=Math.sqrt(a*a+s*s);o.goal[0]=I.x+a/d*2e3;o.goal[1]=I.y+s/d*2e3}}else{if(o.pausing){o.pausing=false}if(i>2500){if(Math.random()<.6||!I.dx&&!I.dy){const e=Math.random()*Math.PI*2;const t=Math.cos(e);const n=Math.sin(e);o.x=I.x+t*1500;o.y=I.y+n*1500}else{const l=Math.sqrt(I.dx*I.dx+I.dy*I.dy);o.x=I.x+I.dx*(1e3+Math.random()*500)/l+(Math.random()-.5)*300;o.y=I.y+I.dy*(1e3+Math.random()*500)/l+(Math.random()-.5)*300}if(o.dead){o.dead=0;o.speed=o.soldier?Math.max(.025,Math.random()/30):Math.max(.03,Math.random()/20)}o.gdist=0}if(o.gdist<100||i>(o.soldier?500:3e3)){o.goal[0]=I.x+(I.x-o.x)+(Math.random()-.5)*(o.soldier?200:300);o.goal[1]=I.y+(I.y-o.y)+(Math.random()-.5)*(o.soldier?200:300)}}},foe:true,width:(i?200*l:220*l)*(c?i?2:1.5:1),height:(i?180*l:180*l)*(c?i?2:1.5:1),riderAnimation:i?"soldier":"sword"};return d});let Y=null;let R=null;const r={};const de=30;const le=new Array(de).fill(0).map((e,t)=>{const r=t<=1;const i=r?2e4:4e3;const a=i/2+500;const n={...x(P),cache:true,x:r?t*i:Math.random()*4e3-2e3,y:r?t*i/2:Math.random()*4e3-2e3,cellX:0,cellY:0,process:e=>{if(!e.parent){return}const t=e.x-I.x;const n=e.y-I.y;const o=Math.sqrt(t*t+n*n);if(o<(r?80:50)){if(r&&!D(e).closed){if(!R){R=e;e.enteredHut=e.time;f=d+k.maxHealth*2;u();_()}}else{g=20;I.x-=t;I.y-=n;I.dx=0;I.dy=0}}if(t>a*2){e.x-=i*2;e.cellX--}else if(t<-a*2){e.x+=i*2;e.cellX++}if(n>a){e.y-=i;e.cellY--}else if(n<-a){e.y+=i;e.cellY++}},foe:true,width:(r?600:500)*l,height:(r?400:350+Math.random()*200)*l,riderAnimation:r?"hut":"tree",foeColor:r?`rgb(${200}, ${100+t*55}, ${50+t*50})`:`rgb(${Math.random()*30}, ${Math.random()*150}, ${Math.random()*20})`,tree:true,hill:r,rangeOverride:r?[1]:undefined};return n});function D(e){if(!r[`${e.cellX}_${e.cellY}`]){r[`${e.cellX}_${e.cellY}`]={}}return r[`${e.cellX}_${e.cellY}`]}function ce(t){requestAnimationFrame(ce);if(t-m<=re||!c){return}m=Math.max(m,t-100);const n=t-m;const o=n/20;m=t;if(g){X=Math.random()*g;g*=.5;if(g<.1){g=0}}A.clearRect(0,0,$.width,$.height);A.beginPath();A.strokeStyle="#038";A.lineWidth=6;for(let e=0;e<q;e++){const r=F[e];const q=50;const i=Math.sqrt(r.dx*r.dx+r.dy*r.dy)+1;A.moveTo(r.x-C[0],r.y-C[1]+X);A.lineTo(r.x-C[0]-r.dx/i*q,r.y-C[1]+X-r.dy/i*q);r.dy+=.3;r.x+=r.dx/i*q*o;r.y+=r.dy/i*q*o}A.stroke();for(let e=q-1;e>=0;e--){if(t-F[e].born>1500){V(e)}}A.strokeStyle="#380";A.lineWidth=2;s.length=0;he(s);y(I,t,n,s);W.forEach(e=>{y(e,t,n,s)});M.forEach(e=>{y(e,t,n,s)});le.forEach(e=>{y(e,t,n,s)});s.sort((e,t)=>{if(e.layer!==t.layer){return e.layer-t.layer}return Math.sign(e.y-t.y)});Y=null;s.forEach(e=>ne(e,t));if(!f){const e=Math.min(.7,(t-I.dead)/3e3);A.fillStyle=`rgb(200,0,0,${e})`;A.fillRect(0,0,$.width,$.height);A.fill()}else if(!R){p+=((I.dx*I.archerOrientation<0?0:I.dx)/2+I.archerOrientation*2-p)*.05;C[0]+=I.dt/20*(I.x-$.width/2-C[0]+p*80)*.1;C[1]+=I.dt/20*(I.y-$.height/2-C[1]+I.dy*50)*.1}else{const a=Math.min(1,(t-R.enteredHut)/500);A.fillStyle=`rgb(0,0,0,${a})`;A.fillRect(0,0,$.width,$.height);A.fill()}}function he(){const n=200;A.beginPath();const o=[Math.round(C[0]/n),Math.round(C[1]/n)];for(let t=-15;t<15;t++){for(let e=-20;e<20;e++){const r=e+o[0];const i=t+o[1];const a=Math.sin(r*123+i*9991)+Math.sin(r*123/10+i*9991/100)+Math.sin(r*123/10+i*9991/100);const s=Math.cos(r*12331+i*2221)+Math.cos(r*12331/10+i*2221/10)+Math.cos(r*12331/100+i*2221/100);const d=a*500;const l=s*200;const c=r*n-C[0]+d;const h=i*n-C[1]+l;A.moveTo(c,h+X);A.lineTo(c+a*100,h+X+3);A.lineTo(c+a*100+s*100,h+X)}}A.stroke()}u();O();