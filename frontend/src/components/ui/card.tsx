import * as React from "react";
import { cn } from "@/lib/utils";

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  className?: string;
  children?: React.ReactNode;
};

type CardTitleProps = React.HTMLAttributes<HTMLHeadingElement> & {
  className?: string;
  children?: React.ReactNode;
};

type CardDescriptionProps = React.HTMLAttributes<HTMLParagraphElement> & {
  className?: string;
  children?: React.ReactNode;
};

const Card: React.FC<CardProps> = ({ className, children, ...props }) => {
  return (
    <div
      className={cn(
        "rounded-lg border bg-card text-card-foreground shadow-sm",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const CardHeader: React.FC<CardProps> = ({ className, children, ...props }) => {
  return (
    <div
      className={cn("flex flex-col space-y-1.5 p-4 sm:p-6 !pb-0", className)}
      {...props}
    >
      {children}
    </div>
  );
};

const CardTitle: React.FC<CardTitleProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <h3
      className={cn(
        "text-2xl font-semibold leading-none tracking-tight",
        className
      )}
      {...props}
    >
      {children}
    </h3>
  );
};

const CardDescription: React.FC<CardDescriptionProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <p className={cn("text-sm text-muted-foreground", className)} {...props}>
      {children}
    </p>
  );
};

const CardContent: React.FC<CardProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div className={cn("p-4 sm:p-6", className)} {...props}>
      {children}
    </div>
  );
};

const CardFooter: React.FC<CardProps> = ({ className, children, ...props }) => {
  return (
    <div
      className={cn("flex items-center p-4 sm:p-6 pt-0", className)}
      {...props}
    >
      {children}
    </div>
  );
};

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
