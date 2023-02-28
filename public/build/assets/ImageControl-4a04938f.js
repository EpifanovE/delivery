import{r as l,j as e,d as w}from"./client-182d8dba.js";import{T as b}from"./PageTitle-d9e0c608.js";import{u as N}from"./useTranslation-7f77c7c2.js";const A=l.forwardRef(function(n,p){const c=p||l.useRef(null),{name:u,id:i,value:m,className:t,autoComplete:d,required:h,isFocused:g,handleChange:f,readOnly:a,placeholder:C}=n;return l.useEffect(()=>{var o;g&&typeof c!="function"&&((o=c.current)==null||o.focus())},[]),e("textarea",{name:u,id:i,value:m,className:"border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-sm shadow-sm h-[150px] "+t,ref:c,autoComplete:d,required:h,onChange:o=>!!f&&f(o),readOnly:a,placeholder:C})}),L=r=>{const{className:n}=r;return e("svg",{className:`${n?" "+n:""}`,viewBox:"0 0 24 24",children:e("path",{d:"M11 20H6.5C4.98333 20 3.68767 19.475 2.613 18.425C1.53767 17.375 1 16.0917 1 14.575C1 13.275 1.39167 12.1167 2.175 11.1C2.95833 10.0833 3.98333 9.43333 5.25 9.15C5.66667 7.61667 6.5 6.375 7.75 5.425C9 4.475 10.4167 4 12 4C13.95 4 15.604 4.679 16.962 6.037C18.3207 7.39567 19 9.05 19 11C20.15 11.1333 21.1043 11.629 21.863 12.487C22.621 13.3457 23 14.35 23 15.5C23 16.75 22.5627 17.8127 21.688 18.688C20.8127 19.5627 19.75 20 18.5 20H13V12.85L14.6 14.4L16 13L12 9L8 13L9.4 14.4L11 12.85V20Z"})})},I=r=>{const{className:n}=r;return w("svg",{className:`${n?" "+n:""}`,viewBox:"0 0 16 17",xmlns:"http://www.w3.org/2000/svg",children:[e("g",{clipPath:"url(#clip0)",children:e("path",{d:"M15.7812 14.3344L12.6656 11.2188C12.525 11.0781 12.3344 11 12.1344 11H11.625C12.4875 9.89688 13 8.50937 13 7C13 3.40937 10.0906 0.5 6.5 0.5C2.90937 0.5 0 3.40937 0 7C0 10.5906 2.90937 13.5 6.5 13.5C8.00937 13.5 9.39688 12.9875 10.5 12.125V12.6344C10.5 12.8344 10.5781 13.025 10.7188 13.1656L13.8344 16.2812C14.1281 16.575 14.6031 16.575 14.8938 16.2812L15.7781 15.3969C16.0719 15.1031 16.0719 14.6281 15.7812 14.3344ZM6.5 11C4.29063 11 2.5 9.2125 2.5 7C2.5 4.79063 4.2875 3 6.5 3C8.70938 3 10.5 4.7875 10.5 7C10.5 9.20938 8.7125 11 6.5 11Z"})}),e("defs",{children:e("clipPath",{id:"clip0",children:e("rect",{width:"16",height:"16",fill:"white",transform:"translate(0 0.5)"})})})]})},E=({file:r,onChange:n,onClear:p,accept:c,className:u,imageUrl:i})=>{const{t:m}=N(),t=l.useRef(null),[d,h]=l.useState(!1);l.useEffect(()=>{t!=null&&t.current&&(t.current.value="")},[r]);const g=()=>{t!=null&&t.current&&t.current.click()},f=()=>{if(!a())return typeof r=="string"?r:URL.createObjectURL(r)},a=()=>!!(!r||Array.isArray(r)&&r.length===0),C=s=>{var x,v;(v=(x=s.currentTarget)==null?void 0:x.files)!=null&&v.length&&(h(!0),n(s.currentTarget.files[0]))},o=s=>{s.preventDefault(),s.stopPropagation(),h(!0),n(void 0)},y=s=>{s.preventDefault(),s.stopPropagation(),i&&!d&&window.open(i,"_blank").focus()};return e("div",{className:`group p-2 relative rounded-sm border${u?" "+u:""}`,onClick:g,style:{width:"150px",height:"150px",cursor:"pointer"},children:w("div",{className:"border rounded-sm w-full h-full flex justify-center items-center overflow-hidden",children:[a()&&w("div",{className:"flex flex-col items-center",children:[e(L,{className:"w-8 h-8 mb-2 fill-gray-400"}),e("span",{children:m("upload")})]}),!a()&&e("img",{src:f(),className:"max-w-full h-auto"}),e("input",{type:"file",ref:t,onChange:C,multiple:!1,className:"hidden",accept:c}),!a()&&e("button",{className:"hidden group-hover:flex absolute top-0 right-0 w-8 h-8 bg-gray-800 hover:bg-gray-600 transition-colors items-center justify-center",onClick:o,children:e(b,{className:"w-6 h-6 mr-0 fill-slate-100"})}),i&&!d&&e("button",{className:"hidden group-hover:flex absolute top-0 right-8 w-8 h-8 bg-gray-800 hover:bg-gray-600 transition-colors flex items-center justify-center",onClick:y,children:e(I,{className:"w-6 h-6 fill-slate-100"})})]})})};export{E as I,A as T};
