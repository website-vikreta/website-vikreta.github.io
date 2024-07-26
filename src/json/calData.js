
function calData() {
  return [
    {
      name:"type",
      isLoaded:false,
      visibleOnlyIf:null,
      question:"What are you looking for?",
      questionType:"radio",
      data:[
        {
          name:"newWebsite",
          title:"New Website",
          cost:0,
          additionalTime:0,
          visibleAfterLoad:"typeOfWebsite",
        },
        {
          name:"revamp",
          title:"Revamp",
          cost:0,
          additionalTime:0,
          visibleAfterLoad:"typeOfWebsite",
        },
        
      ]
      
    },
      {
        name: "typeOfWebsite",
        isLoaded: false,
        visibleOnlyIf: null,
        question:"What kind of website are you looking for?",
        questionType: "dropdown",
        onChange: "handleTypeChange",
        data: [
          {
            name: "businessWebsite",
            title: "Business / Informatic Website",
            cost: 0,
            additionalTime: 5,
            visibleAfterLoad: "platformForBusinessWebsite",
          },
          {
            name: "blog",
            title: "Blog",
            cost: 0,
            additionalTime: 4,
            visibleAfterLoad: "platformForBlog",
          },
          {
            name: "eCommerce",
            title: "E-Commerce",
            cost: 0,
            additionalTime: 5,
            visibleAfterLoad: "platformForECommerce",
          },
        ],
      },
      {
        name: "platformForBusinessWebsite",
        isLoaded: false,
        visibleOnlyIf: null,
        questionType: "dropdown",
        question:"What platform are you looking for?",
        onChange:"handlePlatformChange",
        data:[
            {
              name: "framer",
              title: "Framer",
              cost: 1200,
              additionalTime: 1,
              visibleAfterLoad: "noOfPages",
            },
            {
              name: "wordPress",
              title: "Word Press",
              cost: 1000,
              additionalTime: 0,
              visibleAfterLoad: "noOfPages",
            },
            {
                name: "squarespace",
                title: "Squarespace",
                cost: 1000,
                additionalTime: 0,
                visibleAfterLoad: "noOfPages",
            },
            {
                name: "webFlow",
                title: "Web Flow",
                cost: 1200,
                additionalTime: 0,
                visibleAfterLoad: "noOfPages",
            },
            {
              name: "customDevelopment",
              title: "Custom Development",
              cost: 2000,
              additionalTime: 1,
              visibleAfterLoad: "noOfPages",
            },
            {
                name: "wix",
                title: "Wix",
                cost: 1000,
                additionalTime: 0,
                visibleAfterLoad: "noOfPages",
            },
            {
              name: "squarespace",
              title: "Squarespace",
              cost: 1000,
              additionalTime: 0,
              visibleAfterLoad: "noOfPages",
          },
    
          ],
        },
      {
        name: "platformForBlog",
        isLoaded: false,
        visibleOnlyIf: null,
        questionType: "dropdown",
        question:"What platform are you looking for?",
        onChange:"handlePlatformChange",
        data: [
              {
                name: "wordPress",
                title: "Word Press",
                cost: 1000,
                additionalTime: 0,
                visibleAfterLoad: "noOfPages",
              },
              {
                name: "customDevelopment",
                title: "Custom Development",
                cost: 2000,
                additionalTime: 1,
                visibleAfterLoad: "noOfPages",
              },
              {
                  name: "blogger",
                  title: "Blogger",
                  cost: 500,
                  additionalTime: 0,
                  visibleAfterLoad: "noOfPages",
              },  
          ],
        },
      {
        name: "platformForECommerce",
        isLoaded: false,
        visibleOnlyIf: null,
        questionType: "dropdown",
        question:"What platform are you looking for?",
        onChange:"handlePlatformChange",
        data: [
          {
            name: "woocommerce",
            title: "Woo-Commerce",
            cost: 1000,
            additionalTime: 0,
            visibleAfterLoad: "operatingLocation",
          },
          {
            name: "shopify",
            title: "Shopify",
            cost: 1200,
            additionalTime: 0,
            visibleAfterLoad: "operatingLocation",
          },
          {
            name: "customDevelopment",
            title: "Custom Development",
            cost: 3000,
            additionalTime: 1,
            visibleAfterLoad: "operatingLocation",
          },
        ],
      },
      {
        name:"operatingLocation",
        isLoaded:false,
        questionType:"radio",
        question:"Where do you want to sell your products?",
        onChange:"handleLocationChange",
        data:[
            {
                name:"singleCountry",
                title:"Single Country",
                cost: 0,
                additionalTime: 0,
                visibleAfterLoad:"noOfProduct"
            },
            {
                name:"globally",
                title:"Globally",
                cost:20000,
                additionalTime:1,
                visibleAfterLoad:"noOfProduct"
            },
        ]
      },
      {
        name:"noOfProduct",
        isLoaded:false,
        questionType:"dropdown",
        question:"How many products do you think the website will have?",
        onChange:"handleNumberOfProductChange",
        data:[
            {
                name:"1-50",
                title:"1 to 50",
                cost: 0,
                additionalTime:0,
                visibleAfterLoad:"noOfPages"
            },
            {   
                name:"50-100",
                title:"50 to 100",
                cost:100,
                additionalTime:1,
                visibleAfterLoad:"noOfPages"
            },
            {
                name:"100-200",
                title:"100 to 200",
                cost:300,
                additionalTime:1,
                visibleAfterLoad:"noOfPages"
            },
            {
                name:"200-500",
                title:"200 to 500",
                cost:500,
                additionalTime:2,
                visibleAfterLoad:"noOfPages"
            },
            {
                name:"above500",
                title:"500 +",
                cost:1000,
                additionalTime:2,
                visibleAfterLoad:"noOfPages"
            },
        ]
      },
      {
        name:"noOfPages",
        isLoaded:false,
        questionType:"dropdown",
        question:"How many pages do you think your website will have?",
        onChange:"handleNoOfPagesChange",
        data:[
            {
                name:"0-10",
                title:"0 to 10",
                cost:0,
                additionalTime:0,
                visibleAfterLoad:"designStyle"
            },
            {
                name:"10-20",
                title:"10 to 20",
                cost:300,
                additionalTime:1,
                visibleAfterLoad:"designStyle"
            },
            {
                name:"20-50",
                title:"20 to 50",
                cost:1000,
                additionalTime:2,
                visibleAfterLoad:"designStyle"
            },
            {
              name:"50-100",
              title:"50 to 100",
              cost:1200,
              additionalTime:3,
              visibleAfterLoad:"designStyle"
          },
            {
                name:"above100",
                title:"100 +",
                cost:3000,
                additionalTime:4,
                visibleAfterLoad:"designStyle"
            },
        ]
      },
      {
        name:"designStyle",
        isLoaded:false,
        questionType:"dropdown",
        question:"What type of website design you are looking for?",
        onChange:"handleDesignChange",
        data:[
            {
                name:"simple",
                title:"Simple",
                cost:0,
                additionalTime:0,
                visibleAfterLoad:"contentAssist"
            },
            {
                name:"simpleYetAttractive",
                title:"Simple yet Attractive",
                cost:500,
                additionalTime:0,
                visibleAfterLoad:"contentAssist"
            },
            {
                name:"moderatelyStyled",
                title:"Moderately Styled",
                cost:800,
                additionalTime:1,
                visibleAfterLoad:"contentAssist"
            },
            {
                name:"highEnd",
                title:"High End",
                cost:1000,
                additionalTime:1,
                visibleAfterLoad:"contentAssist"
            },
            {
              name:"worldClass",
              title:"World Class",
              cost:3000,
              additionalTime:4,
              visibleAfterLoad:"contentAssist"
          },
        ]
      },
      {
        name:"contentAssist",
        isLoaded:false,
        questionType:"radio",
        question:"Do you need content/images assistance?",
        onChange:"handleContentAssistChange",
        data:[
            {
                name:"yes1",
                title:"Yes, I would love to",
                cost:300,
                additionalTime:0,
                visibleAfterLoad:"rank"
            },
            {
                name:"no1",
                title:"No, I'll provide it",
                cost:0,
                additionalTime:0,
                visibleAfterLoad:"rank"
            }
        ]
      },
      {
        name:"rank",
        isLoaded:false,
        questionType:"dropdown",
        question:"Do you want to rank your website on google?",
        onChange:"handleDesignChange",
        data:[
            {
                name:"onPage",
                title:"Yes, but only on page SEO",
                cost:0,
                additionalTime:0,
                visibleAfterLoad:"responsive"
            },
            {
                name:"integrated",
                title:"Yes, integrated with all necessary tools & on page SEO",
                cost:100,
                additionalTime:0,
                visibleAfterLoad:"responsive"
            },
            {
                name:"dedicated",
                title:"Dedicated SEO for each page",
                cost:500,
                additionalTime:1,
                visibleAfterLoad:"responsive"
            },
        ]
      },
      {
        name:"responsive",
        isLoaded:false,
        questionType:"radio",
        question:"Do you want to make your website responsive?",
        onChange:"handleResponsiveChange",
        data:[
            {
                name:"yes",
                title:"Yes",
                cost:300,
                additionalTime:1,
                visibleAfterLoad:"cms"
            },
            {
                name:"no",
                title:"No",
                cost:0,
                additionalTime:0,
                visibleAfterLoad:"cms"
            }
        ]
      },
      {
        name:"cms",
        isLoaded:false,
        questionType:"dropdown",
        question:"Do you need CMS(Content Management System)?",
        onChange:"handleCmsChange",
        data:[
            {
                name:"no",
                title:"No",
                cost:0,
                additionalTime:0,
                visibleAfterLoad:"timeline"
            },
            {
                name:"yesMinimal",
                title:"Yes, but minimal",
                cost:400,
                additionalTime:0,
                visibleAfterLoad:"timeline"
            },
            {
                name:"yesModerate",
                title:"Yes, but moderate",
                cost:500,
                additionalTime:1,
                visibleAfterLoad:"timeline",
            },
            {
                name:"yesCustom",
                title:"Yes, I need the complete dedicated CMS for my website",
                cost:1000,
                additionalTime:4,
                visibleAfterLoad:"timeline"
            }
        ]
      },
    ];
}


export default calData;
