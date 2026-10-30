export type Product = {
  id: number
  name: string
  price: number
  emoji: string
}

const EMOJIS = ['👟', '🎧', '⌚', '🎒', '🕶️', '📷', '🧢', '💻', '🎮', '🪴']
const NAMES = ['Sneakers', 'Headphones', 'Watch', 'Backpack', 'Sunglasses', 'Camera', 'Cap', 'Laptop', 'Controller', 'Plant']

// 200 products - big enough that re-rendering all of them is noticeable
export const PRODUCTS: Product[] = Array.from({ length: 200 }, (_, i) => ({
  id: i + 1,
  name: `${NAMES[i % NAMES.length]} #${i + 1}`,
  price: 19 + ((i * 37) % 280),
  emoji: EMOJIS[i % EMOJIS.length],
}))
