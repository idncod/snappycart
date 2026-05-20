import styles from './SiteFooter.module.scss';

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <div className={styles.title}>snappycart demo</div>
          <div className={styles.muted}>
            Headless React cart package with a live demo, integration examples, and docs links.
          </div>
        </div>

        <div className={styles.right}>
          <a
            href="https://snappycart.idncod.com/docs/intro"
            target="_blank"
            rel="noreferrer"
            className={styles.link}
          >
            Docs
          </a>
          <a
            href="https://www.npmjs.com/package/snappycart"
            target="_blank"
            rel="noreferrer"
            className={styles.link}
          >
            npm
          </a>
          <a
            href="https://github.com/idncod/snappycart"
            target="_blank"
            rel="noreferrer"
            className={styles.link}
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
