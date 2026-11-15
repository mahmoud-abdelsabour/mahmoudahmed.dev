import type { ComponentProps, ReactNode } from 'react'
import { Link } from 'react-router'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

const base =
  'inline-flex items-center justify-center gap-2 border border-transparent font-semibold leading-none whitespace-nowrap no-underline transition duration-150 active:scale-[.97] disabled:cursor-not-allowed disabled:opacity-45 [&_svg]:shrink-0'
const variants: Record<Variant, string> = {
  primary: 'bg-acc text-accfg hover:bg-acch hover:text-accfg',
  secondary: 'bg-surface text-tp border-border hover:border-acc hover:text-tp',
  ghost: 'bg-transparent text-ts hover:bg-acc-soft hover:text-tp',
}
const sizes: Record<Size, string> = {
  sm: 'min-h-9 px-3 text-sm rounded-btn-sm',
  md: 'min-h-11 px-[18px] text-[15px] rounded-btn',
  lg: 'min-h-[52px] px-6 text-base rounded-btn-lg',
}

interface Own {
  variant?: Variant
  size?: Size
  icon?: boolean
  block?: boolean
  className?: string
  children?: ReactNode
}

export function buttonClass({
  variant = 'primary',
  size = 'md',
  icon,
  block,
  className,
}: Own) {
  return [
    base,
    variants[variant],
    sizes[size],
    icon && 'w-11 !px-0',
    block && 'w-full',
    className,
  ]
    .filter(Boolean)
    .join(' ')
}

type Props =
  | (Own & { to: string } & Omit<ComponentProps<typeof Link>, 'to' | 'className'>)
  | (Own & { href: string } & Omit<ComponentProps<'a'>, 'href' | 'className'>)
  | (Own & { to?: undefined; href?: undefined } & Omit<
        ComponentProps<'button'>,
        'className'
      >)

export default function Button(props: Props) {
  const { variant, size, icon, block, className, ...rest } = props
  const cls = buttonClass({ variant, size, icon, block, className })
  if ('to' in rest && rest.to !== undefined)
    return <Link {...(rest as ComponentProps<typeof Link>)} className={cls} />
  if ('href' in rest && rest.href !== undefined) {
    const external = /^https?:/.test(rest.href)
    return (
      <a
        {...(rest as ComponentProps<'a'>)}
        className={cls}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      />
    )
  }
  return <button type="button" {...(rest as ComponentProps<'button'>)} className={cls} />
}
