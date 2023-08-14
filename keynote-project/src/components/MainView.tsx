// recft_clsx_module_scss
import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Outlet, useNavigate } from "react-router-dom"
import { useSelector, useDispatch} from 'react-redux';
import Techwiz4_layout from './techwiz4/Techwiz4_layout';


function MainView() {


   return (
      <div>
         <Routes> 
    
            <Route path="/" element={<Techwiz4_layout/> } />

         </Routes>
      </div>
   )
}
export default MainView