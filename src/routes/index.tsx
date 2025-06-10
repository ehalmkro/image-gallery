import { createFileRoute } from '@tanstack/react-router'
import { ImageService } from '../services/image-service'
import { useSuspenseInfiniteQuery, useQueryClient } from '@tanstack/react-query'
import { PhotoGrid } from '@/components/PhotoGrid'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const imageService = new ImageService()
  const queryClient = useQueryClient()

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useSuspenseInfiniteQuery({
    queryKey: ['photos'],
    queryFn: async ({ pageParam }) => {
      const photos = await imageService.getPhotosPaginated(pageParam, 50)
      
      // Populate individual photo queries
      photos.forEach(photo => {
        queryClient.setQueryData(['photo', photo.id.toString()], photo)
      })
      
      return photos
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      return lastPage.length === 50 ? lastPageParam + 1 : undefined
    },
  })

  // Flatten all pages into a single array for PhotoGrid
  const photos = data.pages.flat()

  return (
    <div className="flex flex-col items-center">
      <PhotoGrid photoList={photos}/>
      {hasNextPage && (
        <button 
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {isFetchingNextPage ? 'Loading...' : 'Load More Photos'}
        </button>
      )}
    </div>
  )
}
