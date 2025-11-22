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

import { CheckCircle2Icon, GlobeIcon, XCircleIcon } from "lucide-react";
import { PlusIcon } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

const loginSchema = z.object({
    email: z.email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
    const router = useRouter();
    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    // ---------------------------------------------------
    // Email/Password login
    // ---------------------------------------------------
    const onSubmit = async (data: LoginFormValues) => {
        await authClient.signIn.email(
            {
                email: data.email,
                password: data.password,
                callbackURL: "/"
            },
            {
                onSuccess: () => {
                    toast.success("Login Successfull!")
                    router.push("/")
                },
                onError: (ctx) => {
                    toast.error(ctx.error.message)
                }
            }
            
        )
    };

    const isPending = form.formState.isSubmitting;

    // ---------------------------------------------------
    // Social login handler
    // ---------------------------------------------------
    const onSocialLogin = async (provider: "google" | "github") => {
        console.log(`Login with: ${provider}`);
    };

    return (
        <div className="p-4 rounded border-none">
            <Card className="p-4 bg-accent">
                <CardHeader className="flex items-center flex-col w-full0">
                    <CardTitle> Login to continue</CardTitle>
                </CardHeader>

            {/* SOCIAL LOGIN */}
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

                    {/* Submit */}
                    <Button disabled={isPending} type="submit" className="w-full bg-primary">
                        {isPending ? <XCircleIcon  className="size-4 animate-spin"/> : "Login"}
                    </Button>

                    {/* Helper text */}
                    <p className="text-xs text-center">
                        Don’t have an account?{" "}
                        <a href="/signup" className="underline">
                            Sign up
                        </a>
                    </p>
                </form>
            </Form>
            </Card>
        </div>
    );
}
