export const getGlobalData = () => {
  const name = process.env.BLOG_NAME
    ? decodeURI(process.env.BLOG_NAME)
    : "Gridsome Blog";
  const blogTitle = process.env.BLOG_TITLE
    ? decodeURI(process.env.BLOG_TITLE)
    : "A simple blog designed with Gridsome";

  return {
    name,
    blogTitle,
  };
};
