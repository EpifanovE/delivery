import{r as x,d as s,j as e}from"./client-182d8dba.js";import{C as b}from"./Checkbox-1ddb5c95.js";import{G as w}from"./GuestLayout-536032f9.js";import{I as n}from"./InputError-9e8a7810.js";import{I as i}from"./InputLabel-27493f36.js";import{P as v}from"./PrimaryButton-4513a5cf.js";import{T as c}from"./TextInput-f11edc02.js";import{_ as N,n as y,f as I}from"./app-44caa45f.js";import{u as k}from"./useTranslation-7f77c7c2.js";function q({status:m,canResetPassword:d}){const{t:a}=k(),{data:t,setData:u,post:p,processing:f,errors:l,reset:g}=N({email:"",password:"",remember:""});x.useEffect(()=>()=>{g("password")},[]);const o=r=>{u(r.target.name,r.target.type==="checkbox"?r.target.checked:r.target.value)},h=r=>{r.preventDefault(),p(route("login"))};return s(w,{children:[e(y,{title:a("login")}),m&&e("div",{className:"mb-4 font-medium text-sm text-green-600",children:m}),s("form",{onSubmit:h,children:[s("div",{children:[e(i,{forInput:"email",value:"Email"}),e(c,{id:"email",type:"email",name:"email",value:t.email,className:"mt-1 block w-full",autoComplete:"username",isFocused:!0,handleChange:o}),e(n,{message:l.email,className:"mt-2"})]}),s("div",{className:"mt-4",children:[e(i,{forInput:"password",value:a("password")}),e(c,{id:"password",type:"password",name:"password",value:t.password,className:"mt-1 block w-full",autoComplete:"current-password",handleChange:o}),e(n,{message:l.password,className:"mt-2"})]}),e("div",{className:"block mt-4",children:s("label",{className:"flex items-center",children:[e(b,{name:"remember",value:t.remember,onChange:o}),e("span",{className:"ml-2 text-sm text-gray-600",children:a("remember_me")})]})}),s("div",{className:"flex items-center justify-end mt-4",children:[d&&e(I,{href:route("password.request"),className:"underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",children:a("forgot_your_password")}),e(v,{className:"ml-4",processing:f,children:a("login")})]})]})]})}export{q as default};