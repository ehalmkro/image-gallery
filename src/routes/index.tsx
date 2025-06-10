import { createFileRoute } from '@tanstack/react-router'
import { ImageService } from '../services/image-service'
import { useSuspenseInfiniteQuery, useQueryClient } from '@tanstack/react-query'
import { PhotoGrid } from '@/components/PhotoGrid'

const PAGE_SIZE = 60

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const imageService = new ImageService()
  const queryClient = useQueryClient()

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useSuspenseInfiniteQuery({
    queryKey: ['photos'],
    queryFn: async ({ pageParam }) => {
      const photos = await imageService.getPhotosPaginated(pageParam, PAGE_SIZE)
      
      // Populate individual photo queries
      photos.forEach(photo => {
        queryClient.setQueryData(['photo', photo.id.toString()], photo)
      })
      
      return photos
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      return lastPage.length === PAGE_SIZE ? lastPageParam + 1 : undefined
    },
  })

  // Flatten all pages into a single array for PhotoGrid
  const photos = data.pages.flat()

  return (
    <div className="flex flex-col items-center min-h-screen">
      <div className="w-full max-w-7xl px-4 py-8">
        <PhotoGrid photoList={photos}/>
      </div>
      {hasNextPage && (
        <button 
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          className="mt-4 mb-8 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {isFetchingNextPage ? 'Loading...' : 'Load More Photos'}
        </button>
      )}
    </div>
  )
}
