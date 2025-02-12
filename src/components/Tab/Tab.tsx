import clsx from "clsx"
import { PropsWithChildren } from "react"

type Props = {
  isActive?: boolean
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export default function Tab({ isActive, children, ...rest }: PropsWithChildren<Props>) {
  return (
    <button
      type="button"
      role="tab"
      className={clsx("tab", {
        "tab-active relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[0.125rem] after:bg-primary dark:after:bg-[var(--color-primary-custom)]":
          isActive,
      })}
      {...rest}
    >
      {children}
    </button>
  )
}
