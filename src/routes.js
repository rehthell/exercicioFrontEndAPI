import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";

//import Home from "./Home";
//import Sobre from "./Sobre";
import Titulos from "./Pages/Titulos";

const Rota = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route component={Titulos} path="/titulos" />
            </Routes>
        </BrowserRouter>
    )
}

export default Rota;