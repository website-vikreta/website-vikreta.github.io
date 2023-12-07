// importing components
import Nav from "./components/Nav";
import DotRing from "./components/cursor/DotRing";
import Footer from "./components/Footer";

// importing pages
import HomePage from "./pages/HomePage";
import ContactUs from "./pages/ContactUs";
import OurWork from "./pages/OurWork";
import DetailedWork from "./pages/DetailedWork";

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
