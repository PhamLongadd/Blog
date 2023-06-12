import { getGlobalData } from "../../utils/global-data";
import {
  getNextPostBySlug,
  getPostBySlug,
  getPreviousPostBySlug,
  postFilePaths,
} from "../../utils/mdx-utils";

import { MDXRemote } from "next-mdx-remote";
import Header from "../../components/Header";
import Nav from "../../components/Nav";
import styles from "./slug.module.css";
import Link from "next/link";

// Custom components/renderers to pass to MDX.
// Since the MDX files aren't loaded by webpack, they have no knowledge of how
// to handle import statements. Instead, you must include components in scope
// here.

export default function PostPage({
  source,
  frontMatter,
  nextPost,
  prevPost,
  globalData,
}) {
  return (
    <div className={styles.wrapper}>
      <Nav />
      <Header name={globalData.name} />
      <article className={styles.article}>
        <h1>{frontMatter.title}</h1>
        {frontMatter.description && <p>{frontMatter.description}</p>}
        <main>
          <article>
            <MDXRemote {...source} />
          </article>
        </main>
        <div className={styles.btn}>
          {prevPost && (
            <Link href={`/posts/${prevPost.slug}`}>
              <div>
                <button>Previous</button>
              </div>
            </Link>
          )}
          {nextPost && (
            <Link href={`/posts/${nextPost.slug}`}>
              <button>Next</button>
            </Link>
          )}
        </div>
      </article>
    </div>
  );
}

export const getStaticProps = async ({ params }) => {
  const globalData = getGlobalData();
  const { mdxSource, data } = await getPostBySlug(params.slug);
  const nextPost = getNextPostBySlug(params.slug);
  const prevPost = getPreviousPostBySlug(params.slug);

  return {
    props: {
      globalData,
      source: mdxSource,
      frontMatter: data,
      prevPost,
      nextPost,
    },
  };
};

export const getStaticPaths = async () => {
  const paths = postFilePaths
    // Remove file extensions for page paths
    .map((path) => path.replace(/\.mdx?$/, ""))
    // Map the path into the static paths object required by Next.js
    .map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};
