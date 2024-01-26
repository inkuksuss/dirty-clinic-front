import{g as q}from"./api-4086fdeb.js";import{d as j,j as P,_ as $,o as O,c as V,a as E,F as x,r as F,s as L}from"./index-ea7765f2.js";var A=1e6,M=1e6,R="[big.js] ",B=R+"Invalid ",k=B+"decimal places",I=B+"rounding mode",T=R+"Division by zero",h={},v=void 0;function C(e,o,n,s){var t=e.c,r=e.e+o+1;if(r<t.length){if(n===1)s=t[r]>=5;else if(n===2)s=t[r]>5||t[r]==5&&(s||r<0||t[r+1]!==v||t[r-1]&1);else if(n===3)s=s||!!t[0];else if(s=!1,n!==0)throw Error(I);if(r<1)t.length=1,s?(e.e=-o,t[0]=1):t[0]=e.e=0;else{if(t.length=r--,s)for(;++t[r]>9;)t[r]=0,r--||(++e.e,t.unshift(1));for(r=t.length;!t[--r];)t.pop()}}else if(n<0||n>3||n!==~~n)throw Error(I);return e}function y(e,o,n,s){var t,r,c=e.constructor,i=!e.c[0];if(n!==v){if(n!==~~n||n<(o==3)||n>A)throw Error(o==3?B+"precision":k);for(e=new c(e),n=s-e.e,e.c.length>++s&&C(e,n,c.RM),o==2&&(s=e.e+n+1);e.c.length<s;)e.c.push(0)}if(t=e.e,r=e.c.join(""),n=r.length,o!=2&&(o==1||o==3&&s<=t||t<=c.NE||t>=c.PE))r=r.charAt(0)+(n>1?"."+r.slice(1):"")+(t<0?"e":"e+")+t;else if(t<0){for(;++t;)r="0"+r;r="0."+r}else if(t>0)if(++t>n)for(t-=n;t--;)r+="0";else t<n&&(r=r.slice(0,t)+"."+r.slice(t));else n>1&&(r=r.charAt(0)+"."+r.slice(1));return e.s<0&&(!i||o==4)?"-"+r:r}h.abs=function(){var e=new this.constructor(this);return e.s=1,e};h.cmp=function(e){var o,n=this,s=n.c,t=(e=new n.constructor(e)).c,r=n.s,c=e.s,i=n.e,u=e.e;if(!s[0]||!t[0])return s[0]?r:t[0]?-c:0;if(r!=c)return r;if(o=r<0,i!=u)return i>u^o?1:-1;for(c=(i=s.length)<(u=t.length)?i:u,r=-1;++r<c;)if(s[r]!=t[r])return s[r]>t[r]^o?1:-1;return i==u?0:i>u^o?1:-1};h.div=function(e){var o=this,n=o.constructor,s=o.c,t=(e=new n(e)).c,r=o.s==e.s?1:-1,c=n.DP;if(c!==~~c||c<0||c>A)throw Error(k);if(!t[0])throw Error(T);if(!s[0])return new n(r*0);var i,u,a,p,l,f=t.slice(),b=i=t.length,g=s.length,m=s.slice(0,i),d=m.length,_=e,w=_.c=[],N=0,D=c+(_.e=o.e-e.e)+1;for(_.s=r,r=D<0?0:D,f.unshift(0);d++<i;)m.push(0);do{for(a=0;a<10;a++){if(i!=(d=m.length))p=i>d?1:-1;else for(l=-1,p=0;++l<i;)if(t[l]!=m[l]){p=t[l]>m[l]?1:-1;break}if(p<0){for(u=d==i?t:f;d;){if(m[--d]<u[d]){for(l=d;l&&!m[--l];)m[l]=9;--m[l],m[d]+=10}m[d]-=u[d]}for(;!m[0];)m.shift()}else break}w[N++]=p?a:++a,m[0]&&p?m[d]=s[b]||0:m=[s[b]]}while((b++<g||m[0]!==v)&&r--);return!w[0]&&N!=1&&(w.shift(),_.e--),N>D&&C(_,c,n.RM,m[0]!==v),_};h.eq=function(e){return!this.cmp(e)};h.gt=function(e){return this.cmp(e)>0};h.gte=function(e){return this.cmp(e)>-1};h.lt=function(e){return this.cmp(e)<0};h.lte=function(e){return this.cmp(e)<1};h.minus=h.sub=function(e){var o,n,s,t,r=this,c=r.constructor,i=r.s,u=(e=new c(e)).s;if(i!=u)return e.s=-u,r.plus(e);var a=r.c.slice(),p=r.e,l=e.c,f=e.e;if(!a[0]||!l[0])return l[0]?(e.s=-u,e):new c(a[0]?r:0);if(i=p-f){for((t=i<0)?(i=-i,s=a):(f=p,s=l),s.reverse(),u=i;u--;)s.push(0);s.reverse()}else for(n=((t=a.length<l.length)?a:l).length,i=u=0;u<n;u++)if(a[u]!=l[u]){t=a[u]<l[u];break}if(t&&(s=a,a=l,l=s,e.s=-e.s),(u=(n=l.length)-(o=a.length))>0)for(;u--;)a[o++]=0;for(u=o;n>i;){if(a[--n]<l[n]){for(o=n;o&&!a[--o];)a[o]=9;--a[o],a[n]+=10}a[n]-=l[n]}for(;a[--u]===0;)a.pop();for(;a[0]===0;)a.shift(),--f;return a[0]||(e.s=1,a=[f=0]),e.c=a,e.e=f,e};h.mod=function(e){var o,n=this,s=n.constructor,t=n.s,r=(e=new s(e)).s;if(!e.c[0])throw Error(T);return n.s=e.s=1,o=e.cmp(n)==1,n.s=t,e.s=r,o?new s(n):(t=s.DP,r=s.RM,s.DP=s.RM=0,n=n.div(e),s.DP=t,s.RM=r,this.minus(n.times(e)))};h.plus=h.add=function(e){var o,n=this,s=n.constructor,t=n.s,r=(e=new s(e)).s;if(t!=r)return e.s=-r,n.minus(e);var c=n.e,i=n.c,u=e.e,a=e.c;if(!i[0]||!a[0])return a[0]?e:new s(i[0]?n:t*0);if(i=i.slice(),t=c-u){for(t>0?(u=c,o=a):(t=-t,o=i),o.reverse();t--;)o.push(0);o.reverse()}for(i.length-a.length<0&&(o=a,a=i,i=o),t=a.length,r=0;t;i[t]%=10)r=(i[--t]=i[t]+a[t]+r)/10|0;for(r&&(i.unshift(r),++u),t=i.length;i[--t]===0;)i.pop();return e.c=i,e.e=u,e};h.pow=function(e){var o=this,n=new o.constructor(1),s=n,t=e<0;if(e!==~~e||e<-M||e>M)throw Error(B+"exponent");for(t&&(e=-e);e&1&&(s=s.times(o)),e>>=1,!!e;)o=o.times(o);return t?n.div(s):s};h.round=function(e,o){var n=this.constructor;if(e===v)e=0;else if(e!==~~e||e<-A||e>A)throw Error(k);return C(new n(this),e,o===v?n.RM:o)};h.sqrt=function(){var e,o,n,s=this,t=s.constructor,r=s.s,c=s.e,i=new t(.5);if(!s.c[0])return new t(s);if(r<0)throw Error(R+"No square root");r=Math.sqrt(s+""),r===0||r===1/0?(o=s.c.join(""),o.length+c&1||(o+="0"),r=Math.sqrt(o),c=((c+1)/2|0)-(c<0||c&1),e=new t((r==1/0?"1e":(r=r.toExponential()).slice(0,r.indexOf("e")+1))+c)):e=new t(r),c=e.e+(t.DP+=4);do n=e,e=i.times(n.plus(s.div(n)));while(n.c.slice(0,c).join("")!==e.c.slice(0,c).join(""));return C(e,t.DP-=4,t.RM)};h.times=h.mul=function(e){var o,n=this,s=n.constructor,t=n.c,r=(e=new s(e)).c,c=t.length,i=r.length,u=n.e,a=e.e;if(e.s=n.s==e.s?1:-1,!t[0]||!r[0])return new s(e.s*0);for(e.e=u+a,c<i&&(o=t,t=r,r=o,a=c,c=i,i=a),o=new Array(a=c+i);a--;)o[a]=0;for(u=i;u--;){for(i=0,a=c+u;a>u;)i=o[a]+r[u]*t[a-u-1]+i,o[a--]=i%10,i=i/10|0;o[a]=(o[a]+i)%10}for(i?++e.e:o.shift(),u=o.length;!o[--u];)o.pop();return e.c=o,e};h.toExponential=function(e){return y(this,1,e,e)};h.toFixed=function(e){return y(this,2,e,this.e+e)};h.toPrecision=function(e){return y(this,3,e,e-1)};h.toString=function(){return y(this)};h.valueOf=h.toJSON=function(){return y(this,4)};const U=j({name:"PaymentModule",setup(){const e={pg:"",pay_method:"",merchant_uid:"",name:"",amount:5,buyer_email:"",buyer_name:"",buyer_tel:"",buyer_addr:"",buyer_postcode:"",bypass:{}},o={pg:"kakaopay.TC0ONETIME"},n={pg:"tosspay.tosstest",pay_method:"card"},s={pg:"html5_inicis.INIpayTest",pay_method:"card",buyer_tel:"01026727162"},t=P(1),r=P("01026727162"),c=P("부천시 상동"),i=P(29),u=P("잘해주세요"),a=f=>({applyNum:f.apply_num,bankName:f.bank_name,buyerAddr:f.buyer_addr,buyerEmail:f.buyer_email,buyerName:f.buyer_name,buyerPostcode:f.buyer_postcode,buyerTel:f.buyer_tel,cardName:f.card_name,cardNumber:f.card_number,cardQuota:f.card_quota,currency:f.currency,customData:f.custom_data,impUid:f.imp_uid,merchantUid:f.merchant_uid,name:f.name,paidAmount:f.paid_amount,paidAt:f.paid_at,payMethod:f.pay_method,pgProvider:f.pg_provider,pgTid:f.pg_tid,pgType:f.pg_type,receiptUrl:f.receipt_url,status:f.status,success:f.success,errorMsg:f.error_msg}),p=async f=>await q().post("/payment/prepare",f);return{doPayment:async f=>{const b=window.IMP;b.init("imp15738717");const g=Object.assign({},e,f);g.name="입주청소";const m={productId:t.value,productName:g.name,phoneNumber:r.value,address:c.value,footage:i.value,description:u.value,amount:g.amount,isAgreePolicy:!0};f.pg==="html5_inicis.INIpayTest"&&(g.bypass={acceptmethod:"noeasypay"}),console.log(m);try{const d=await p(m);console.log(d),g.merchant_uid=d.data.data,g.buyer_tel="01026727162",console.log(g),b.request_pay(g,async _=>{console.log(_);const w=await q().post("/orders/result",a(_));console.log(w),w.data.code==0?console.log("success"):console.log("fail")})}catch(d){console.error(d)}},kakaoPaymentBaseRequest:o,tossPaymentBaseRequest:n,kgPaymentBaseRequest:s}}}),z=E("div",null,"결제모듈",-1);function S(e,o,n,s,t,r){return O(),V(x,null,[z,E("button",{onClick:o[0]||(o[0]=()=>e.doPayment(e.kakaoPaymentBaseRequest))},"카카오 결제하기"),E("button",{onClick:o[1]||(o[1]=()=>e.doPayment(e.tossPaymentBaseRequest))},"토스 결제하기"),E("button",{onClick:o[2]||(o[2]=()=>e.doPayment(e.kgPaymentBaseRequest))},"kg 결제하기")],64)}const X=$(U,[["render",S]]),J=j({name:"LoginView",components:{PaymentModule:X},setup(){return{}}});function Q(e,o,n,s,t,r){const c=F("payment-module");return O(),L(c)}const Z=$(J,[["render",Q]]);export{Z as default};