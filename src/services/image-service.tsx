export interface Photo {
  albumId: number
  id: number
  title: string
  url: string
  thumbnailUrl: string
}

export interface PhotoWithPicsum extends Photo {
  jsonPlaceholderId: number
  picsumId: number
  picsumUrl: string
  picsumThumbnailUrl: string
}

export class ImageService {
  private readonly JSON_PLACEHOLDER_URL = import.meta.env
    .VITE_JSON_PLACEHOLDER_URL
  private readonly PICSUM_URL = import.meta.env.VITE_PICSUM_URL
  private readonly THUMBNAIL_RESOLUTION = 150
  private readonly IMAGE_RESOLUTION = 720

  async getPhotosPaginated(
    page: number,
    limit: number,
  ): Promise<Array<PhotoWithPicsum>> {
    const response = await fetch(
      `${this.JSON_PLACEHOLDER_URL}/photos?_page=${page}&_limit=${limit}`,
    )
    const photoObjects = await response.json()
    return photoObjects.map((photo: Photo) => {
      // Translates JSON placeholder image id to picsum id
      const picsumId = photo.id % 999
      return {
        ...photo,
        jsonPlaceholderId: photo.id,
        picsumId,
        picsumUrl: `${this.PICSUM_URL}/id/${picsumId}/${this.IMAGE_RESOLUTION}`,
        picsumThumbnailUrl: `${this.PICSUM_URL}/id/${picsumId}/${this.THUMBNAIL_RESOLUTION}`,
      }
    })
  }

  async getPhoto(id: string): Promise<PhotoWithPicsum> {
    const response = await fetch(`${this.JSON_PLACEHOLDER_URL}/photos/${id}`)
    const photo: Photo = await response.json()
    const picsumId = photo.id % 999
    return {
      ...photo,
      jsonPlaceholderId: photo.id,
      picsumId,
      picsumUrl: `${this.PICSUM_URL}/id/${picsumId}/${this.IMAGE_RESOLUTION}`,
      picsumThumbnailUrl: `${this.PICSUM_URL}/id/${picsumId}/${this.THUMBNAIL_RESOLUTION}`,
    }
  }
}
