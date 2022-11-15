import styles from "./Avatar.module.css";

interface AvatarProps {
  hasBorder?: boolean;
  githubUser: string;
}
export function Avatar({ hasBorder = true, githubUser }: AvatarProps) {
  const githubUrl = "https://github.com/" + githubUser + ".png";
  return (
    <img
      className={hasBorder ? styles.avatarWithBorder : styles.avatar}
      src={githubUrl}
      alt=""
    />
  );
}
