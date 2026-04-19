import styles from './SiteHeader.module.scss';
import { useRepoStats } from '../../../hooks/useRepoStats';

type Link = { label: string; href: string; external?: boolean };

type SiteHeaderProps = {
  links: Link[];
  onOpenCart: () => void;
};

const REPO = {
  owner: 'idncod',
  name: 'snappycart',
  href: 'https://github.com/idncod/snappycart',
};

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.statIcon}>
      <path
        fill="currentColor"
        d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
      />
    </svg>
  );
}

function ForkIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.statIcon}>
      <path
        fill="currentColor"
        d="M7 5a3 3 0 1 0-2 2.82V10a5 5 0 0 0 5 5h1v1.18a3 3 0 1 0 2 0V15h1a5 5 0 0 0 5-5V7.82a3 3 0 1 0-2 0V10a3 3 0 0 1-3 3h-1V7.82a3 3 0 1 0-2 0V13h-1a3 3 0 0 1-3-3V7.82A3 3 0 0 0 7 5"
      />
    </svg>
  );
}

export function SiteHeader({ links, onOpenCart }: SiteHeaderProps) {
  const { stats, isLoading } = useRepoStats(REPO.owner, REPO.name);

  return (
    <header className={styles.header} data-testid="site-header">
      <div className={styles.inner}>
        <div className={styles.left}>
          <img
            src="/snappycart_logo.svg"
            alt="snappycart logo"
            className={styles.logo}
            data-testid="site-logo"
          />

          <div className={styles.brandWrap}>
            <div className={styles.brand}>
              <div className={styles.name}>snappycart</div>
              <div className={styles.sub}>Headless React cart</div>
            </div>

            <a
              href={REPO.href}
              target="_blank"
              rel="noreferrer"
              className={styles.repoBadge}
              data-testid="repo-badge"
              aria-label="snappycart GitHub repository"
            >
              <span className={styles.repoName}>{REPO.name}</span>

              <span className={styles.repoStats}>
                <span className={styles.repoStat} data-testid="repo-stars">
                  <StarIcon />
                  <span>{isLoading ? '...' : (stats?.stars ?? '-')}</span>
                </span>

                <span className={styles.repoStat} data-testid="repo-forks">
                  <ForkIcon />
                  <span>{isLoading ? '...' : (stats?.forks ?? '-')}</span>
                </span>
              </span>
            </a>
          </div>
        </div>

        <nav className={styles.nav} data-testid="site-nav">
          {links.map((l) => (
            <a
              key={l.label}
              className={styles.link}
              href={l.href}
              target={l.external ? '_blank' : undefined}
              rel={l.external ? 'noreferrer' : undefined}
              data-testid={`nav-link-${l.label.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {l.label}
            </a>
          ))}

          <button
            className={styles.cta}
            type="button"
            onClick={onOpenCart}
            data-testid="open-cart-button"
          >
            Open cart
          </button>
        </nav>
      </div>
    </header>
  );
}
