import { useState, startTransition, Suspense } from 'react'
import '../../styles/components/products/MasonryGrid.css'
import Masonry from 'react-masonry-css'
import { Modal } from './Modal'
import { Model3D } from './Model3D'
import { Card } from './Card'
export const MasonryGrid = ({ products, springStyles }) => {
    // console.log(products)
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
                        <Card
                            key={product._id}
                            product={product}
                            springStyle={springStyles[index]}
                            isHovered={isHovered}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            onClick={() => openModal(product)}
                        />
                    )
                })}
            </Masonry>

            <Modal isOpen={isModalOpen} onClose={closeModal}>
                {selectedProduct && (
                    <>
                        <h2 className='title_card'>{selectedProduct.name}</h2>
                        <p className='description_card'>{selectedProduct.description}</p>

                        {/* Verificar si el producto tiene un modelo 3D */}
                        {selectedProduct.model ? (
                            <Suspense fallback={<div>Loading 3D model...</div>}>
                                <Model3D modelUrl={selectedProduct.model} />
                            </Suspense>
                        ) : (
                            <div className='no-model-message'>
                                No 3D model available for this product.
                            </div>
                        )}
                    </>
                )}
            </Modal>
        </>
    )
}