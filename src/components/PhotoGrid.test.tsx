import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { PhotoGrid } from './PhotoGrid'
import type { PhotoWithPicsum } from '../services/image-service'

vi.mock('@tanstack/react-router', () => ({
  Link: ({ params, children }: any) => (
    <a href={`/photo/${params.id}`} data-testid={`photo-link-${params.id}`}>
      {children}
    </a>
  ),
}))

const mockPhotos: Array<PhotoWithPicsum> = [
  {
    albumId: 1,
    id: 1,
    title: 'Beautiful Sunset',
    url: 'https://example.com/photo1.jpg',
    thumbnailUrl: 'https://example.com/photo1-thumb.jpg',
    jsonPlaceholderId: 1,
    picsumId: 1,
    picsumUrl: 'https://picsum.photos/id/1/720',
    picsumThumbnailUrl: 'https://picsum.photos/id/1/150',
  },
  {
    albumId: 1,
    id: 2,
    title: 'Mountain View',
    url: 'https://example.com/photo2.jpg',
    thumbnailUrl: 'https://example.com/photo2-thumb.jpg',
    jsonPlaceholderId: 2,
    picsumId: 2,
    picsumUrl: 'https://picsum.photos/id/2/720',
    picsumThumbnailUrl: 'https://picsum.photos/id/2/150',
  },
]

describe('PhotoGrid', () => {
  it('renders photos with correct images and navigation links', () => {
    render(<PhotoGrid photoList={mockPhotos} />)

    const firstImage = screen.getByAltText('Beautiful Sunset')
    const secondImage = screen.getByAltText('Mountain View')

    expect(firstImage).toBeDefined()
    expect(secondImage).toBeDefined()

    expect(firstImage.getAttribute('src')).toBe(
      'https://picsum.photos/id/1/150',
    )
    expect(secondImage.getAttribute('src')).toBe(
      'https://picsum.photos/id/2/150',
    )

    const firstLink = screen.getByTestId('photo-link-1')
    const secondLink = screen.getByTestId('photo-link-2')

    expect(firstLink.getAttribute('href')).toBe('/photo/1')
    expect(secondLink.getAttribute('href')).toBe('/photo/2')

    const gridContainer = document.querySelector('.grid')
    expect(gridContainer).toBeDefined()
    expect(gridContainer?.className).toContain('grid')
  })

  it('handles empty photo list', () => {
    render(<PhotoGrid photoList={[]} />)

    const gridContainer = document.querySelector('.grid')
    expect(gridContainer).toBeDefined()
    expect(gridContainer!.className).toContain('grid')
    expect(gridContainer!.children.length).toBe(0)
  })
})
