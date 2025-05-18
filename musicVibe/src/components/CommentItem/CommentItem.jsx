import { Link } from "react-router-dom";
// Components
import LoginImage from "@/assets/images/login.jpg";
// Styles
import styles from "./CommentItem.module.scss";

function CommentItem({ comment }) {
  return (
    <li className={styles.comments__item}>
      <Link
        className={styles.comments__block}
        to={`/musician/${comment.user.id}`}
      >
        <img
          className={styles["comments__block-image"]}
          src={comment.user.avatarUrl}
          alt="Аватарка пользователя"
        />
      </Link>
      <div className={styles.comment}>
        <h4 className={styles.comments__title}>
          <Link to={`/musician/${comment.user.id}`}>{comment.user.name}</Link>
        </h4>
        <p className={styles.comments__paragraph}>{comment.text}</p>
      </div>
    </li>
  );
}

export default CommentItem;
