// importing components
import Nav from "./components/Nav";
import DotRing from "./components/cursor/DotRing";
import Footer from "./components/Footer";

// importing pages
import HomePage from "./pages/HomePage";
import ContactUs from "./pages/ContactUs";
import OurWork from "./pages/OurWork";
import DetailedWork from "./pages/DetailedWork";
import Blogs from "./pages/Blogs";
import OnePost from "./pages/OnePost";
// importing utilities
import { navbarScroll } from "./utility/navbarScroll";
import { navbarCTAScroll } from "./utility/navbarCTAScroll";

// import router
import { Route, Switch, useLocation } from 'react-router-dom';

// framer
import { AnimatePresence } from "framer-motion";

// importing style
import "./styles/main.scss";
import GoTop from "./components/GoTop";



function App() {
   navbarScroll();
   navbarCTAScroll();

   const location = useLocation();

   return (
      <div className="App">
         {/* Custom Cursor */}
         <DotRing />

         {/* Navigation Bar */}
         <Nav />

         {/* importing pages */}
         <AnimatePresence exitBeforeEnter>
            <Switch location={location} key={location.pathname}>
               <Route path="/" exact>
                  <HomePage />
               </Route>
               <Route path="/work" exact>
                  <OurWork />
               </Route>
               <Route path="/contact" exact>
                  <ContactUs />
               </Route>
               <Route path="/blogs/:slug" exact>
                  <OnePost />
               </Route>
               <Route path="/blogs" exact>
                  <Blogs />
               </Route>

            </Switch>

            {/* Importing Footer */}
            <Footer />
         </AnimatePresence>
         <Route path="/work/:id">
            <DetailedWork />
         </Route>
         <GoTop />
      </div>
   );
}

export default App;
