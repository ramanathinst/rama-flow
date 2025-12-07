import { PlusIcon } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

type EntityContainerProps = {
    children: React.ReactNode;
    header?: React.ReactNode;
    search?: React.ReactNode;
    pagination?: React.ReactNode;
}

export const EntityContainer = ({
    children,
    header,
    search,
    pagination
}: EntityContainerProps) => {
    return(
        <div className="gap-6 md:px-6 md:py-6">
            {header}
            <div className="flex flex-col gap-5">
                {search}
                {children}
            </div>

            {pagination}
        </div>
    )
}   

type EntityHeaderProps = {
    title: string;
    description?: string;
    newButtonLabel?: string;
    disabled?: boolean;
    isCreating?: boolean;
} & (
    | { onNew: () => void, newButtonHref?: never}
    | { newButtonHref: string, onNew?: never}
    | { onNew?: never, newButtonHref?: never}
)

export const EntityHeader = ({
    title,
    description,
    newButtonHref,
    newButtonLabel,
    onNew,
    disabled,
    isCreating
}: EntityHeaderProps) => {
    return(
        <div className="flex flex-row items-center md:px-3 md:py-3 justify-between mb-6 border-b">
            <div className="flex flex-col mb-6 ">
                <p className="text-2xl font-semibold text-orange-400">{title}</p>
                {description && (
                    <p className="text-muted-foreground text-sm">{description}</p>
                )}
            </div>

            {onNew && !newButtonHref && (
                <Button onClick={onNew} size={"sm"} disabled={disabled || isCreating}>
                    <PlusIcon size={40} />
                    {newButtonLabel}
                </Button>
            )}

            {newButtonHref && !onNew && (
                <Button asChild size={"sm"}>
                    <Link href={newButtonHref} prefetch>
                        <PlusIcon size={40} />
                        {newButtonLabel}
                    </Link>
                </Button>
            )}
        </div>
    )
}