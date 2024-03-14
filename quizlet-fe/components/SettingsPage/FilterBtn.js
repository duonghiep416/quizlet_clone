'use client'
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button
} from '@nextui-org/react'
import { useMemo, useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
const FilterBtn = () => {
  const [selectedKeys, setSelectedKeys] = useState(new Set(['Đã tạo']))

  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(', ').replaceAll('_', ' '),
    [selectedKeys]
  )
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          variant='bordered'
          className='capitalize'
          endContent={<ChevronDownIcon className='h-4' />}
        >
          {selectedValue}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label='Single selection example'
        variant='flat'
        disallowEmptySelection
        selectionMode='single'
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
      >
        <DropdownItem key='Đã tạo'>Đã tạo</DropdownItem>
        <DropdownItem key='Gần đây'>Gần đây</DropdownItem>
        <DropdownItem key='Đã học'>Đã học</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}

export default FilterBtn
