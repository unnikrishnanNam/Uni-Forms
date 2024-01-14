"use client";

import { Button } from "@/components/ui/button";
import { error } from "console";
import Link from "next/link";
import React, { useEffect } from "react";

const ErrorPage = ({ err }: { err: Error }) => {
  useEffect(() => {
    console.error(err);
  }, [err]);
  return (
    <div className="flex w-full h-full flex-col items-center justify-center gap-4">
      <h2 className="text-destructive text-2xl">Something went wrong | 400</h2>
      <Button asChild variant={"outline"}>
        <Link href={"/dashboard"}>Go back to dashboard</Link>
      </Button>
    </div>
  );
};

export default ErrorPage;
