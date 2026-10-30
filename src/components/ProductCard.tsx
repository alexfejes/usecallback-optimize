import { memo } from 'react'
import type { Product } from '../data/products'
import { renderStats } from '../renderStats'

type ProductCardProps = {
  product: Product
  quantity: number
  onAddToCart: (productId: number) => void
}

// Pretend each card is expensive to render (images, formatting, charts...)
function slowDown(ms: number) {
  const start = performance.now()
  while (performance.now() - start < ms) {
    // busy wait
  }
}

// ProductCard is ALREADY wrapped in memo().
// memo() skips a re-render only when EVERY prop is the same as last time.
// `product` and `quantity` stay the same while you type... but `onAddToCart` doesn't.
const ProductCard = memo(function ProductCard({ product, quantity, onAddToCart }: ProductCardProps) {
  slowDown(0.5)
  renderStats.productCards++
  console.log(`🔁 ProductCard rendered: ${product.name}`)

  return (
    <div className="card">
      <div className="card-emoji">{product.emoji}</div>
      <div className="card-name">{product.name}</div>
      <div className="card-price">${product.price}</div>
      <button type="button" onClick={() => onAddToCart(product.id)}>
        {quantity > 0 ? `In cart (${quantity})` : 'Add to cart'}
      </button>
    </div>
  )
})

export default ProductCard
