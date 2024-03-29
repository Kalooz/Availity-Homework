import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import Layout from "./layout/Layout";
import Home from "./home/Home";
import Registration from "./registration/Registration";
import Search from "./registration/Search";
import Lisp from "./lisp/Lisp";
import SQL from "./sql/SQL";
import EDI from "./edi/EDI";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Search />} />
          <Route path="/lisp" element={<Lisp />} />
          <Route path="/sql" element={<SQL />} />
          <Route path="/edi" element={<EDI />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
