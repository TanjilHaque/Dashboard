import React from "react";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router";
import CreateCategory from "./pages/category/CreateCategory";
import CreateBanner from "./pages/banner/CreateBanner";
import BannerList from "./pages/banner/BannerList";
import EditBanner from "./pages/banner/EditBanner";
import CategoryList from "./pages/category/CategoryList";
import EditCategory from "./pages/category/EditCategory";
import CreateSubCategory from "./pages/subCategory/CreateSubCategory";
import SubCategoryList from "./pages/subCategory/SubCategoryList";
import EditSubCategory from "./pages/subCategory/EditSubCategory";
import CreateBrand from "./pages/brand/CreateBrand";
import BrandList from "./pages/brand/BrandList";
import EditBrand from "./pages/brand/EditBrand";
import CreateProduct from "./pages/product/CreateProduct";
import ProductList from "./pages/product/ProductList";
import EditProduct from "./pages/product/EditProduct";
import CreateVariant from "./pages/variant/CreateVariant";
import VariantList from "./pages/variant/VariantList";
import EditVariant from "./pages/variant/EditVariant";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            {/* ===================== Banner Routes ===================== */}
            <Route path="/create-banner" element={<CreateBanner />} />
            <Route path="/all-banner" element={<BannerList />} />
            <Route path="/edit-banner/:id" element={<EditBanner />} />

            {/* ===================== Category Routes ===================== */}
            <Route path="/create-category" element={<CreateCategory />} />
            <Route path="/all-category" element={<CategoryList />} />
            <Route path="/edit-category/:id" element={<EditCategory />} />

            {/* ===================== Sub-category Routes ===================== */}
            <Route
              path="/create-subCategory"
              element={
                <CreateSubCategory
                  categories={[
                    { _id: "1", name: "Electronics" },
                    { _id: "2", name: "Clothing" },
                    { _id: "3", name: "Shoes" },
                  ]}
                />
              }
            />
            <Route path="/all-subCategory" element={<SubCategoryList />} />
            <Route path="/edit-subCategory/:id" element={<EditSubCategory />} />

            {/* ===================== Brand Routes ===================== */}
            <Route path="/create-brand" element={<CreateBrand />} />
            <Route path="/all-brand" element={<BrandList />} />
            <Route path="/edit-brand/:id" element={<EditBrand />} />

            {/* ===================== Product Routes ===================== */}
            <Route path="/create-product" element={<CreateProduct />} />
            <Route path="/all-product" element={<ProductList />} />
            <Route path="/edit-product/:id" element={<EditProduct />} />

            {/* ===================== Variant Routes ===================== */}
            <Route path="/create-variant" element={<CreateVariant />} />
            <Route path="/all-variant" element={<VariantList />} />
            <Route path="/edit-variant/:id" element={<EditVariant />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
