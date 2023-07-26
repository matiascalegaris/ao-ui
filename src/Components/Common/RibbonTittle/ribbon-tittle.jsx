import './ribbon-tittle.scss'

export default function RibbonTittle({text, styles}) {

  return (
    <div className={'ribbon ' + styles}>
      <p className='text'>{text.toUpperCase()}</p>
    </div>
  )
}