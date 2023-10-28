import { BrowserRouter, Route, Routes } from "react-router-dom";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
        
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
