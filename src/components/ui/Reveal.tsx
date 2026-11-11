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
      initial={
        shouldReduceMotion
          ? false
          : { opacity: 0, y: 24, filter: 'blur(4px)' }
      }
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }
      }
      viewport={{ amount: 0.12, once: true }}
      whileInView={
        shouldReduceMotion
          ? undefined
          : { opacity: 1, y: 0, filter: 'blur(0px)' }
      }
    >
      {children}
    </m.div>
  )
}

export default Reveal
