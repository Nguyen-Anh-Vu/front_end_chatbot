import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import styles from './x_style.module.scss' 
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Outlet, useNavigate } from "react-router-dom"

import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import AddIcon from '@mui/icons-material/Add';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import EditNoteIcon from '@mui/icons-material/EditNote';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import CategoryIcon from '@mui/icons-material/Category';
import AllInboxIcon from '@mui/icons-material/AllInbox';
import HelpIcon from '@mui/icons-material/Help';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { validatePassword,validateEmail,validatePhone,validateFullName, wait, validateUsername } from '../share/sharedFunction';

import axios from 'axios'; // Import the axios library

import collectionAPI from '../../API/collectionAPI';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

function X_slide07() {
   const listCategories = [
      "toys and games",
      "books and stationery",
      "health and wellness",
      "jewelry and accessories",
      "furniture",
      "electronic",
      "clothing",
      "kitchen",
      "beauty",
      "sport"
   ]
   const generalQuestions = [
      "buy a product",
      "sale a product",
      "Gurantee policies",
      "Returns and Refunds",
      "Account",
      "Payment and Billing",
      "Technical Support",
      "Promotions",
      "Feedback",
      "Top best-selling products",
   ]
   const customerDetails = [
      "create account",
      "sign in",
      "sign out",
      "change password",
      "change email",
      "change account information",
      "account blocked",
      "recover account",
      "my account"
   ]
   const orderList = [
      "my order",
      "Delivery cost",
      "Delivery duration",
      
   ]
 

   const [stateArrCategories, setStateArrCategories] = useState(listCategories);
   const [stateArrGeneralQuestions, setStateArrGeneralQuestions] = useState(generalQuestions);
   const [stateArrCustomerDetails, setStateArrCustomerDetails] = useState(customerDetails);
   const [stateArrOrderList, setStateArrOrderList] = useState(orderList);

   const inputRef = useRef<HTMLInputElement | null>(null); // dùng để focus về ô input

   const [stateStringInput, setStateStringInput] = useState("");
   const handleChange = (event:any) => { setStateStringInput(event.target.value) };//trên return

   const [stateBoolIsOpenDialogChatSmall, setStateBoolIsOpenDialogChatSmall] = useState(false);
   const [stateBoolIsOpenDialogSuggestSmall, setStateBoolIsOpenDialogSuggestSmall] = useState(false);
   const [stateBoolIsOpenDialogChatBig, setStateBoolIsOpenDialogChatBig] = useState(false);

   const wait = (ms:any) => new Promise((resolve) => setTimeout(resolve, ms));

   const openDialogChatSmall = () => {
      setStateBoolIsOpenDialogChatSmall(true);
      setStateBoolIsOpenDialogChatBig(false);
      
      setStateBoolIsOpenDialogSuggestSmall(false);
      toggleDialogSuggestSmall()
   }

   const openDialogChatBig = () => {
   
      setStateBoolIsOpenDialogChatSmall(false);
      setStateBoolIsOpenDialogChatBig(true);
      
      setStateBoolIsOpenDialogSuggestSmall(true);
      toggleDialogSuggestBig()
   
   }
   const clearShadow = () => {
      setStateBoolIsOpenDialogChatSmall(false);
      setStateBoolIsOpenDialogChatBig(false);
      setStateBoolIsOpenDialogSuggestSmall(false);
      setStateBoolBackShadow(false);
      setStateBoolDialogSignup(false)
      setStateBoolDialogSignin(false)

   }

   const [stateBoolSuggestModeSmall, setStateBoolSuggestModeSmall] = useState(false);
   const toggleDialogSuggestSmall = () => {
   
      setStateBoolIsOpenDialogSuggestSmall(!stateBoolIsOpenDialogSuggestSmall);
      setStateBoolSuggestModeSmall(true);
   }
   const toggleDialogSuggestBig = () => {
   
      setStateBoolIsOpenDialogSuggestSmall(!stateBoolIsOpenDialogSuggestSmall);
      setStateBoolSuggestModeSmall(false);
   
   }
   const promptSelected = (prompt:string) => {
      console.log('prompt: ', prompt);
      setStateStringInput(prompt);
      onSendWithParameter(prompt);
   
   }
   // console.log('stateStringInput: ', stateStringInput);
   const [stateStringGroupSelected, setStateStringGroupSelected] = useState<string>('category');
   const switchGroupPrompt = (group:string) => {
      console.log('group: ', group);
      setStateStringGroupSelected(group);
   }
   
   const sampleConversation = [
      {
         "idgroup": 0
      },
      {
         "idmessage": 1,
         "owner": "bot",
         "message": "hello !"
      }
   ]

   function getCurrentDateTimeWithTimezoneOffset() {
      const date = new Date();
      const timezoneOffset = 7 * 60 * 60 * 1000; // +7 timezone offset in milliseconds
      const adjustedDate = new Date(date.getTime() + timezoneOffset);
      const formattedDate = adjustedDate.toISOString().replace("Z", "+07:00");
   
      return formattedDate;
   }
   const [stateArrConversations, setStateArrConversations] = useState<any[]>(sampleConversation);
   const [stateArrGroupConversations, setStateArrGroupConversations] = useState<any[]>([]);

   // ĐÂY LÀ CÁI CHỨA TOKEN GỬI KÈM THEO CÁC TRUY VẤN API GỬI ĐẾN BACK END
   // NHỮNG API NÀO MÀ CẦN PHẢI CÓ TOKEN THÌ MỚI TRUY CẤN ĐƯỢC THÌ PHẢI CÓ CÁI NÀY GỬI KÈM THEO
   // VÍ DỤ: response1 = await collectionAPI.predict(data, config);
   const config = {
      headers: { Authorization: getSession("tokenSignIn")}
   }
// I want to know game and toys
// I want to know game and books
   const arrWrong = [
      "The syntax of your message might be incorrect or not relevant to our e-commerce data. Kindly review it, and thank you!",
      "Your message could potentially have incorrect syntax or may not pertain to our e-commerce data. Please double-check, and thanks!",
      "It's possible that your message contains incorrect syntax or isn't related to our e-commerce data. Please verify and accept our gratitude!",
      "There's a chance your message has the wrong syntax or isn't connected to our e-commerce data. Please reconsider. Thanks!",
      "The syntax in your message might be wrong, or it might not be related to our e-commerce data. Take a look again, and thank you!",
      "It's likely that your message's syntax is incorrect or unrelated to our e-commerce data. We kindly ask you to review it. Thanks!",
      "There's the possibility of incorrect syntax or the message not being relevant to our e-commerce data. Kindly check again. Thank you!",
      "Your message's syntax could be off or not tied to our e-commerce data. Please take another look. Thanks!",
      "It's possible that the syntax in your message is incorrect or not aligned with our e-commerce data. Please review it. Thank you!",
      "Your message may have incorrect syntax or might not be pertinent to our e-commerce data. Kindly verify. Thanks!"
   ];
   const arrRefuse = [
      "You haven't logged in yet, so I won't respond to your query.",
      "Since you haven't signed in, I won't provide an answer to your question.",
      "Your login is pending; hence, I won't address your inquiry.",
      "Due to your absence of authentication, I won't reply to your query.",
      "In the absence of your login, I won't give a response to your question.",
      "you have not signed in yet, therefore I will not answer to your question"
   ]

   const onSend = async () => {
      if(stateStringInput.trim() == ""){
         alert("input can not be empty");
         setStateStringInput('');
         if (inputRef.current) {
            inputRef.current.focus();
         }
         return;
      }

      let token = getSession("tokenSignIn"); // lấy token từ session mà sau khi sign in thành công có đc
      console.log('token: ', token);
      // nếu token == null tức chưa sign in thì báo chưa sign in

      // sdfjhLKhl349(*&)


      const lengthOfArrConversations = stateArrConversations.length;
      const lengthOfGroupConversations = stateArrGroupConversations.length;
      const newMessage = {
         "idmessage": stateArrConversations.length,
         "owner": "user",
         "message": stateStringInput 
      };

      if(token == null){
         const chatbotMessage = {
            "idmessage": lengthOfArrConversations + 1,
            "owner": "bot",
            "message": arrRefuse[Math.floor(Math.random() * arrRefuse.length)]
         };

         let updatedConversations = [...stateArrConversations,newMessage, chatbotMessage];
         updatedConversations[0].idgroup = lengthOfGroupConversations;
         setStateArrConversations(updatedConversations);
         
         setStateStringInput(""); // cho ô input về rỗng ban đầu
         return;
      }



      
      let tagFromPython = "";

      let arrCopy_stateArrConversations = stateArrConversations.slice(0); 
      arrCopy_stateArrConversations.push(newMessage); // thêm message của user vừa nhắn vào 

      // xử lý nếu mảng rỗng
      let data = {};
      let length_arrCopy_stateArrConversations = arrCopy_stateArrConversations.length;

      // xử lý khi có chữ my account cho nó chỉ đến account
      const username = getSession("username");
      console.log('username: ', username);
      if (stateStringInput == "my account"){
         data ={
            "message": username
         }
      }
      else if(stateStringInput == "my order"){
         data ={
            "message": 'order'+username
         }
      }
      else {

         data ={
            "message": stateStringInput
         }
      }

      console.log('data: ', data);
      let response1: any;
      try {
         response1 = await collectionAPI.predict(data, config); // API này có jwt nên phải có token gửi kèm bên trong config
         console.log("response: " + JSON.stringify(response1.data, null, 4));

         tagFromPython = response1.data.answer.tag; // lấy cái tag củ câu hỏi từ python gửi đến

         let botAnswerDontKnow = response1.data.answer;
         let botAnswerKnow = response1.data.answer.response;

         let message = botAnswerKnow != undefined ? botAnswerKnow : botAnswerDontKnow;

         const chatbotMessage = {
            "idmessage": length_arrCopy_stateArrConversations + 1,
            "owner": "bot",
            "message": message
         };

         arrCopy_stateArrConversations.push(chatbotMessage);

      
         
         setStateStringInput(""); // cho ô input về rỗng ban đầu
      }catch(err){
         console.log('err:', err);
      }
      
            await wait(100); // đợi 0.3 giây
            
            // post vào bảng searchmonitor --------------------------------------------------------------------
            let currentTimeSend = getCurrentDateTimeWithTimezoneOffset();
            const dataSeachmonitor = {
               "search": stateStringInput,
               "tag": tagFromPython,
               "searchtime": currentTimeSend
            }
            let response2: any;
            try {
               response2 = await collectionAPI.addsearchmonitor(dataSeachmonitor);
               console.log("response: " + JSON.stringify(response2.data, null, 4));
      
            }catch(err){
               console.log('err:', err);
            }
            await wait(100); // đợi 0.3 giây

      arrCopy_stateArrConversations[0].idgroup = lengthOfGroupConversations;
      setStateArrConversations(arrCopy_stateArrConversations);

   } // end onSend
   
   // tại sao phải có hàm này, hàm này khác gì với onSend ?
   // Vì hàm onSend lấy stateStringInput để gửi đi, tuy nhiên khi cần xử lý cùng lúc như hàm promptSelected thì stateStringInput chưa kịp update nên nó sẽ báo lỗi
   // vì vậy mình cần gán tham số prompt truyền vào trực tiếp cho hàm luôn
   const onSendWithParameter = async (prompt:string) => {

      let token = getSession("tokenSignIn"); // lấy token từ session mà sau khi sign in thành công có đc
      console.log('token: ', token);
      // nếu token == null tức chưa sign in thì báo chưa sign in

      // sdfjhLKhl349(*&)


      const lengthOfArrConversations = stateArrConversations.length;
      const lengthOfGroupConversations = stateArrGroupConversations.length;
      const newMessage = {
         "idmessage": stateArrConversations.length,
         "owner": "user",
         "message": prompt 
      };

      if(token == null){
         const chatbotMessage = {
            "idmessage": lengthOfArrConversations + 1,
            "owner": "bot",
            "message": arrRefuse[Math.floor(Math.random() * arrRefuse.length)]
         };

         let updatedConversations = [...stateArrConversations,newMessage, chatbotMessage];
         updatedConversations[0].idgroup = lengthOfGroupConversations;
         setStateArrConversations(updatedConversations);
         
         setStateStringInput(""); // cho ô input về rỗng ban đầu
         return;
      }



      
      let tagFromPython = "";

      let arrCopy_stateArrConversations = stateArrConversations.slice(0); 
      arrCopy_stateArrConversations.push(newMessage); // thêm message của user vừa nhắn vào 

      // xử lý nếu mảng rỗng
      let data = {};
      let length_arrCopy_stateArrConversations = arrCopy_stateArrConversations.length;

      // xử lý khi có chữ my account cho nó chỉ đến account
      const username = getSession("username");
      console.log('username: ', username);
      if (prompt == "my account"){
         data ={
            "message": username
         }
      }
      else if(prompt == "my order"){
         data ={
            "message": 'order'+username
         }
      }
      else {

         data ={
            "message": prompt
         }
      }

      console.log('data: ', data);
      let response1: any;
      try {
         response1 = await collectionAPI.predict(data, config); // API này có jwt nên phải có token gửi kèm bên trong config
         console.log("response: " + JSON.stringify(response1.data, null, 4));

         tagFromPython = response1.data.answer.tag; // lấy cái tag củ câu hỏi từ python gửi đến

         let botAnswerDontKnow = response1.data.answer;
         let botAnswerKnow = response1.data.answer.response;

         let message = botAnswerKnow != undefined ? botAnswerKnow : botAnswerDontKnow;

         const chatbotMessage = {
            "idmessage": length_arrCopy_stateArrConversations + 1,
            "owner": "bot",
            "message": message
         };

         arrCopy_stateArrConversations.push(chatbotMessage);

      
         
         setStateStringInput(""); // cho ô input về rỗng ban đầu
      }catch(err){
         console.log('err:', err);
      }
      
            await wait(100); // đợi 0.3 giây
            
            // post vào bảng searchmonitor --------------------------------------------------------------------
            let currentTimeSend = getCurrentDateTimeWithTimezoneOffset();
            const dataSeachmonitor = {
               "search": stateStringInput,
               "tag": tagFromPython,
               "searchtime": currentTimeSend
            }
            let response2: any;
            try {
               response2 = await collectionAPI.addsearchmonitor(dataSeachmonitor);
               console.log("response: " + JSON.stringify(response2.data, null, 4));
      
            }catch(err){
               console.log('err:', err);
            }
            await wait(100); // đợi 0.3 giây

      arrCopy_stateArrConversations[0].idgroup = lengthOfGroupConversations;
      setStateArrConversations(arrCopy_stateArrConversations);

   }

   const onEditConversation = async () => {
      console.log("test");
      const idgroupSelected = stateArrConversations[0].idgroup;
      const lengthOfArrConversations = stateArrConversations.length; // lấy chiều dài của mảng đế gán cho idmessage tiếp theo 
      const newMessage = {
         "idmessage": lengthOfArrConversations,
         "owner": "user",
         "message": stateStringInput  // giá trị mà user mới nhập vào ô input
      };

      const data ={"message": stateStringInput }
      let response: any;
      try {
         response = await collectionAPI.predict(data, config); // API này có jwt nên phải có token gửi kèm bên trong config
         console.log("response: " + JSON.stringify(response.data, null, 4));
         
         let botAnswerDontKnow = response.data.answer;
         let botAnswerKnow = response.data.answer.response;

         let message = botAnswerKnow != undefined ? botAnswerKnow : botAnswerDontKnow;

         const chatbotMessage = {
            "idmessage": lengthOfArrConversations + 1,
            "owner": "bot",
            "message": message
         };
      

         let updatedConversations = [...stateArrConversations,newMessage, chatbotMessage];
         // updatedConversations[0].idgroup = lengthOfGroupConversations;
         setStateArrConversations(updatedConversations);
         let arrGroup = stateArrGroupConversations.slice(0); //copy state stateArrGroupConversations
         
         for (let i = 0; i < arrGroup.length; i++) {
            if(arrGroup[i][0].idgroup == idgroupSelected){
               arrGroup[i] = updatedConversations
               break;
            }
         }

         setStateArrGroupConversations(arrGroup);
         
         setStateStringInput(""); // cho ô input về rỗng ban đầu
      }catch(err){
         console.log('err:', err);
      }
   }

   const newChat = () => {

      // ------------------------------------------------------------------dành cho update cái group START
      const idgroupCurrent = stateArrConversations[0].idgroup;

      var arrGroup = stateArrGroupConversations.slice(0); // copy cái group
      for(let i = 0; i < arrGroup.length; i++){
         if(i === idgroupCurrent){

            arrGroup[i] = stateArrConversations;
            setStateArrGroupConversations(arrGroup); // update group
            setStateArrConversations(sampleConversation); //cho conversation về trạng thái ban đầu
            setStateBoolSend(true); // khi nhấn vào new chat thì nút send sẽ chuyển thành nút gọi hàm onSend, tức là tạo cái chat mới

            return; // thoát hàm luôn
         }
      }
      // ------------------------------------------------------------------dành cho update cái group END
      // ------------------------------------------------------------------dành cho ADD NEW cái group START

      // nếu thoát khỏi vòng lặp mà i vẫn ko bằng idgroupCurrent, nghĩa là stateArrConversations là một mảng với idgroup mới, vì vậy lúc này phải thêm vào
      const newArray = [...stateArrGroupConversations, stateArrConversations]; // Add an empty array

      setStateArrGroupConversations(newArray); // Update the state
      
      setStateArrConversations(sampleConversation);

      setStateBoolSend(true); // khi nhấn vào new chat thì nút send sẽ chuyển thành nút gọi hàm onSend, tức là tạo cái chat mới
      // ------------------------------------------------------------------dành cho ADD NEW cái group END

   }
   // console.log('stateArrGroupConversations: ', stateArrGroupConversations);

   const [stateBoolSend, setStateBoolSend] = useState(true);
   const selectGroup = (id:number) => {
      console.log('id: ', id);

      for(let i = 0; i < stateArrGroupConversations.length; i++){
         if(i === id){
            console.log('stateArrGroupConversations[i]: ', stateArrGroupConversations[i]);
            setStateArrConversations(stateArrGroupConversations[i]);
            break;
         }
      }

      setStateBoolSend(false); // khi nhấn vào 1 group nào đó thì nút send sẽ chuyển thành nút gọi hàm onEditConversation, tức là edit cái conversation cũ, chứ ko phải tạo cái mới
      
   }

   const [stateNumIdmessageToEdit, setStateNumIdmessageToEdit] = useState(0);

   const editObjMessage = (idmessage:number) => {
   
      let messageNeedToEdit = stateArrConversations[idmessage].message;
      setStateStringInputEdit(messageNeedToEdit);
      setStateNumIdmessageToEdit(idmessage)
      if (inputRef.current) {
         inputRef.current.focus();
      }

   }
   const [stateStringInputEdit, setStateStringInputEdit] = useState("");
   const handleChangeEdit = (event:any) => { setStateStringInputEdit(event.target.value) };//trên return

   const saveAndSubmit = async () => {
   
      const editMessage = {
         "idmessage": stateNumIdmessageToEdit,
         "owner": "user",
         "message": stateStringInputEdit  // giá trị mà user mới nhập vào ô input
      };

      const data ={"message": stateStringInputEdit }
   
      let response: any;
      try {
         response = await collectionAPI.predict(data, config); // API này có jwt nên phải có token gửi kèm bên trong config

         let botAnswerDontKnow = response.data.answer;
         let botAnswerKnow = response.data.answer.response;

         let message = botAnswerKnow != undefined ? botAnswerKnow : botAnswerDontKnow;

         const chatbotMessage = {
            "idmessage": stateNumIdmessageToEdit + 1,
            "owner": "bot",
            "message": message
         };
         let arrConversation:any = stateArrConversations.slice(0); // copy array
         
         for(let i = 1; i <= arrConversation.length; i++){
            if( i < stateNumIdmessageToEdit){
               continue;
            }
            else if(i == stateNumIdmessageToEdit){
               arrConversation[i] = editMessage;
            }
            else if (i == stateNumIdmessageToEdit+1){
               arrConversation[i] = chatbotMessage;
            }
            else if(i > stateNumIdmessageToEdit+1) {
               break;
            }
         }

         //thằng edit là stateNumIdmessageToEdit, còn bot trả lời là stateNumIdmessageToEdit + 1, 
         // vì vậy phải gữ cái element stateNumIdmessageToEdit + 1, và bỏ các element sau nó
         let lastIndexToKeep = stateNumIdmessageToEdit + 1; 
         const elementsToDelete = stateArrConversations.length - lastIndexToKeep - 1;
         arrConversation.splice(lastIndexToKeep + 1, elementsToDelete);
         setStateArrConversations(arrConversation);

         // cho về lại trạng thái ban đầu
         setStateNumIdmessageToEdit(0);
         setStateStringInputEdit("")

      }catch(err){
         console.log('err:', err);
      }
   }
   const cancelEditMessage = () => {
   
      setStateNumIdmessageToEdit(0)
   
   }
   const handleKeyDown = (event:any) => {
      if (event.keyCode === 13 && stateBoolSend == true) {
         onSend();
      }
      else if(event.keyCode === 13 && stateBoolSend == false){
         onEditConversation();
      }
   };

   const clearChat = () => {
   
      setStateArrConversations(sampleConversation);
   
   }


   const [stateBoolBackShadow, setStateBoolBackShadow] = useState(false);
   const [stateBoolDialogSignin, setStateBoolDialogSignin] = useState(false);
   const [stateBoolDialogSignup, setStateBoolDialogSignup] = useState(false);
   const openDialogSignin = () => {
   
      setStateBoolDialogSignin(true)
      setStateBoolDialogSignup(false)
      // setStateBoolBackShadow(true)
   }
   const openDialogSignup = () => {
   
      setStateBoolDialogSignup(true)
      setStateBoolDialogSignin(false)
      // setStateBoolBackShadow(true)
   
   }
   const onSignOut = () => {
   
      sessionStorage.clear();
   
   }
   // ---------------------------------------------------------------------------------------sign in start
   const [form, setForm] = useState({username: "", password: ""});
   const [stateSignInFail, setStateSignInFail] = useState(false);



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
   
   const handleChangeSignIn = (event: React.ChangeEvent<HTMLInputElement>) => {
            
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
            setSessionWithExpiry(tokenSignIn, 'tokenSignIn', 5);
            setSessionWithExpiry(form.username , 'username', 5);
            setStateBoolDialogSignin(false)

            setStateSignInFail(false);
            alert("Successfull sign in, now you can use feature chat bot assistance. Thanks");
            setStateBoolDialogSignin(false);
         } else {
            setStateSignInFail(true);
         }
      } catch (err) {
         console.log('err:', err);
         setStateSignInFail(true); // khi sign in fail nó sẽ chạy thẳng vào phần catch này luôn, nên mình cho hiện lỗi fail sign ra giao diệnb luôn từ đây

      }
   }//end checkSignin

   //hàm này sẽ thay hàm getToken để nếu như đăng nhập đúng usernme và pass thì mới lấy đc accesstoken và lưu vào local Storage
   const handleSubmitSignIn = async (e: React.FormEvent<HTMLFormElement>) => {

      e.preventDefault();

      checkSignin(form);
            
   }//end handleSubmitSignIn
   // ---------------------------------------------------------------------------------------sign in end
   // ---------------------------------------------------------------------------------------sign up start
   
   const [groupState, setGroupState] = useState({
      username: "",
      fullname: "",
      email: "",
      password: "",
      passwordConfirm: "",
      phone: "",
   });
   const [groupStateError, setGroupStateError] = useState({
      username: "notyet",
      fullname: "notyet",
      email: "notyet",
      password: "notyet",
      passwordConfirm: "notyet",
      phone: "notyet"
   });

   //tạo biến chứa đối tượng, là cú pháp quy định sẵn https request gửi từ front end tới back end, cái đoạn mà thay đổi là đoạn này Bearer ${localStorage.getItem('tokenLoginJWT')}


   const checkUsernameExist = async (email: any) => {
      let findUsernameExisted: any;
      try {
         findUsernameExisted = await collectionAPI.findUsernameExisted(email);
         // console.log("findCandidateEmail: " + JSON.stringify(findCandidateEmail, null, 4));
         
      }catch(err){
         console.log('err:', err);
      }
      await wait(200);

      // if(findCandidateEmail.data == true || findControllerEmail.data == true || findEmployerEmail.data == true){
      //    return true;
      // }
      // else {
      //    return false;
      // }
      if (findUsernameExisted != null || findUsernameExisted != undefined || findUsernameExisted != ""){
         return true;
      }
      else {
         return false;
      }
   }


   const handleChangeInputInSignUpView = (e: any) => {
      const {name, value} = e.target; //gộp 2 dòng trên làm 1, name là attribute name của thẻ <input type="text" name="email"
      
      var trimmedInput = e.target.value.trim();
      // console.log('e.target: ', e.target);
      // console.log('e.target.value.trim(): ', e.target.value.trim());
      // console.log('e.target.value.name: ', e.target.name);
      /*
      - Phải để đoạn code này ở dưới, vì nếu ko có thì nó sẽ ko update state,
      - các đoạn if chỉ thực thi khi validate result là true, nhưng ban đầu mới đánh vài ký tự thì làm sao mà ra true đc
      - 
         setGroupState((prev)=>{
            return {...prev, [name]: value};
         });
      */

      if(e.target.name =='username'){
         const result = validateUsername(trimmedInput);
         console.log('result: ', result);
         if(result){
            // cho cái state error về lại false để nó ko hiện lỗi nữa
            setGroupStateError({
               ...groupStateError,
               username: "noError"
            })

         }
         else if(result == false){

            // lưu ý phải update 2 thuộc tính cùng lúc với nhau, chứ ko phần ra, vì nó ko kịp nhận giá trị ngay trong hàm, phải thoát ra ngoài hàm nó mới nhận
            setGroupStateError({
               ...groupStateError,
               username: "error"
            })
         }
      }
      else if(e.target.name =='fullname'){
         const result = validateFullName(trimmedInput);

         if (result) {
            // Valid full name
            // setGroupState({
            //    ...groupState,
            //    fullname: trimmedInput
            // })
            // cho cái state error về lại false để nó ko hiện lỗi nữa
            setGroupStateError({
               ...groupStateError,
               fullname: "noError"
            })
         } 
         else {
            // Invalid full name
            setGroupStateError({
               ...groupStateError,
               fullname: "error"
            })
         }
      }
      else if(e.target.name =='email'){
         const result = validateEmail(trimmedInput);
         console.log('result: ', result);
         if(result){
            setGroupStateError({
               ...groupStateError,
               email: "noError"
            })
         }
         else {
            // Invalid full name
            setGroupStateError({
               ...groupStateError,
               email: "error"
            })
         }

      }
      else if(e.target.name =='password'){
         const result = validatePassword(trimmedInput);
         if(result){

            setGroupStateError({
               ...groupStateError,
               password: "noError"
            })
         }
         else {
            setGroupStateError({
               ...groupStateError,
               password: "error"
            })
         }
      }
      else if(e.target.name =='passwordConfirm'){
         const result = validatePassword(trimmedInput);
         if(trimmedInput === groupState.password){
            // cho cái state error về lại false để nó ko hiện lỗi nữa
            setGroupStateError({
               ...groupStateError,
               passwordConfirm: "noError"
            })
         }
         else {
            setGroupStateError({
               ...groupStateError,
               passwordConfirm: "error"
            })
         }
      }
      else if(e.target.name =='phone'){
         const result = validatePhone(trimmedInput);
         if(result){
            // Valid password
            setGroupState({
               ...groupState,
               phone: trimmedInput
            })
            // cho cái state error về lại false để nó ko hiện lỗi nữa
            setGroupStateError({
               ...groupStateError,
               phone: "noError"
            })
         }
         else {
            setGroupStateError({
               ...groupStateError,
               phone: "error"
            })
         }
      }

      setGroupState((prev)=>{
         return {...prev, [name]: value};
      });

   
   }


   //gửi dữ liệu qua nodejs thông qua thư viên axios, sau khi gửi xong thì load lại data về frontend
   const postData = async (data: any) => {
      let response: any;
      try {
         response = await collectionAPI.addUser(data);
         console.log("response: " + JSON.stringify(response, null, 4));
         setStateBoolDialogSignup(false)

         alert("Successfull sign up !");
         
      }catch(err){
         console.log('err:', err);
      }
      onReset();
   }

   const handleSubmitSignUp = async (e: React.FormEvent<HTMLFormElement>) => {

      e.preventDefault();

      // kiểm tra xem groupStateError có bất cứ key value nào là error ko, error thì cho return, ko cho đi tiếp
      const hasError = Object.values(groupStateError).some(value => value === "error");

      const result = hasError ? "has error" : "has no error";
      if (result === "has error"){
         return;
      }

      const obj = 
      {
         username: groupState.username,
         fullname: groupState.fullname,
         email: groupState.email,
         password: groupState.password,
         phone: groupState.phone.toString(),
      }
      postData(obj);

   }//end handleSubmitSignUp


   const onReset = () => {
      setGroupState({
         username: "",
         fullname: "",
         email: "",
         password: "",
         passwordConfirm: "",
         phone: ""
      })
      setGroupStateError({
         username: "notyet",
         fullname: "notyet",
         email: "notyet",
         password: "notyet",
         passwordConfirm: "notyet",
         phone: "notyet"
      });
   }
   // ---------------------------------------------------------------------------------------sign up end
   // menu--------
   const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
   const open = Boolean(anchorEl);
   const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
      setStateBoolDialogSignup(false)

      setStateBoolDialogSignin(false)

   };
   const handleClose = () => {
      setAnchorEl(null);
   };
   // menu--------

   // scrolldown auto when new message come-- start
   const bottomRef = useRef<HTMLDivElement | null>(null); // Define with proper type
   const [messages, setMessages] = useState<string[]>([]);

   useEffect(() => {
   // Simulate chat messages flowing in
   const intervalId = setInterval(
      () =>
         setMessages(current => [
         ...current,
         'Lorem ipsum do',
         ]),
      1000,
   );

   // Clear the interval on component unmount
   return () => clearInterval(intervalId);
   }, []);

   useEffect(() => {
   // Scroll to bottom every time messages change
   bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
   }, [messages]);
   // scrolldown auto when new message come-- end

   return (
      <div className={clsx(styles.component_X_slide07)}>

         <h1>E-COMMERCE ASSISTANT CHAT BOTS</h1>
         <div className={clsx(styles.signinWrapper)}>
            {/* <button onClick={openDialogSignin} className={clsx(styles.in)}>Sign in</button>
            <button onClick={openDialogSignup} className={clsx(styles.up)}>Sign up</button>
            <button onClick={openDialogSignup} className={clsx(styles.out)}>Sign out</button> */}
            <div>
               <Button
               id="basic-button"
               aria-controls={open ? 'basic-menu' : undefined}
               aria-haspopup="true"
               aria-expanded={open ? 'true' : undefined}
               onClick={handleClick}
               className={clsx(styles.menu)}
               >
               Sign
               </Button>
               <Menu
               id="basic-menu"
               anchorEl={anchorEl}
               open={open}
               onClose={handleClose}
               MenuListProps={{
                  'aria-labelledby': 'basic-button',
               }}
               >
               <MenuItem onClick={openDialogSignin}>Sign in</MenuItem>
               <MenuItem onClick={openDialogSignup}>Sign up</MenuItem>
               <MenuItem onClick={onSignOut}>Sign out</MenuItem>
               </Menu>
            </div>
         </div>

         <div className={clsx(styles.iconWrapper)} onClick={openDialogChatSmall}>
            <img src="./assets/icon/chatboticon.png" className="avatar" alt="avatar" />
         </div>

         <div className={clsx(styles.backShadow,{[styles.appear]: stateBoolIsOpenDialogChatSmall})} onClick={clearShadow}>
         </div>
         <div className={clsx(styles.backShadow,{[styles.appear]: stateBoolBackShadow})} onClick={clearShadow}>
         </div>
{/* start small */}
         <div className={clsx(styles.dialogChatSmall,{[styles.appear]: stateBoolIsOpenDialogChatSmall})}>
            <div className={clsx(styles.header)}>
               <div className={clsx(styles.left)}>
                  <div className={clsx(styles.iconwrapper)}>
                     
                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" className={clsx(styles.icon)}>
                     <path d="M86.344,197.834a51.767,51.767,0,0,0-41.57,20.058V156.018a8.19,8.19,0,0,0-8.19-8.19H8.19A8.19,8.19,0,0,0,0,156.018V333.551a8.189,8.189,0,0,0,8.19,8.189H36.584a8.189,8.189,0,0,0,8.19-8.189v-8.088c11.628,13.373,25.874,19.769,41.573,19.769,34.6,0,61.922-26.164,61.922-73.843C148.266,225.452,121.229,197.834,86.344,197.834ZM71.516,305.691c-9.593,0-21.221-4.942-26.745-12.5V250.164c5.528-7.558,17.152-12.791,26.745-12.791,17.734,0,31.107,13.082,31.107,34.013C102.623,292.609,89.25,305.691,71.516,305.691Zm156.372-59.032a17.4,17.4,0,1,0,17.4,17.4A17.4,17.4,0,0,0,227.888,246.659ZM273.956,156.7V112.039a13.308,13.308,0,1,0-10.237,0V156.7a107.49,107.49,0,1,0,10.237,0Zm85.993,107.367c0,30.531-40.792,55.281-91.112,55.281s-91.111-24.75-91.111-55.281,40.792-55.281,91.111-55.281S359.949,233.532,359.949,264.062Zm-50.163,17.4a17.4,17.4,0,1,0-17.4-17.4h0A17.4,17.4,0,0,0,309.786,281.466ZM580.7,250.455c-14.828-2.617-22.387-3.78-22.387-9.885,0-5.523,7.268-9.884,17.735-9.884a65.56,65.56,0,0,1,34.484,10.1,8.171,8.171,0,0,0,11.288-2.468c.07-.11.138-.221.2-.333l8.611-14.886a8.2,8.2,0,0,0-2.867-11.123,99.863,99.863,0,0,0-52.014-14.138c-38.956,0-60.179,21.514-60.179,46.225,0,36.342,33.725,41.864,57.563,45.642,13.373,2.326,24.13,4.361,24.13,11.048,0,6.4-5.523,10.757-18.9,10.757-13.552,0-30.994-6.222-42.623-13.579a8.206,8.206,0,0,0-11.335,2.491c-.035.054-.069.108-.1.164l-10.2,16.891a8.222,8.222,0,0,0,2.491,11.066c15.224,10.3,37.663,16.692,59.441,16.692,40.409,0,63.957-19.769,63.957-46.515C640,260.63,604.537,254.816,580.7,250.455Zm-95.928,60.787a8.211,8.211,0,0,0-9.521-5.938,23.168,23.168,0,0,1-4.155.387c-7.849,0-12.5-6.106-12.5-14.245V240.28h20.349a8.143,8.143,0,0,0,8.141-8.143V209.466a8.143,8.143,0,0,0-8.141-8.143H458.594V171.091a8.143,8.143,0,0,0-8.143-8.143H422.257a8.143,8.143,0,0,0-8.143,8.143h0v30.232H399a8.143,8.143,0,0,0-8.143,8.143h0v22.671A8.143,8.143,0,0,0,399,240.28h15.115v63.667c0,27.037,15.408,41.282,43.9,41.282,12.183,0,21.383-2.2,27.6-5.446a8.161,8.161,0,0,0,4.145-9.278Z"/></svg>
                     
                  </div>
                  <FormatListBulletedIcon className={clsx(styles.menu)} onClick={toggleDialogSuggestSmall}/>   
               </div>
               <div className={clsx(styles.right)}>
                  <p className={clsx(styles.clearChat)} onClick={clearChat}>Clear chat</p>
                  <OpenInFullIcon className={clsx(styles.icon)} onClick={openDialogChatBig}/>
               </div>
            </div>
            <div className={clsx(styles.conversation)} >
               {
                  stateArrConversations.slice(1, stateArrConversations.length).map((obj, index) => {
                     if(obj.owner == "bot" && obj.hasOwnProperty('idgroup') == false ){
                        return ( 
                           <div className={clsx(styles.rowLeft)} key={obj.idmessage}>
                              <SmartToyIcon/>
                              <p className={clsx(styles.message)}>
                              {
                                 obj.message.split('/n').map((line:any, index:any) => (
                                 <React.Fragment key={line}>
                                    {line}
                                    <br />
                                 </React.Fragment>
                                 ))
                              }
                              
                              
                              </p>
                           </div>
                        )
                     }
                     else if(obj.owner == "user" && obj.hasOwnProperty('idgroup') == false) {
                        if(stateNumIdmessageToEdit === obj.idmessage){
                           return ( 
                              <>
                                 <div className={clsx(styles.rowRightEdit)} key={obj.idmessage}>
                                    <input type="text" name="input" 
                                       value={stateStringInputEdit} 
                                       onChange={handleChangeEdit} ref={inputRef} onKeyDown={handleKeyDown}  required/>
                                    <div className={clsx(styles.btnWrapper)}>
                                       <button onClick={saveAndSubmit} className={clsx(styles.submit)}>Save & Submit</button>
                                       <button onClick={cancelEditMessage} className={clsx(styles.cancel)}>Cancel</button>
                                       
                                    </div>
                              
                                 </div>
                                 <div className={clsx(styles.clearFloat)}>
                                    
                                 </div>
                              </>
                           )

                        }
                        else {
                           return ( 
                              <>
                                 <div className={clsx(styles.rowRight)} key={obj.idmessage}>
                                    <p className={clsx(styles.message)}>{obj.message}</p>
                                    <EditNoteIcon onClick={()=>editObjMessage(obj.idmessage)} className={clsx(styles.iconEdit)}/>

                                 </div>
                                 <div className={clsx(styles.clearFloat)}>
                                    
                                 </div>
                              </>
                           )
                        }
                     }
                  }) 
               } 
               <div ref={bottomRef} />
            </div>
            <div className={clsx(styles.inputWrapper)}>
               <input type="text" name="fullName" value={stateStringInput} onChange={handleChange} onKeyDown={handleKeyDown}/>
               <SendIcon className={clsx(styles.sendIcon)} onClick={onSend}/>
            </div>
         </div>
         {
            stateBoolIsOpenDialogSuggestSmall&&
            <div className={clsx(styles.suggestSmall,{[styles.appear]: stateBoolIsOpenDialogSuggestSmall}, {[styles.suggestBig]: !stateBoolSuggestModeSmall})}>
               <div className={clsx(styles.header)}>

                  <div className={clsx(styles.box,{[styles.selected]: stateStringGroupSelected === "category"})} onClick={()=>switchGroupPrompt('category')}>
                     <CategoryIcon className={clsx(styles.cat)}/>
                     <p className={clsx(styles.title)}>Categories</p>
                  </div>

                  <div className={clsx(styles.box,{[styles.selected]: stateStringGroupSelected === "general"})} onClick={()=>switchGroupPrompt('general')}>
                     <AllInboxIcon className={clsx(styles.general)}/>
                     <p className={clsx(styles.title)}>General questions</p>
                  </div>
                  <div className={clsx(styles.box,{[styles.selected]: stateStringGroupSelected === "account"})} onClick={()=>switchGroupPrompt('account')}>
                     <AccountCircleIcon className={clsx(styles.account)}/>
                     <p className={clsx(styles.title)}>Customer Details</p>
                  </div>
                  <div className={clsx(styles.box,{[styles.selected]: stateStringGroupSelected === "order"})} onClick={()=>switchGroupPrompt('order')}>
                     <ReceiptLongIcon className={clsx(styles.order)}/>
                     <p className={clsx(styles.title)}>Order</p>
                  </div>
               </div>
               <div className={clsx(styles.question)}>
                  <p className={clsx(styles.heading)}> <HelpIcon className={clsx(styles.icon)}/> You would like to ask about :</p>
                  <div className={clsx(styles.groupQuestions)}>
                     
                     {(() => {
                        if (stateStringGroupSelected === "category") {
                           return (
                              <ol>
                                 {
                                    
                                    stateArrCategories.map((obj, index) => {
                                       return ( 
                                          <li className={clsx(styles.item)} onClick={()=>promptSelected(obj)} key={obj}>{obj}</li>
                                       )
                                    })
                                 }
                              </ol>
                           )
                        }
                        else if (stateStringGroupSelected === "general") {
                           return (
                              <ol>
                                 {
                                    
                                    stateArrGeneralQuestions.map((obj, index) => {
                                       return ( 
                                          <li className={clsx(styles.item)} onClick={()=>promptSelected(obj)} key={obj}>{obj}</li>
                                       )
                                    })
                                 }
                              </ol>
                           )
                        }
                        else if (stateStringGroupSelected === "account"){
                           return (
                              <ol>
                                 {
                                    
                                    stateArrCustomerDetails.map((obj, index) => {
                                       return ( 
                                          <li className={clsx(styles.item)} onClick={()=>promptSelected(obj)} key={obj}>{obj}</li>
                                       )
                                    })
                                 }
                              </ol>
                           )
                        }
                        else if (stateStringGroupSelected === "order"){
                           return (
                              <ol>
                                 {
                                    
                                    stateArrOrderList.map((obj, index) => {
                                       return ( 
                                          <li className={clsx(styles.item)} onClick={()=>promptSelected(obj)} key={obj}>{obj}</li>
                                       )
                                    })
                                 }
                              </ol>
                           )
                        }
                     })()}
                  </div>
               </div>
               <div className={clsx(styles.keyword)}>
                  <p className={clsx(styles.title)} onClick={()=>promptSelected("delivery")}>delivery</p>
                  <p className={clsx(styles.title)} onClick={()=>promptSelected("account")}>account</p>
                  <p className={clsx(styles.title)} onClick={()=>promptSelected("problem")}>problem</p>
               </div>
            </div>
         }
{/* end small */}

{/* start big */}
         <div className={clsx(styles.dialogChatBig,{[styles.appear]: stateBoolIsOpenDialogChatBig})}>
            <div className={clsx(styles.header)}>
               <div className={clsx(styles.left)}>
                  <div className={clsx(styles.iconwrapper)}>
                     
                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" className={clsx(styles.icon)}>
                     <path d="M86.344,197.834a51.767,51.767,0,0,0-41.57,20.058V156.018a8.19,8.19,0,0,0-8.19-8.19H8.19A8.19,8.19,0,0,0,0,156.018V333.551a8.189,8.189,0,0,0,8.19,8.189H36.584a8.189,8.189,0,0,0,8.19-8.189v-8.088c11.628,13.373,25.874,19.769,41.573,19.769,34.6,0,61.922-26.164,61.922-73.843C148.266,225.452,121.229,197.834,86.344,197.834ZM71.516,305.691c-9.593,0-21.221-4.942-26.745-12.5V250.164c5.528-7.558,17.152-12.791,26.745-12.791,17.734,0,31.107,13.082,31.107,34.013C102.623,292.609,89.25,305.691,71.516,305.691Zm156.372-59.032a17.4,17.4,0,1,0,17.4,17.4A17.4,17.4,0,0,0,227.888,246.659ZM273.956,156.7V112.039a13.308,13.308,0,1,0-10.237,0V156.7a107.49,107.49,0,1,0,10.237,0Zm85.993,107.367c0,30.531-40.792,55.281-91.112,55.281s-91.111-24.75-91.111-55.281,40.792-55.281,91.111-55.281S359.949,233.532,359.949,264.062Zm-50.163,17.4a17.4,17.4,0,1,0-17.4-17.4h0A17.4,17.4,0,0,0,309.786,281.466ZM580.7,250.455c-14.828-2.617-22.387-3.78-22.387-9.885,0-5.523,7.268-9.884,17.735-9.884a65.56,65.56,0,0,1,34.484,10.1,8.171,8.171,0,0,0,11.288-2.468c.07-.11.138-.221.2-.333l8.611-14.886a8.2,8.2,0,0,0-2.867-11.123,99.863,99.863,0,0,0-52.014-14.138c-38.956,0-60.179,21.514-60.179,46.225,0,36.342,33.725,41.864,57.563,45.642,13.373,2.326,24.13,4.361,24.13,11.048,0,6.4-5.523,10.757-18.9,10.757-13.552,0-30.994-6.222-42.623-13.579a8.206,8.206,0,0,0-11.335,2.491c-.035.054-.069.108-.1.164l-10.2,16.891a8.222,8.222,0,0,0,2.491,11.066c15.224,10.3,37.663,16.692,59.441,16.692,40.409,0,63.957-19.769,63.957-46.515C640,260.63,604.537,254.816,580.7,250.455Zm-95.928,60.787a8.211,8.211,0,0,0-9.521-5.938,23.168,23.168,0,0,1-4.155.387c-7.849,0-12.5-6.106-12.5-14.245V240.28h20.349a8.143,8.143,0,0,0,8.141-8.143V209.466a8.143,8.143,0,0,0-8.141-8.143H458.594V171.091a8.143,8.143,0,0,0-8.143-8.143H422.257a8.143,8.143,0,0,0-8.143,8.143h0v30.232H399a8.143,8.143,0,0,0-8.143,8.143h0v22.671A8.143,8.143,0,0,0,399,240.28h15.115v63.667c0,27.037,15.408,41.282,43.9,41.282,12.183,0,21.383-2.2,27.6-5.446a8.161,8.161,0,0,0,4.145-9.278Z"/></svg>
                     
                  </div>
                  <FormatListBulletedIcon className={clsx(styles.menu)} onClick={toggleDialogSuggestBig}/>   
               </div>
               <div className={clsx(styles.right)}>
                  <p className={clsx(styles.clearChat)} onClick={clearChat}>Clear chat</p>
                  <CloseFullscreenIcon className={clsx(styles.icon)} onClick={openDialogChatSmall}/>
               </div>
            </div>
            <div className={clsx(styles.main)}>
               <div className={clsx(styles.sideBarConversation)}>
                  <div className={clsx(styles.addNewWrapper)}>
                     <AddIcon/>
                     <button onClick={newChat}>New Chat</button>
                  </div>
                  <div className={clsx(styles.divider)}>
                     
                  </div>
                  <div className={clsx(styles.groupConversation)}>
                     <h3>Conversations List</h3>

                     {
                        stateArrGroupConversations.map((arr, index) => {
                           // console.log('arr: ', arr);
                           return ( 
                              <div className={clsx(styles.row)} key={arr[0].idgroup} onClick={()=>selectGroup(arr[0].idgroup)}>
                                 <ChatBubbleOutlineIcon className={clsx(styles.icon)}/>
                                 <p className={clsx(styles.item)}>{arr[2].message}</p>
                              </div>
                           )
                        })
                     }
                  </div>
               </div>
               <div className={clsx(styles.right)}>
                  <div className={clsx(styles.conversation)}>
                     
                  {
                     stateArrConversations.slice(1, stateArrConversations.length).map((obj, index) => {
                        if(obj.owner == "bot" && obj.hasOwnProperty('idgroup') == false ){
                           return ( 
                              <div className={clsx(styles.rowLeft)} key={obj.idmessage}>
                                 <SmartToyIcon className={clsx(styles.icon)}/>
                                 <p className={clsx(styles.message)}>
                                    {
                                       obj.message.split('/n').map((line:any, index:any) => (
                                       <React.Fragment key={index}>
                                          {line}
                                          <br />
                                       </React.Fragment>
                                       ))
                                    }
                                 </p>
                              </div>
                           )
                        }
                        else if(obj.owner == "user" && obj.hasOwnProperty('idgroup') == false) {
                           if(stateNumIdmessageToEdit === obj.idmessage){
                              return ( 
                                 <>
                                    <div className={clsx(styles.rowRightEdit)} key={obj.idmessage}>
                                       <input type="text" name="input" 
                                       value={stateStringInputEdit} 
                                       onChange={handleChangeEdit} onKeyDown={handleKeyDown} ref={inputRef} required/>
                                       <div className={clsx(styles.btnWrapper)}>
                                          <button onClick={saveAndSubmit} className={clsx(styles.submit)}>Save & Submit</button>
                                          <button onClick={cancelEditMessage} className={clsx(styles.cancel)}>Cancel</button>
                                          
                                       </div>
   
                                    </div>
                                    <div className={clsx(styles.clearFloat)}>
                                       
                                    </div>
                                 </>
                              )

                           }
                           else {
                              return ( 
                                 <>
                                    <div className={clsx(styles.rowRight)} key={obj.idmessage}>
                                       <p className={clsx(styles.message)}>{obj.message}</p>
                                       <EditNoteIcon onClick={()=>editObjMessage(obj.idmessage)} className={clsx(styles.iconEdit)}/>
   
                                    </div>
                                    <div className={clsx(styles.clearFloat)}>
                                       
                                    </div>
                                 </>
                              )
                           }
                        }
                     }) 
                  } 
                  </div>
                  <div className={clsx(styles.inputWrapper)}>
                     
                     <input type="text" name="fullName" value={stateStringInput} onChange={handleChange} onKeyDown={handleKeyDown}  required/>
                     {
                        stateBoolSend == true ? 
                        <SendIcon className={clsx(styles.sendIcon)} onClick={onSend}/>
                        :
                        <SendIcon className={clsx(styles.sendIcon)} onClick={onEditConversation}/>

                     }
                  </div>
               </div>
            </div>
         </div>
{/* end big */}
         

         {
            stateBoolDialogSignin &&
            <div className={clsx(styles.component_SignIn)}>

               <div className={clsx(styles.formLogin)}>
                  <form onSubmit = {handleSubmitSignIn}>
                     <h2>SIGN IN</h2>
                     <div className={clsx(styles.row)}>
                        <label>username: </label>
                        <input type="text" name="username" value={form.username} onChange={handleChangeSignIn} /><div></div>
                     </div>
                     <div className={clsx(styles.row)}>
                        <label>Password: </label>
                        <input type="password" name="password" value={form.password} onChange={handleChangeSignIn} /><div></div>
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
         }

         {
            stateBoolDialogSignup &&
            <div className={clsx(styles.component_SignUp)}>


            <form onSubmit = {handleSubmitSignUp} className={clsx(styles.formSignUp)}>
               <h2>SIGN UP</h2>
            {/* --------------------------------------------------------------- */}

               <div className={clsx(styles.row)}>

                  <label>username: </label>
               
                  <input type="text" name="username" value={groupState.username} onChange={handleChangeInputInSignUpView}  required/>

               </div>
               {groupStateError.username === "error" && 
                  <div className={clsx(styles.row, styles.error)}>
                     <label></label>
                     <span className={clsx(styles.right)}>
                        <span>Username contain only alphabet and number, not contain special characters</span>
                     </span>
                  </div>
               }
            {/* --------------------------------------------------------------- */}

               <div className={clsx(styles.row)}>

                  <label>Full name: </label>
               
                  <input type="text" name="fullname" value={groupState.fullname} onChange={handleChangeInputInSignUpView} required/>

               </div>
               {groupStateError.fullname === "error" && 
                  <div className={clsx(styles.row, styles.error)}>
                     <label></label>
                     <span className={clsx(styles.right)}>
                        <span>Full name can not leave blank and has at least 5 characters</span>
                     </span>
                  </div>
               }
            {/* --------------------------------------------------------------- */}

               <div className={clsx(styles.row)}>

                  <label>Email: </label>

                  <input type="text" name="email" value={groupState.email} onChange={handleChangeInputInSignUpView} required/>
               </div>
               {groupStateError.email == "error" && 
                  <div className={clsx(styles.row, styles.error)}>
                     <label></label>
                     <span className={clsx(styles.right)}>
                        <span>Email can not leave blank and has proper format</span>
                     </span>
                  </div>
               }

            {/* --------------------------------------------------------------- */}

               <div className={clsx(styles.row)}>

                  <label>Password: </label>

                  <input type="password" name="password" value={groupState.password} onChange={handleChangeInputInSignUpView} required/>
               </div>
               {groupStateError.password == "error" && 
                  <div className={clsx(styles.row, styles.error)}>
                     <label></label>
                     <span className={clsx(styles.right)}>
                        <span>Password must have minimum 8 characters, maximum 20, including 1 uppercase, 1 lowercase, 1 number, 1 special character and no space between. Example: sdfjhLKhl349(*&)</span>
                     </span>
                  </div>
               }
            {/* --------------------------------------------------------------- */}
               <div className={clsx(styles.row)}>

                  <label>Password confirm: </label>

                  <input type="password" name="passwordConfirm" value={groupState.passwordConfirm} onChange={handleChangeInputInSignUpView} required/>
               </div>
               {groupStateError.passwordConfirm == "error" && 
                  <div className={clsx(styles.row, styles.error)}>
                     <label></label>
                     <span className={clsx(styles.right)}>
                        <span>Password confirm must be the same with password</span>
                     </span>
                  </div>
               }
            {/* --------------------------------------------------------------- */}
               <div className={clsx(styles.row)}>

                  <label>Phone: </label>

                  <input type="number" name="phone" value={groupState.phone} onChange={handleChangeInputInSignUpView} required/>
               </div>
               {groupStateError.phone == "error" && 
                  <div className={clsx(styles.row, styles.error)}>
                     <label></label>
                     <span className={clsx(styles.right)}>
                        <span>Phone must be valid numbers</span>
                     </span>
                  </div>
               }

            {/* --------------------------------------------------------------- */}

               <div className={clsx(styles.btnWrapper)}>
                  
                  <button type="submit" >Submit</button>
                  {/* <button type="reset" >Reset</button> */}
                  <button type="reset" onClick={onReset}>Reset</button>
               </div>

               <p className={clsx(styles.already)}>
                  Already have an account ? Click here to
                  <span><Link className={clsx(styles.link)} to="/signin"> sign In</Link></span>
               </p>
            </form>
            </div>
         }
     
      </div>
   )
}
export default X_slide07

