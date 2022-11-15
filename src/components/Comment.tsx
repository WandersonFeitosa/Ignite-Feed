import { format, formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { ThumbsUp, Trash } from "phosphor-react";
import { useState } from "react";
import { Avatar } from "./Avatar";
import styles from "./Comment.module.css";
import { CommentsInfo } from "./Post";

interface CommentProps {
  comentInfo: CommentsInfo;
  onDeleteComment: (comment: string) => void;
}

export function Comment({ comentInfo, onDeleteComment }: CommentProps) {
  const likesAmmount = comentInfo.likes;
  const [likeCount, setLikeCount] = useState(likesAmmount);
  const [liked, setLiked] = useState(false);
  function handleDeleteComment() {
    onDeleteComment(comentInfo.id);
  }

  function handleLikeComment() {
    setLikeCount(likeCount + 1);
    setLiked(true);
  }
  const publishedAt = new Date(comentInfo.date);
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

  return (
    <div className={styles.comment}>
      <Avatar hasBorder={false} githubUser={comentInfo.githubUser} />
      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>{comentInfo.nameUser}</strong>

              <time
                title={publishedDateFormated}
                dateTime={publishedAt.toISOString()}
              >
                {publishedDateRelative}
              </time>
            </div>

            <button onClick={handleDeleteComment} title="Deletar Comentário">
              <Trash size={24} />
            </button>
          </header>
          <p>{comentInfo.content}</p>
        </div>
        <footer>
          <button onClick={handleLikeComment} disabled={liked}>
            <ThumbsUp />
            Aplaudir
            <span>{likeCount}</span>
          </button>
        </footer>
      </div>
    </div>
  );
}
