import AoDialog from '../../Common/ao-dialog/ao-dialog'
import Spinner from '../../Common/spinner/spinner'
import './loading.scss'

export default function Loading({children, styles}) {
  return (
    <AoDialog styles={'loading ' + styles}>
      <Spinner/>
      <div className='content'>
        {children}
      </div>
    </AoDialog>
  )
}