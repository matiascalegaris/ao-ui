
// import { DragDropTypes } from '../../../constants'
// import SpellEntry from '../../Gameplay/SideMenu/InvetoryAndSpells/SpellSelection/SpellEntry/spell-entry'
// import Sprite from '../Sprite/sprite'
// import './drag-layer.scss'

// function getItemStyles(initialOffset, currentOffset) {
//   if (!initialOffset || !currentOffset) {
//     return {
//       display: 'none',
//     }
//   }
//   let { x, y } = currentOffset
//   const transform = `translate(${x}px, ${y}px)`
//   return {
//     transform,
//     WebkitTransform: transform,
//   }
// }

// export const DragLayer = () => {
//   const { itemType, isDragging, item, initialOffset, currentOffset } =
//     useDragLayer((monitor) => ({
//       item: monitor.getItem(),
//       itemType: monitor.getItemType(),
//       initialOffset: monitor.getInitialSourceClientOffset(),
//       currentOffset: monitor.getSourceClientOffset(),
//       isDragging: monitor.isDragging(),
//     }))
//   const renderItem = () => {
//       switch (itemType) {
//         case DragDropTypes.ITEM:
//           const grhInfo = window.parent.BabelUI.GetHeadDrawInfo(item.grh)
//           return <Sprite imageName={grhInfo.imageNumber}
//                     x={grhInfo.startX}
//                     y={grhInfo.startY}
//                     width={grhInfo.width}
//                     height={grhInfo.height} 
//                   />
//         case DragDropTypes.SPELL:
//           <SpellEntry spell={item}/>
//         default:
//           return null
//       }
//     }
//   return (
//     <div className='drag-layer'>
//       <div
//         style={getItemStyles(initialOffset, currentOffset)}
//       >
//         {renderItem()}
//       </div>
//     </div>
//   )
// }