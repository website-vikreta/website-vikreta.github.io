import React, { useState, useEffect } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Importing components
import Nav from './components/Nav';
import DotRing from './components/cursor/DotRing';
import Footer from './components/Footer';
import Preload from './components/Preload';

// Importing pages
import HomePage from './pages/HomePage';
import ContactUs from './pages/ContactUs';
import OurWork from './pages/OurWork';
import DetailedWork from './pages/DetailedWork';

// Importing utilities
import { navbarScroll } from './utility/navbarScroll';
import { navbarCTAScroll } from './utility/navbarCTAScroll';

// Importing style
import './styles/main.scss';
import GoTop from './components/GoTop';
import Calculator from './pages/Calculator';

function App() {
   navbarScroll();
   navbarCTAScroll();

   const location = useLocation();
   const [loading, setLoading] = useState(true); // State to manage loading status

   useEffect(() => {
      // Set loading to false when all resources are loaded
      const handleLoad = () => setLoading(false);

      // Check if the document is already loaded
      if (document.readyState === 'complete') {
         setLoading(false);
      } else {
         // Add event listeners for load and timeout
         window.addEventListener('load', handleLoad);
         setTimeout(() => {
            setLoading(false); // Fallback in case of a very slow connection
         });
      }

      return () => {
         window.removeEventListener('load', handleLoad);
      };
   }, []);

   return (
      <div className="App">
         {/* Custom Cursor */}
         <DotRing />

         {/* Navigation Bar */}
         <Nav />

         {/* Conditional rendering of preload screen */}
         {loading ? (
            <Preload />
         ) : (
            <>
               {/* Render content after loading */}
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
                     <Route path="/website-cost-calculator" exact>
                        <Calculator/>
                     </Route>
                  </Switch>

                  {/* Importing Footer */}
                  <Footer />
               </AnimatePresence>
               <Route path="/work/:id">
                  <DetailedWork />
               </Route>
               <GoTop />
            </>
         )}
      </div>
   );
}

export default App;
