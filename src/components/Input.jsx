import { forwardRef } from 'react'
import { classNames } from '../utils/class-names'

const Input = forwardRef(({ className, ...props }, ref) => {
  const resolveClass = () =>
    classNames(
      className,
      'bg-gray-50 rounded border border-gray-200 text-xs leading-5 px-3 py-2 w-full'
    )
  return <input className={resolveClass()} {...props} ref={ref} />
})

export default Input
