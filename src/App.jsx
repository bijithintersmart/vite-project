import "./App.css";
import { Link, Route, Routes } from "react-router-dom";
import AboutUS from "./pages/aboutUs";
import Home from "./pages/home";
import ContactUS from "./pages/contactUs";
import "./index.css"; 
import Header from "./components/header";
import Feature from "./pages/feature";
import Services from "./pages/services";
import NotFoundPage from './pages/404'
import Footer from "./components/footer";

function App() {
  return (
    <div className="">
      <Header />
      <main className="">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/feature" element={<Feature />} />
          <Route path="/about" element={<AboutUS />} />
          <Route path="/service" element={<Services />} />
          <Route path="/contact" element={<ContactUS />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
          <Footer/>
      </main>
    </div>
  );
}

export default App;
