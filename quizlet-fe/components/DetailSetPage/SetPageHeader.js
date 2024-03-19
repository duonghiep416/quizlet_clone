import { ShareIcon } from '@heroicons/react/24/outline'
import Profile from '../Profile'
import ActionIcon from './ActionIcon'

const SetPageHeader = () => {
  return (
    <div className='flex justify-between items-center mt-10'>
      <Profile
        styleContainer={{
          gap: '10px',
          marginBottom: '0'
        }}
        styleImage={{
          width: '48px',
          height: '48px'
        }}
        styleName={{
          fontSize: '16px',
          marginBottom: '0',
          lineHeight: '1.25'
        }}
        styleEmail={{
          fontSize: '14px'
        }}
      />
      <div className='page-header-action flex gap-3'>
        <ActionIcon
          tooltip='Chia sẻ'
          type='share'
          IconComponent={ShareIcon}
          iconStyle={{
            width: '20px',
            height: '20px'
          }}
          styleContainer={{
            borderRadius: '8px',
            border: '2px solid white'
          }}
          content='Chia sẻ'
        />
        <ActionIcon
          tooltip='Chỉnh sửa'
          type='edit'
          IconComponent={ShareIcon}
          iconStyle={{
            width: '20px',
            height: '20px'
          }}
          styleContainer={{
            borderRadius: '8px',
            border: '2px solid white'
          }}
        />
      </div>
    </div>
  )
}

export default SetPageHeader
