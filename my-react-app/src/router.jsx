import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Home from "./Views/Home/Home";
// import Layout from "./components/Layout";
// import About from "./Views/About/About";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* <Route path="home" element={<Home />} />
          <Route path="about" element={<About />} /> */}
        </Route>
        {/* <Route path="seeAll/:collection" element={<SeeAll />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
