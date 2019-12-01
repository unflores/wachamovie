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
        <video width="320" height="240" controls>
          <source src={file} type="video/x-matroska" />
          Your browser does not support the video tag.
        </video>
        <div className="row">
          <div className="col-12">
            <button className="btn btn-dark" onClick={handleClose}>close</button>
          </div>
        </div>
      </section>
    </div >
  );
};
