'use client'
import { useQuery } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import Carousel from '@/components/DetailSetPage/Carousel'
import HeadingPage from '@/components/DetailSetPage/HeadingPage'
import Navigation from '@/components/DetailSetPage/Navigation'
import SetPageHeader from '@/components/DetailSetPage/SetPageHeader'
import TermCardContainer from '@/components/DetailSetPage/TermCardContainer'
import RequiredPasswordModal from '@/components/DetailSetPage/RequiredPasswordModal'
import { notFound } from 'next/navigation'
const DetailSetPage = ({ searchParams }) => {
  const accessToken = Cookies.get('accessToken')
  const { id } = searchParams
  if (!id) return notFound()
  const [newData, setNewData] = useState(null)
  const [cards, setCards] = useState({})
  const { data } = useQuery({
    queryKey: ['set'],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/${'courses'}/${id}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      ).then((res) => res.json())
      if (response.status === 200) {
        const flashcards = response.data.flashcards.sort(
          (a, b) => a.order - b.order
        )
        response.flashcards = flashcards
        const fronts = flashcards.map((card) => card.front_content)
        const backs = flashcards.map((card) => card.back_content)
        const ids = flashcards.map((card) => card.id)
        setCards({
          fronts,
          backs,
          ids
        })
        setNewData(response)
      }
      return response
    },
    refetchOnWindowFocus: false
  })

  useEffect(() => {
    if (newData)
      document.title = `Thẻ ghi nhớ: ${newData?.data?.name} | Quizlet`
  }, [newData])
  return (
    <div className='max-w-[80%] mx-auto'>
      {newData && (
        <>
          <HeadingPage title={newData?.data.name} />
          <Navigation />
          <Carousel
            slides={cards?.fronts}
            backs={cards?.backs}
            ids={cards?.ids}
            setCards={setCards}
            setNewData={setNewData}
            setId={id}
          />
          <SetPageHeader />
          <TermCardContainer
            cards={newData?.data?.flashcards}
            setCards={setCards}
            setNewData={setNewData}
            setId={id}
          />
        </>
      )}
      {data?.status === 404 && !newData && <p>Not found</p>}
      {data?.status === 401 && !newData && data?.isPassword && (
        <RequiredPasswordModal
          setCards={setCards}
          setNewData={setNewData}
          id={id}
        />
      )}
    </div>
  )
}

export default DetailSetPage
