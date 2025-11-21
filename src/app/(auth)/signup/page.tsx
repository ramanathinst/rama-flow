import { SignupForm } from "@/features/auth/components/signupForm";
import { requiredUnAuth } from "@/lib/auth-utils";

const Page = async() => {
    await requiredUnAuth();
    return(
        <div>
            <SignupForm />
        </div>
    )
}

export default Page;