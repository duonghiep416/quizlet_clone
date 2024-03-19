'use client'
import list from '@/list/list'
import SearchInput from './SearchInput'
import Button from './Button'
import DropdownBtn from './DropdownBtn'
import LibraryDropdown from './LibraryDropdown'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { getProfileUser } from '@/utils/getProfileUser.utils'
import { userSlice } from '@/redux/slice/userSlice'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
const { setUser, removeUser } = userSlice.actions
const Header = () => {
  const user = useSelector((state) => state.user.userData)
  const router = useRouter()
  const dispatch = useDispatch()
  useEffect(() => {
    getProfileUser(process.env.NEXT_PUBLIC_API, dispatch, setUser, removeUser)
  }, [dispatch])
  const redirectLoginPage = () => {
    router.push('/auth/login')
  }

  // Dropdown
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      !event.target.closest('.relative')
    ) {
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
    <header className='header flex items-center px-4 h-16 border-b border-b-bottomHeader'>
      <div className='topNavigation-content flex justify-between items-center w-full gap-8'>
        <div className='topNavigation-content-left h-full flex'>
          <Link href='' className='px-3'>
            <div className='logo h-full flex items-center'>
              <img src='/svg-export/logo.svg' alt='' />
            </div>
          </Link>
          <ul className='flex items-center px-2'>
            {list.navHeader.navItemsLeft.map((navItem, index) => {
              return (
                <li
                  key={index}
                  className='relative'
                  ref={navItem.isDropDown ? dropdownRef : null}
                  onClick={toggleDropdown}
                >
                  <Link
                    href={navItem.isDropDown ? '#' : navItem.href}
                    className='px-3 leading-[64px] text-small-bold active-nav-item flex items-center gap-2'
                  >
                    {navItem.name}
                    {navItem.icon && (
                      <img
                        src={navItem.icon}
                        alt='Arrow Down Icon'
                        width={16}
                      />
                    )}
                  </Link>
                  {isDropdownOpen && navItem.isDropDown && (
                    <LibraryDropdown setIsDropdownOpen={setIsDropdownOpen} />
                  )}
                </li>
              )
            })}
          </ul>
        </div>
        <div className='topNavigation-content-middle grow flex items-center relative'>
          <SearchInput
            placeholder='Tìm kiếm câu hỏi'
            id='global-search'
            name='global-search'
          />
          <img
            src='/svg-export/search.svg'
            alt=''
            className='absolute left-3 w-4 h-4'
          />
        </div>
        <div className='topNavigation-content-right'>
          <div className='flex gap-4'>
            {user &&
              list.navHeader.navItemsRight.map((navItem, index) => {
                return (
                  <DropdownBtn
                    key={index}
                    image={navItem.icon}
                    type={navItem.type}
                    data={navItem.dropDown}
                  />
                )
              })}
            {user ? (
              <Button
                content='Nâng cấp: Dùng thử miễn phí 7 ngày'
                btnType='yellow'
              />
            ) : (
              <div className='flex gap-2'>
                <Button
                  content='Đăng ký'
                  btnType='transparent'
                  onClick={redirectLoginPage}
                />
                <Button
                  content='Đăng nhập'
                  btnType='secondary'
                  onClick={redirectLoginPage}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
