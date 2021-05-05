const SIZES = {
  small: 'h-6 w-6',
  medium: 'h-8 w-8',
  large: 'h-14 w-14',
}

const Avatar = ({
  image = '/images/avatar.png',
  size = 'medium',
  className,
}) => {
  return (
    <div>
      <div>
        <img
          className={`${SIZES[size]} rounded-full ${className}`}
          src={image}
          alt='avatar'
        />
      </div>
    </div>
  )
}

export default Avatar
