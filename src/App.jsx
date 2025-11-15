import React from "react";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router";
import CreateCategory from "./pages/category/CreateCategory";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="/create-category" element={<CreateCategory />} />
            <Route path="/all-category" element={"all category"} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
