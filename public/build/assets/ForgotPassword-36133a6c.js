import{d as r,j as e}from"./client-182d8dba.js";import{G as c}from"./GuestLayout-536032f9.js";import{I as p}from"./InputError-9e8a7810.js";import{P as f}from"./PrimaryButton-4513a5cf.js";import{T as g}from"./TextInput-f11edc02.js";import{_ as h,n as x}from"./app-44caa45f.js";import{u as _}from"./useTranslation-7f77c7c2.js";function P({status:a}){const{t:s}=_(),{data:o,setData:m,post:i,processing:n,errors:l}=h({email:""}),d=t=>{m(t.target.name,t.target.value)},u=t=>{t.preventDefault(),i(route("password.email"))};return r(c,{children:[e(x,{title:s("forgot_your_password")}),e("div",{className:"mb-4 text-sm text-gray-600",children:s("forgot_your_password_message")}),a&&e("div",{className:"mb-4 font-medium text-sm text-green-600",children:a}),r("form",{onSubmit:u,children:[e(g,{id:"password",type:"email",name:"email",value:o.email,className:"mt-1 block w-full",isFocused:!0,handleChange:d}),e(p,{message:l.email,className:"mt-2"}),e("div",{className:"flex items-center justify-end mt-4",children:e(f,{className:"ml-4",processing:n,children:s("email_reset_link")})})]})]})}export{P as default};