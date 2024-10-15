import { animated } from '@react-spring/web'
import { useState, startTransition, Suspense } from 'react'
import '../../styles/components/products/MasonryGrid.css'
import Masonry from 'react-masonry-css'
import { Modal } from './Modal'
import { Model3D } from './Model3D'
import temp_image from '../../assets/images/temp_image.png'
import temp_model from '../../assets/models/ford_mustang.glb'

export const MasonryGrid = ({ products, springStyles }) => {
    const [hoveredIndex, setHoveredIndex] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState(null)

    const openModal = (product) => {
        startTransition(() => {
            setSelectedProduct(product)
            setIsModalOpen(true)
        })
    }

    const closeModal = () => {
        setIsModalOpen(false)
        setSelectedProduct(null)
    }

    return (
        <>
            <Masonry
                breakpointCols={{ default: 7, 1366: 5, 1280: 4, 1024: 3, 768: 2 }}
                className='masonry-grid'
                columnClassName='masonry-grid_column'>
                {products.map((product, index) => {
                    const isHovered = hoveredIndex === index

                    return (
                        <animated.div
                            key={product._id}
                            style={{
                                ...springStyles[index],
                                transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                                zIndex: isHovered ? 1 : 0,
                                transition: 'transform 0.4s ease'
                            }}
                            className="masonry-item"
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            onClick={() => openModal(product)}>
                            <p className='category_card'>{product.category.name}</p>
                            <h3 className='title_card'>{product.name}</h3>
                            <img className='image_card' src={temp_image} />
                            <p className='description_card'>{product.description}</p>
                            <p className='price_card'>${product.price}</p>
                        </animated.div>
                    )
                })}
            </Masonry>

            <Modal isOpen={isModalOpen} onClose={closeModal}>
                {selectedProduct && (
                    <>
                        <h2 className='title_card'>{selectedProduct.name}</h2>
                        <p className='description_card'>{selectedProduct.description}</p>
                        {/* Suspense para cargar el modelo 3D */}
                        <Suspense fallback={<div>Loading 3D model...</div>}>
                            <Model3D modelUrl={temp_model} />
                        </Suspense>
                    </>
                )}
            </Modal>
        </>
    )
}