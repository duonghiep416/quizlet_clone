'use client'
import Button from '@/components/Button'
import AvatarPreview from '@/components/SettingsPage/AvatarPreview'
import SettingBox from '@/components/SettingsPage/SettingBox'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'

const ContainerSetting = () => {
  const accessToken = Cookies.get('accessToken')

  const [avatars, setAvatars] = useState([])
  let currentAvatar = avatars.find((avatar) => avatar.is_avatar === true)

  const handleUploadFile = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('avatar', file)
    try {
      const result = await fetch(
        `${process.env.NEXT_PUBLIC_API}/avatars/upload`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`
          },
          body: formData
        }
      )
      const data = await result.json()
      if (data.status !== 200) {
        return
      }
      const updatedAvatars = [...avatars]
      const oldMainAvtIndex = updatedAvatars.findIndex(
        (avatar) => avatar.is_avatar === true
      )
      if (oldMainAvtIndex !== -1) {
        updatedAvatars[oldMainAvtIndex].is_avatar = false
      }
      if (data.isDuplicate) {
        const newMainAvtIndex = updatedAvatars.findIndex(
          (avatar) => avatar.image_url === data.data.image_url
        )
        updatedAvatars[newMainAvtIndex].is_avatar = true
      } else {
        updatedAvatars.forEach((avatar) => {
          avatar.is_avatar = false
        })
        updatedAvatars.unshift(data.data)
        updatedAvatars[0].is_avatar = true
      }
      setAvatars(updatedAvatars)
    } catch (error) {
      console.error('Error uploading avatar:', error)
    }
  }

  useEffect(() => {
    try {
      const fetchAvatars = async () => {
        const result = await fetch(`${process.env.NEXT_PUBLIC_API}/avatars`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
          }
        })
        const data = await result.json()
        setAvatars(data.data)
      }
      fetchAvatars()
    } catch (error) {
      console.error('Error fetching user profile:', error)
    }
  }, [])
  return (
    <>
      <SettingBox icon='/icon/settings/boost.svg' title='Nâng cấp'>
        <div className='flex flex-col gap-5 items-start'>
          <h2 className='font-bold text-xl'>Nâng cấp để dùng Quizlet Plus</h2>
          <p>
            Truy cập chế độ Học, bài kiểm tra thử, lời giải chuyên gia và công
            cụ sáng tạo – tất cả đều không có quảng cáo.
          </p>
          <Button
            btnType='secondary'
            content='Nâng cấp: dùng thử miễn phí 7 ngày'
          />
        </div>
      </SettingBox>
      <SettingBox
        typeImage='avatar'
        icon={`${
          avatars.length && currentAvatar
            ? process.env.NEXT_PUBLIC_SERVER_URL + currentAvatar.image_url
            : '/images/avatar-default/cat.png'
        }`}
        title='Ảnh hồ sơ'
      >
        <div className='selected-avatar mb-5 flex gap-3 flex-wrap'>
          {avatars.map((avatar) => (
            <AvatarPreview
              key={avatar.id}
              path={avatar.image_url}
              isAvatar={avatar.is_avatar}
              onClick={async () => {
                const updatedAvatars = [...avatars]
                const oldMainAvtIndex = updatedAvatars.findIndex(
                  (avt) => avt.is_avatar === true
                )
                updatedAvatars[oldMainAvtIndex].is_avatar = false
                const newMainAvtIndex = updatedAvatars.findIndex(
                  (avt) => avt.id === avatar.id
                )
                updatedAvatars[newMainAvtIndex].is_avatar = true
                const response = await fetch(
                  `${process.env.NEXT_PUBLIC_API}/avatars/${avatar.id}`,
                  {
                    method: 'PATCH',
                    headers: {
                      'Content-Type': 'application/json',
                      Authorization: `Bearer ${accessToken}`
                    }
                  }
                )
                const data = await response.json()
                if (data.status !== 200) {
                  console.error('Error updating avatar:', data.message)
                } else {
                  setAvatars(updatedAvatars)
                }
              }}
            />
          ))}
        </div>
        <Button
          as='label'
          htmlFor='avatar-file'
          btnType='primary'
          content='Tải lên ảnh của riêng bạn (Tối đa 2MB)'
        />
        <input
          type='file'
          name='avatar-file'
          id='avatar-file'
          className='opacity-0 -z-10 absolute'
          onChange={handleUploadFile}
        />
      </SettingBox>
    </>
  )
}

export default ContainerSetting
