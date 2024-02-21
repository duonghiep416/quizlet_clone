const SearchInput = ({ width, height, placeholder, id, name }) => {
  return (
    <input
      type='text'
      style={{ width: width, height: height }}
      className='w-full h-9 bg-[#2e3856] border-none rounded-full outline-none pl-9 placeholder:font-bold '
      placeholder={placeholder}
      id={id}
      name={name}
    />
  )
}

export default SearchInput
