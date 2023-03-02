import{j as t,d as r,F as a}from"./client-182d8dba.js";import{A as c,P as l}from"./PageTitle-d9e0c608.js";import{n,i as m,f as u}from"./app-44caa45f.js";import{I as C,S as b,E as d,D as f}from"./IndexPage-be597945.js";import{u as o}from"./useTranslation-7f77c7c2.js";import"./Button-aab750b6.js";import"./Table-44503a5c.js";import"./InputLabel-27493f36.js";import"./TextInput-f11edc02.js";import"./InputError-9e8a7810.js";import"./Card-f5048bf7.js";import"./Container-65b3b15c.js";const h=e=>{const{className:s}=e;return t("svg",{className:`${s?" "+s:""}`,viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",children:t("path",{d:"M12 22C10.6167 22 9.31667 21.7373 8.1 21.212C6.88333 20.6873 5.825 19.975 4.925 19.075C4.025 18.175 3.31267 17.1167 2.788 15.9C2.26267 14.6833 2 13.3833 2 12C2 10.6167 2.26267 9.31667 2.788 8.1C3.31267 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.31233 8.1 2.787C9.31667 2.26233 10.6167 2 12 2C13.3833 2 14.6833 2.26233 15.9 2.787C17.1167 3.31233 18.175 4.025 19.075 4.925C19.975 5.825 20.6873 6.88333 21.212 8.1C21.7373 9.31667 22 10.6167 22 12C22 13.3833 21.7373 14.6833 21.212 15.9C20.6873 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6873 15.9 21.212C14.6833 21.7373 13.3833 22 12 22ZM12 20C14.2333 20 16.125 19.225 17.675 17.675C19.225 16.125 20 14.2333 20 12C20 11.1 19.854 10.2333 19.562 9.4C19.2707 8.56667 18.85 7.8 18.3 7.1L7.1 18.3C7.8 18.85 8.56667 19.2707 9.4 19.562C10.2333 19.854 11.1 20 12 20ZM5.7 16.9L16.9 5.7C16.2 5.15 15.4333 4.72933 14.6 4.438C13.7667 4.146 12.9 4 12 4C9.76667 4 7.875 4.775 6.325 6.325C4.775 7.875 4 9.76667 4 12C4 12.9 4.146 13.7667 4.438 14.6C4.72933 15.4333 5.15 16.2 5.7 16.9Z"})})},x=e=>{const{t:s}=o(),i=e.item.is_blocked?s("buttons.unblock"):s("buttons.block");return t(u,{as:"button",className:`text-red-600 hover:text-red-900cursor-pointer p-4 ${e.className}`,href:route("subscribers.block",{subscriber:e.item[e.primaryKey]}),method:"post",onBefore:()=>confirm(s("messages.confirm")),title:i||"",children:t(h,{className:`${e.item.is_blocked?"fill-orange-600":"fill-slate-500"} w-4 h-4`})})},g=e=>r("div",{className:"flex justify-end",children:[t(x,{...e}),t(d,{...e}),t(f,{...e})]}),p=e=>{const{t:s}=o();return r(a,{children:[t(n,{title:s("subscribers")}),t(C,{resource:"subscribers",modelName:"subscriber",items:e.items,columns:[{resource:"id",label:"ID",sortable:!0},{resource:"username",sortable:!0},{resource:"tid",label:"Telegram ID",sortable:!0}],Filters:b,Actions:g})]})};p.layout=e=>t(c,{children:e,...e.props,header:t(l,{children:m.t("subscribers")})});export{p as default};
