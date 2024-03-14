'use client'
import { Provider } from 'react-redux'
import { store } from '../redux/store'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { NextUIProvider } from '@nextui-org/react'
const queryClient = new QueryClient()

const Providers = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider>
        <Provider store={store}>{children}</Provider>
      </NextUIProvider>
    </QueryClientProvider>
  )
}

export default Providers
