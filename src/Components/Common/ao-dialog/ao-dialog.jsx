import './ao-dialog.scss'

export default function AoDialog({children, styles}) {
  return (
    <form className={'dialog-container ' + styles} autocomplete="off">
      {children}
    </form>
  )
}