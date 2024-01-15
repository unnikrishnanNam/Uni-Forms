"use client";

import React, { useContext } from "react";
import { DesignerContext } from "../context/DesignerContext";

function UseDesigner() {
  const context = useContext(DesignerContext);
  if (!context) {
    throw new Error(
      "UseDesigner must be used within a DesignerContextProvider"
    );
  }
  return context;
}

export default UseDesigner;
