const Button = ({ content, style, btnType, image, onClick }) => {
  const type = {
    primary: 'bg-primary text-white',
    secondary: 'bg-secondary text-white hover:bg-secondaryHover',
    yellow: 'bg-yellow text-black hover:bg-yellowHover',
    transparent:
      'bg-transparent text-white hover:bg-grayLight hover:text-black ',
    'large-transparent':
      'flex items-center justify-center w-full h-14 hover:bg-[#edeff4] border-2 border-gray text-gray-600 text-base',
    'large-secondary':
      'bg-secondary text-white hover:bg-secondaryHover flex items-center justify-center w-full h-14 border-none outline-none text-base'
  }
  return (
    <button
      style={style}
      className={`rounded-lg px-3 py-2 text-sm font-semibold flex gap-2 items-center justify-center transition-all ${type[btnType]}`}
      onClick={onClick}
    >
      {image && <img src={image} alt='icon' className='w-6 h-6' />}
      {content}
    </button>
  )
}

export default Button
