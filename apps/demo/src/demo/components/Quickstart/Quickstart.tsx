import styles from './Quickstart.module.scss';

export function Quickstart() {
  return (
    <div className={styles.wrap}>
      <div className={styles.block}>
        <div className={styles.title}>Install</div>
        <pre className={styles.code}>
          <code>npm i snappycart</code>
        </pre>
      </div>

      <div className={styles.block}>
        <div className={styles.title}>Wire it</div>
        <pre className={styles.code}>
          <code>{`import { CartProvider } from "snappycart";

root.render(
  <CartProvider>
    <App />
  </CartProvider>
);`}</code>
        </pre>
      </div>

      <div className={styles.block}>
        <div className={styles.title}>Use it</div>
        <pre className={styles.code}>
          <code>{`import { useCart } from "snappycart";

const { addItem } = useCart();
addItem({ id: "apple", name: "Apple", price: 0.6 });`}</code>
        </pre>
      </div>
    </div>
  );
}
