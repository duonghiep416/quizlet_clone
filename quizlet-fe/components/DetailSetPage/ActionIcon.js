import { PencilIcon } from '@heroicons/react/24/solid'
import { Tooltip } from '@nextui-org/react'

const ActionIcon = ({ type, tooltip }) => {
  return (
    <div className='edit transition hover:bg-slate-500 p-2 rounded-full flex items-center justify-center cursor-pointer'>
      <Tooltip
        content={tooltip}
        closeDelay={0}
        classNames={{
          content: ['bg-slate-700 text-white rounded-md px-2 py-1']
        }}
        offset={15}
      >
        {type === 'edit' && <PencilIcon className='h-5 w-5 text-white' />}
      </Tooltip>
    </div>
  )
}

export default ActionIcon
