import type { ReactNode } from 'react'
import { Link } from 'react-router'

type ActionLinkProps = {
  children: ReactNode
  to: string
  variant?: 'primary' | 'secondary'
}

function ActionLink({
  children,
  to,
  variant = 'secondary',
}: ActionLinkProps) {
  return (
    <Link className={`portfolio-action portfolio-action--${variant}`} to={to}>
      {children}
    </Link>
  )
}

export default ActionLink
