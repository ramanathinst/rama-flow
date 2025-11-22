import Image from "next/image"
import Link from "next/link";

const AuthLayout = ({children}: {children: React.ReactNode}) => {
    return(
        <div className="flex flex-col gap-7">
            <div className="flex items-center flex-col mx-auto pt-8">
                    <Link href={"/"} prefetch className="flex flex-col items-center gap-2">
                        <Image src={"/logos/logo.svg"} alt="Rama-flow" height={40} width={40} />
                        <span className="font-medium">Rama-flow</span>
                    </Link>
                {children}
            </div>
        </div>
    )
}

export default AuthLayout;