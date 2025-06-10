export class ImageService {
  private readonly JSON_PLACEHOLDER_URL = 'https://jsonplaceholder.typicode.com/photos'
  private readonly PICSUM_URL = 'https://picsum.photos/'


  async getPhotos() {
    const response = await fetch(this.JSON_PLACEHOLDER_URL)
    const photoObjects = await response.json()
    return photoObjects.map((photo: any) => {
        // Translates JSON placeholder image hash to picsum id
        const picsumId = parseInt(photo.id) % 999
        return {
        ...photo,   
        jsonPlaceholderId: photo.id,
        picsumId,
        picsumUrl: `${this.PICSUM_URL}/id/${picsumId}/720`,
        picsumThumbnailUrl: `${this.PICSUM_URL}/id/${picsumId}/150`
    }})
  }
}