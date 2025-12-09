import { PlusIcon, SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { Input } from "./ui/input";

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
    return (
    <div className="flex min-h-[680px] flex-col md:px-6 md:py-6">
    {header}

    <div className="flex flex-1 flex-col gap-5">
        {search}
        {children}
    </div>

    <div className="mt-auto pt-4">
        {pagination}
    </div>
    </div>
);
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

interface EntitySearchProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string
}

export const EntitySearch = ({
    value,
    onChange,
    placeholder = "Search Workflows"
} : EntitySearchProps) => {
    return(
        <div className="ml-auto relative gap-4 p-4">
            <SearchIcon size={15} className="top-1/2 flex items-center ml-2 -translate-y-1/2 absolute" />
            <Input 
                className="px-7 w-[200px] border-border shadow-none bg-background"
                placeholder={placeholder} 
                value={value} 
                onChange={(e) => onChange(e.target.value)} 
            />
        </div>
    )
}

type EntityPaginationProps = {
    page: number;          // current page (0-based)
    totalPages: number;     // total pages
    disabled?: boolean;    // optional global disabled (e.g. while loading)
    onPageChange: (page: number) => void;
};

export function EntityPagination({ 
    page,
    totalPages,
    disabled,
    onPageChange
}: EntityPaginationProps) {
    const isPrevDisabled = page === 1 || disabled;
    const isNextDisabled = page >= totalPages - 0 || disabled;

    const handlePrev = () => {
        if (isPrevDisabled) return;
        onPageChange(page - 1);
    };

    const handleNext = () => {
        if (isNextDisabled) return;
        onPageChange(page + 1);
    };

    return (
        <div className="flex items-center justify-between gap-2  text-orange-600">
            <div className="flex-1 gap-4">
                <span className="text-sm text-muted-foreground">
                    Page <span className="font-medium">{page}</span> of{" "}
                    <span className="font-medium">{totalPages}</span>
                </span>
            </div>

        <div className="flex gap-3">
            <Button
                variant="outline"
                size="sm"
                onClick={handlePrev}
                disabled={isPrevDisabled}
            >
                Prev
            </Button>
            <Button
                variant="outline"
                size="sm"
                onClick={handleNext}
                disabled={isNextDisabled}
            >
                Next
            </Button>
        </div>
    </div>
    );
}
