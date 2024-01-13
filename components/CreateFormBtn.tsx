"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";

import { formSchema, formSchemaType } from "@/schemas/formSchema";
import { useForm } from "react-hook-form";
import { ImSpinner2 } from "react-icons/im";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { toast } from "./ui/use-toast";
import { CreateForm } from "@/actions/form";

import { BsFileEarmarkPlus } from "react-icons/bs";

const CreateFormBtn = () => {
  const form = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(data: formSchemaType) {
    try {
      const formId = await CreateForm(data);
      toast({
        title: "Success",
        description: "Form created successfully",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong, please try again later",
        variant: "destructive",
      });
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"outline"}
          className="group border border-primary/20 h-[190px] items-center 
        justify-center flex flex-col hover:border-primary hover:cursor-pointer 
        border-dashed gap-4 "
        >
          <BsFileEarmarkPlus
            className="h-8 w-8 text-muted-foreground 
          group-hover:text-primary"
          />
          <p className="font-bold text-lg text-muted-foreground group-hover:text-primary">
            Create New Form
          </p>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Form</DialogTitle>
          <DialogDescription>
            Create a new form to start collecting responses
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="name"
              render={(arg) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...arg.field} />
                  </FormControl>
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            ></FormField>{" "}
            <FormField
              control={form.control}
              name="description"
              render={(arg) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...arg.field} rows={5} />
                  </FormControl>
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            ></FormField>
          </form>
        </Form>
        <DialogFooter>
          <Button
            onClick={form.handleSubmit(onSubmit)}
            className="w-full mt-4"
            disabled={form.formState.isSubmitting}
          >
            {!form.formState.isSubmitting && <span>Save</span>}
            {form.formState.isSubmitting && (
              <ImSpinner2 className="animate-spin" />
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateFormBtn;
