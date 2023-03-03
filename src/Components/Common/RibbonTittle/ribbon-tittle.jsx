import './ribbon-tittle.scss'

export default function RibbonTittle({text}) {

  return (
    <div className='ribbon'>
      <p className='text'>{text.toUpperCase()}</p>
    </div>
  )
}