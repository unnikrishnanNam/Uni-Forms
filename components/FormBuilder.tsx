"use client";
import { Form } from "@prisma/client";
import React from "react";
import PreviewDialogBtn from "./PreviewDialogBtn";
import SaveFormBtn from "./SaveFormBtn";
import PublishFormBtn from "./PublishFormBtn";
import Designer from "./Designer";
import { DndContext } from "@dnd-kit/core";
import DragOverlayWrapper from "./DragOverlayWrapper";

const FormBuilder = ({ form }: { form: Form }) => {
  return (
    <DndContext>
      <main className="flex flex-col w-full">
        <div className="flex justify-between border-b-2 p-4 gap-3 items-center">
          <h2>
            <span className="text-muted-foreground mr-2">Form: </span>
            {form.name}
          </h2>
          <h2>
            <div className="flex items-center gap-2">
              <PreviewDialogBtn />
              {!form.published && (
                <>
                  <SaveFormBtn />
                  <PublishFormBtn />
                </>
              )}
            </div>
          </h2>
        </div>
        <div
          className="flex w-full flex-grow items-center justify-center relative
          overflow-y-auto h-[200px] bg-accent bg-[url(/dots.svg)]
          dark:bg-[url(/dots-dark.svg)]"
        >
          <Designer />
        </div>
      </main>
      <DragOverlayWrapper />
    </DndContext>
  );
};

export default FormBuilder;
