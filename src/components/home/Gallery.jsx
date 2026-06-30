import { useState } from 'react'
import { FaSearchPlus, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import './Gallery.css'

// Auto-load every image in src/assets/gallery/ at build time.
const imageModules = import.meta.glob(
  '../../assets/gallery/*.{jpg,jpeg,png,JPG,JPEG,PNG,webp,WEBP}',
  { eager: true, query: '?url', import: 'default' }
)

// Sort by filename so 1,2,3... order is respected.
const GALLERY_IMAGES = Object.keys(imageModules)
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
  .map((path) => imageModules[path])

const Gallery = () => {
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const total = GALLERY_IMAGES.length

  const open = (i) => setLightboxIndex(i)
  const close = () => setLightboxIndex(null)
  const show = (i) => setLightboxIndex((i + total) % total)

  // Nothing uploaded yet -> hide the whole section.
  if (total === 0) return null

  return (
    <section className="gallery-section">
      <div className="container">
        <h2 className="home-section-heading">Our Events &amp; Services</h2>

        <div className="gallery-grid">
          {GALLERY_IMAGES.map((src, i) => (
            <div className="gallery-item" key={i} onClick={() => open(i)}>
              <img src={src} alt={'Gallery ' + (i + 1)} loading="lazy" />
              <div className="gallery-overlay">
                <FaSearchPlus />
              </div>
            </div>
          ))}
        </div>
      </div>

      {lightboxIndex !== null && (
        <div className="gallery-modal" onClick={close}>
          <button className="gallery-modal-close" onClick={close} aria-label="Close">
            <FaTimes />
          </button>

          <button
            className="gallery-modal-nav gallery-modal-prev"
            onClick={(e) => {
              e.stopPropagation()
              show(lightboxIndex - 1)
            }}
            aria-label="Previous"
          >
            <FaChevronLeft />
          </button>

          <img
            className="gallery-modal-image"
            src={GALLERY_IMAGES[lightboxIndex]}
            alt={'Gallery ' + (lightboxIndex + 1)}
            onClick={(e) => e.stopPropagation()}
          />

          <button
            className="gallery-modal-nav gallery-modal-next"
            onClick={(e) => {
              e.stopPropagation()
              show(lightboxIndex + 1)
            }}
            aria-label="Next"
          >
            <FaChevronRight />
          </button>

          <div className="gallery-modal-counter">
            {lightboxIndex + 1} / {total}
          </div>
        </div>
      )}
    </section>
  )
}

export default Gallery