import { m, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
}

function Reveal({ children, className, delay = 0 }: RevealProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <m.div
      className={className}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : { duration: 0.4, delay, ease: [0.25, 1, 0.5, 1] }
      }
      viewport={{ amount: 0.12, once: true }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
    >
      {children}
    </m.div>
  )
}

export default Reveal
