import { createFileRoute } from '@tanstack/react-router'
import { ImageService } from '../../services/image-service'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useState } from 'react'

export const Route = createFileRoute('/photo/$id')({
  component: PhotoDetail,
})

function PhotoDetail() {
  const { id } = Route.useParams()
  const imageService = new ImageService()
  const [imageLoaded, setImageLoaded] = useState(false)

  const { data: photo } = useSuspenseQuery({
    queryKey: ['photo', id],
    queryFn: () => imageService.getPhoto(id),
  })

  return (
    <div className="flex flex-col items-center p-8">
      <div className="max-w-4xl w-full">
        <div className="relative">
          {!imageLoaded && (
            <div className="w-full aspect-[4/3] bg-gray-200 animate-pulse rounded-lg flex items-center justify-center">
              <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
            </div>
          )}
          
          <img 
            src={photo.picsumUrl} 
            alt={photo.title}
            className={`w-full h-auto rounded-lg shadow-lg transition-opacity duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageLoaded(true)}
          />
        </div>
        
        <div className="mt-4 text-center">
          {imageLoaded ? (
            <h1 className="text-2xl font-bold mb-2">{photo.title}</h1>
          ) : (
            <div className="bg-gray-200 animate-pulse h-8 w-3/4 mx-auto rounded mb-2"></div>
          )}
        </div>
      </div>
    </div>
  )
} 