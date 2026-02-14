import type {ReactNode} from 'react';
import {useMemo, useState} from 'react';
import styles from './styles.module.scss';

type Props = {
    command?: string;
};

export default function InstallCommand({command = 'npm i snappycart'}: Props): ReactNode {
    const [copied, setCopied] = useState(false);

    const label = useMemo(() => (copied ? 'Copied' : 'Copy'), [copied]);

    const onCopy = async () => {
        try {
            await navigator.clipboard.writeText(command);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1200);
        } catch {
            setCopied(false);
        }
    };

    return (
        <div className={styles.wrap}>
            <div className={styles.kicker}>
                <span className={styles.kickerGem} aria-hidden="true"/>
                <span className={styles.kickerText}>INSTALL</span>
            </div>
            <div className={styles.row}>
                <code className={styles.code}>{command}</code>
                <button type="button" className={styles.copyBtn} onClick={onCopy} aria-label="Copy install command">
          <span className={styles.copyIcon} aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                  d="M8 8V6.6C8 5.72 8.72 5 9.6 5H17.4C18.28 5 19 5.72 19 6.6V14.4C19 15.28 18.28 16 17.4 16H16"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
              />
              <path
                  d="M6.6 9H14.4C15.28 9 16 9.72 16 10.6V18.4C16 19.28 15.28 20 14.4 20H6.6C5.72 20 5 19.28 5 18.4V10.6C5 9.72 5.72 9 6.6 9Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
              />
            </svg>
          </span>
                    <span className={styles.copyText}>{label}</span>
                </button>
            </div>
        </div>
    );
}
