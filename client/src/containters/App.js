import React from "react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./Navbar";
import Main from "./Main";

const App = () => {
   return (
      <BrowserRouter>
         <div className="onboarding">
            <Navbar />
            <Main />
         </div>
      </BrowserRouter>
   );
};

export default App;
