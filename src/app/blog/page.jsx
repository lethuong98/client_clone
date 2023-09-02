import Breadcrumbs from "@/components/common/Breadcrumbs";

import GoToTop from "@/components/home/GoToTop";
import FilterBlog from "@/components/blog/FilterBlog";
import ListBlogs from "@/components/blog/ListBlogs";

const Blog = (props) => {
  return (
    <>
      <div className="mt-[70px]">
        <Breadcrumbs home="/" curent="blog" />
        <FilterBlog>
          <ListBlogs filter={props.searchParams} />
        </FilterBlog>
      </div>
      <GoToTop />
    </>
  );
};

export default Blog;
