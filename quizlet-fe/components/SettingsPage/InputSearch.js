import { Input } from '@nextui-org/react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
const InputSearch = ({ placeholder, label }) => {
  return (
    <Input
      placeholder={placeholder}
      label={label}
      classNames={{
        innerWrapper: 'bg-transparent',
        inputWrapper: [
          'shadow-xl',
          'bg-default-200/70',
          'dark:bg-default/60',
          'backdrop-blur-xl',
          'backdrop-saturate-200',
          'hover:bg-default-200/70',
          'dark:hover:bg-default/70',
          '!cursor-text'
        ],
        input: [
          'bg-transparent',
          'text-black/90 dark:text-white/90',
          'placeholder:text-default-700/50 dark:placeholder:text-white/60',
          'text-base'
        ]
      }}
      className='w-96'
      endContent={<MagnifyingGlassIcon className='w-6 -translate-y-[6px]' />}
    />
  )
}

export default InputSearch
