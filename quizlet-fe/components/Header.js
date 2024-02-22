'use client'
import list from '@/list/list'
import SearchInput from './SearchInput'
import Button from './Button'
import DropdownBtn from './DropdownBtn'
import LibraryDropdown from './LibraryDropdown'
import { useSelector } from 'react-redux'
const Header = () => {
  const user = useSelector((state) => state.user.userData)
  return (
    <header className='header flex items-center px-4 h-16 border-b border-b-bottomHeader'>
      <div className='topNavigation-content flex justify-between items-center w-full gap-8'>
        <div className='topNavigation-content-left h-full flex'>
          <a href='' className='px-3'>
            <div className='logo h-full flex items-center'>
              <img src='/svg-export/logo.svg' alt='' />
            </div>
          </a>
          <ul className='flex items-center px-2'>
            {list.navHeader.navItemsLeft.map((navItem, index) => {
              return (
                <li key={index} className='relative'>
                  <a
                    href={navItem.href}
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
                  </a>
                  {navItem.isDropDown && <LibraryDropdown />}
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
                <Button content='Đăng ký' btnType='transparent' />
                <Button content='Đăng nhập' btnType='secondary' />
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
