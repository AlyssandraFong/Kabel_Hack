"use client"
import React, { useState, useRef, useEffect } from "react"
import clsx from "clsx"

export function DropdownMenu({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="relative inline-block text-left">{children}</div>
}

export function DropdownMenuTrigger({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

export function DropdownMenuContent({
  children,
  align = "left",
  className,
}: {
  children: React.ReactNode
  align?: "left" | "right"
  className?: string
}) {
  return (
    <div
      className={clsx(
        "absolute mt-2 w-40 origin-top rounded-lg bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black/5 dark:ring-white/10 z-50",
        align === "right" ? "right-0" : "left-0",
        className
      )}
    >
      <div className="py-1">{children}</div>
    </div>
  )
}

export function DropdownMenuItem({
  children,
  onClickAction,
  asChild = false,
}: {
  children: React.ReactNode
  onClickAction?: React.MouseEventHandler<HTMLDivElement>
  asChild?: boolean
}): React.ReactElement {
  return (
    <div
      className="cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
      onClick={onClickAction}
      role="menuitem"
      tabIndex={0}
    >
      {children}
    </div>
  );
}
