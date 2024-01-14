import { Active, DragOverlay, useDndMonitor } from "@dnd-kit/core";
import React, { useState } from "react";
import SidebarBtnElement, {
  SidebarBtnElementOverlay,
} from "./SidebarBtnElement";
import { ElementsType, FormElements } from "./FormElements";

const DragOverlayWrapper = () => {
  const [draggedItem, setDraggedItem] = useState<Active | null>(null);
  useDndMonitor({
    onDragStart: (e) => {
      setDraggedItem(e.active);
    },
    onDragCancel: () => {
      setDraggedItem(null);
    },
    // onDragEnd: () => {
    //   setDraggedItem(null);
    // },
  });
  if (!draggedItem) return null;
  let node = <>No Overlay</>;
  const isSidebarBtnElement = draggedItem.data?.current?.isDesignerBtn;
  if (isSidebarBtnElement) {
    const type = draggedItem.data?.current?.type as ElementsType;
    node = <SidebarBtnElementOverlay formElement={FormElements[type]} />;
  }
  return <DragOverlay>{node}</DragOverlay>;
};

export default DragOverlayWrapper;
