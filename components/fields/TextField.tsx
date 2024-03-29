"use client";

import Designer from "../Designer";
import {
  ElementsType,
  FormElement,
  FormElementInstance,
} from "../FormElements";
import { MdTextFields } from "react-icons/md";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const type: ElementsType = "TextField";
const extraAttributes = {
  label: "Text Field",
  helperText: "Helper Text",
  required: false,
  PlaceHolder: "Placeholder",
};
export const TextFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerBtnElement: {
    icon: MdTextFields,
    label: "Text Field",
  },
  designerComponent: DesignerComponent,
  formComponent: () => <div>Form</div>,
  previewComponent: () => <div>Preview</div>,
};

type customInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};

function DesignerComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as customInstance;
  const { label, PlaceHolder, helperText, required } = element.extraAttributes;
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label>
        {label}
        {required && "*"}
      </Label>
      <Input
        readOnly
        // disabled
        placeholder={element.extraAttributes.PlaceHolder}
      ></Input>
      {helperText && (
        <p className="text-muted-foreground text-[0.8rem ]">{helperText}</p>
      )}
    </div>
  );
}
