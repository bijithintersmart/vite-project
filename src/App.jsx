import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/home";
import AboutUs from "./pages/aboutUs";
import Services from "./pages/services";
import ContactUs from "./pages/contactUs";
import Feature from "./pages/feature";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import ForgotPassword from "./pages/forgotPassword"; // Import ForgotPassword
import PageNotFound from "./pages/404";
import Header from "./components/header";
import Footer from "./components/footer";
import CustomCursor from "./components/CustomCursor";
import { AnimatePresence, motion } from "framer-motion";
import { usePreviousLocation } from "./hooks/usePreviousLocation.js";

const pageOrder = [
  "/",
  "/feature",
  "/services",
  "/about",
  "/contact",
  "/login",
  "/signup",
  "/forgot-password",
];

const PageWrapper = ({ children }) => {
  const location = useLocation();
  const previousLocation = usePreviousLocation();

  let initialX = 0;
  let exitX = 0;

  const currentIndex = pageOrder.indexOf(location.pathname);
  const previousIndex = pageOrder.indexOf(previousLocation?.pathname);

  if (previousLocation && currentIndex !== -1 && previousIndex !== -1) {
    if (currentIndex > previousIndex) {
      initialX = 100;
      exitX = -100;
    } else if (currentIndex < previousIndex) {
      initialX = -100;
      exitX = 100;
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: initialX }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: exitX }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

function App() {
  const location = useLocation();

  return (
    <>
      <CustomCursor />
      <Header />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <PageWrapper>
                <Home />
              </PageWrapper>
            }
          />
          <Route
            path="/about"
            element={
              <PageWrapper>
                <AboutUs />
              </PageWrapper>
            }
          />
          <Route
            path="/services"
            element={
              <PageWrapper>
                <Services />
              </PageWrapper>
            }
          />
          <Route
            path="/contact"
            element={
              <PageWrapper>
                <ContactUs />
              </PageWrapper>
            }
          />
          <Route
            path="/feature"
            element={
              <PageWrapper>
                <Feature />
              </PageWrapper>
            }
          />
          <Route
            path="/login"
            element={
              <PageWrapper>
                <Login />
              </PageWrapper>
            }
          />
          <Route
            path="/signup"
            element={
              <PageWrapper>
                <SignUp />
              </PageWrapper>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <PageWrapper>
                <ForgotPassword />
              </PageWrapper>
            }
          />{" "}
          {/* Add ForgotPassword route */}
          <Route
            path="*"
            element={
              <PageWrapper>
                <PageNotFound />
              </PageWrapper>
            }
          />
        </Routes>
      </AnimatePresence>
      <Footer />
    </>
  );
}

export default App;