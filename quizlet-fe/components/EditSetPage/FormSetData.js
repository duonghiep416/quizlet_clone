import { useMemo, useState } from 'react'
import MainInput from '../MainInput'
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger
} from '@nextui-org/react'
import { useQuery } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import { toast } from 'sonner'

const FormSetData = ({
  defaultMetadata,
  updateMetadata,
  setStatusUpdateData
}) => {
  const accessToken = Cookies.get('accessToken')
  const [metadata, setMetadata] = useState({
    title: defaultMetadata.title,
    description: defaultMetadata.description,
    folderId: defaultMetadata.folderId
  })
  const [selectedKeys, setSelectedKeys] = useState(new Set([metadata.folderId]))
  const [categories, setCategories] = useState([])
  const selectedValue = useMemo(
    () =>
      categories.find((item) => item.id === +Array.from(selectedKeys)[0])
        ?.name || 'Chọn thư mục',
    [selectedKeys, categories]
  )
  setTimeout(() => {
    if (updateMetadata) {
      updateMetadata({ ...metadata, isUpdate: true })
      setStatusUpdateData(false)
    }
  })
  const { data } = useQuery({
    queryKey: ['folders'],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/categories`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      ).then((res) => res.json())
      if (response.status !== 200) {
        return toast.error('Có lỗi xảy ra, vui lòng thử lại sau')
      }
      setCategories(response.data.rows)
      return response
    },
    refetchOnWindowFocus: false
  })
  return (
    <div>
      <MainInput
        label='Tiêu đề'
        className='mb-5'
        onChange={(e) => {
          if (e.target.value.length < 101) {
            setMetadata((prev) => ({
              ...prev,
              title: e.target.value
            }))
          }
        }}
        value={metadata.title}
        isRequired
        isClearable
        isInvalid={metadata.title.length >= 100 || metadata.title.length === 0}
        errorMessage={
          (metadata.title.length >= 100 || metadata.title.length === 0) &&
          'Tiêu đề không được quá 100 ký tự và không được để trống'
        }
        onClear={() => {
          setMetadata((prev) => ({
            ...prev,
            title: ''
          }))
        }}
      />
      <div className='flex gap-5'>
        <MainInput
          label='Thêm Mô tả...'
          size='lg'
          value={metadata.description}
          isInvalid={metadata.title.length >= 255}
          className='grow'
          isClearable
          errorMessage={
            metadata.title.length >= 255 && 'Tiêu đề không được quá 255 ký tự'
          }
          onChange={(e) => {
            if (e.target.value.length < 256) {
              setMetadata((prev) => ({
                ...prev,
                description: e.target.value
              }))
            }
          }}
          onClear={() => {
            setMetadata((prev) => ({
              ...prev,
              description: ''
            }))
          }}
        />
        <Dropdown>
          <DropdownTrigger>
            <Button variant='bordered'>{selectedValue}</Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label='categories'
            selectionMode='single'
            disallowEmptySelection
            selectedKeys={selectedKeys}
            variant='flat'
            onSelectionChange={(e) => {
              setMetadata((prev) => ({
                ...prev,
                folderId: +Array.from(e)[0]
              }))
              setSelectedKeys(e)
            }}
            items={[
              {
                id: 0,
                name: 'Chọn thư mục'
              }
            ].concat(categories)}
          >
            {(item) => <DropdownItem key={item.id}>{item.name}</DropdownItem>}
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  )
}

export default FormSetData
