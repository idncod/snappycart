import styles from './SiteHeader.module.scss';

type Link = { label: string; href: string; external?: boolean };

export function SiteHeader({ links, onOpenCart }: { links: Link[]; onOpenCart: () => void }) {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <div className={styles.logo} aria-hidden="true" />
          <div className={styles.brand}>
            <div className={styles.name}>SnappyCart</div>
            <div className={styles.sub}>Dev demo and integration playground</div>
          </div>
        </div>

        <nav className={styles.nav}>
          {links.map((l) => (
            <a
              key={l.label}
              className={styles.link}
              href={l.href}
              target={l.external ? '_blank' : undefined}
              rel={l.external ? 'noreferrer' : undefined}
            >
              {l.label}
            </a>
          ))}
          <button className={styles.cta} type="button" onClick={onOpenCart}>
            Open cart
          </button>
        </nav>
      </div>
    </header>
  );
}
