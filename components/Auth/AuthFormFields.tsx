import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { AuthFormFieldValues, authFormSchema } from "@/utils/validations";
import { authFormFields } from "@/utils/constants";

export default function AuthFormFields() {
  const form = useForm<z.infer<typeof authFormSchema>>({
    resolver: zodResolver(authFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <React.Fragment>
      {authFormFields.map(({ id, label, placeholder, type }) => (
        <FormField
          key={id}
          control={form.control}
          name={id as keyof AuthFormFieldValues}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{label}</FormLabel>
              <FormControl>
                <Input placeholder={placeholder} type={type} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ))}
    </React.Fragment>
  );
}
