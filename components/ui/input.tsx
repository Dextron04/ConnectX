import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] selection:bg-[var(--primary)] selection:text-[var(--primary-foreground)] bg-[var(--input)] border-[var(--border)] flex h-9 w-full min-w-0 rounded-full border px-4 py-2 text-base shadow-sm transition-[color,box-shadow] outline-none focus-visible:border-[var(--primary)] focus-visible:ring-[var(--primary)]/50 focus-visible:ring-[3px] file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      {...props}
    />
  )
}

export { Input }
