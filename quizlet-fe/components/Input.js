const Input = ({ label, id, name, placeholder, style, inputType, type }) => {
  return (
    <div className='form-group'>
      <label htmlFor={id}>{label}</label>
      <input
        type={type || 'text'}
        placeholder={placeholder || ''}
        id={id}
        name={name || id || ''}
        style={style || {}}
      />
    </div>
  )
}

export default Input
