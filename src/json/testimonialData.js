// Importing Images
import RudraGhodke from "../assets/Testimonials/Rudra_Ghodke.jpg";
import BenoitMarcell from "../assets/Testimonials/Benoit_Marcell.jpg";
import JohnKim from "../assets/Testimonials/John_Kim.jpg";
import SangHunYan from "../assets/Testimonials/Sang_Hun_Yan.jpg";
import AbhinavSingh from "../assets/Testimonials/Abhinav_Singh.jpg";
import StaceyBae from "../assets/Testimonials/Stacey_Bae.jpg";
import FirstKode from "../assets/Testimonials/FirstKode.jpeg";
import MetaThumbz from "../assets/Testimonials/MetaThumbz.png";
import FionaLi from "../assets/Testimonials/Fiona_Li.png";

// importing packages
import { v4 as uuidv4 } from "uuid";

// actual data
function testimonialData() {
   return [
      {
         review: "They were very professional. Team was timely, design was great and they did above and beyond my request.",
         userName: "Stacey Bae",
         userDes: "Developer at Archmodal Classrooms.",
         image: StaceyBae,
         country: "United States of America.",
         id: uuidv4(),
      },
      {
         review: "Great to work with. Very skillful. Not a lot of UXUI designers have aesthetic and visual design taste like Website Vikreta!",
         userName: "Fiona Li",
         userDes: "Senior product designer & manager",
         image: FionaLi,
         country: "Hong Kong",
         id: uuidv4(),
      },
      {
         review: "It's been over a year that Website Vikreta is providing us IT Development Services and we are very satisfied with the kind of work they have accomplished. The quality of service was the best and amazing the support was provided post completion of projects. The team is very cooperative and always delivers what is promised.",
         userName: "Rudra Ghodke",
         userDes: "CEO & Co-founder, BoomPanda",
         image: RudraGhodke,
         country: "India",
         id: uuidv4(),
      },
      {
         review: "It was my second time working with Website Vikreta. They finished the project within the given time. Even if I don't explain to them the design I want, they knows exactly what style of design I want. I will definitely work again with them on the future projects.",
         userName: "Sang Hyun Han",
         userDes: "Full stack enginner at Cozmo Realty",
         image: SangHunYan,
         country: "United States",
         id: uuidv4(),
      },
      {
         review: "They understood exactly what I wanted and gave it to me. Very stylish designs and also does a lot of research to make sure the work is perfect. I’ll recomment them not only because their work is good but they are easy going. They listen to you, they co-operate & communicated.",
         userName: "Benoit Marcell",
         userDes: "Owner of Elevagechiotspug",
         image: BenoitMarcell,
         country: "France",
         id: uuidv4(),
      },
      {
         review: "Timely delivery and upmost quality, all time support is what impressed me most",
         userName: "Rupesh Shetty",
         userDes: "FirstKode",
         image: FirstKode,
         country: "France",
         id: uuidv4(),
      },
      {
         review: "Feedback/Review for websitevikreta: They provide one of the best web development services ou there. The team conpletes each project by giving personal attention to the smallest details. We really love working with websitevikreta and will recommend everyone to contact them for any tech development need.",
         userName: "Rudra Ghodke",
         userDes: "Founder - MetaThumbz",
         image: MetaThumbz,
         country: "India",
         id: uuidv4(),
      },
      {
         review: "They have excellent design skills. They quickly prototyped the design I had in mind and then programmed it using modern CSS3/HTML5/SVG technologies. They adjusted well with changing requirements as we iterated through the design work. I look forward to working with Website Vikreta again and highly recommend them for your next frontend project.",
         userName: "Abhinav Singh",
         userDes: "Co-founder - JAXL, India",
         image: AbhinavSingh,
         country: "India",
         id: uuidv4(),
      },
      {
         review: "Website Vikreta did really nice work. They have really fast hands. They finished our new website design in the given time. They always responded quickly and has a really good sense of design. I will rehire them for future projects for sure.",
         userName: "John Kim",
         userDes: "CEO - Champion Lenders",
         image: JohnKim,
         country: "United States",
         id: uuidv4(),
      },
   ];
}

export default testimonialData;