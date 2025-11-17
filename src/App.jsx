import React from "react";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router";
import CreateCategory from "./pages/category/CreateCategory";
import CreateBanner from "./pages/banner/CreateBanner";
import BannerList from "./pages/banner/BannerList";
import EditBanner from "./pages/banner/EditBanner";
import CategoryList from "./pages/category/CategoryList";
import EditCategory from "./pages/category/EditCategory";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            {/* ===================== Banner Routes ===================== */}
            <Route path="/create-banner" element={<CreateBanner />} />
            <Route path="/all-banner" element={<BannerList />} />
            <Route path="/edit-banner" element={<EditBanner />} />

            {/* ===================== Category Routes ===================== */}
            <Route path="/create-category" element={<CreateCategory />} />
            <Route path="/all-category" element={<CategoryList />} />
            <Route path="/edit-category" element={<EditCategory />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
