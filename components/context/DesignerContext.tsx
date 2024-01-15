"use client";

import React, { createContext, useState } from "react";
import { FormElementInstance } from "../FormElements";

type DesignerContextType = {
  elements: FormElementInstance[];
  addElement: (index: number, element: FormElementInstance) => void;
  removeElement: (id: string) => void;
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
  const removeElement = (id: string) => {
    setElements((e) => e.filter((x) => x.id !== id));
  };
  return (
    <DesignerContext.Provider
      value={{
        elements,
        addElement,
        removeElement,
      }}
    >
      {children}
    </DesignerContext.Provider>
  );
}
