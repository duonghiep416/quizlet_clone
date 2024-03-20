export function ReorderIcon({ dragControls }) {
  return (
    <svg
      width='25px'
      height='25px'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      onPointerDown={(event) => dragControls.start(event)}
      className='cursor-grab'
    >
      <g id='SVGRepo_bgCarrier' stroke-width='0'></g>
      <g
        id='SVGRepo_tracerCarrier'
        stroke-linecap='round'
        stroke-linejoin='round'
      ></g>
      <g id='SVGRepo_iconCarrier'>
        {' '}
        <path
          d='M5 10H19M14 19L12 21L10 19M14 5L12 3L10 5M5 14H19'
          stroke='#ffffff'
          stroke-width='2'
          stroke-linecap='round'
          stroke-linejoin='round'
        ></path>{' '}
      </g>
    </svg>
  )
}
