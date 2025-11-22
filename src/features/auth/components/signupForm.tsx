"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { GlobeIcon } from "lucide-react";
import { PlusIcon } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import Image from "next/image";

const signupSchema = z.object({
    email: z.email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm password must be at least 6 characters"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
});

type signupFormValues = z.infer<typeof signupSchema>;

export function SignupForm() {
    const router = useRouter();
    const form = useForm<signupFormValues>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: ""
        },
    });

    const onSubmit = async (data: signupFormValues) => {
        await authClient.signUp.email(
            {   
                name: data.email,
                email: data.email,
                password: data.password,
                callbackURL: "/"
            },
            {
                onSuccess: () => {
                    toast.success("Signup Successfull!")
                    router.push("/")
                },
                onError: (ctx) => {
                    toast.error(ctx.error.mess)
                }
            }
            
        )
    };

    const isPending = form.formState.isSubmitting

    // ---------------------------------------------------
    // Social login handler
    // ---------------------------------------------------
    const onSocialLogin = async (provider: "google" | "github") => {
        console.log(`Login with: ${provider}`);
    };

    return (
        <div className="p-4 rounded border-none">
                <Card className="p-4 bg-accent">
            <div className="space-y-3 mb-5">
                <Button
                    variant="outline"
                    className="w-full gap-2"
                    onClick={() => onSocialLogin("google")}
                >
                    <Image src={"/logos/google.svg"} width={20} height={40} alt="Google" />
                    Continue with Google
                </Button>

                <Button
                    variant="outline"
                    className="w-full gap-2"
                    onClick={() => onSocialLogin("github")}
                >
                    <Image src={"/logos/github.svg"} width={25} height={40} alt="Google" />
                    Continue with GitHub
                </Button>
            </div>

            {/* DIVIDER */}
            <div className="flex items-center gap-3 mb-5">
                <div className="flex-1 h-px bg-muted"></div>
                <span className="text-xs text-muted-foreground">or</span>
                <div className="flex-1 h-px bg-muted"></div>
            </div>

            {/* EMAIL & PASSWORD FORM */}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                    {/* Email */}
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="you@example.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Password */}
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="Your password"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                     {/* Confirm Password */}
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="Confirm password"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Submit */}
                    <Button disabled={isPending} type="submit" className="w-full">
                        Signup
                    </Button>

                    {/* Helper text */}
                    <p className="text-xs text-center">
                        Already have an account?{" "}
                        <a href="/login" className="underline">
                            Login
                        </a>
                    </p>
                </form>
            </Form>
            </Card>
        </div>
    );
}
