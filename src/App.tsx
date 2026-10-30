import { useEffect, useRef, useState } from 'react'
// ✅ FIX (step 1): add useCallback to the import
// import { useCallback, useEffect, useRef, useState } from 'react'
import ProductCard from './components/ProductCard'
import { PRODUCTS } from './data/products'
import { renderStats } from './renderStats'
import './App.css'

type Cart = Record<number, number>

function App() {
  const [orderNotes, setOrderNotes] = useState('')
  const [cart, setCart] = useState<Cart>({})
  const renderMeter = useRef<HTMLSpanElement>(null)

  // ❌ PROBLEM: this is a brand-new function on EVERY render of App.
  // Typing one letter in "Order notes" re-renders App -> new handleAddToCart ->
  // all 200 memoized ProductCards see a "different" prop -> all 200 re-render.
  const handleAddToCart = (productId: number) => {
    setCart({ ...cart, [productId]: (cart[productId] ?? 0) + 1 })
  }

  // ✅ FIX (step 2): wrap the function in useCallback.
  // React now hands back the SAME function between renders, until `cart` changes.
  // Typing in "Order notes" -> 0 ProductCards re-render.
  // Clicking "Add to cart" -> `cart` changed -> new function -> cards re-render (correct!).
  //
  // const handleAddToCart = useCallback((productId: number) => {
  //   setCart({ ...cart, [productId]: (cart[productId] ?? 0) + 1 })
  // }, [cart])

  // ⭐ BONUS FIX (step 3): use the functional form of setCart so we don't read `cart` at all.
  // No dependencies -> the function never changes -> clicking "Add to cart" only
  // re-renders the ONE card whose quantity changed.
  //
  // const handleAddToCart = useCallback((productId: number) => {
  //   setCart((prev) => ({ ...prev, [productId]: (prev[productId] ?? 0) + 1 }))
  // }, [])

  // Report how many ProductCards rendered during this update (console + on screen)
  useEffect(() => {
    console.log(`📊 ProductCards re-rendered this update: ${renderStats.productCards}`)
    if (renderMeter.current) {
      renderMeter.current.textContent = String(renderStats.productCards)
    }
    renderStats.productCards = 0
  })

  const itemsInCart = Object.values(cart).reduce((sum, qty) => sum + qty, 0)

  return (
    <main className="store">
      <header className="store-header">
        <h1>🛍️ Checkout</h1>
        <div className="stats">
          <span>🛒 {itemsInCart} items</span>
          <span>
            ProductCards rendered last update: <strong ref={renderMeter}>0</strong>
          </span>
        </div>
      </header>

      <label className="notes">
        Order notes
        <input
          value={orderNotes}
          onChange={(e) => setOrderNotes(e.target.value)}
          placeholder="Leave at the front door..."
        />
      </label>

      <section className="grid">
        {PRODUCTS.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            quantity={cart[product.id] ?? 0}
            onAddToCart={handleAddToCart}
          />
        ))}
      </section>
    </main>
  )
}

export default App
