import React from "react";
import { Routes, Route } from "react-router-dom";
import Form from "./Modules/Form/Form";
import Home from "./Modules/Home/Home";
import Header from "./Component/Header/Header";

const Router = () => {
  return (
    <>
    <Header/>
      <Routes>
         
        <Route path="/" element={<Home/>} />
        <Route path="/addOrder" element={<Form />} />
      </Routes>
      </>
  );
};

export default Router;
