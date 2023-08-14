import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Outlet, useNavigate } from "react-router-dom"
import styles from './x_style.module.scss' 
import { useSelector, useDispatch} from 'react-redux';

import X_slide07 from './X_slide07';
import X_slide07_2 from './X_slide07_2';


import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import SignIn from './Signin';

function Techwiz4_layout() {

   const [open, setOpen] = useState(true);
   const listItemSidebar = [
      {
         title: "Model Deploy",
         status: true
      },
      {
         title: "Analytics",
         status: false
      }
   ]
   const [toggle, setToggle] = useState(listItemSidebar);
   const openSidebar: any = () => {
      setOpen(true);
   }
   const closeSidebar: any = () => {
      setOpen(false);
   }

   const makeSelectedItemBlue = () => { //tạo hàm để set cho cái title nào đc click vào nó chuyển status thành true

      let selectedSidebarItem = localStorage.getItem('selectedSidebarItem');

      //cho tất cả status về false lại như ban đầu
      toggle.forEach((obj, index, arr) => {
         obj.status = false;
      });
      //object nào có title trùng với selectedTitleAdminMenu thì cho status là true
      const newToggle = toggle.map(obj => {
      
         if (obj.title === selectedSidebarItem) {
            return {...obj, status: true};
         }
         return obj;
      });
      setToggle(newToggle); //cập nhật lại state toggle bằng cái mảng mới đã chuyển cái status của title đc click vào thành true
   }
   // console.log("toggle: " + JSON.stringify(toggle, null, 4));

   const onClickSidebar = (item: string) => {
      localStorage.setItem('selectedSidebarItem', item); //lưu vào local storage cái title đc click vào, nếu ko lưu thì mỗi lần refresh lại nó mất
      // setWhichSlideOpen(item);
      makeSelectedItemBlue()
   }
   useEffect(() => {
      localStorage.setItem('selectedSidebarItem', "Model Deploy"); //khi refresh lại trang thì cho mặc định ban đầu để cho mục Introduction màu xanh
      makeSelectedItemBlue();
   }, []);

   return (
      <div className={clsx(styles.component_Techwiz4_layout)}>
         <div className={clsx(styles.sidenav, { [styles.openSidebar]: open })}>


               <div className={clsx(styles.iconWrapper)}>

                  <CloseIcon onClick={closeSidebar} className={clsx(styles.closeIcon)} />
               </div>
               {
                  toggle.map((obj, index) => {
                     let title: string = obj.title;
                     let status: Boolean = obj.status;
                     return (
                        <p key={obj.title} onClick={()=>onClickSidebar(title)} className={clsx(styles.item, {[styles.selected]: status})}>{title}</p>
                     )
                  })
               }
         </div>
         <div className={clsx(styles.main, { [styles.moveRight]: open })}>
               <MenuIcon onClick={openSidebar} className={clsx(styles.menuIcon, { [styles.menuIconStatusOpen]: open })} />
          
               {toggle[0].status && <X_slide07/>}
               {toggle[1].status && <X_slide07_2/>}
         </div>
      </div>
   )
}
export default Techwiz4_layout