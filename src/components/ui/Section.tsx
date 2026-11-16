import type { ReactNode } from 'react'
import { Reveal } from '@/components/ui/Reveal'

export function Container({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={`mx-auto w-full max-w-[1264px] px-5 md:px-8 ${className}`}>
      {children}
    </div>
  )
}

export function Section({ id, children }: { id: string; children: ReactNode }) {
  return (
    <section id={id} className="border-t border-border py-[72px] lg:py-28">
      <Container>{children}</Container>
    </section>
  )
}

export function SectionHead({
  eyebrow,
  title,
  lead,
  className = '',
}: {
  eyebrow: string
  title: string
  lead?: string
  className?: string
}) {
  return (
    <Reveal className={`flex max-w-[680px] flex-col gap-3.5 ${className}`}>
      <p className="eyebrow rtl:font-sans rtl:text-sm rtl:font-semibold rtl:tracking-normal rtl:normal-case">
        {eyebrow}
      </p>
      <h2 className="h2-size">{title}</h2>
      {lead && <p className="lead">{lead}</p>}
    </Reveal>
  )
}

/** Card surface used across sections. Add `lift` for the hover effect. */
export const cardCls = 'rounded-card border border-border bg-surface'
export const liftCls =
  'transition duration-[250ms] ease-lift hover:-translate-y-1 hover:border-[color-mix(in_srgb,var(--acc)_55%,var(--border))] hover:shadow-[var(--sh2),0_0_0_4px_var(--acc-soft)]'
