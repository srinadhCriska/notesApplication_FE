import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import "./App.css";
import { Layout } from "./Layout/Layout";
import { HomePage } from "./pages/Home/Home.page";
import { EachNotesComponent } from "./pages/EachNotes/EachNotes.page";

const App = () => {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/eachNotes" element={<EachNotesComponent />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
