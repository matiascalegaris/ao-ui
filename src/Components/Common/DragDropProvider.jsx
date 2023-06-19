import  { createContext, useState } from "react";


export const DragDropContext = createContext();


export const DragDropProvider = ({ children }) => {
  const [contextValue, setContextValue] = useState({
    item: null,
    itemType: null,
    startTime: null,
    activeContainer: null,
    MouseDownOnDragable : (item, itemType, startTime) => {
      setContextValue({...contextValue,
        item: item,
        itemType: itemType,
        startTime: startTime,
      })
    },      
    DragEnd: (mouseEvt, context) => {
      if (context.activeContainer && context.activeContainer.onDrop) {
        context.activeContainer.onDrop(mouseEvt, context)
      }
      setContextValue({...context,
        item: null,
        itemType: null,
        startTime: 0
      })
    },
    SetActiveContainer: ( prevState, containerId) => {
      setContextValue({...prevState,
        activeContainer: containerId
      })
    }
  });
  return <DragDropContext.Provider value={contextValue}>{children}</DragDropContext.Provider>;
};


