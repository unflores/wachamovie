import * as React from 'react'
import * as styles from './styles.css'

interface Props {
  handleClose: () => void
  show: boolean
  file: string
}

export default ({ handleClose, show, file }: Props) => {
  const display = show ? styles['display-block'] : styles['display-none'];

  return (
    <div className={`${styles.modal} ${display}`}>
      <section className={styles['modal-main']}>
        <iframe className={styles['viewer']} src={file} width="320" height="240" />
        <button onClick={handleClose}>close</button>
      </section>
    </div >
  );
};
