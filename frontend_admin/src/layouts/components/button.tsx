import React from "react"
import clsx from "clsx"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "ghost"
  asChild?: boolean
  className?: string
}

export const Button: React.FC<ButtonProps> = ({
  variant = "default",
  asChild = false,
  className,
  children,
  ...props
}) => {
  const Comp: any = asChild ? "span" : "button" // use span wrapper for Link, button otherwise

  return (
    <Comp
      className={clsx(
        "inline-flex items-center justify-center rounded-full px-3 py-1.5 text-sm font-medium transition-all duration-200",
        variant === "default" &&
          "bg-blue-500 text-white hover:bg-blue-600",
        variant === "ghost" &&
          "text-foreground/80 hover:text-foreground hover:bg-white/10 dark:hover:bg-white/5",
        className
      )}
      {...(!asChild ? props : {})} // only spread button props if it's a button
    >
      {children}
    </Comp>
  )
}
