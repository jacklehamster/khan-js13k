function r(t){const n=new Array(Math.ceil(t.length*2));for(let e=0;e<t.length;e++){n[e*2]=t[e]%16;n[e*2+1]=(t[e]>>4)%16}return n}function a(e){const t=[0,0];let n=0,o=0;do{n=e.pop()-7;o=e.pop()-7;t[0]+=n;t[1]+=o}while(n||o);let r,a;do{n=e.pop()-7;o=e.pop()-7;if(n||o){const i=r*o;const s=a*n;if(Math.abs(i-s)<5){t[t.length-2]+=n;t[t.length-1]+=o}else{t.push(t[t.length-2]+n,t[t.length-1]+o)}r=n;a=o}}while(n||o);return t}function i(t,n){const o=new Array(t.pop());for(let e=0;e<o.length;e++){o[e]=a(t).map(e=>e*n)}return o}function s(t){const n=t.pop();const o=[];for(let e=0;e<n;e++){const r=t.pop()+(t.pop()<<4);o.push(String.fromCharCode(r))}return o.join("")}function d(t,n){const o=new Array(t.pop());for(let e=0;e<o.length;e++){o[e]={};o[e].name=s(t);o[e].lines=i(t,n);o[e].anim=t.pop();const r=t.pop();o[e].hidden=r===1}return o}function K(t){const n=new Array(t.pop());for(let e=0;e<n.length;e++){n[e]=s(t)}return n}function o(e){const t=r(e);const n={};t.reverse();const o=t.pop();n.animations=K(t);n.shapes=d(t,o);return n}let W=document.querySelector.bind(document);let A=W("canvas");let k=A.getContext("2d");let c=A.style;A.width=2e3;c.width=`${A.width/2}px`;A.height=1200;c.height=`${A.height/2}px`;c.border="1px solid black";c.backgroundColor="#efd";c.transition="background-color 0.5s";const l=.8;const t={};document.addEventListener("keyup",e=>{delete t[e.code]});document.addEventListener("keydown",e=>{t[e.code]=true;e.preventDefault()});const h=[];const j=[];const O=[0,0];function R(e){const t=[];const n=new XMLHttpRequest;n.open("GET",e,false);n.overrideMimeType("text/plain; charset=x-user-defined");n.send(null);if(n.status===200){for(let e=0;e<n.responseText.length;++e){t.push(n.responseText.charCodeAt(e)&255)}}return t}let f=true;window.addEventListener("blur",function(e){f=false},false);window.addEventListener("focus",function(e){f=true},false);let S;document.addEventListener("DOMContentLoaded",()=>{const e=R("rider.13k");S=o(e);console.log(S);b(0)});const H=1600;const G=1e3;let U=5;function T(n,o,r,a,i,s,d,e,h,c,t){const l=a/H;const f=i/G;n.fillStyle=e??"black";S.shapes.forEach(e=>{if(e.hidden||e.anim!==d){return}const t=e.lines[s%e.lines.length];if(t){n.beginPath();m(n,o,r,t[0]*l,t[1]*f,false,a,i,h,c);for(let e=2;e<t.length;e+=2){m(n,o,r,t[e]*l,t[e+1]*f,true,a,i,h,c)}n.closePath()}n.fill()})}function m(e,t,n,o,r,a,i,s,d,h){if(a){e.lineTo(t+o,n+r+(o/i-.5)*15*d+h*(Math.random()-.5))}else{e.moveTo(t+o,n+r+(o/i-.5)*15*d+h*(Math.random()-.5))}}const n=.5;function C(e){F[e].x=F[E-1].x;F[e].y=F[E-1].y;F[e].dx=F[E-1].dx;F[e].dy=F[E-1].dy;F[e].born=F[E-1].born;E--}let E=0;const F=[];function X(e){const{x:t,y:n,dx:o,dy:r,archerOrientation:a}=e;if(E>=F.length){F.push({})}F[E].dx=a*120+o*2;F[E].dy=-5+r*10;F[E].x=t+F[E].dx;F[E].y=n-80*l;F[E].born=e.time;E++}function u(e){const t=e.dt/20;const n=$(e.ax,e);const o=$(e.ay,e);const r=Math.sqrt(n*n+o*o);if(n!==0){e.orientation=n}const a=$(e.speed,e)*(e.dead?2:1)*(e.superSoldier&&e.soldier?.7:1);const i=e.brake;if(r){e.dx=(e.dx+n/r*a)*i;e.dy=(e.dy+o/r*a/2)*i}else{e.dx=e.dx*i;e.dy=e.dy*i}if($(e.moving,e)){e.x+=e.dx*t;e.y+=e.dy*t}const s=Math.sqrt(e.dx*e.dx+e.dy*e.dy);e.horseFrame+=t*Math.max(.08,s/50)}const q={parent:true,time:0,nextShot:0,process:e=>{if(!e.parent){return}u(e);const t=$(e.shooting,e);if(!t){e.archerOrientation=e.orientation}else{if(e.time>e.nextShot){X(e);e.nextShot=e.time+$(e.shootPeriod,e)}}},shootPeriod:300,archerOrientation:1,orientation:1,direction:undefined,brake:.99,speed:e=>$(e.shooting,e)?.05:.09,x:300,y:500,moving:e=>Math.abs(e.dx)>n||Math.abs(e.dy)>n,shooting:()=>t.Space,ax:()=>(t.KeyA||t.ArrowLeft?-1:0)+(t.KeyD||t.ArrowRight?1:0),ay:()=>(t.KeyW||t.ArrowUp?-1:0)+(t.KeyS||t.ArrowDown?1:0),dx:0,dy:0,width:250*l,height:200*l,hotspot:undefined,born:0,animation:undefined,range:undefined,color:undefined,horseFrame:0,random:0,riderAnimation:"archer",layer:0,hidden:false,tree:false,cache:false,sprites:[e=>$({...e,y:e=>$(e.y,e)-.1,parent:false,sprites:undefined,animation:e=>$(e.riderAnimation,e),range:e=>e.rangeOverride??($(e.shooting,e)?[0,3]:[0]),hotspot:[e=>$(e.moving,e)?.5-e.orientation*$(e.archerOrientation,e)*.05:.53,e=>$(e.moving,e)?.65+Math.sin(e.horseFrame*.7)/100:.7],color:e=>e.foeColor??(e.corpse?e.color:e.hill?"#af8":e.tree?"#270":"black"),direction:e=>Math.sign($(e.archerOrientation,e)),frame:e=>$(e.horseFrame,e),random:4,hidden:e=>e.dead},e),e=>$({...e,y:e=>$(e.y,e),parent:false,sprites:undefined,animation:"horse",range:e=>$(e.moving,e)?[0,10]:[11],hotspot:[.47,.72],color:e=>e.superSoldier?"#a08":e.foe?"#004":"#630",direction:e=>Math.sign(e.orientation),frame:e=>$(e.horseFrame,e),random:4,hidden:e=>e.tree||e.corpse||e.soldier},e),e=>$({...e,y:e=>$(e.y,e)+1,parent:false,sprites:undefined,animation:"shield",range:[0],hotspot:[.47,.72],color:"#69f",direction:e=>Math.sign(e.orientation),frame:e=>0,hidden:e=>e.foe||e.corpse||e.soldier},e),e=>$({...e,layer:-2,parent:false,sprites:undefined,animation:e=>e.soldier?"soldier":e.corpse?"dead":e.hill?"hill":e.tree?"tree":"horse",range:e=>e.corpse?e.rangeOverride:e.tree?[0]:$(e.moving,e)?[0,10]:[11],hotspot:e=>e.tree?[.53,1]:[.47,.72],color:"#999",direction:e=>Math.sign(e.orientation),height:-50,frame:e=>$(e.horseFrame,e),hidden:e=>e.dead&&e.soldier},e)]};function $(t,n){if(typeof t==="object"){if(Array.isArray(t)){return t.map(e=>$(e,n))}else{const o={};for(let e in t){o[e]=$(t[e],n)}return o}}return typeof t==="function"?t(n):t}function y(e,v,t,b){e.dt=t;e.time=v;const n=$(e.sprites,e);n.forEach(e=>{const{x:t,y:n,width:o,height:r,hotspot:a,foeIndex:i,dead:s,color:d,foeColor:h,superSoldier:c,soldier:l}=e;const f=t-a[0]*o-O[0];const m=n-a[1]*r-O[1];const u=f+o;const y=m+r;if(u<0||y<0||f>A.width||m>A.height){return}if(i!==undefined&&!s){for(let e=E-1;e>=0;e--){const x=F[e];if(x.x-O[0]>f&&x.x-O[0]<u&&x.y-O[1]>m&&x.y-O[1]<y){const p=c?Math.random()<.05:true;if(p){D[i].dead=v;N(D[i],v,x.dx,h??d);const g=L.x-D[i].x;const M=L.y-D[i].y;const w=Math.sqrt(g*g+M*M);D[i].dx=0;D[i].dy=0;D[i].goal[0]=D[i].x+-g/w*2e3;D[i].goal[1]=D[i].y+-M/w*2e3}else{D[i].hitTime=v}C(e);L.nextShot=v+50}}}b.push(e)})}const P={};function z(e){let{x:t,y:n,width:o,height:r,animation:a,horseFrame:i,range:s,hotspot:d,color:h,time:c,hitTime:l,dead:f,direction:m,dy:u,random:y,hidden:x,cache:p,hero:g}=e;if(x){return}if(l&&c-l<50){h=g?"red":"white"}let M=s[0]+(s.length<=1?0:Math.floor(i)%(s[1]-s[0]+1));const w=$(m,q);const v=$(u,q);if(p){const b=S.animations.indexOf(a);const A=`${a}-${M}-${h}-${w}-${o}-${r}`;if(!P[A]){P[A]={canvas:document.createElement("canvas")};P[A].cvw=o;P[A].canvas.height=r;P[A].canvas.getContext("2d").lineWidth=6;P[A].canvas.getContext("2d").strokeStyle="black";T(P[A].canvas.getContext("2d"),w<0?o:0,r<0?-r:0,o*w,r,M,b,h,0,0)}k.drawImage(P[A].canvas,t-d[0]*o-O[0],n-(r<0?0:d[1]*r)-O[1]+I);return}const b=S.animations.indexOf(a);T(k,t-d[0]*o*w-O[0],n-d[1]*r-O[1]+I,o*w,r,M,b,h,v,y)}const B=60;const J=1e3/B;let e=0;let x=0;function p(t){if(typeof t==="object"){if(Array.isArray(t)){const o=[...t];for(let e=0;e<o.length;e++){o[e]=p(t[e])}return o}const n={...t};for(let e in n){n[e]=p(t[e])}return n}return t}const L={...p(q),hero:true};let I=0;let g=0;const M=[];function N(e,t,o,n){const r={...p(q),corpse:true,horseFrame:0,x:e.x,y:e.y,rangeOverride:[0,4],range:undefined,archerOrientation:o<0?1:-1,cache:true,riderAnimation:"dead",born:t,color:n,process:e=>{const t=e.time-e.born;const n=Math.floor(t/50);e.horseFrame=Math.min(n,e.rangeOverride[1]);if(e.horseFrame<e.rangeOverride[1]){e.x+=o*e.dt/1e3}},width:e.width,height:e.height};if(M.length>200){M.shift()}M.push(r);return r}let w=0;const v=100;const D=new Array(v).fill(0).map((e,t)=>{const n=Math.random()*Math.PI*2;const o=Math.cos(n);const r=Math.sin(n);const a=t/v<.05;const i=t%3<=1;if(a){console.log(a,i)}const s=o*(2e3+Math.random()*1e3);const d=r*(2e3+Math.random()*1e3);const h={...p(q),superSoldier:a,foeIndex:t,foeColor:a?i?"blue":"#a00":i?"#75f":"#f0a",horseFrame:Math.floor(Math.random()*100),goal:[s,d],gdist:0,ax:e=>(e.goal[0]-h.x)/2e3,ay:e=>(e.goal[1]-h.y)/2e3,x:s,y:d,rangeOverride:i?[0,4]:[0,3],speed:i?Math.max(.025,Math.random()/30):Math.max(.03,Math.random()/20),archerOrientation:e=>Math.sign($(e.dx,e)),cache:true,soldier:i,process:o=>{if(!o.parent){return}if(o.dead&&o.time-o.dead>5e3){o.dead=0;o.speed=o.soldier?Math.max(.025,Math.random()/30):Math.max(.03,Math.random()/20)}u(o);const e=o.x-o.goal[0];const t=o.y-o.goal[1];o.gdist=Math.sqrt(e*e+t*t);const n=o.x-L.x;const r=o.y-L.y;const a=Math.sqrt(n*n+r*r);if(a<50&&!o.dead){w+=o.superSoldier?5:1;console.log("HIT",w,(L.time-L.born)/1e3+"s");g=40;c.backgroundColor="#a00";setTimeout(()=>{c.backgroundColor="#efd"},150);const e=Math.random()*Math.PI*2;const t=Math.cos(e);const n=Math.sin(e);o.x=L.x+t*2e3;o.y=L.y+n*2e3;L.dx=0;L.dy=0;L.hitTime=L.time}if(a>2500){if(Math.random()<.6||!L.dx&&!L.dy){const e=Math.random()*Math.PI*2;const t=Math.cos(e);const n=Math.sin(e);o.x=L.x+t*1500;o.y=L.y+n*1500}else{const i=Math.sqrt(L.dx*L.dx+L.dy*L.dy);o.x=L.x+L.dx*(1e3+Math.random()*500)/i+(Math.random()-.5)*300;o.y=L.y+L.dy*(1e3+Math.random()*500)/i+(Math.random()-.5)*300}if(o.dead){o.dead=0;o.speed=o.soldier?Math.max(.025,Math.random()/30):Math.max(.03,Math.random()/20)}o.gdist=0}if(o.gdist<100||a>(o.soldier?500:3e3)){o.goal[0]=L.x+(L.x-o.x)+(Math.random()-.5)*(o.soldier?200:300);o.goal[1]=L.y+(L.y-o.y)+(Math.random()-.5)*(o.soldier?200:300)}},foe:true,width:(i?200*l:220*l)*(a?i?2:1.5:1),height:(i?180*l:180*l)*(a?i?2:1.5:1),riderAnimation:i?"soldier":"sword"};return h});const Q=30;const V=new Array(Q).fill(0).map((e,t)=>{const r=false;const n={...p(q),cache:true,x:Math.random()*4e3-2e3,y:Math.random()*4e3-2e3,process:e=>{if(!e.parent){return}const t=e.x-L.x;const n=e.y-L.y;const o=Math.sqrt(t*t+n*n);if(o<(r?100:50)){g=20;L.x-=t;L.y-=n;L.dx=0;L.dy=0}if(t>2500){e.x-=4e3}else if(t<-2500){e.x+=4e3}if(n>2500){e.y-=4e3}else if(n<-2500){e.y+=4e3}},foe:true,width:(r?800:500)*l,height:(r?500:350+Math.random()*200)*l,riderAnimation:r?"hill":"tree",foeColor:`rgb(${Math.random()*30}, ${Math.random()*150}, ${Math.random()*20})`,tree:true,hill:r};return n});function b(t){requestAnimationFrame(b);if(t-e<=J||!f){return}e=Math.max(e,t-100);const n=t-e;const o=n/20;e=t;if(g){I=Math.random()*g;g*=.5;if(g<.1){g=0}}k.clearRect(0,0,A.width,A.height);k.beginPath();k.strokeStyle="#038";k.lineWidth=6;for(let e=0;e<E;e++){const r=F[e];const E=50;const a=Math.sqrt(r.dx*r.dx+r.dy*r.dy)+1;k.moveTo(r.x-O[0],r.y-O[1]+I);k.lineTo(r.x-O[0]-r.dx/a*E,r.y-O[1]+I-r.dy/a*E);r.dy+=.3;r.x+=r.dx/a*E*o;r.y+=r.dy/a*E*o}k.stroke();for(let e=E-1;e>=0;e--){if(t-F[e].born>1500){C(e)}}k.strokeStyle="#380";k.lineWidth=2;j.length=0;h.length=0;Y(h);y(L,t,n,h);D.forEach(e=>{y(e,t,n,h)});M.forEach(e=>{y(e,t,n,h)});V.forEach(e=>{y(e,t,n,h)});h.sort((e,t)=>{if(e.layer!==t.layer){return e.layer-t.layer}return Math.sign(e.y-t.y)});h.forEach(e=>z(e,t));x+=((L.dx*L.archerOrientation<0?0:L.dx)/2+L.archerOrientation*2-x)*.05;O[0]+=L.dt/20*(L.x+x*80-A.width/2-O[0])*.1;O[1]+=L.dt/20*(L.y+L.dy*50-A.height/2-O[1])*.1}function Y(){const n=200;k.beginPath();const o=[Math.round(O[0]/n),Math.round(O[1]/n)];for(let t=-10;t<10;t++){for(let e=-15;e<15;e++){const r=e+o[0];const a=t+o[1];const i=Math.sin(r*123+a*9991)+Math.sin(r*123/10+a*9991/100)+Math.sin(r*123/10+a*9991/100);const s=Math.cos(r*12331+a*2221)+Math.cos(r*12331/10+a*2221/10)+Math.cos(r*12331/100+a*2221/100);const d=i*500;const h=s*200;const c=r*n-O[0]+d;const l=a*n-O[1]+h;k.moveTo(c,l+I);k.lineTo(c+i*100,l+I+3);k.lineTo(c+i*100+s*100,l+I)}}k.stroke()}