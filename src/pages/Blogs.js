import { motion } from "framer-motion";
import { pageAnimation, smoothFade, frameParentIvert, frameAnimationIvert } from "../utility/animation";
import React, { useState, useEffect } from "react";
import sanityClient from "../client";
import { Link } from "react-router-dom";
// import { format } from "date-fns";

const Blogs = () => {
  const [allPostsData, setAllPosts] = useState([]);
//how to get anything i want from this api 
  useEffect(() => {

    sanityClient.fetch(
      `*[_type == "post"]{
        title,
        slug,
        body,
        _createdAt,
        mainImage{
        asset->{
          _id,
          url
        }
      }
    }`
    )
      .then((data) => setAllPosts(data))
      .catch(console.error);
  }, []);

  console.log(allPostsData)
  return (
    <motion.div exit="exit" variants={pageAnimation} initial="hidden" animate="show">

      <motion.div variants={frameParentIvert}>
        <motion.div className="animation-frame one" variants={frameAnimationIvert}></motion.div>
        <motion.div className="animation-frame two" variants={frameAnimationIvert}></motion.div>
        <motion.div className="animation-frame three" variants={frameAnimationIvert}></motion.div>
      </motion.div>




      <motion.section className="our-work" variants={smoothFade}>

        <section className="featured-post">
          <h1>featured post</h1>
          <h2> you are viewing {allPostsData? allPostsData.length:"no"} posts</h2>
          {
          allPostsData.map((post)=>{
            return(
              <Link  to={"/blogs/" + post.slug.current} key={post.slug.current}>
              <h2>{post?.title}</h2>
           
                <img src={post?.mainImage?.asset?.url}  alt="" />
              </Link>
            )
          })
          }
        </section>

        <section className="recent-articles">
          recent articles filtered by date
        </section>
        <section className="search-blogs">
          search blogs
        </section>
        <section className="business-growth">
          business growth
        </section>
        <section className="technology">
          Hot picks in technology
        </section>
      </motion.section>
    </motion.div>

  )
}

export default Blogs
