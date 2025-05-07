import { useEffect } from "react";
import styles from "./Notification.module.scss";

function Notification({ message, type = "error", onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`${styles.notification} ${styles[`notification--${type}`]}`}
    >
      {message}
    </div>
  );
}

export default Notification;
