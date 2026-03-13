import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const CartContext = createContext()

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])
  const [cartTotal, setCartTotal] = useState(0)
  const [itemCount, setItemCount] = useState(0)

  const normalizePrice = (value) => {
    if (typeof value === 'number') return value
    if (!value) return 0
    const parsed = parseFloat(String(value).replace(/[^0-9.]/g, ''))
    return Number.isNaN(parsed) ? 0 : parsed
  }

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  const calculateTotals = useCallback(() => {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    const count = cart.reduce((sum, item) => sum + item.quantity, 0)
    setCartTotal(total)
    setItemCount(count)
  }, [cart])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
    calculateTotals()
  }, [cart, calculateTotals])

  const addToCart = (product, seller, quantity = 1) => {
    const price = normalizePrice(product.price)
    setCart(prevCart => {
      const existingItem = prevCart.find(
        item => item.productId === product.id && item.sellerId === seller.id
      )

      if (existingItem) {
        // Update quantity if item already exists
        return prevCart.map(item =>
          item.productId === product.id && item.sellerId === seller.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      } else {
        // Add new item
        return [...prevCart, {
          id: Date.now(),
          productId: product.id,
          sellerId: seller.id,
          name: product.name,
          price,
          image: product.image,
          sellerName: seller.name,
          sellerRating: seller.rating,
          shippingCost: product.shippingCost || 0,
          deliveryEstimate: product.deliveryEstimate || '3-5 days',
          quantity,
          maxQuantity: product.stock || 10
        }]
      }
    })
  }

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId)
      return
    }

    setCart(prevCart =>
      prevCart.map(item =>
        item.id === itemId
          ? { ...item, quantity: Math.min(newQuantity, item.maxQuantity) }
          : item
      )
    )
  }

  const removeFromCart = (itemId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId))
  }

  const clearCart = () => {
    setCart([])
  }

  // Group cart items by seller for checkout
  const getCartBySeller = () => {
    const sellerGroups = {}
    cart.forEach(item => {
      if (!sellerGroups[item.sellerId]) {
        sellerGroups[item.sellerId] = {
          sellerId: item.sellerId,
          sellerName: item.sellerName,
          sellerRating: item.sellerRating,
          items: [],
          subtotal: 0,
          shippingCost: 0
        }
      }

      sellerGroups[item.sellerId].items.push(item)
      sellerGroups[item.sellerId].subtotal += item.price * item.quantity
      sellerGroups[item.sellerId].shippingCost = Math.max(
        sellerGroups[item.sellerId].shippingCost,
        item.shippingCost
      )
    })

    return Object.values(sellerGroups)
  }

  const getTotalWithShipping = () => {
    const sellerGroups = getCartBySeller()
    return sellerGroups.reduce((total, seller) => total + seller.subtotal + seller.shippingCost, 0)
  }

  const value = {
    cart,
    cartTotal,
    itemCount,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getCartBySeller,
    getTotalWithShipping
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}
