import { createFileRoute } from '@tanstack/react-router'
import { ImageService } from '../services/image-service'
import { useSuspenseInfiniteQuery } from '@tanstack/react-query'
import { PhotoGrid } from '@/components/PhotoGrid'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const imageService = new ImageService()

  const { data } = useSuspenseInfiniteQuery({
    queryKey: ['photos'],
    queryFn: ({ pageParam }) => imageService.getPhotosPaginated(pageParam, 50),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      return lastPage.length === 50 ? lastPageParam + 1 : undefined
    },
  })

  // Flatten all pages into a single array for PhotoGrid
  const photos = data.pages.flat()

  return (
    <PhotoGrid photoList={photos}/>
  )
}
