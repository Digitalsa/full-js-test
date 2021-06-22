import React from "react";
import Footer from "../Footer/Footer";

const App = ({ children }) => (
  <>
    <main>{children}</main>
    <Footer />
  </>
);

export default App;
