import type {ReactNode} from 'react';
import styles from './styles.module.scss';
import Logo from '@site/static/img/snappycart_logo.svg';

export default function LogoBoom(): ReactNode {
    return (
        <div className={styles.wrap} aria-hidden="true">
            <div className={styles.aura}/>
            <div className={styles.trails}/>
            <div className={styles.dust} aria-hidden="true">
                <span/>
                <span/>
                <span/>
                <span/>
                <span/>
                <span/>
            </div>
            <Logo className={styles.logo}/>
            <div className={styles.tag}>BOOM CART ENERGY</div>
        </div>
    );
}
