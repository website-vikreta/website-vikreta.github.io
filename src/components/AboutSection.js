// importing assets
import NumberImg from "../assets/numbers-svg.svg";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const AboutSection = () => {

   const [offset, setOffset] = useState(0);

   useEffect(() => {
      const onScroll = () => setOffset(window.pageYOffset);
      window.removeEventListener('scroll', onScroll);
      window.addEventListener('scroll', onScroll, { passive: true });
      return () => window.removeEventListener('scroll', onScroll);
   }, []);



   let totalProjects = 36;
   let totalWebProjects = 31;
   let totalClientsServed = 28;
   let totalOngoingProjects = 3;

   const [projectsCompleted, setprojectsCompleted] = useState(0);
   const projectCounter = (start, end) => {

      if (start === end) return;

      let timer = setInterval(() => {
         start += 1;
         setprojectsCompleted(start)

         if (start === end) clearInterval(timer)
      }, 100);
   }

   const [webProjects, setWebProjects] = useState(0);
   const webProjectCounter = (start, end) => {

      if (start === end) return;

      let timer = setInterval(() => {
         start += 1;
         setWebProjects(start)

         if (start === end) clearInterval(timer)
      }, 100);
   }

   const [clientsServed, setClientsServed] = useState(0);
   const clientCounter = (start, end) => {

      if (start === end) return;

      let timer = setInterval(() => {
         start += 1;
         setClientsServed(start)

         if (start === end) clearInterval(timer)
      }, 200);
   }

   const [onGoingProjects, setOnGoingProjects] = useState(0);
   const onGoingCounter = (start, end) => {

      if (start === end) return;

      let timer = setInterval(() => {
         start += 1;
         setOnGoingProjects(start)

         if (start === end) clearInterval(timer)
      }, 200);
   }

   if (offset > 300 && offset < 650) {                   //changed offset upper bound
      projectCounter(projectsCompleted, totalProjects);   //changed the start from 0->current value, so that it won't start to count each time from 0
      webProjectCounter(webProjects, totalWebProjects);
      clientCounter(clientsServed, totalClientsServed);
      onGoingCounter(onGoingProjects, totalOngoingProjects);
      setOffset(0);
   }

   return (
      <section className="about-us" id={"aboutUs"} >
         <div className="numbers">
            <div className="card" >
               <img src={NumberImg} alt="" className="image" />
               <h1 className="number">{projectsCompleted}</h1>
               <p className="text">Projects Completed</p>
            </div>
            <div className="card" >
               <img src={NumberImg} alt="" className="image" />
               <h1 className="number">{webProjects}</h1>
               <p className="text">Web Projects</p>
            </div>
            <div className="card" >
               <img src={NumberImg} alt="" className="image" />
               <h1 className="number">{clientsServed}</h1>
               <p className="text">Clients Served</p>
            </div>
            <div className="card">
               <img src={NumberImg} alt="" className="image" />
               <h1 className="number">{onGoingProjects}</h1>
               <p className="text">Ongoing Projects</p>
            </div>
         </div>

         <div className="wrapper">
            <div className="left">
               <div className="vert-col one"></div>
               <div className="vert-col two"></div>
               <div className="vert-col three"></div>
               <div className="vert-col four"></div>
            </div>
            <div className="right">
               <h2 className="heading">
                  About Us
               </h2>
               <div>
                  <p className="para">
                     Website Vikreta is committed to provide web development services. We design, build professional website/web-applications according to the need of clients; as well as we help them to build their presence through digital marketing and much more.
                  </p>
                  <p className="para">
                     We have completed 2+ years in the IT industry and hoping for many more. Every business requires impressive and attractive impact on the internet and we are thrilled to provide it. We are dedicated to design and develop verity of web products. With highest commitment and customer focus, we are known to deliver reliable web solutions.
                  </p>
                  <p className="para">
                     We believe to deliver solutions that meet customer needs, business and budget expectations.
                  </p>
               </div>
               <Link to="/work" className="awesome-link">Explore Our Work</Link>
            </div>
         </div>
      </section >
   )
}

export default AboutSection;