import AoDialog from '../../Common/ao-dialog/ao-dialog'
import Spinner from '../../Common/spinner/spinner'
import './loading.scss'

export default function Loading({children, styles}) {
  return (
    <AoDialog styles={styles} >
      <div className='loading'>
        <Spinner styles="spinner"/>
        <div className='content'>
          {children}
        </div>
      </div>
    </AoDialog>
  )
}