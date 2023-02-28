import{d as t,j as e}from"./client-182d8dba.js";import{G as s}from"./GuestLayout-536032f9.js";import{P as a}from"./PrimaryButton-4513a5cf.js";import{_ as d,n as m,f as l}from"./app-44caa45f.js";function y({status:i}){const{post:n,processing:o}=d({});return t(s,{children:[e(m,{title:"Email Verification"}),e("div",{className:"mb-4 text-sm text-gray-600",children:"Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you? If you didn't receive the email, we will gladly send you another."}),i==="verification-link-sent"&&e("div",{className:"mb-4 font-medium text-sm text-green-600",children:"A new verification link has been sent to the email address you provided during registration."}),e("form",{onSubmit:r=>{r.preventDefault(),n(route("verification.send"))},children:t("div",{className:"mt-4 flex items-center justify-between",children:[e(a,{processing:o,children:"Resend Verification Email"}),e(l,{href:route("logout"),method:"post",as:"button",className:"underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",children:"Log Out"})]})})]})}export{y as default};