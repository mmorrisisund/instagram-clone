import { classNames } from '../utils/class-names'

const Button = ({ className, disabled, children, ...props }) => (
  <button
    className={classNames(
      className,
      'bg-blue-500 text-blue-50 rounded text-sm font-bold w-full px-3 py-1.5 transition-opacity duration-75',
      disabled ? 'opacity-25' : 'opacity-100'
    )}
    {...props}
  >
    {children}
  </button>
)

export default Button
