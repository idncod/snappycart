import { useState } from 'react';
import { Check, Copy, ExternalLink } from 'lucide-react';
import styles from './Quickstart.module.scss';

type CopyButtonProps = {
  value: string;
};

function CopyButton({ value }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }

  return (
    <button type="button" className={styles.copyButton} onClick={handleCopy}>
      {copied ? <Check size={16} /> : <Copy size={16} />}
      <span>{copied ? 'Copied' : 'Copy'}</span>
    </button>
  );
}

export function Quickstart() {
  const installCode = `npm i snappycart`;

  const wireCode = `import 'snappycart/styles.css';
import { CartProvider } from 'snappycart';

root.render(
  <CartProvider>
    <App />
  </CartProvider>
);`;

  const useCode = `import { useCart } from 'snappycart';

const { addItem } = useCart();
addItem({ id: 'apple', name: 'Apple', price: 0.6 });`;

  const uiCode = `import { useState } from 'react';
import { CartDrawer, CartIcon } from 'snappycart';

const [open, setOpen] = useState(false);

<CartIcon onClick={() => setOpen(true)} />
<CartDrawer open={open} onClose={() => setOpen(false)} />`;

  return (
    <section className={styles.section} id="quickstart">
      <div className={styles.header}>
        <div className={styles.eyebrow}>Quickstart</div>
        <h2 className={styles.heading}>Go from install to working cart fast</h2>
        <p className={styles.intro}>
          Install snappycart, wrap your app, connect product actions, and drop in cart UI.
        </p>

        <div className={styles.links}>
          <a
            href="https://snappycart.idncod.com/docs/intro"
            target="_blank"
            rel="noreferrer"
            className={styles.link}
          >
            Docs
            <ExternalLink size={16} />
          </a>

          <a
            href="https://www.npmjs.com/package/snappycart"
            target="_blank"
            rel="noreferrer"
            className={styles.link}
          >
            npm
            <ExternalLink size={16} />
          </a>

          <a
            href="https://github.com/idncod/snappycart"
            target="_blank"
            rel="noreferrer"
            className={styles.link}
          >
            GitHub
            <ExternalLink size={16} />
          </a>
        </div>
      </div>

      <div className={styles.wrap}>
        <div className={styles.block}>
          <div className={styles.blockHeader}>
            <div className={styles.title}>1. Install</div>
            <CopyButton value={installCode} />
          </div>

          <pre className={styles.code}>
            <code>{installCode}</code>
          </pre>
        </div>

        <div className={styles.block}>
          <div className={styles.blockHeader}>
            <div className={styles.title}>2. Wire it</div>
            <CopyButton value={wireCode} />
          </div>

          <pre className={styles.code}>
            <code>{wireCode}</code>
          </pre>
        </div>

        <div className={styles.block}>
          <div className={styles.blockHeader}>
            <div className={styles.title}>3. Add items</div>
            <CopyButton value={useCode} />
          </div>

          <pre className={styles.code}>
            <code>{useCode}</code>
          </pre>
        </div>

        <div className={styles.block}>
          <div className={styles.blockHeader}>
            <div className={styles.title}>4. Add cart UI</div>
            <CopyButton value={uiCode} />
          </div>

          <pre className={styles.code}>
            <code>{uiCode}</code>
          </pre>
        </div>
      </div>
    </section>
  );
}
