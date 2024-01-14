"use client";

import { ElementsType, FormElement } from "../FormElements";
import { MdTextFields } from "react-icons/md";

const type: ElementsType = "TextField";
export const TextFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes: {
      label: "Text Field",
      helperText: "Helper Text",
      required: false,
      PlaceHolder: "Placeholder",
    },
  }),
  designerBtnElement: {
    icon: MdTextFields,
    label: "Text Field",
  },
  designerComponent: () => <div>Designer</div>,
  formComponent: () => <div>Form</div>,
  previewComponent: () => <div>Preview</div>,
};
