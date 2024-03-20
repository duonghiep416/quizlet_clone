import { useState } from 'react'
import MainInput from '../MainInput'

const FormSetData = ({
  defaultMetadata,
  updateMetadata,
  setStatusUpdateData
}) => {
  const [metadata, setMetadata] = useState({
    title: defaultMetadata.title,
    description: defaultMetadata.description
  })
  setTimeout(() => {
    if (updateMetadata) {
      updateMetadata({ ...metadata, isUpdate: true })
      setStatusUpdateData(false)
    }
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
      <MainInput
        label='Thêm Mô tả...'
        size='lg'
        value={metadata.description}
        isInvalid={metadata.title.length >= 255}
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
    </div>
  )
}

export default FormSetData
