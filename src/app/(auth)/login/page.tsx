import { LoginForm } from "@/features/auth/components/loginForm";
import { requiredUnAuth } from "@/lib/auth-utils";

const Page = async() => {
    await requiredUnAuth();
    return(
        <div>
            <LoginForm />
        </div>
    )
}

export default Page;