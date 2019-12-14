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
      <section className={styles['modal-main']}>
        <video width="320" height="240" controls={true}>
          <source src={`/api/movie_streams/${fileId}`} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="row">
          <div className="col-12">
            <button className="btn btn-dark" onClick={handleClose}>close</button>
          </div>
        </div>
      </section>
    </div >
  )
}
