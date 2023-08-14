// recft_clsx_module_scss
import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Outlet, useNavigate } from "react-router-dom"
import styles from './x_style.module.scss' 
import collectionAPI from '../../API/collectionAPI';

import axios from 'axios'; // Import the axios library

type stateObj = {
   [key: string]: any;
};

type propType = {
   update_stateParentUserSignIn: any;
}


function SignIn() {

   const [form, setForm] = useState({username: "", password: ""});
   const [stateSignInFail, setStateSignInFail] = useState(false);

   const navigate = useNavigate(); //hook dùng để chuyển trang web
   //tạo biến chứa đối tượng, là cú pháp quy định sẵn https request gửi từ front end tới back end, cái đoạn mà thay đổi là đoạn này Bearer ${localStorage.getItem('tokenLoginJWT')}
   const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem('tokenLoginJWT')}`}
   }

   function setSessionWithExpiry(obj: any, sessionName: string, hoursLimit: number) {
      // console.log('obj: ' + JSON.stringify(obj, null, 4));
       // Calculate the expiry time
      var now = new Date();
      var expiryTime = now.getTime() + hoursLimit * 3600000; // Convert hours to milliseconds
   
      // Create an object to store the data and expiry time
      var sessionData = {
         data: obj,
         expiryTime: expiryTime
      };
      // console.log('sessionData: ' + JSON.stringify(sessionData, null, 4));
      // Convert the object to a string
      var serializedObject = JSON.stringify(sessionData);
   
      // Save the object to session storage
      sessionStorage.setItem(sessionName, serializedObject);

   }
   
   function getSession(sessionName: string) {
      // console.log("sessionName getSession: " + JSON.stringify(sessionName, null, 4));
       // Retrieve the serialized object from session storage
      var serializedObject: any = sessionStorage.getItem(sessionName);
   
      // console.log('serializedObject: ' + JSON.stringify(serializedObject, null, 4));
   
      if (serializedObject === null) {
         return null; // Session does not exist
      }
   
      // Convert the serialized object back to an object
      var sessionData = JSON.parse(serializedObject);
   
      // Check if the session has expired
      var now = new Date();
      if (now.getTime() > sessionData.expiryTime) {
         sessionStorage.removeItem(sessionName); // Remove the expired session
         return null; // Session has expired
      }
      // console.log("sessionData.data: " + JSON.stringify(sessionData.data, null, 4));
      return sessionData.data;
   }
   
   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            
      setForm({
         ...form,
         [event.target.name]: event.target.value,
      })
      
   }
   //gửi dữ liệu qua nodejs thông qua thư viên axios, sau khi gửi xong thì load lại data về frontend
   type FormSignInType = {
      username: string;
      password: string;
   }

   const checkSignin = async (form: FormSignInType) => {

      const authHeader = 'Basic ' + btoa(form.username + ':' + form.password);

      try {
         const instance = axios.create({
            baseURL: 'http://localhost:5000',
            headers: {
               'Content-Type': 'application/json',
               'Authorization': authHeader, // Include the Authorization header
            },
         });
         // Make a POST request to the '/login' endpoint using the custom Axios instance
         const response = await instance.post('/login', form);
         console.log('response: ', response);
         if (response.data.hasOwnProperty('token')) {
            const tokenSignIn: string = response.data.token;
            console.log('tokenSignIn: ', tokenSignIn);
            setSessionWithExpiry(tokenSignIn, 'tokenSignIn', 2);
            setStateSignInFail(false);
            navigate("/", { replace: true });   
         } else {
            setStateSignInFail(true);
         }
      } catch (err) {
         console.log('err:', err);
      }
   }//end checkSignin


console.log('stateSignInFail: ', stateSignInFail);
   //hàm này sẽ thay hàm getToken để nếu như đăng nhập đúng usernme và pass thì mới lấy đc accesstoken và lưu vào local Storage
   const handleSubmitSignIn = async (e: React.FormEvent<HTMLFormElement>) => {

      e.preventDefault();

      checkSignin(form);
            
   }//end handleSubmitSignIn

   return (
      <div className={clsx(styles.component_SignIn)}>

         <div className={clsx(styles.formLogin)}>
            <form onSubmit = {handleSubmitSignIn}>
               <h2>SIGN IN</h2>
               <div className={clsx(styles.row)}>
                  <label>username: </label>
                  <input type="text" name="username" value={form.username} onChange={handleChange} /><div></div>
               </div>
               <div className={clsx(styles.row)}>
                  <label>Password: </label>
                  <input type="password" name="password" value={form.password} onChange={handleChange} /><div></div>
               </div>

               <div className={clsx(styles.btnWrapper)}>
                     
                  <button type="submit" >Submit</button>
                  <button type="reset" >Reset</button>
               
               </div>
            </form>
            {
               stateSignInFail &&
               <p style={{ color: 'red' }}>Fail sign in !. username or password is incorrect, Please try again</p>
            }
         </div>
      </div>
   )
}
export default SignIn