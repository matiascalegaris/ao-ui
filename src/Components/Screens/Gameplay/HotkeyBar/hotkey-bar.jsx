import './hotkey-bar.scss'

export const HotKeyBar = () => {
  const hoykeyList = Array(10).fill({index:0}).map((el, index) => ({ ...el,index: index}))
  return (
    <div className='hotkey-bar'>
      {
        hoykeyList.map((el,index) => (
          <div key={index} className='slot'>
          </div>
        ))
      }
    </div>
  )
}