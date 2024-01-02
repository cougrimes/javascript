import * as React from 'react'
import { clsx } from 'clsx'

import { type StyleProps } from './styleProps'
import { stylePropsToCss } from './stylePropsToCss'
import { sanitize } from '../../shared/sanitize'

function prefixPart(part: string | undefined) {
  return part ? `fr-${part}` : part
}

function processPart(part: string | string[] | undefined) {
  if (!part) return part

  return Array.isArray(part) ? part.map((p) => prefixPart(p)).join(' ') : prefixPart(part)
}

export type BoxProps<T extends React.ElementType = React.ElementType> = {
  as?: T
  part?: string | string[]
} & StyleProps &
  React.ComponentPropsWithoutRef<T>

function BoxWithRef<T extends React.ElementType = React.ElementType>(
  { as, children, className, css, part, ...props }: BoxProps<T>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const Component = as ?? 'div'

  const { cssFromProps, unmatchedProps } = stylePropsToCss(props)

  const processedPart = processPart(part)
  const classNameWithPart = className || processedPart ? clsx(className, processedPart) : undefined

  const cssProp = [{ boxSizing: 'border-box' }, cssFromProps, css]

  if (typeof children === 'string') {
    return (
      <Component
        className={classNameWithPart}
        css={cssProp}
        {...unmatchedProps}
        ref={ref}
        dangerouslySetInnerHTML={sanitize(children)}
      />
    )
  }

  return (
    <Component className={classNameWithPart} css={cssProp} {...unmatchedProps} ref={ref}>
      {children}
    </Component>
  )
}

export const Box = React.forwardRef(BoxWithRef) as <
  T extends React.ElementType = React.ElementType
>(
  props: BoxProps<T>
) => React.ReactElement
