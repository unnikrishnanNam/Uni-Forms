"use client";

import React, { createContext, useState } from "react";
import { FormElementInstance } from "../FormElements";

type DesignerContextType = {
  elements: FormElementInstance[];
  addElement: (index: number, element: FormElementInstance) => void;
};

export const DesignerContext = createContext<DesignerContextType | null>(null);

export default function DesignerContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [elements, setElements] = useState<FormElementInstance[]>([]);
  const addElement = (index: number, element: FormElementInstance) => {
    setElements((e) => {
      const copy = [...e];
      copy.splice(index, 0, element);
      return copy;
    });
  };
  return (
    <DesignerContext.Provider
      value={{
        elements,
        addElement,
      }}
    >
      {children}
    </DesignerContext.Provider>
  );
}
