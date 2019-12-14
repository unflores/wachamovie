import * as React from 'react'
import * as styles from './styles.css'

interface Props {
  handleClose: () => void
  show: boolean
  fileId: string
}

export default ({ handleClose, show, fileId }: Props) => {
  const display = show ? styles['display-block'] : styles['display-none']
  if (!fileId) { return null }
  return (
    <div className={`${styles.modal} ${display}`}>
      <section className={`container ${styles['modal-main']}`}>
        <div className="row">
          <video
            className={styles.video}
            width="1024"
            height="786"
            controls={true}
          >
            <source src={`/api/movie_streams/${fileId}`} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="row">
          <div className="col-11" />
          <div className="col-1">
            <button className="btn btn-dark" onClick={handleClose}>close</button>
          </div>
        </div>
        <div className={styles.spacer} />
      </section>
    </div >
  )
}
