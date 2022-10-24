import { v4 as uuidv4 } from "uuid";
function faqData() {
   return [
      {
         title: "What proportion will a brand-new web site cost?",
         answer: `
            <p className="para">
               Website cost will depends on number of factors, such as number of pages of your website, content you need on your website, different type of services i.e. mailing service, database etc. you need on your website. Though basic cost of one page will be around 500 - 1500 INR. (Not Landing Page)
            </p>
            `,
         id: uuidv4(),
         toggle: true,
      },
      {
         title: "How long will it take to get a new website?",
         answer: `
            <p className="para">
            It will totally depend on the size and the content on the website you want. Development time is directly propotional to the size of your website, complexity of the UI, number of contents as well as Add-ons. You will get to know exact time during the initial communication with us.
            </p>
            `,
         id: uuidv4(),
      },
      {
         title: "Do I even have to be native to figure with you?",
         answer: `
            <p className="para">
               Our team works remotely, so it's easy for us to work with the clients all around the world.
            </p>
            `,
         id: uuidv4(),
      },
      {
         title: "Can you maintain my website for me?",
         answer: `
            <p className="para">
               We will be happy to provide our support to you, in the development as well as maintenance of the website.
            </p>
            `,
         id: uuidv4(),
      },
      {
         title: "Will my website be mobile - friendly?",
         answer: `
            <p className="para">Absolutely! Having a mobile-friendly website is more important than ever! We work hard to ensure your website looks great on a variety of devices.</p>
            `,
         id: uuidv4(),
      },
      {
         title: "Where should my website be hosted?",
         answer: `
            <p className="para">
               We will provide the solutions for hosting services according to your need, you don't have to worry about that.
            </p>
            `,
         id: uuidv4(),
      },
      {
         title: "What if I want assistance on my website down the road?",
         answer: `
            <p className="para">
               We are just an email away. We are always happy to help for your needs.
            </p>
            `,
         id: uuidv4(),
      },
   ];
}

export default faqData;