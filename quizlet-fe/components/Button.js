const Button = ({ content, style }) => {
  return (
    <button style={style} className='rounded-lg'>
      {content}
    </button>
  )
}

export default Button
