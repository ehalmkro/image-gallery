import { createFileRoute } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { ImageService } from '../../services/image-service'

export const Route = createFileRoute('/photo/$id')({
  component: PhotoDetail,
})

function PhotoDetail() {
  const { id } = Route.useParams()
  const imageService = new ImageService()
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  const { data: photo } = useSuspenseQuery({
    queryKey: ['photo', id],
    queryFn: () => imageService.getPhoto(id),
  })

  return (
    <div className="flex flex-col items-center p-8">
      <div className="max-w-100 w-full">
        <div className="relative">
          {!imageLoaded && !imageError && (
            <div className="w-full aspect-square bg-gray-200 animate-pulse rounded-lg flex items-center justify-center">
              <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
            </div>
          )}

          {imageError && (
            <div className="w-full aspect-[4/3] bg-gray-100 rounded-lg shadow-lg flex items-center justify-center">
              <div className="text-gray-400 text-center">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-gray-500 text-4xl">?</span>
                </div>
                <h2 className="text-xl font-semibold mb-2">
                  Image unavailable
                </h2>
                <p className="text-sm">This image could not be loaded</p>
              </div>
            </div>
          )}

          <img
            src={photo.picsumUrl}
            alt={photo.title}
            className={`w-full h-auto rounded-lg shadow-lg transition-opacity duration-300 ${
              imageLoaded && !imageError ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={() => {
              setImageLoaded(true)
              setImageError(true)
            }}
          />
        </div>

        <div className="mt-4 text-center">
          {imageLoaded ? (
            <h1 className="text-2xl italic mb-2">{photo.title}</h1>
          ) : (
            <div className="bg-gray-200 animate-pulse h-8 w-3/4 mx-auto rounded mb-2"></div>
          )}
        </div>
      </div>
    </div>
  )
}
