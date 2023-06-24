import { useContext } from "react";
import { DragDropContext } from "./DragDropProvider";

export const DropArea = ({children, id, acceptTypes}) => {
  const dragDropContext = useContext(DragDropContext);

  const mouseEnter = etv => {
    if (dragDropContext.item === null) return;

    if (acceptTypes.includes(dragDropContext.itemType)) {
      dragDropContext.SetActiveContainer(dragDropContext, id)
    }
  }
  const mouseLeave = evt => {
    if (acceptTypes.includes(dragDropContext.itemType)) {
      dragDropContext.SetActiveContainer(dragDropContext, null)
    }    
  }
  const style = {
    width: '100%', 
    height: '100%'
  }
  return (
    <div style={style} onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
    {children}
    </div>
  )
}