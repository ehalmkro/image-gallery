import type { PhotoWithPicsum } from "@/services/image-service"

const Photo = ({photo}: {photo: PhotoWithPicsum}) => {
    return <div className="w-full h-full object-cover">
        <img src={photo.picsumThumbnailUrl
        } alt={photo.title} />
    </div>
}


export const PhotoGrid = ({ photoList }: { photoList: PhotoWithPicsum[] }) => {
    return <div className="grid grid-cols-5 gap-4">
        {photoList.map((photo) => (
            <Photo photo={photo} key={photo.id} />
        ))}
    </div>
}