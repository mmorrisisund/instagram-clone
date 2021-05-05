const SIZES = {
  small: { outer: 'h-6 w-6', inner: 'h-5 w-5', image: 'h-4 w-4' },
  medium: { outer: 'h-10 w-10', inner: 'h-9 w-9', image: 'h-8 w-8' },
  large: { outer: 'h-14 w-14', inner: 'h-13 w-13', image: 'h-12 w-12' },
}

const Avatar = ({
  image = '/images/avatar.png',
  size = 'small',
  className,
}) => {
  return (
    <div>
      <div className='relative'>
        <div
          className={`${SIZES[size].outer} bg-gradient-to-tr from-yellow-300 to-purple-800 via-pink-800 rounded-full`}
        />
        <div
          className={`${SIZES[size].inner} rounded-full bg-white absolute top-0.5 left-0.5`}
        />
        <div
          className={`${SIZES[size].image} rounded-full absolute top-1 left-1`}
        >
          <img
            className={`rounded-full h-full w-full bg-clip-content`}
            src={image}
            alt='avatar'
          />
        </div>
      </div>
    </div>
  )
}

export default Avatar
