import{r as _,j as r,d as s}from"./client-182d8dba.js";import{I as p}from"./InputError-9e8a7810.js";import{T as c}from"./TextInput-f11edc02.js";import{_ as v}from"./app-44caa45f.js";import{C as b,b as y,c as I,a as N,d as x}from"./Card-f5048bf7.js";import{I as l,L as u,F as i}from"./EditPage-6acf2f0c.js";import{B as F}from"./Button-aab750b6.js";import{u as P}from"./useTranslation-7f77c7c2.js";function H(){const m=_.useRef(null),w=_.useRef(null),{t:e}=P(),{data:t,setData:n,errors:o,put:C,reset:d,processing:g,recentlySuccessful:S}=v({current_password:"",password:"",password_confirmation:""});return r(b,{children:s("form",{onSubmit:a=>{a.preventDefault(),C(route("password.update"),{preserveScroll:!0,onSuccess:()=>d(),onError:()=>{var f,h;o.password&&(d("password","password_confirmation"),(f=m.current)==null||f.focus()),o.current_password&&(d("current_password"),(h=w.current)==null||h.focus())}})},children:[r(y,{children:r(I,{children:e("password")})}),s(N,{children:[s(l,{children:[r(u,{children:e("current_password")}),s(i,{children:[r(c,{id:"current_password",ref:w,value:t.current_password,handleChange:a=>n("current_password",a.target.value),type:"password",className:"mt-1 block w-full",autoComplete:"current-password"}),r(p,{message:o.current_password,className:"mt-2"})]})]}),s(l,{children:[r(u,{children:e("new_password")}),s(i,{children:[r(c,{id:"password",ref:m,value:t.password,handleChange:a=>n("password",a.target.value),type:"password",className:"mt-1 block w-full",autoComplete:"new-password"}),r(p,{message:o.password,className:"mt-2"})]})]}),s(l,{children:[r(u,{children:e("confirm_password")}),s(i,{children:[r(c,{id:"password_confirmation",value:t.password_confirmation,handleChange:a=>n("password_confirmation",a.target.value),type:"password",className:"mt-1 block w-full",autoComplete:"new-password"}),r(p,{message:o.password_confirmation,className:"mt-2"})]})]})]}),r(x,{children:r(F,{type:"submit",variant:"primary",processing:g,children:e("buttons.save")})})]})})}export{H as default};
