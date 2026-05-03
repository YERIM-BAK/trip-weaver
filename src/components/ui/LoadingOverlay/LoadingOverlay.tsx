import styles from "./LoadingOverlay.module.scss";

interface LoadingOverlayProps {
  message?: string;
}

function LoadingOverlay({ message = "로딩중" }: LoadingOverlayProps) {
  return (
    <div className={styles.overlay} aria-label={message}>
      <div className={styles.box}>
        <div className={styles.spinner} aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <p className={styles.message}>{message}</p>
      </div>
    </div>
  );
}

export default LoadingOverlay;
