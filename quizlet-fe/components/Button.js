const Button = ({ content, style, btnType }) => {
  const type = {
    primary: 'bg-primary text-white',
    secondary: 'bg-secondary text-white hover:bg-secondaryHover transition-all',
    yellow: 'bg-yellow text-black hover:bg-yellowHover transition-all',
    transparent:
      'bg-transparent text-white hover:bg-grayLight hover:text-black transition-all'
  }
  return (
    <button
      style={style}
      className={`${type[btnType]} rounded-lg px-3 py-2 text-sm font-semibold`}
    >
      {content}
    </button>
  )
}

export default Button
