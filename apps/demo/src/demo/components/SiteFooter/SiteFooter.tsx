import styles from './SiteFooter.module.scss';

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <div className={styles.title}>Demo Shop</div>
          <div className={styles.muted}>Built to be cloned and integrated fast.</div>
        </div>
        <div className={styles.muted}>Next.js + TypeScript + SCSS Modules</div>
      </div>
    </footer>
  );
}
