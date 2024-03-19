import Link from 'next/link'

const StudyMode = ({
  contentStart,
  contentEnd,
  title,
  description,
  type,
  link
}) => {
  return (
    <Link href={link ? link : ''} className='grow'>
      {type !== 'large' ? (
        <div className='flex items-center bg-[#2e3856] px-3 py-2 gap-2 rounded-xl relative overflow-hidden after:absolute after:left-0 after:right-0 after:bottom-0 after:h-1 after:hover:bg-secondary after:transition'>
          <div className='content-start'>{contentStart}</div>
          <div className='content-center'>
            {title && (
              <p className='text-base font-bold leading-snug'>{title}</p>
            )}
          </div>
          <div className='content-end'>{contentEnd}</div>
        </div>
      ) : (
        <div className='flex items-center max-w-80 gap-2 px-4 py-4 bg-slate-500 rounded-lg border-2 border-slate-800 hover:border-white transition cursor-pointer'>
          <div className='content-start'>{contentStart}</div>
          <div className='content-center'>
            {title && (
              <div className='flex flex-col gap-2'>
                <p className='text-base font-semibold leading-snug text-cyan-500'>
                  {title}
                </p>
                {description && (
                  <p className='text-gray-500 text-sm font-normal'>
                    {description}
                  </p>
                )}
              </div>
            )}
          </div>
          <div className='content-end'>{contentEnd}</div>
        </div>
      )}
    </Link>
  )
}

export default StudyMode
