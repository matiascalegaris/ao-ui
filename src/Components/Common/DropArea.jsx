import { useContext } from "react";
import { DragDropContext } from "./DragDropProvider";

export const DropArea = ({children, id, acceptTypes}) => {
  const dragDropContext = useContext(DragDropContext);

  const mouseEnter = etv => {
    if (dragDropContext.item === null) return;

    if (acceptTypes.includes(dragDropContext.itemType)) {
      dragDropContext.SetActiveContainer(id)
    }
  }
  const mouseLeave = evt => {
    if (acceptTypes.includes(dragDropContext.itemType)) {
      dragDropContext.SetActiveContainer(null)
    }    
  }
  return (
    <div onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
    {children}
    </div>
  )
}