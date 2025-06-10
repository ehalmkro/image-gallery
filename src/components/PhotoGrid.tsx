import type { PhotoWithPicsum } from "@/services/image-service"
import { Link } from '@tanstack/react-router'
import { useState } from 'react'

const Photo = ({photo}: {photo: PhotoWithPicsum}) => {
    const [imageLoaded, setImageLoaded] = useState(false)
    
    return (
        <Link to="/photo/$id" params={{ id: photo.id.toString() }}>
            <div className="w-full aspect-square relative hover:opacity-80 transition-opacity cursor-pointer rounded-lg overflow-hidden">
                {!imageLoaded && (
                    <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                        <div className="w-8 h-8 bg-gray-300 rounded"></div>
                    </div>
                )}
                
                <img 
                    src={photo.picsumThumbnailUrl} 
                    alt={photo.title} 
                    className={`w-full h-full object-cover transition-opacity duration-300 ${
                        imageLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                    onLoad={() => setImageLoaded(true)}
                    onError={() => setImageLoaded(true)}
                />
            </div>
        </Link>
    )
}

export const PhotoGrid = ({ photoList }: { photoList: PhotoWithPicsum[] }) => {
    return <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {photoList.map((photo) => (
            <Photo photo={photo} key={photo.id} />
        ))}
    </div>
}