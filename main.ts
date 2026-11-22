import{readFileSync as r,writeFileSync as w,mkdirSync as m,readdirSync as d}from'node:fs';
import{join as j}from'node:path';
const I=process.env.MAKEFUN_INPUT_DIR??'/input',O=process.env.MAKEFUN_OUTPUT_DIR??'/output';
for(const id of d(I).sort()){
const P=r(j(I,id,'program.bin')),Q=r(j(I,id,'input.bin'));
let S=[],C=[],M=[],o='',p=0,q=0,k=0,x=0;
const N=(a,c)=>{if(S.length<a)throw 2;if(S.length-a+c>256)throw 3};
const B=(f,g)=>{N(2,1);let b=S.pop(),a=S.pop();if(g&&!b)throw 4;S.push(f(a,b))};
const U=f=>{N(1,1);S.push(f(S.pop()))};
try{for(;;){
if(k++>=1e6)throw 10;
if(p<0||p>=P.length)throw 9;
let b=P[p++],t,v;
switch(b){
case 0:throw 0;
case 1:if(p>=P.length)throw 9;N(0,1);S.push(P[p++]<<24>>24);break;
case 2:if(p+4>P.length)throw 9;N(0,1);S.push(P[p]|P[p+1]<<8|P[p+2]<<16|P[p+3]<<24);p+=4;break;
case 3:N(1,0);S.pop();break;
case 4:N(1,2);S.push(S[S.length-1]);break;
case 5:N(2,2);t=S.pop();v=S.pop();S.push(t,v);break;
case 6:N(2,3);S.push(S[S.length-2]);break;
case 7:N(3,3);t=S.pop();v=S.pop();S.push(v,t,S.pop());break;
case 16:B((a,b)=>a+b|0);break;
case 17:B((a,b)=>a-b|0);break;
case 18:B((a,b)=>Math.imul(a,b));break;
case 19:B((a,b)=>a/b|0,1);break;
case 20:B((a,b)=>a%b|0,1);break;
case 21:B((a,b)=>(a>>>0)/(b>>>0)|0,1);break;
case 22:B((a,b)=>(a>>>0)%(b>>>0)|0,1);break;
case 23:U(a=>-a|0);break;
case 24:B((a,b)=>a&b);break;
case 25:B((a,b)=>a|b);break;
case 26:B((a,b)=>a^b);break;
case 27:U(a=>~a);break;
case 28:B((a,b)=>a<<b);break;
case 29:B((a,b)=>a>>b);break;
case 30:B((a,b)=>a>>>b|0);break;
case 32:B((a,b)=>+(a==b));break;
case 33:B((a,b)=>+(a<b));break;
case 34:B((a,b)=>+((a>>>0)<(b>>>0)));break;
case 48:if(p+2>P.length)throw 9;t=P[p]|P[p+1]<<8;p+=2;p+=(t<<16)>>16;break;
case 49:if(p+2>P.length)throw 9;N(1,0);t=P[p]|P[p+1]<<8;p+=2;if(!S.pop())p+=(t<<16)>>16;break;
case 50:if(p+2>P.length)throw 9;N(1,0);t=P[p]|P[p+1]<<8;p+=2;if(S.pop())p+=(t<<16)>>16;break;
case 51:if(p+2>P.length)throw 9;if(C.length>63)throw 7;t=P[p]|P[p+1]<<8;p+=2;C.push(p);p=t;break;
case 52:if(!C.length)throw 8;p=C.pop();break;
case 64:U(a=>{if(a<0||a>255)throw 6;return M[a]|0});break;
case 65:N(2,0);t=S.pop();v=S.pop();if(t<0||t>255)throw 6;M[t]=v;break;
case 80:N(1,0);v=S.pop();t=String(v);if(o.length+t.length>65536)throw 11;o+=t;break;
case 81:N(1,0);if(o.length>65535)throw 11;o+=String.fromCharCode(S.pop()&255);break;
case 82:N(0,1);S.push(q<Q.length?Q[q++]:-1);break;
case 83:N(1,0);throw S.pop()&255;
default:throw 5;
}
}}catch(e){x=e}
m(j(O,id),{recursive:true});
w(j(O,id,'stdout.bin'),Buffer.from(o,'latin1'));
w(j(O,id,'exit.txt'),x+'\n');
}
