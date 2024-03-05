const AvatarPreview = ({ path, isAvatar, onClick }) => {
  return (
    <div
      className={`w-12 h-12 rounded-full border-2 border-black overflow-hidden cursor-pointer ${
        isAvatar ? 'border-white' : ''
      }`}
      onClick={onClick}
    >
      <img
        src={`${process.env.NEXT_PUBLIC_SERVER_URL}${path}`}
        alt=''
        className='w-full h-full object-cover'
      />
    </div>
  )
}

export default AvatarPreview
