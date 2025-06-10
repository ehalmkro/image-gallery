import { createFileRoute } from '@tanstack/react-router'
import { ImageService } from '../../services/image-service'
import { useSuspenseQuery } from '@tanstack/react-query'

export const Route = createFileRoute('/photo/$id')({
  component: PhotoDetail,
})

function PhotoDetail() {
  const { id } = Route.useParams()
  const imageService = new ImageService()

  const { data: photo } = useSuspenseQuery({
    queryKey: ['photo', id],
    queryFn: () => imageService.getPhoto(id),
  })

  return (
    <div className="flex flex-col items-center p-8">
      <div className="max-w-4xl">
        <img 
          src={photo.picsumUrl} 
          alt={photo.title}
          className="w-full h-auto rounded-lg shadow-lg"
        />
        <div className="mt-4 text-center">
          <h1 className="text-2xl font-bold mb-2">{photo.title}</h1>
          <p className="text-gray-600">Photo ID: {photo.id}</p>
          <p className="text-gray-600">Picsum ID: {photo.picsumId}</p>
        </div>
      </div>
    </div>
  )
} 