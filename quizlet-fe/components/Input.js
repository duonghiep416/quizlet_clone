import Link from 'next/link'

const Input = ({
  label,
  id,
  name,
  placeholder,
  style,
  type,
  isForgotPassword,
  isRequired,
  message
}) => {
  return (
    <div className='form-group flex flex-col gap-2 text-gray-600 font-bold mb-5'>
      <div className='row flex justify-between'>
        <label htmlFor={id}>{label}</label>
        {isForgotPassword && (
          <Link href='#' className='text-secondary'>
            Forgot password
          </Link>
        )}
      </div>
      <input
        type={type || 'text'}
        placeholder={placeholder || ''}
        id={id}
        name={name || id || ''}
        style={style || {}}
        className='h-12 px-4 border focus:border-b-gray-300 rounded-md outline-none'
        required={isRequired || false}
      />
      {message && (
        <span className='text-red font-semibold text-sm'>{message}</span>
      )}
    </div>
  )
}

export default Input
