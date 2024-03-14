import Image from 'next/image'

const UserInfo = ({ avatar, name, children }) => {
  return (
    <div className='flex items-center gap-2 font-semibold text-sm text-slate-300'>
      <Image
        src={process.env.NEXT_PUBLIC_SERVER_URL + avatar}
        alt={name}
        width={18}
        height={18}
        style={{
          objectFit: 'cover',
          borderRadius: '50%',
          height: '18px'
        }}
      />
      <p>{name}</p>
      {children}
    </div>
  )
}

export default UserInfo
