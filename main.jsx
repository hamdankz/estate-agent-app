import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import App from "./MyPages/App.jsx";
import Search from "./MyPages/Search.jsx";
import Favourites from "./MyPages/Favourites.jsx";
import PropertyPage1 from "./MyPages/PropertyPages/PropertyPage1.jsx";
import PropertyPage2 from "./MyPages/PropertyPages/PropertyPage2.jsx";
import PropertyPage3 from "./MyPages/PropertyPages/PropertyPage3.jsx";
import PropertyPage4 from "./MyPages/PropertyPages/PropertyPage4.jsx";
import PropertyPage5 from "./MyPages/PropertyPages/PropertyPage5.jsx";
import PropertyPage6 from "./MyPages/PropertyPages/PropertyPage6.jsx";
import PropertyPage7 from "./MyPages/PropertyPages/PropertyPage7.jsx";

import { PropertyProvider } from "./Context/PropertyContext.jsx";

import "./App.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PropertyProvider>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/search" element={<Search />} />
          <Route path="/favourites" element={<Favourites />} />

          <Route path="/property/prop1" element={<PropertyPage1 />} />
          <Route path="/property/prop2" element={<PropertyPage2 />} />
          <Route path="/property/prop3" element={<PropertyPage3 />} />
          <Route path="/property/prop4" element={<PropertyPage4 />} />
          <Route path="/property/prop5" element={<PropertyPage5 />} />
          <Route path="/property/prop6" element={<PropertyPage6 />} />
          <Route path="/property/prop7" element={<PropertyPage7 />} />
        </Routes>
      </Router>
    </PropertyProvider>
  </React.StrictMode>
);
