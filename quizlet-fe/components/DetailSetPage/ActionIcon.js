'use client'
import { PencilIcon } from '@heroicons/react/24/solid'
import { Tooltip } from '@nextui-org/react'
import { useState } from 'react'

const ActionIcon = ({
  type,
  IconComponent,
  tooltip,
  content,
  styleContainer,
  iconStyle,
  contentStyle,
  isActive,
  ...props
}) => {
  const [active, setActive] = useState(isActive || false)
  return (
    <div
      className='edit transition hover:bg-slate-500 p-2 rounded-full flex items-center justify-center cursor-pointer shrink-0 select-none'
      style={styleContainer || {}}
      onClick={() => {
        if (isActive === true || isActive === false) {
          setActive(!active)
        }
      }}
      {...props}
    >
      <Tooltip
        content={tooltip}
        closeDelay={0}
        classNames={{
          content: ['bg-slate-700 text-white rounded-md px-2 py-1']
        }}
        offset={15}
      >
        <div className='flex items-center justify-center gap-2'>
          {type === 'edit' ? (
            <PencilIcon
              className='h-5 w-5 text-white'
              style={iconStyle || {}}
            />
          ) : (
            <IconComponent
              className='h-5 w-5 text-white'
              style={{ ...iconStyle, color: active ? '#ffdc62' : '' } || {}}
            />
          )}
          {content && (
            <p
              className='text-white text-base font-semibold'
              style={contentStyle || {}}
            >
              {content}
            </p>
          )}
        </div>
      </Tooltip>
    </div>
  )
}

export default ActionIcon
