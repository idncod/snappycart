import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import Starfield from '@site/src/components/Starfield';
import LogoBoom from '@site/src/components/LogoBoom';
import InstallCommand from '@site/src/components/InstallCommand';
import styles from './index.module.scss';

export default function Home(): ReactNode {
    return (
        <Layout description="SnappyCart docs for a headless React cart engine with TypeScript and optional UI building blocks.">
            <header className={styles.hero}>
                <Starfield />
                <div className={styles.glow} />
                <div className="container">
                    <div className={styles.grid}>
                        <div className={styles.copy}>
                            <div className={styles.kicker}>Headless cart engine for React</div>
                            <Heading as="h1" className={styles.title}>
                                Ship cart UX that feels custom, not copied
                            </Heading>
                            <p className={styles.subtitle}>
                                SnappyCart gives you the cart brain, typed APIs, persistence, and optional UI building blocks.
                                You keep full control of the look, the flow, and the checkout.
                            </p>

                            <div className={styles.chips}>
                                <span>TypeScript</span>
                                <span>Headless</span>
                                <span>LocalStorage</span>
                                <span>Themeable UI</span>
                            </div>

                            <div className={styles.ctaRow}>
                                <Link className="button button--primary button--lg" to="/docs/intro">
                                    Get started
                                </Link>
                                <Link className="button button--secondary button--lg" to="/docs/api">
                                    API
                                </Link>
                                <Link className="button button--secondary button--lg" to="https://github.com/idncod/snappycart">
  <span className={styles.btnContent}>
    <span className={styles.btnIcon} aria-hidden="true">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path
            d="M12 2C6.48 2 2 6.58 2 12.26c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.1-3.37-1.1-.46-1.2-1.12-1.52-1.12-1.52-.91-.65.07-.64.07-.64 1 .07 1.53 1.07 1.53 1.07.9 1.58 2.36 1.12 2.94.86.09-.67.35-1.12.64-1.37-2.22-.26-4.56-1.15-4.56-5.13 0-1.13.39-2.06 1.03-2.78-.1-.26-.45-1.3.1-2.71 0 0 .85-.28 2.78 1.06.8-.23 1.66-.34 2.52-.35.86.01 1.72.12 2.52.35 1.93-1.34 2.78-1.06 2.78-1.06.55 1.41.2 2.45.1 2.71.64.72 1.03 1.65 1.03 2.78 0 3.99-2.34 4.87-4.57 5.12.36.32.68.95.68 1.92 0 1.39-.01 2.51-.01 2.85 0 .26.18.58.69.48A10.2 10.2 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z"
            fill="currentColor"
        />
      </svg>
    </span>
    GitHub
  </span>
                                </Link>
                            </div>

                                <InstallCommand command="npm i snappycart" />
                        </div>

                        <div className={styles.visual}>
                            <LogoBoom />
                        </div>
                    </div>
                </div>
            </header>
        </Layout>
    );
}
