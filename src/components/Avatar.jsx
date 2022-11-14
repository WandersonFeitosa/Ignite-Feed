import styles from "./Avatar.module.css";

export function Avatar({ hasBorder = true, githubUser }) {
  const githubUrl = "https://github.com/" + githubUser + ".png";
  return (
    <img
      className={hasBorder ? styles.avatarWithBorder : styles.avatar}
      src={githubUrl}
      alt=""
    />
  );
}
