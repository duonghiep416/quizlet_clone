import { Input } from '@nextui-org/react'

const MainInput = ({ label, className, size = 'md', ...props }) => {
  return (
    <Input
      label={label}
      radius='lg'
      size={size}
      className={className}
      {...props}
      classNames={{
        label: 'text-black/50 dark:text-white/90 font-semibold text-base',
        input: [
          'bg-transparent',
          'text-black/90 dark:text-white/90',
          'placeholder:text-default-700/50 dark:placeholder:text-white/60'
        ],
        innerWrapper: `bg-transparent`,
        inputWrapper: [
          'rounded-lg',
          'shadow-xl',
          'dark:bg-gray-main',
          'backdrop-blur-xl',
          'backdrop-saturate-200',
          'hover:bg-gray-main',
          'dark:hover:bg-gray-main',
          'group-data-[focused=true]:bg-gray-main',
          'dark:group-data-[focused=true]:bg-gray-main',
          '!cursor-text'
        ]
      }}
    />
  )
}

export default MainInput
