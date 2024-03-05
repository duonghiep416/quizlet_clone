'use client'

import { usePathname } from 'next/navigation'

const Navigation = () => {
  const pathname = usePathname()
  const list = [
    { name: 'Thành tựu', path: '/profile' },
    { name: 'Học phần', path: '/profile/sets' },
    { name: 'Lời giải chuyên gia', path: '/profile/explanations' },
    { name: 'Thư mục', path: '/profile/folders' },
    { name: 'Lớp học', path: '/profile/classes' }
  ]
  return (
    <div className='w-full border-b-2 border-b-bottomHeader'>
      <nav>
        <ul className='flex text-gray font-semibold text-base'>
          {list.map((item, index) => {
            return (
              <li key={index}>
                <a
                  href={item.path}
                  className={`relative inline-block leading-loose pr-3 py-1 nav-active ${
                    pathname === item.path ? 'text-white after:right-3' : ''
                  }`}
                >
                  {item.name}
                </a>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}

export default Navigation
