import { useContext } from "react";
import { DragDropContext } from "./DragDropProvider";

export const DropArea = ({children, id, acceptTypes}) => {
  const dragDropContext = useContext(DragDropContext);

  const mouseEnter = etv => {
    if (dragDropContext.item === null) return;
    if ((acceptTypes & dragDropContext.itemType) > 0) {
      dragDropContext.SetActiveContainer(dragDropContext, id)
    }
  }
  const mouseLeave = evt => {
    if ((acceptTypes & dragDropContext.itemType) > 0) {
      dragDropContext.SetActiveContainer(dragDropContext, null)
    }    
  }
  const style = {
    width: '100%', 
    height: '100%',
    PointerEvents: 'all'
  }
  return (
    <div style={style} onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
    {children}
    </div>
  )
}