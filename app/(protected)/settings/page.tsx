"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { settings } from "@/actions/settings";
import React, {  useState, useTransition } from "react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { SettingSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const SettingsPage = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const session = useSession();
  const user = session.data?.user;
  const { update } = useSession();
  const form = useForm<z.infer<typeof SettingSchema>>({
    resolver: zodResolver(SettingSchema),
    defaultValues: {
      name: user?.name || undefined,
    },
  });


  const onSubmit = (values: z.infer<typeof SettingSchema>) => {
    startTransition(() => {
      settings(values)
        .then((data) => {
          if (data?.error) {
            setError(data.error);
          }
          if (!data?.error) {
            update({
              name: values.name,
            }).then(() => {
              form.reset(values);
            });
            setSuccess("Data updated successfully.");
          }
        })
        .catch(() => {
          setError("Something went wrong!");
        });
    });
  };

  return (
    //<div>{JSON.stringify(user)}
    <Card className="w-[600px] m-5">
      <CardHeader>
        <p className="font-semibold text-2xl text-center">⚙️ Settings</p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <div className="space-y-4">
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="John Doe"
                        disabled={isPending}
                      />
                    </FormControl>
                  </FormItem>
                  <Button
                    type="submit"
                    disabled={isPending}
                    className="cursor-pointer"
                  >
                    Save Changes
                  </Button>
                </div>
              )}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SettingsPage;
