import ClipLoader from 'react-spinners/ClipLoader'

const Loading = ({ isLoading }) => {
  return (
    <div className='fixed inset-0 flex items-center justify-center'>
      <ClipLoader
        color='#ffffff'
        loading={isLoading}
        size={100}
        aria-label='Loading Spinner'
        data-testid='loader'
      />
    </div>
  )
}

export default Loading
