const list = [
  {
    name: 'Học phần',
    data: [
      {
        name: 'Học phần 1',
        author: 'Nguyễn Văn A',
        avatar:
          'https://graph.facebook.com/1104144320046099/picture?type=large',
        href: '#'
      },
      {
        name: 'Học phần 2',
        author: 'Nguyễn Văn B',
        avatar:
          'https://graph.facebook.com/1104144320046099/picture?type=large',
        href: '#'
      },
      {
        name: 'Học phần 3',
        author: 'Nguyễn Văn C',
        avatar:
          'https://graph.facebook.com/1104144320046099/picture?type=large',
        href: '#'
      },
      {
        name: '4',
        author: 'Nguyễn Văn D',
        avatar:
          'https://graph.facebook.com/1104144320046099/picture?type=large',
        href: '#'
      },
      {
        name: '4',
        author: 'Nguyễn Văn E',
        avatar:
          'https://graph.facebook.com/1104144320046099/picture?type=large',
        href: '#'
      }
    ]
  }
]
const LibraryDropdown = () => {
  return (
    <div className='absolute top-16 left-0 z-10 min-w-96 max-w-sm rounded-md bg-primary overflow-hidden border border-[#313131] '>
      <div className='dropdown-header'>
        <ul className='flex border-b border-bottomHeader font-semibold text-center'>
          <li className='dropdown-nav flex-grow hover:bg-bottomHeader px-1 py-2 cursor-pointer'>
            Học phần
          </li>
          <li className='dropdown-nav flex-grow hover:bg-bottomHeader px-1 py-2 cursor-pointer'>
            Lời giải chuyên gia
          </li>
          <li className='dropdown-nav flex-grow hover:bg-bottomHeader px-1 py-2 cursor-pointer'>
            Thư mục
          </li>
        </ul>
      </div>
      {list.map((item, index) => {
        return (
          <div key={index} className='dropdown-content'>
            <ul>
              {item.data.map((data, index) => {
                return (
                  <li key={index} className='hover:bg-bottomHeader'>
                    <a
                      href={data.href}
                      className='text-base font-bold flex flex-col w-full h-full justify-center gap-2 px-4 py-3 hover:bg-bottomHeader'
                    >
                      {data.name}
                      <div className='profile flex items-center gap-2'>
                        <img
                          src={data.avatar}
                          alt='Avatar'
                          className='w-4 h-4 rounded-full '
                        />
                        <p className=' text-xs text-[#bbbbbb]'>{data.author}</p>
                      </div>
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        )
      })}
    </div>
  )
}

export default LibraryDropdown
