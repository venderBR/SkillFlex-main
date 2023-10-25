import React from 'react';
import { BrowserRouter, Link, Route, Router, Routes } from "react-router-dom";
import './App.css';
import Home from "../src/page/Home/home"
import NavBar from './components/navBar/navBar';
import {PageContent} from '../src/components/pageCarousel';
import AppFooter from './components/appFooter/footer';
import { Divider } from 'antd';
import AppRoutes from './Routes';

function App() {
  return (
    <div>
        <PageContent/>
        <AppFooter/>
    </div>
  );
}

export default App;
