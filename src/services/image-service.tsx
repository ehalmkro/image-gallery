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
  private readonly JSON_PLACEHOLDER_URL = 'https://jsonplaceholder.typicode.com/photos'
  private readonly PICSUM_URL = 'https://picsum.photos/'

  async getPhotosPaginated(page: number, limit: number): Promise<PhotoWithPicsum[]> {
    const response = await fetch(`${this.JSON_PLACEHOLDER_URL}?_page=${page}&_limit=${limit}`)
    const photoObjects = await response.json()
    return photoObjects.map((photo: Photo) => {
        // Translates JSON placeholder image hash to picsum id
        const picsumId = photo.id % 999
        return {
        ...photo,   
        jsonPlaceholderId: photo.id,
        picsumId,
        picsumUrl: `${this.PICSUM_URL}/id/${picsumId}/720`,
        picsumThumbnailUrl: `${this.PICSUM_URL}/id/${picsumId}/150`
    }})
  }

  async getPhoto(id: string): Promise<PhotoWithPicsum> {
    const response = await fetch(`${this.JSON_PLACEHOLDER_URL}/${id}`)
    const photo: Photo = await response.json()
    const picsumId = photo.id % 999
    return {
      ...photo,
      jsonPlaceholderId: photo.id,
      picsumId,
      picsumUrl: `${this.PICSUM_URL}/id/${picsumId}/720`,
      picsumThumbnailUrl: `${this.PICSUM_URL}/id/${picsumId}/150`
    }
  }
}