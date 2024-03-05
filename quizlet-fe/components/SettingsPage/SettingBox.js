const SettingBox = ({ icon, title, children, typeImage }) => {
  const images = {
    avatar: 'rounded-full object-cover'
  }
  return (
    <div className='flex justify-between gap-5'>
      <div className='setting-box-title flex flex-col items-center gap-3 w-52'>
        <img
          src={icon}
          alt=''
          className={`w-[50px] h-[50px] ${images[typeImage]}`}
        />
        <h3 className='text-white font-bold text-xl'>{title}</h3>
      </div>
      <div className='setting-box-content bg-gray-700 p-4 grow rounded-lg'>
        {children}
      </div>
    </div>
  )
}

export default SettingBox
