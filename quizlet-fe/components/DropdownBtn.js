import React, { useState, useRef, useEffect } from 'react'

const DropdownBtn = ({ image, type, data }) => {
  const typeBtn = {
    add: {
      bgColor: '#4255ff'
    },

    notification: {
      bgColor: 'transparent'
    },

    profile: {
      bgColor: null
    }
  }
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className='relative' ref={dropdownRef}>
      <div
        className='rounded-full flex items-center justify-center w-10 h-10 bg-secondary cursor-pointer overflow-hidden'
        style={{
          background: `${typeBtn[type].bgColor}`,
          border: `${
            typeBtn[type].bgColor === 'transparent'
              ? '2px solid #586380'
              : 'none'
          }`
        }}
        onClick={toggleDropdown}
      >
        {type === 'profile' ? (
          <img src={image} alt='Action Icon' className='w-full h-full' />
        ) : (
          <img src={image} alt='Action Icon' className='w-6 h-6' />
        )}
      </div>
      {isDropdownOpen && data && (
        <div className='absolute top-12 right-0 z-10 w-56 rounded-md bg-primary overflow-hidden shadow-sm shadow-[#313131]'>
          <ul>
            {data
              .sort((a, b) => {
                return a.group - b.group
              })
              .map((item, index) => {
                return (
                  <li
                    key={index}
                    style={{
                      borderTop: `${
                        index >= 1 && item.group !== data[index - 1].group
                          ? '1px solid #282e3e'
                          : 'none'
                      }`
                    }}
                  >
                    <a
                      href={item.href}
                      className='px-6 py-2 font-semibold text-base hover:bg-bottomHeader hover:text-white flex items-center gap-2'
                    >
                      {item.icon && (
                        <img
                          src={item.icon}
                          alt='Icon'
                          width={24}
                          height={24}
                        />
                      )}
                      {item.name}
                    </a>
                  </li>
                )
              })}
          </ul>
        </div>
      )}
    </div>
  )
}

export default DropdownBtn
