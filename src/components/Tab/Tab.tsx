import clsx from "clsx"
import { PropsWithChildren } from "react"

type Props = {
  isActive?: boolean
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export default function Tab({ isActive, children, ...rest }: PropsWithChildren<Props>) {
  return (
    <button type="button" role="tab" className={clsx("tab", { "tab-active": isActive })} {...rest}>
      {children}
    </button>
  )
}
