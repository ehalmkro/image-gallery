import type { PhotoWithPicsum } from "@/services/image-service"
import { Link } from '@tanstack/react-router'

const Photo = ({photo}: {photo: PhotoWithPicsum}) => {
    return (
        <Link to="/photo/$id" params={{ id: photo.id.toString() }}>
            <div className="w-full h-full object-cover hover:opacity-80 transition-opacity cursor-pointer">
                <img 
                    src={photo.picsumThumbnailUrl} 
                    alt={photo.title} 
                    className="w-full h-auto rounded-lg"
                />
            </div>
        </Link>
    )
}

export const PhotoGrid = ({ photoList }: { photoList: PhotoWithPicsum[] }) => {
    return <div className="grid grid-cols-5 gap-4">
        {photoList.map((photo) => (
            <Photo photo={photo} key={photo.id} />
        ))}
    </div>
}