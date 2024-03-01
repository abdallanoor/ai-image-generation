import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { logo, logoo } from "./assets";
import { Home, CreatePost } from "./pages";
const App = () => {
  return (
    <BrowserRouter>
      <div className="w-full sm:w-[90%] m-auto">
        <header className="w-full flex justify-between items-center bg-[#1d2023] px-3 py-4 ">
          <Link to="/" className="fill-black">
            <img src={logo} alt="logo" className="w-24 object-contain" />
          </Link>
          {/* <Link
          to="/create-post"
          className=" font-medium bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Create
        </Link> */}
          <Link
            to="/create-post"
            className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 text-slate-400 transition-colors"
          >
            Create
          </Link>
        </header>
        <main className="p-5 sm:p-8  mb-7 sm:rounded-2xl border border-[#ffffff0f] shadow-[0_4px_12px_rgba(0,0,0,.1)]  bg-[#292c31] min-h-[calc(100vh-73px)]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-post" element={<CreatePost />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
