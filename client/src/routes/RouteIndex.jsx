import React from 'react';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "../pages/Home.jsx";
import Authen from "../pages/authen/Authen.jsx";

export default function RouterIndex() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/authen" element={<Authen />} />
            </Routes>
        </BrowserRouter>
    )
}