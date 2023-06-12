import Nav from "../components/Nav";
import Header from "../components/Header";
import Link from "next/link";
import styles from "./index.module.css";

import { getGlobalData } from "../utils/global-data";
import { getPosts } from "../utils/mdx-utils";

export default function Home({ posts, globalData }) {
  return (
    <div className={styles.wrapper}>
      <Nav />
      <Header name={globalData.name} />
      <main className={styles.main}>
        <h3>{globalData.blogTitle}</h3>
        <ul>
          {posts.map((post) => (
            <li key={post.filePath}>
              <Link href={`/posts/${post.filePath.replace(/\.mdx?$/, "")}`}>
                <div>
                  {post.data.date && <p>{post.data.date}</p>}
                  <h2>{post.data.title}</h2>
                  {post.data.description && <p>{post.data.description}</p>}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export function getStaticProps() {
  const posts = getPosts();
  const globalData = getGlobalData();

  return { props: { posts, globalData } };
}
