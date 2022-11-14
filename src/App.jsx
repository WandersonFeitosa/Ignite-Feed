import { Header } from "./components/Header";
import { Post } from "./components/Post";

import "./global.css";
import styles from "./App.module.css";
import { Sidebar } from "./components/Sidebar";
import postsInfo from "./Posts.json";
import userInfo from "./User.json";
import { useState } from "react";

const user = userInfo.user;

const posts = postsInfo.posts;

function App() {
  const [newUser, setNewUser] = useState(user);

  function updateUser(newUser) {
    setNewUser(newUser);
  }

  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        <Sidebar
          name={newUser.name}
          role={newUser.role}
          githubUser={newUser.githubUser}
          updateUser={updateUser}
        />
        <main>
          {posts.map((post) => {
            const publishedAt = new Date(post.publishedAt);

            return (
              <Post
                key={post.id}
                author={post.author}
                content={post.content}
                commentsInfo={post.comments}
                publishedAt={publishedAt}
                user={newUser}
              />
            );
          })}
        </main>
      </div>
    </div>
  );
}

export default App;
