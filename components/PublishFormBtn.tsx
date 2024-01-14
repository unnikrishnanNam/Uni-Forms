import React from "react";
import { Button } from "./ui/button";
import { MdOutlinePublish } from "react-icons/md";

const PublishFormBtn = () => {
  return (
    <Button className="gap-2">
      <MdOutlinePublish className="h-6 w-6" />
      Publish
    </Button>
  );
};

export default PublishFormBtn;
