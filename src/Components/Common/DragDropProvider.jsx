import  { createContext, useEffect, useState } from "react";


export const DragDropContext = createContext();


export const DragDropProvider = ({ children }) => {
  const [contextValue, setContextValue] = useState({
    item: null,
    itemType: null,
    startTime: null,
    activeContainer: null,
    MouseDownOnDragable : (mouseEvt, item, itemType, startTime) => {
      setContextValue({...contextValue,
        item: item,
        itemType: itemType,
        startTime: startTime,
      })
      console.log("drag start!")
    },      
    DragEnd: () => {
      console.log('drag end!')
      setContextValue({...contextValue,
        item: null,
        itemType: null,
        startTime: 0
      })
    },
    SetActiveContainer: (containerId) => {
      console.log('Update container ' + containerId)
      setContextValue({...contextValue,
        activeContainer: containerId
      })
    }
  });
  return <DragDropContext.Provider value={contextValue}>{children}</DragDropContext.Provider>;
};


