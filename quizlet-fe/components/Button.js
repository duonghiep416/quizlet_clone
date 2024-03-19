const Button = ({
  content,
  style,
  btnType,
  image,
  onClick,
  type,
  as = 'button',
  ...props
}) => {
  const color = {
    primary: 'bg-primary text-white hover:bg-secondary',
    secondary: 'bg-secondary text-white hover:bg-secondaryHover',
    yellow: 'bg-yellow text-black hover:bg-yellowHover',
    transparent:
      'bg-transparent text-white hover:bg-grayLight hover:text-black ',
    'large-transparent':
      'flex items-center justify-center w-full h-14 hover:bg-[#edeff4] border-2 border-gray text-gray-600 text-base',
    'large-secondary':
      'bg-secondary text-white hover:bg-secondaryHover flex items-center justify-center w-full h-14 border-none outline-none text-base'
  }
  const As = as
  return (
    <As
      style={style}
      className={`rounded-lg px-3 py-2 text-sm font-semibold flex gap-2 items-center justify-center transition-all ${color[btnType]} cursor-pointer select-none`}
      onClick={onClick}
      type={type || 'submit'}
      {...props}
    >
      {image && <img src={image} alt='icon' className='w-6 h-6' />}
      {content}
    </As>
  )
}

export default Button
