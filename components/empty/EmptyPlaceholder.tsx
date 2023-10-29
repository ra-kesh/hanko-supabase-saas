import { cn } from "@/lib/utils";

interface EmptyPlaceholderProps extends React.HTMLAttributes<HTMLDivElement> {}

export function EmptyPlaceholder({
  children,
  className,
  ...props
}: EmptyPlaceholderProps) {
  return (
    <div
      className={cn(
        "flex min-h-[500px] flex-col items-center justify-center rounded-md border border-dashed text-center ",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function EmptyPlaceholderIcon({
  children,
  className,
}: EmptyPlaceholderProps) {
  return (
    <div
      className={cn(
        "flex h-20 w-20 items-center justify-center rounded-full bg-muted",
        className
      )}
    >
      {children}
    </div>
  );
}

interface EmptyPlaceholderTitleProps
  extends React.HtmlHTMLAttributes<HTMLHeadElement> {}

export function EmptyPlaceholderTitle({
  className,
  ...props
}: EmptyPlaceholderTitleProps) {
  return (
    <h2 className={cn("mt-6 text-xl font-semibold", className)} {...props} />
  );
}

interface EmptyPlaceholderDescriptionProps
  extends React.HtmlHTMLAttributes<HTMLParagraphElement> {}

export function EmptyPlaceholderDescription({
  className,
  ...props
}: EmptyPlaceholderDescriptionProps) {
  return (
    <p
      className={cn(
        "mt-2 text-center text-sm font-normal text-muted-foreground",
        className
      )}
      {...props}
    />
  );
}
