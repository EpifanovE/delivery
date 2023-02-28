import{r as l,R as x,j as i,d as g,F as M}from"./client-182d8dba.js";import{f as se}from"./app-44caa45f.js";import{B as A}from"./Button-aab750b6.js";import{u as fe}from"./useTranslation-7f77c7c2.js";var Le=Object.defineProperty,ke=(e,t,r)=>t in e?Le(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,J=(e,t,r)=>(ke(e,typeof t!="symbol"?t+"":t,r),r);let je=class{constructor(){J(this,"current",this.detect()),J(this,"handoffState","pending"),J(this,"currentId",0)}set(t){this.current!==t&&(this.handoffState="pending",this.currentId=0,this.current=t)}reset(){this.set(this.detect())}nextId(){return++this.currentId}get isServer(){return this.current==="server"}get isClient(){return this.current==="client"}detect(){return typeof window>"u"||typeof document>"u"?"server":"client"}handoff(){this.handoffState==="pending"&&(this.handoffState="complete")}get isHandoffComplete(){return this.handoffState==="complete"}},j=new je,D=(e,t)=>{j.isServer?l.useEffect(e,t):l.useLayoutEffect(e,t)};function O(e){let t=l.useRef(e);return D(()=>{t.current=e},[e]),t}function Me(e){typeof queueMicrotask=="function"?queueMicrotask(e):Promise.resolve().then(e).catch(t=>setTimeout(()=>{throw t}))}function z(){let e=[],t=[],r={enqueue(n){t.push(n)},addEventListener(n,s,a,u){return n.addEventListener(s,a,u),r.add(()=>n.removeEventListener(s,a,u))},requestAnimationFrame(...n){let s=requestAnimationFrame(...n);return r.add(()=>cancelAnimationFrame(s))},nextFrame(...n){return r.requestAnimationFrame(()=>r.requestAnimationFrame(...n))},setTimeout(...n){let s=setTimeout(...n);return r.add(()=>clearTimeout(s))},microTask(...n){let s={current:!0};return Me(()=>{s.current&&n[0]()}),r.add(()=>{s.current=!1})},add(n){return e.push(n),()=>{let s=e.indexOf(n);if(s>=0){let[a]=e.splice(s,1);a()}}},dispose(){for(let n of e.splice(0))n()},async workQueue(){for(let n of t.splice(0))await n()},style(n,s,a){let u=n.style.getPropertyValue(s);return Object.assign(n.style,{[s]:a}),this.add(()=>{Object.assign(n.style,{[s]:u})})}};return r}function me(){let[e]=l.useState(z);return l.useEffect(()=>()=>e.dispose(),[e]),e}let S=function(e){let t=O(e);return x.useCallback((...r)=>t.current(...r),[t])};function he(){let[e,t]=l.useState(j.isHandoffComplete);return e&&j.isHandoffComplete===!1&&t(!1),l.useEffect(()=>{e!==!0&&t(!0)},[e]),l.useEffect(()=>j.handoff(),[]),e}function y(e,t,...r){if(e in t){let s=t[e];return typeof s=="function"?s(...r):s}let n=new Error(`Tried to handle "${e}" but there is no handler defined. Only defined handlers are: ${Object.keys(t).map(s=>`"${s}"`).join(", ")}.`);throw Error.captureStackTrace&&Error.captureStackTrace(n,y),n}let Pe=Symbol();function pe(...e){let t=l.useRef(e);l.useEffect(()=>{t.current=e},[e]);let r=S(n=>{for(let s of t.current)s!=null&&(typeof s=="function"?s(n):s.current=n)});return e.every(n=>n==null||(n==null?void 0:n[Pe]))?void 0:r}function ge(...e){return e.filter(Boolean).join(" ")}var ve=(e=>(e[e.None=0]="None",e[e.RenderStrategy=1]="RenderStrategy",e[e.Static=2]="Static",e))(ve||{}),H=(e=>(e[e.Unmount=0]="Unmount",e[e.Hidden=1]="Hidden",e))(H||{});function Ce({ourProps:e,theirProps:t,slot:r,defaultTag:n,features:s,visible:a=!0,name:u}){let o=be(t,e);if(a)return I(o,r,n,u);let d=s??0;if(d&2){let{static:f=!1,...m}=o;if(f)return I(m,r,n,u)}if(d&1){let{unmount:f=!0,...m}=o;return y(f?0:1,{[0](){return null},[1](){return I({...m,hidden:!0,style:{display:"none"}},r,n,u)}})}return I(o,r,n,u)}function I(e,t={},r,n){var s;let{as:a=r,children:u,refName:o="ref",...d}=ee(e,["unmount","static"]),f=e.ref!==void 0?{[o]:e.ref}:{},m=typeof u=="function"?u(t):u;d.className&&typeof d.className=="function"&&(d.className=d.className(t));let C={};if(t){let b=!1,h=[];for(let[c,v]of Object.entries(t))typeof v=="boolean"&&(b=!0),v===!0&&h.push(c);b&&(C["data-headlessui-state"]=h.join(" "))}if(a===l.Fragment&&Object.keys(ce(d)).length>0){if(!l.isValidElement(m)||Array.isArray(m)&&m.length>1)throw new Error(['Passing props on "Fragment"!',"",`The current component <${n} /> is rendering a "Fragment".`,"However we need to passthrough the following props:",Object.keys(d).map(c=>`  - ${c}`).join(`
`),"","You can apply a few solutions:",['Add an `as="..."` prop, to ensure that we render an actual element instead of a "Fragment".',"Render a single element as the child so that we can forward the props onto that element."].map(c=>`  - ${c}`).join(`
`)].join(`
`));let b=ge((s=m.props)==null?void 0:s.className,d.className),h=b?{className:b}:{};return l.cloneElement(m,Object.assign({},be(m.props,ce(ee(d,["ref"]))),C,f,Re(m.ref,f.ref),h))}return l.createElement(a,Object.assign({},ee(d,["ref"]),a!==l.Fragment&&f,a!==l.Fragment&&C),m)}function Re(...e){return{ref:e.every(t=>t==null)?void 0:t=>{for(let r of e)r!=null&&(typeof r=="function"?r(t):r.current=t)}}}function be(...e){if(e.length===0)return{};if(e.length===1)return e[0];let t={},r={};for(let n of e)for(let s in n)s.startsWith("on")&&typeof n[s]=="function"?(r[s]!=null||(r[s]=[]),r[s].push(n[s])):t[s]=n[s];if(t.disabled||t["aria-disabled"])return Object.assign(t,Object.fromEntries(Object.keys(r).map(n=>[n,void 0])));for(let n in r)Object.assign(t,{[n](s,...a){let u=r[n];for(let o of u){if((s instanceof Event||(s==null?void 0:s.nativeEvent)instanceof Event)&&s.defaultPrevented)return;o(s,...a)}}});return t}function ie(e){var t;return Object.assign(l.forwardRef(e),{displayName:(t=e.displayName)!=null?t:e.name})}function ce(e){let t=Object.assign({},e);for(let r in t)t[r]===void 0&&delete t[r];return t}function ee(e,t=[]){let r=Object.assign({},e);for(let n of t)n in r&&delete r[n];return r}let le=l.createContext(null);le.displayName="OpenClosedContext";var E=(e=>(e[e.Open=1]="Open",e[e.Closed=2]="Closed",e[e.Closing=4]="Closing",e[e.Opening=8]="Opening",e))(E||{});function we(){return l.useContext(le)}function Ze({value:e,children:t}){return x.createElement(le.Provider,{value:e},t)}function xe(){let e=l.useRef(!1);return D(()=>(e.current=!0,()=>{e.current=!1}),[]),e}function Be(e=0){let[t,r]=l.useState(e),n=l.useCallback(o=>r(d=>d|o),[t]),s=l.useCallback(o=>Boolean(t&o),[t]),a=l.useCallback(o=>r(d=>d&~o),[r]),u=l.useCallback(o=>r(d=>d^o),[r]);return{flags:t,addFlag:n,hasFlag:s,removeFlag:a,toggleFlag:u}}function Ie(e){let t={called:!1};return(...r)=>{if(!t.called)return t.called=!0,e(...r)}}function te(e,...t){e&&t.length>0&&e.classList.add(...t)}function re(e,...t){e&&t.length>0&&e.classList.remove(...t)}function Ae(e,t){let r=z();if(!e)return r.dispose;let{transitionDuration:n,transitionDelay:s}=getComputedStyle(e),[a,u]=[n,s].map(o=>{let[d=0]=o.split(",").filter(Boolean).map(f=>f.includes("ms")?parseFloat(f):parseFloat(f)*1e3).sort((f,m)=>m-f);return d});if(a+u!==0){let o=r.addEventListener(e,"transitionend",d=>{d.target===d.currentTarget&&(t(),o())})}else t();return r.add(()=>t()),r.dispose}function De(e,t,r,n){let s=r?"enter":"leave",a=z(),u=n!==void 0?Ie(n):()=>{};s==="enter"&&(e.removeAttribute("hidden"),e.style.display="");let o=y(s,{enter:()=>t.enter,leave:()=>t.leave}),d=y(s,{enter:()=>t.enterTo,leave:()=>t.leaveTo}),f=y(s,{enter:()=>t.enterFrom,leave:()=>t.leaveFrom});return re(e,...t.enter,...t.enterTo,...t.enterFrom,...t.leave,...t.leaveFrom,...t.leaveTo,...t.entered),te(e,...o,...f),a.nextFrame(()=>{re(e,...f),te(e,...d),Ae(e,()=>(re(e,...o),te(e,...t.entered),u()))}),a.dispose}function ze({container:e,direction:t,classes:r,onStart:n,onStop:s}){let a=xe(),u=me(),o=O(t);D(()=>{let d=z();u.add(d.dispose);let f=e.current;if(f&&o.current!=="idle"&&a.current)return d.dispose(),n.current(o.current),d.add(De(f,r.current,o.current==="enter",()=>{d.dispose(),s.current(o.current)})),d.dispose},[t])}function $(e=""){return e.split(" ").filter(t=>t.trim().length>1)}let U=l.createContext(null);U.displayName="TransitionContext";var Ue=(e=>(e.Visible="visible",e.Hidden="hidden",e))(Ue||{});function qe(){let e=l.useContext(U);if(e===null)throw new Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");return e}function Ye(){let e=l.useContext(q);if(e===null)throw new Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");return e}let q=l.createContext(null);q.displayName="NestingContext";function Y(e){return"children"in e?Y(e.children):e.current.filter(({el:t})=>t.current!==null).filter(({state:t})=>t==="visible").length>0}function ye(e,t){let r=O(e),n=l.useRef([]),s=xe(),a=me(),u=S((h,c=H.Hidden)=>{let v=n.current.findIndex(({el:p})=>p===h);v!==-1&&(y(c,{[H.Unmount](){n.current.splice(v,1)},[H.Hidden](){n.current[v].state="hidden"}}),a.microTask(()=>{var p;!Y(n)&&s.current&&((p=r.current)==null||p.call(r))}))}),o=S(h=>{let c=n.current.find(({el:v})=>v===h);return c?c.state!=="visible"&&(c.state="visible"):n.current.push({el:h,state:"visible"}),()=>u(h,H.Unmount)}),d=l.useRef([]),f=l.useRef(Promise.resolve()),m=l.useRef({enter:[],leave:[],idle:[]}),C=S((h,c,v)=>{d.current.splice(0),t&&(t.chains.current[c]=t.chains.current[c].filter(([p])=>p!==h)),t==null||t.chains.current[c].push([h,new Promise(p=>{d.current.push(p)})]),t==null||t.chains.current[c].push([h,new Promise(p=>{Promise.all(m.current[c].map(([w,N])=>N)).then(()=>p())})]),c==="enter"?f.current=f.current.then(()=>t==null?void 0:t.wait.current).then(()=>v(c)):v(c)}),b=S((h,c,v)=>{Promise.all(m.current[c].splice(0).map(([p,w])=>w)).then(()=>{var p;(p=d.current.shift())==null||p()}).then(()=>v(c))});return l.useMemo(()=>({children:n,register:o,unregister:u,onStart:C,onStop:b,wait:f,chains:m}),[o,u,n,C,b,m,f])}function _e(){}let Qe=["beforeEnter","afterEnter","beforeLeave","afterLeave"];function ue(e){var t;let r={};for(let n of Qe)r[n]=(t=e[n])!=null?t:_e;return r}function We(e){let t=l.useRef(ue(e));return l.useEffect(()=>{t.current=ue(e)},[e]),t}let Ge="div",Ne=ve.RenderStrategy,Ee=ie(function(e,t){let{beforeEnter:r,afterEnter:n,beforeLeave:s,afterLeave:a,enter:u,enterFrom:o,enterTo:d,entered:f,leave:m,leaveFrom:C,leaveTo:b,...h}=e,c=l.useRef(null),v=pe(c,t),p=h.unmount?H.Unmount:H.Hidden,{show:w,appear:N,initial:Ve}=qe(),[F,_]=l.useState(w?"visible":"hidden"),oe=Ye(),{register:P,unregister:R}=oe,Q=l.useRef(null);l.useEffect(()=>P(c),[P,c]),l.useEffect(()=>{if(p===H.Hidden&&c.current){if(w&&F!=="visible"){_("visible");return}return y(F,{hidden:()=>R(c),visible:()=>P(c)})}},[F,c,P,R,w,p]);let W=O({enter:$(u),enterFrom:$(o),enterTo:$(d),entered:$(f),leave:$(m),leaveFrom:$(C),leaveTo:$(b)}),Z=We({beforeEnter:r,afterEnter:n,beforeLeave:s,afterLeave:a}),G=he();l.useEffect(()=>{if(G&&F==="visible"&&c.current===null)throw new Error("Did you forget to passthrough the `ref` to the actual DOM node?")},[c,F,G]);let K=Ve&&!N,Te=(()=>!G||K||Q.current===w?"idle":w?"enter":"leave")(),L=Be(0),$e=S(V=>y(V,{enter:()=>{L.addFlag(E.Opening),Z.current.beforeEnter()},leave:()=>{L.addFlag(E.Closing),Z.current.beforeLeave()},idle:()=>{}})),Se=S(V=>y(V,{enter:()=>{L.removeFlag(E.Opening),Z.current.afterEnter()},leave:()=>{L.removeFlag(E.Closing),Z.current.afterLeave()},idle:()=>{}})),B=ye(()=>{_("hidden"),R(c)},oe);ze({container:c,classes:W,direction:Te,onStart:O(V=>{B.onStart(c,V,$e)}),onStop:O(V=>{B.onStop(c,V,Se),V==="leave"&&!Y(B)&&(_("hidden"),R(c))})}),l.useEffect(()=>{!K||(p===H.Hidden?Q.current=null:Q.current=w)},[w,K,F]);let X=h,Oe={ref:v};return N&&w&&j.isServer&&(X={...X,className:ge(h.className,...W.current.enter,...W.current.enterFrom)}),x.createElement(q.Provider,{value:B},x.createElement(Ze,{value:y(F,{visible:E.Open,hidden:E.Closed})|L.flags},Ce({ourProps:Oe,theirProps:X,defaultTag:Ge,features:Ne,visible:F==="visible",name:"Transition.Child"})))}),ne=ie(function(e,t){let{show:r,appear:n=!1,unmount:s,...a}=e,u=l.useRef(null),o=pe(u,t);he();let d=we();if(r===void 0&&d!==null&&(r=(d&E.Open)===E.Open),![!0,!1].includes(r))throw new Error("A <Transition /> is used but it is missing a `show={true | false}` prop.");let[f,m]=l.useState(r?"visible":"hidden"),C=ye(()=>{m("hidden")}),[b,h]=l.useState(!0),c=l.useRef([r]);D(()=>{b!==!1&&c.current[c.current.length-1]!==r&&(c.current.push(r),h(!1))},[c,r]);let v=l.useMemo(()=>({show:r,appear:n,initial:b}),[r,n,b]);l.useEffect(()=>{if(r)m("visible");else if(!Y(C))m("hidden");else{let w=u.current;if(!w)return;let N=w.getBoundingClientRect();N.x===0&&N.y===0&&N.width===0&&N.height===0&&m("hidden")}},[r,C]);let p={unmount:s};return x.createElement(q.Provider,{value:C},x.createElement(U.Provider,{value:v},Ce({ourProps:{...p,as:l.Fragment,children:x.createElement(Ee,{ref:o,...p,...a})},theirProps:{},defaultTag:l.Fragment,features:Ne,visible:f==="visible",name:"Transition"})))}),Ke=ie(function(e,t){let r=l.useContext(U)!==null,n=we()!==null;return x.createElement(x.Fragment,null,!r&&n?x.createElement(ne,{ref:t,...e}):x.createElement(Ee,{ref:t,...e}))}),He=Object.assign(ne,{Child:Ke,Root:ne});const ae=l.createContext(),T=({children:e})=>{const[t,r]=l.useState(!1),n=()=>{r(s=>!s)};return i(ae.Provider,{value:{open:t,setOpen:r,toggleOpen:n},children:i("div",{className:"relative",children:e})})},Xe=({children:e})=>{const{open:t,setOpen:r,toggleOpen:n}=l.useContext(ae);return g(M,{children:[i("div",{onClick:n,children:e}),t&&i("div",{className:"fixed inset-0 z-40",onClick:()=>r(!1)})]})},Je=({align:e="right",contentClasses:t="py-1 bg-white",children:r,closeOnClickInside:n=!0,className:s})=>{const{open:a,setOpen:u}=l.useContext(ae);let o="origin-top";return e==="left"?o="origin-top-left left-0":e==="right"&&(o="origin-top-right right-0"),i(M,{children:i(He,{as:l.Fragment,show:a,enter:"transition ease-out duration-200",enterFrom:"transform opacity-0 scale-95",enterTo:"transform opacity-100 scale-100",leave:"transition ease-in duration-75",leaveFrom:"transform opacity-100 scale-100",leaveTo:"transform opacity-0 scale-95",children:i("div",{className:`absolute z-50 mt-2 rounded-sm shadow-lg ${o} ${s}`,onClick:()=>u(!n),children:i("div",{className:"rounded-sm ring-1 ring-black ring-opacity-5 "+t,children:r})})})})},et=({href:e,method:t,as:r,children:n})=>i(se,{href:e||"",method:t,as:r,className:"block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out",children:n});T.Trigger=Xe;T.Content=Je;T.Link=et;const Fe=e=>{const{className:t}=e;return i("svg",{className:`${t?" "+t:""}`,viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",children:i("path",{d:"M13.4099 11.9999L17.7099 7.70994C17.8982 7.52164 18.004 7.26624 18.004 6.99994C18.004 6.73364 17.8982 6.47825 17.7099 6.28994C17.5216 6.10164 17.2662 5.99585 16.9999 5.99585C16.7336 5.99585 16.4782 6.10164 16.2899 6.28994L11.9999 10.5899L7.70994 6.28994C7.52164 6.10164 7.26624 5.99585 6.99994 5.99585C6.73364 5.99585 6.47824 6.10164 6.28994 6.28994C6.10164 6.47825 5.99585 6.73364 5.99585 6.99994C5.99585 7.26624 6.10164 7.52164 6.28994 7.70994L10.5899 11.9999L6.28994 16.2899C6.19621 16.3829 6.12182 16.4935 6.07105 16.6154C6.02028 16.7372 5.99414 16.8679 5.99414 16.9999C5.99414 17.132 6.02028 17.2627 6.07105 17.3845C6.12182 17.5064 6.19621 17.617 6.28994 17.7099C6.3829 17.8037 6.4935 17.8781 6.61536 17.9288C6.73722 17.9796 6.86793 18.0057 6.99994 18.0057C7.13195 18.0057 7.26266 17.9796 7.38452 17.9288C7.50638 17.8781 7.61698 17.8037 7.70994 17.7099L11.9999 13.4099L16.2899 17.7099C16.3829 17.8037 16.4935 17.8781 16.6154 17.9288C16.7372 17.9796 16.8679 18.0057 16.9999 18.0057C17.132 18.0057 17.2627 17.9796 17.3845 17.9288C17.5064 17.8781 17.617 17.8037 17.7099 17.7099C17.8037 17.617 17.8781 17.5064 17.9288 17.3845C17.9796 17.2627 18.0057 17.132 18.0057 16.9999C18.0057 16.8679 17.9796 16.7372 17.9288 16.6154C17.8781 16.4935 17.8037 16.3829 17.7099 16.2899L13.4099 11.9999Z"})})},tt=e=>{const{variant:t,children:r,onClose:n}=e,s={success:"bg-green-200 border-green-300 text-green-800",error:"bg-red-200 border-red-300 text-red-800",info:"bg-blue-200 border-blue-300 text-blue-800"},a={success:"fill-green-800 hover:fill-green-600",error:"fill-red-800 hover:fill-red-600",info:"fill-blue-800 hover:fill-blue-600"};return g("div",{className:`p-4 rounded-sm border relative ${t?s[t]:""} ${n?" pr-14":""}`,children:[r,n&&i(A,{className:"right-2 top-2 absolute border-0",onClick:n,children:i(Fe,{className:`w-4 h-4 transition ease-out duration-300 ${t?a[t]:""}`})})]})},rt=e=>{const{className:t}=e;return i("svg",{className:`${t?" "+t:""}`,viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",children:i("path",{d:"M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM16.64 8.8C16.49 10.38 15.84 14.22 15.51 15.99C15.37 16.74 15.09 16.99 14.83 17.02C14.25 17.07 13.81 16.64 13.25 16.27C12.37 15.69 11.87 15.33 11.02 14.77C10.03 14.12 10.67 13.76 11.24 13.18C11.39 13.03 13.95 10.7 14 10.49C14.0069 10.4582 14.006 10.4252 13.9973 10.3938C13.9886 10.3624 13.9724 10.3337 13.95 10.31C13.89 10.26 13.81 10.28 13.74 10.29C13.65 10.31 12.25 11.24 9.52 13.08C9.12 13.35 8.76 13.49 8.44 13.48C8.08 13.47 7.4 13.28 6.89 13.11C6.26 12.91 5.77 12.8 5.81 12.45C5.83 12.27 6.08 12.09 6.55 11.9C9.47 10.63 11.41 9.79 12.38 9.39C15.16 8.23 15.73 8.03 16.11 8.03C16.19 8.03 16.38 8.05 16.5 8.15C16.6 8.23 16.63 8.34 16.64 8.42C16.63 8.48 16.65 8.66 16.64 8.8Z"})})},nt=e=>{const{t}=fe(),{open:r,onClose:n,children:s}=e;return g(M,{children:[i("div",{className:`w-full lg:hidden h-screen overflow-hidden fixed z-40 left-0 top-0 bg-gray-900 opacity-50${r?" translate-x-0":" -translate-x-full"}`}),g("div",{className:`w-[90%] z-50 sm:w-72 bg-zinc-800 h-screen overflow-y-auto fixed left-0 top-0 transition-transform${r?" translate-x-0":" -translate-x-full"}`,children:[g("div",{className:"h-16 px-6 border-b border-zinc-700 flex justify-center items-center flex justify-between lg:justify-center",children:[i(se,{href:"/",children:i(rt,{className:"block w-auto fill-[#0088cc] w-9 h-9"})}),g(A,{className:"text-gray-400 border-gray-400 fill-gray-400 lg:hidden",onClick:()=>n&&n(),children:[i(Fe,{className:"w-4 h-4 mr-2"}),t("buttons.close")]})]}),i("div",{children:s})]})]})},st=e=>{const{className:t}=e;return i("svg",{className:`${t?" "+t:""}`,viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg",children:i("path",{d:"M3 15H17V13H3V15ZM3 5V7H17V5H3ZM3 11H17V9H3V11Z"})})},k=e=>{const{text:t,href:r,active:n,prepend:s}=e;return i(se,{href:r,className:`text-gray-300 block px-6 h-16 border-b border-gray-700 flex items-center hover:bg-zinc-700 transition-colors${n?" bg-zinc-700 text-gray-100":""}`,children:g(M,{children:[s&&s,t]})})},de=e=>{const{className:t}=e;return i("svg",{className:`${t?" "+t:""}`,viewBox:"3 4 34 32",xmlns:"http://www.w3.org/2000/svg",children:i("path",{d:"M25.9625 15.8413C25.9625 15.8413 27.025 11.3441 25.9625 9.81945C24.9 8.29732 24.4775 7.28257 22.1413 6.5561C19.805 5.82964 20.6563 5.97442 18.9575 6.04873C17.2575 6.12304 15.8425 7.06476 15.8425 7.57342C15.8425 7.57342 14.78 7.64517 14.3575 8.08079C13.9325 8.51642 13.225 10.5459 13.225 11.0533C13.225 11.5607 13.5788 14.9739 13.9325 15.6978L13.5113 15.8439C13.1563 20.0502 14.9238 20.5589 14.9238 20.5589C15.5613 24.4769 16.1988 22.8088 16.1988 23.8235C16.1988 24.8383 15.5613 24.4769 15.5613 24.4769C15.5613 24.4769 14.9963 26.0721 13.5813 26.6525C12.1663 27.2316 4.31126 30.3502 3.67251 31.0036C3.03251 31.6571 3.10501 34.7039 3.10501 34.7039H36.7888C36.7888 34.7039 36.8638 31.6584 36.2238 31.0036C35.5863 30.3502 27.73 27.2316 26.315 26.6525C24.9 26.0721 24.335 24.4769 24.335 24.4769C24.335 24.4769 23.6975 24.8383 23.6975 23.8235C23.6975 22.8088 24.335 24.4769 24.9725 20.5589C24.9725 20.5589 26.7388 20.0502 26.385 15.8439H25.96L25.9625 15.8413Z"})})},it=e=>{const{className:t}=e;return i("svg",{className:`${t?" "+t:""}`,viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:i("path",{d:"M13 9V3H21V9H13ZM3 13V3H11V13H3ZM13 21V11H21V21H13ZM3 21V15H11V21H3Z"})})},lt=e=>{const{className:t}=e;return i("svg",{className:`${t?" "+t:""}`,viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",children:i("path",{d:"M21 10.975V8C21 7.46957 20.7893 6.96086 20.4142 6.58579C20.0391 6.21072 19.5304 6 19 6H13V4.688C13.305 4.414 13.5 4.02 13.5 3.578C13.5 3.18018 13.342 2.79865 13.0607 2.51734C12.7794 2.23604 12.3978 2.078 12 2.078C11.6022 2.078 11.2206 2.23604 10.9393 2.51734C10.658 2.79865 10.5 3.18018 10.5 3.578C10.5 4.02 10.695 4.414 11 4.688V6H5C4.46957 6 3.96086 6.21072 3.58579 6.58579C3.21071 6.96086 3 7.46957 3 8V10.998L2.928 11.003C2.67589 11.021 2.43996 11.1338 2.26775 11.3188C2.09554 11.5038 1.99987 11.7473 2 12V14C2 14.2652 2.10536 14.5196 2.29289 14.7071C2.48043 14.8946 2.73478 15 3 15V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V15C21.2652 15 21.5196 14.8946 21.7071 14.7071C21.8946 14.5196 22 14.2652 22 14V12.062C22.0116 11.9068 21.9869 11.751 21.928 11.607C21.726 11.119 21.293 11.002 21 10.975ZM7 12C7 10.896 7.672 10 8.5 10C9.328 10 10 10.896 10 12C10 13.104 9.328 14 8.5 14C7.672 14 7 13.104 7 12ZM15.998 18C14.997 17.997 8 18 8 18V16C8 16 15.001 15.998 16.002 16L15.998 18ZM15.5 14C14.672 14 14 13.104 14 12C14 10.896 14.672 10 15.5 10C16.328 10 17 10.896 17 12C17 13.104 16.328 14 15.5 14Z"})})},at=e=>{const{className:t}=e;return i("svg",{className:`${t?" "+t:""}`,viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",children:i("path",{d:"M18 18C18.4167 18 18.7707 17.854 19.062 17.562C19.354 17.2707 19.5 16.9167 19.5 16.5C19.5 16.0833 19.354 15.7293 19.062 15.438C18.7707 15.146 18.4167 15 18 15C17.5833 15 17.2293 15.146 16.938 15.438C16.646 15.7293 16.5 16.0833 16.5 16.5C16.5 16.9167 16.646 17.2707 16.938 17.562C17.2293 17.854 17.5833 18 18 18ZM18 21C18.5167 21 18.9877 20.879 19.413 20.637C19.8377 20.3957 20.1917 20.075 20.475 19.675C20.1083 19.4583 19.7167 19.2917 19.3 19.175C18.8833 19.0583 18.45 19 18 19C17.55 19 17.1167 19.0583 16.7 19.175C16.2833 19.2917 15.8917 19.4583 15.525 19.675C15.8083 20.075 16.1627 20.3957 16.588 20.637C17.0127 20.879 17.4833 21 18 21ZM9 8H15V6C15 5.16667 14.7083 4.45833 14.125 3.875C13.5417 3.29167 12.8333 3 12 3C11.1667 3 10.4583 3.29167 9.875 3.875C9.29167 4.45833 9 5.16667 9 6V8ZM18 23C16.6167 23 15.4377 22.5127 14.463 21.538C13.4877 20.5627 13 19.3833 13 18C13 16.6167 13.4877 15.4373 14.463 14.462C15.4377 13.4873 16.6167 13 18 13C19.3833 13 20.5627 13.4873 21.538 14.462C22.5127 15.4373 23 16.6167 23 18C23 19.3833 22.5127 20.5627 21.538 21.538C20.5627 22.5127 19.3833 23 18 23ZM4 22V8H7V6C7 4.61667 7.48767 3.43733 8.463 2.462C9.43767 1.48733 10.6167 1 12 1C13.3833 1 14.5627 1.48733 15.538 2.462C16.5127 3.43733 17 4.61667 17 6V8H20V11.3C19.6667 11.1833 19.3333 11.104 19 11.062C18.6667 11.0207 18.3333 11 18 11C16.05 11 14.396 11.679 13.038 13.037C11.6793 14.3957 11 16.05 11 18C11 18.7167 11.1127 19.4123 11.338 20.087C11.5627 20.7623 11.8667 21.4 12.25 22H4Z"})})},ot=e=>{const{className:t}=e;return i("svg",{className:`${t?" "+t:""}`,viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",children:i("path",{d:"M2 14V8H7V4H17V8H22V14H18V12H16V14H8V12H6V14H2ZM9 8H15V6H9V8ZM2 20V15H6V16H8V15H16V16H18V15H22V20H2Z"})})},ht=e=>{var m,C;const{t}=fe(),{auth:r,header:n,children:s,flash:a}=e,[u,o]=l.useState(!1),[d,f]=l.useState(!1);return l.useEffect(()=>{a!=null&&a.message&&f(!0)},[a]),l.useEffect(()=>{u?(document.body.classList.add("overflow-y-hidden"),document.body.classList.add("lg:overflow-auto")):document.body.classList.remove("overflow-y-hidden")},[u]),l.useEffect(()=>{window.matchMedia("(min-width: 1024px)").matches&&o(!0)},[]),i(M,{children:g("div",{className:"bg-gray-100 relative",children:[g(nt,{open:u,onClose:()=>o(!1),children:[i(k,{href:route("dashboard"),text:t("dashboard"),active:route().current("dashboard"),prepend:i(it,{className:"w-6 h-6 mr-3 fill-gray-300"})}),i(k,{href:route("bots.index"),text:t("bots"),active:route().current("bots.index"),prepend:i(lt,{className:"w-6 h-6 mr-3 fill-gray-300"})}),i(k,{href:route("subscribers.index"),text:t("subscribers"),active:route().current("subscribers.index"),prepend:i(de,{className:"w-6 h-6 mr-3 fill-gray-300"})}),i(k,{href:route("services.index"),text:t("services"),active:route().current("services.index"),prepend:i(ot,{className:"w-6 h-6 mr-3 fill-gray-300"})}),((m=r==null?void 0:r.user)==null?void 0:m.data.is_super)&&i(k,{href:route("users.index"),text:t("users"),active:route().current("users.index"),prepend:i(at,{className:"w-6 h-6 mr-3 fill-gray-300"})})]}),g("div",{className:"min-h-screen flex flex-col",children:[i("div",{className:`fixed z-40 w-full transition-all${u?" lg:pl-72":" lg:pl-0"}`,children:i("nav",{className:"bg-white border-b border-gray-100 shadow",children:i("div",{className:"mx-auto px-4",children:g("div",{className:"flex justify-between h-16",children:[g("div",{className:"flex gap-4 items-center",children:[i(A,{onClick:()=>o(!u),className:"focus:outline-none",children:i(st,{className:"w-4 h-4 fill-gray-400"})}),i("div",{className:"flex space-x-8",children:n})]}),i("div",{className:"flex items-center",children:i("div",{className:"ml-3 relative",children:g(T,{children:[g(T.Trigger,{children:[i("span",{className:"md:inline-flex rounded-md hidden",children:g("button",{type:"button",className:"inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150",children:[(C=r==null?void 0:r.user)==null?void 0:C.data.name,i("svg",{className:"ml-2 -mr-0.5 h-4 w-4",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor",children:i("path",{fillRule:"evenodd",d:"M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z",clipRule:"evenodd"})})]})}),i(A,{className:"focus:outline-none block md:hidden",children:i(de,{className:"w-4 h-4 fill-gray-400"})})]}),g(T.Content,{className:"w-48",children:[i(T.Link,{href:route("profile.edit"),children:t("profile")}),i(T.Link,{href:route("logout"),method:"post",as:"button",children:t("logout")})]})]})})})]})})})}),g("main",{className:`mt-16 transition-all ${u?" lg:pl-72":" lg:pl-0"}`,children:[i(He,{as:l.Fragment,show:d&&!!(a!=null&&a.message),enter:"transition transition-opacity ease-out duration-300",enterFrom:"opacity-0",enterTo:"opacity-100",leave:"ease-in duration-75",leaveFrom:"opacity-100",leaveTo:"opacity-0",children:i("div",{className:"md:px-4 sm:px-6 lg:px-8 mt-12",children:i(tt,{onClose:()=>f(!1),variant:"success",children:a==null?void 0:a.message})})}),s]}),i("footer",{className:`mt-auto border-t transition-all${u?" lg:pl-72":" lg:pl-0"}`,children:i("div",{className:"p-4 flex justify-between",children:g("a",{href:"https://digitfab.ru",target:"_blank",className:"text-blue-600 ml-auto",children:["© Епифанов Е.В., ",new Date().getFullYear()]})})})]})]})})},pt=({children:e})=>i("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:e});export{ht as A,T as D,pt as P,Fe as T};
