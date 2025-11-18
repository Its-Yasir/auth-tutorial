"use client"
import { useForm } from "react-hook-form";
import * as z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"; 
import { Input } from "../ui/input";
import {
  Form,
  FormControl,
  FormLabel,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { CardWrapper } from "./card-wrapper";
import { LoginSchema } from "@/schema";
import { Button } from "@/components/ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { login } from "@/actions/login";
import { useState, useTransition } from "react";
import Link from "next/link";

export const LoginForm = () => {
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  }) 
  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      login(values)
        .then((data) => {
          if(data?.error) {
            form.reset();
            setError(data.error);
          }

          if(data?.success) {
            form.reset();
            setSuccess(data.success);
          }

          if(data?.twoFactor) {
            setShowTwoFactor(true);
          }
        })
          .catch(() => {setError("Something went wrong!")});
    })
  }
  return (
    <div>
      <CardWrapper
        headerLable="Welcome Back!"
        backButtonLabel="Don't have an account?"
        backButtonHref="/auth/register"
        showSocial
      >
        <Form {...form}>
          <form 
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <div className="space-y-4">
              {showTwoFactor && (
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>  
                      <FormLabel>Two Factor Code:</FormLabel>
                      <FormControl>
                        <Input 
                          {...field}
                          disabled={isPending}
                          placeholder="123456"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              {!showTwoFactor && (
                <>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>  
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input 
                            {...field}
                            disabled={isPending}
                            placeholder="johndoe@gmail.com"
                            type="email"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>  
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input 
                            {...field}
                            disabled={isPending}
                            placeholder="*******"
                            type="password"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    variant={'link'}
                    className="text-sm p-0 font-normal"
                    asChild
                  >
                    <Link href={'/auth/reset'}>
                      Forgot password?
                    </Link>
                  </Button>
                </>
              )}
            </div>
            <FormError message={error} />
            <FormSuccess message={success}/>
            <Button
              type="submit"
              className="w-full"
              disabled={isPending}
            >
              Login
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </div>
  );
};
