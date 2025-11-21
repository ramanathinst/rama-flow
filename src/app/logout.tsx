"use client"
import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export const LogoutButton = () => {
    const router = useRouter();
    return(
        <div>
            <Button disabled={false} onClick={() => authClient.signOut({
                fetchOptions: {
                    onSuccess: () => {
                        router.push("/login")
                        toast.success("Logout")
                    },
                    onError: (ctx) => {
                        toast.error(ctx.error.message)
                    }
                }
            })} variant={"secondary"}>
                Logout
            </Button>
        </div>
    )
}