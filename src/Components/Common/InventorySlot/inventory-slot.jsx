import Sprite from '../Sprite/sprite'
import './inventory-slot.scss'

export default function InventorySlot({item, locked}) {
  const style = locked ? 'locked-slot': 'inv-slot'
  const grhInfo = window.parent.BabelUI.GetHeadDrawInfo(item.grh)
  return (
    <div className={style}>
      { item.grh && !locked > 0 ?
      <Sprite
        styles="item-icon"
        imageName={grhInfo.imageNumber}
        x={grhInfo.startX}
        y={grhInfo.startY}
        width={grhInfo.width}
        height={grhInfo.height}
      /> : null
      }
      {
        item.count > 0 && !locked ? <p className='item-count'>{item.count}</p> : null
      }
    </div>
  )
}