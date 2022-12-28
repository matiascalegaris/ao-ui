import './spinner.scss'

export default function Spinner({styles}) {
  return (
    <div className={'lds-ring ' + styles}>
      <div></div><div></div><div></div><div></div>
    </div>
  )
}