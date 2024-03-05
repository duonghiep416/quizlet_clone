import ContainerSetting from './container'

export const metadata = {
  title: 'Cài đặt | Quizlet',
  description: 'Settings page for Quizlet users.'
}
const SettingPage = () => {
  return (
    <div className='w-2/3 mx-auto py-6 flex flex-col gap-10'>
      <ContainerSetting />
    </div>
  )
}

export default SettingPage
