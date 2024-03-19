import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
  Switch,
  cn
} from '@nextui-org/react'
import ActionIcon from './ActionIcon'
import { Cog6ToothIcon } from '@heroicons/react/24/outline'

const SettingCarousel = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <>
      <Button onPress={onOpen} className='bg-transparent min-w-0 p-0'>
        <ActionIcon
          tooltip='Tùy chọn'
          IconComponent={Cog6ToothIcon}
          iconStyle={{
            width: '24px',
            height: '24px'
          }}
        />
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size='2xl'>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                Tùy chọn
              </ModalHeader>
              <ModalBody className='flex flex-col gap-7'>
                <div className='flex items-center justify-between'>
                  <div className='w-[80%]'>
                    <p className='font-bold mb-2'>
                      Thời gian chuyển các thẻ ghi nhớ
                    </p>
                    <p className='text-sm font-normal'>
                      Khi sử dụng tính năng tự động chuyển các thẻ ghi nhớ bạn
                      có thể thay đổi thời gian chuyển giữa các thẻ
                    </p>
                  </div>
                  <Input
                    type='number'
                    max={10}
                    min={1}
                    variant='bordered'
                    className='w-24'
                  />
                </div>
                <div className='flex items-center justify-between'>
                  <div className='w-[80%]'>
                    <p className='font-bold mb-2'>
                      Tự động lặp lại các thẻ ghi nhớ
                    </p>
                    <p className='text-sm font-normal'>
                      Khi sử dụng tính năng tự động chuyển các thẻ ghi nhớ bạn
                      có cài đặt việc lặp lại các thẻ ghi nhớ khi đã hoàn thành
                    </p>
                  </div>
                  <Switch
                    classNames={{
                      wrapper: cn(
                        'p-0 h-4 overflow-visible ',
                        'group-data-[selected=true]:bg-secondary'
                      ),
                      thumb: cn(
                        'w-6 h-6 border-2 shadow-lg',
                        'group-data-[hover=true]:border-primary',
                        //selected
                        'group-data-[selected=true]:ml-6',

                        // pressed
                        'group-data-[pressed=true]:w-7',
                        'group-data-[selected]:group-data-[pressed]:ml-4'
                      )
                    }}
                  />
                </div>
              </ModalBody>

              <ModalFooter>
                <Button color='danger' variant='light' onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default SettingCarousel
