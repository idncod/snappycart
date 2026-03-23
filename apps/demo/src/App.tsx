import { useMemo, useState } from 'react';
import { useCart, CartDrawer, CartIcon } from 'snappycart';
import type { CartProduct } from 'snappycart';

import styles from './demo/DemoHome.module.scss';
import { SiteHeader } from './demo/components/SiteHeader/SiteHeader';
import { FruityDemoShop } from './demo/components/FruityDemoShop/FruityDemoShop';
import { Quickstart } from './demo/components/Quickstart/Quickstart';
import { UseCases } from './demo/components/UseCases/UseCases';
import { SiteFooter } from './demo/components/SiteFooter/SiteFooter';

export default function App() {
  const { addItem } = useCart();
  const [open, setOpen] = useState(false);

  const products = useMemo<CartProduct[]>(
    () => [
      { id: 'apple', name: 'Apple', price: 0.6, imageUrl: 'apple.png' },
      { id: 'banana', name: 'Banana', price: 0.4, imageUrl: 'banana.png' },
      { id: 'orange', name: 'Orange', price: 0.55, imageUrl: 'orange.png' },
      { id: 'strawberry', name: 'Strawberries', price: 1.25, imageUrl: 'strawberry.png' },
    ],
    [],
  );

  const handleAddStarterSet = () => {
    addItem(products[0]);
    addItem(products[1], 2);
    addItem(products[2]);
  };

  return (
    <div className={styles.appShell}>
      <SiteHeader
        onOpenCart={() => setOpen(true)}
        links={[
          { label: 'Quickstart', href: '#quickstart' },
          { label: 'Use cases', href: '#use-cases' },
          { label: 'Demo shop', href: '#demo-shop' },
          { label: 'GitHub', href: 'https://github.com/idncod/snappycart', external: true },
          { label: 'npm', href: 'https://www.npmjs.com/package/snappycart', external: true },
        ]}
      />

      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroGrid}>
            <div className={styles.heroLeft}>
              <p className={styles.kicker}>Integration starter</p>
              <h1 className={styles.h1}>snappycart</h1>
              <p className={styles.p}>
                Add items, open the drawer, ship. Use the snippets below to integrate into React or
                Next.js in minutes.
              </p>

              <div className={styles.heroActions}>
                <button className={styles.primaryBtn} type="button" onClick={() => setOpen(true)}>
                  Open cart
                </button>
                <button className={styles.secondaryBtn} type="button" onClick={handleAddStarterSet}>
                  Add starter set
                </button>
              </div>

              <div className={styles.badges}>
                <span className={styles.badge}>React</span>
                <span className={styles.badge}>TypeScript</span>
                <span className={styles.badge}>SCSS</span>
                <span className={styles.badge}>Headless-friendly</span>
              </div>
            </div>

            <div className={styles.heroRight}>
              <div className={styles.card}>
                <div className={styles.cardTitle}>Step 1: Trigger cart actions</div>
                <div className={styles.cardBody}>
                  <div className={styles.miniGrid}>
                    <button
                      type="button"
                      className={styles.miniBtn}
                      onClick={() => addItem(products[0])}
                    >
                      Add Apple
                    </button>
                    <button
                      type="button"
                      className={styles.miniBtn}
                      onClick={() => addItem(products[1], 2)}
                    >
                      Add 2 Bananas
                    </button>
                    <button
                      type="button"
                      className={styles.miniBtn}
                      onClick={() => addItem(products[3])}
                    >
                      Add Strawberries
                    </button>
                    <button type="button" className={styles.miniBtn} onClick={() => setOpen(true)}>
                      Open drawer
                    </button>
                  </div>
                  <div className={styles.tip}>
                    Tip: add items, then open the drawer. Everything here should mirror how users
                    integrate it.
                  </div>
                </div>
              </div>

              <div className={styles.cardMuted}>
                <div className={styles.cardTitle}>What you get</div>
                <div className={styles.cardBody}>
                  <div className={styles.bullets}>
                    <div className={styles.bullet}>
                      <span className={styles.dot} /> CartProvider
                    </div>
                    <div className={styles.bullet}>
                      <span className={styles.dot} /> useCart()
                    </div>
                    <div className={styles.bullet}>
                      <span className={styles.dot} /> CartIcon + CartDrawer
                    </div>
                    <div className={styles.bullet}>
                      <span className={styles.dot} /> Types exported
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="quickstart" className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.h2}>Quickstart</h2>
            <p className={styles.note}>Copy paste, no ceremony.</p>
          </div>
          <Quickstart />
        </section>

        <section id="use-cases" className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.h2}>Use cases</h2>
            <p className={styles.note}>Buttons trigger real cart behavior.</p>
          </div>
          <UseCases products={products} onOpenCart={() => setOpen(true)} />
        </section>

        <section id="demo-shop" className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.h2}>Demo shop</h2>
            <p className={styles.note}>This is the “integration UI” people expect.</p>
          </div>
          <FruityDemoShop onAdd={(p, qty) => addItem(p, qty)} />
        </section>
      </main>

      <SiteFooter />

      <CartIcon onClick={() => setOpen(true)} />
      <CartDrawer open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
