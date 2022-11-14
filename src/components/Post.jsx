import { format, formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { v4 as uuidv4 } from "uuid";

import styles from "./Post.module.css";
import { Comment } from "./Comment";
import { Avatar } from "./Avatar";
import { useState } from "react";

export function Post({ author, publishedAt, content, commentsInfo, user }) {
  const publishedDateFormated = format(
    publishedAt,
    "d 'de' LLLL 'às' HH:mm'h'",
    {
      locale: ptBR,
    }
  );

  const publishedDateRelative = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true,
  });

  const [comments, setComments] = useState(commentsInfo);

  const [newCommentText, setNewCommentText] = useState("");

  function handleNewCommentChange() {
    event.target.setCustomValidity("");
    setNewCommentText(event.target.value);
  }

  function handleCreateNewComment() {
    event.preventDefault();
    const actualDate = new Date().toISOString();
    console.log(actualDate);
    const newID = uuidv4();
    const formContent = event.target.comment.value;
    const newCommentInfo = {
      id: newID,
      content: formContent,
      likes: 0,
      githubUser: user.githubUser,
      nameUser: user.name,
      date: actualDate,
    };
    setComments([newCommentInfo, ...comments]);

    setNewCommentText("");
  }

  function deleteComment(commentToDelete) {
    const commentsWithouDeletedOne = comments.filter((comment) => {
      return comment.id != commentToDelete;
    });
    setComments(commentsWithouDeletedOne);
  }

  const isNewCommentEmpty = newCommentText.length == 0;

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar githubUser={author.githubUser} />

          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>
        <time
          title={publishedDateFormated}
          dateTime={publishedAt.toISOString()}
        >
          {publishedDateRelative}
        </time>
      </header>

      <div className={styles.content}>
        {content.map((line) => {
          if (line.type == "paragraph") {
            return <p key={uuidv4()}>{line.content}</p>;
          } else if (line.type == "link") {
            return (
              <p key={uuidv4()}>
                <a target={"_blank"} href={line.url}>
                  {line.content}
                </a>
              </p>
            );
          }
        })}
      </div>

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>
        <textarea
          name="comment"
          placeholder="Deixe um comentário"
          onChange={handleNewCommentChange}
          value={newCommentText}
          required
        />
        <button type="submit" disabled={isNewCommentEmpty}>
          Publicar
        </button>
      </form>

      <div className={styles.commentList}>
        {comments.map((comment) => {
          return (
            <Comment
              key={comment.id}
              comentInfo={comment}
              onDeleteComment={deleteComment}
            />
          );
        })}
      </div>
    </article>
  );
}
