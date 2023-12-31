import { useEffect, useState } from "react";
import AnimationWrapper from "../common/page-animation";
import InPageNavigation  from "../components/inpage-navigation.component"; 
import axios from "axios"
import Loader from "../components/loader.component";
import BlogPostCard from "../components/blog-post.component";

const HomePage = () => {

    let [ blogs, setBlog ] = useState(null);

    const fetchLatestBlogs = () => {
        axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/latest-blogs")
        .then(({ data }) => {
            setBlog(data.blogs)
        })
        .catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        fetchLatestBlogs();
    },[])

    return (
        <AnimationWrapper>
            <section className= "h-cover flex justfiy-center gap-10">
                {/* latest blogs*/}
                <div className="w-full">
                    <InPageNavigation routes= {["home", "trending blogs"]} defaultHidden={["trending blogs"]}>

                        <>
                            {
                                blogs == null ? <Loader />
                                :
                                blogs.map((blog, i) => {
                                    return <AnimationWrapper transition={{ duration: 1, delay: i*.1}} key={i}>
                                        <BlogPostCard content={blog} author={blog.author.personal_info }/>
                                    </AnimationWrapper>
                                })
                            }
                        </>

                        <h1>Trending Blogs Here </h1>
                        
                    </InPageNavigation>

                </div>

                {/* latest blogs*/}
                <div>

                </div>

            </section>
        </AnimationWrapper>

       
    )
}

export default HomePage;