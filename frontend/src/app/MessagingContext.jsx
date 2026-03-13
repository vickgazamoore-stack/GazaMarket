import { createContext, useContext, useState, useEffect } from 'react'

const MessagingContext = createContext()

export const useMessaging = () => {
  const context = useContext(MessagingContext)
  if (!context) {
    throw new Error('useMessaging must be used within a MessagingProvider')
  }
  return context
}

export const MessagingProvider = ({ children }) => {
  const [conversations, setConversations] = useState([])
  const [activeConversation, setActiveConversation] = useState(null)
  const [unreadCount, setUnreadCount] = useState(0)

  // Mock data - in real app this would come from API
  useEffect(() => {
    const mockConversations = [
      {
        id: 1,
        orderId: 'ORD-123',
        withUser: 'Nnamdi Tech Market',
        withUserType: 'seller',
        lastMessage: 'Your order has been shipped!',
        lastMessageTime: '2025-12-24T10:30:00Z',
        unread: 2,
        messages: [
          {
            id: 1,
            senderId: 1,
            senderName: 'Nnamdi Tech Market',
            message: 'Thank you for your order! We\'re preparing your headphones now.',
            timestamp: '2025-12-23T14:20:00Z',
            isFromCurrentUser: false
          },
          {
            id: 2,
            senderId: 'current',
            senderName: 'You',
            message: 'Great! When can I expect delivery?',
            timestamp: '2025-12-23T14:25:00Z',
            isFromCurrentUser: true
          },
          {
            id: 3,
            senderId: 1,
            senderName: 'Nnamdi Tech Market',
            message: 'We expect to ship within 24 hours. You\'ll receive tracking info once shipped.',
            timestamp: '2025-12-24T09:15:00Z',
            isFromCurrentUser: false
          },
          {
            id: 4,
            senderId: 1,
            senderName: 'Nnamdi Tech Market',
            message: 'Your order has been shipped! Tracking number: TRK123456789',
            timestamp: '2025-12-24T10:30:00Z',
            isFromCurrentUser: false
          }
        ]
      },
      {
        id: 2,
        orderId: 'ORD-124',
        withUser: 'Ifunanya Fashion',
        withUserType: 'seller',
        lastMessage: 'Size exchange processed successfully',
        lastMessageTime: '2025-12-22T16:45:00Z',
        unread: 0,
        messages: [
          {
            id: 1,
            senderId: 2,
            senderName: 'Ifunanya Fashion',
            message: 'We received your return request. Please ship the item back to our address.',
            timestamp: '2025-12-20T11:30:00Z',
            isFromCurrentUser: false
          },
          {
            id: 2,
            senderId: 'current',
            senderName: 'You',
            message: 'I\'d like to exchange for a larger size instead of refund.',
            timestamp: '2025-12-20T12:00:00Z',
            isFromCurrentUser: true
          },
          {
            id: 3,
            senderId: 2,
            senderName: 'Ifunanya Fashion',
            message: 'Size exchange processed successfully. Your new item will ship tomorrow.',
            timestamp: '2025-12-22T16:45:00Z',
            isFromCurrentUser: false
          }
        ]
      }
    ]
    setConversations(mockConversations)
    setUnreadCount(mockConversations.reduce((sum, conv) => sum + conv.unread, 0))
  }, [])

  const sendMessage = (conversationId, message) => {
    const newMessage = {
      id: Date.now(),
      senderId: 'current',
      senderName: 'You',
      message,
      timestamp: new Date().toISOString(),
      isFromCurrentUser: true
    }

    setConversations(prevConversations =>
      prevConversations.map(conv => {
        if (conv.id === conversationId) {
          return {
            ...conv,
            messages: [...conv.messages, newMessage],
            lastMessage: message,
            lastMessageTime: newMessage.timestamp
          }
        }
        return conv
      })
    )

    // In real app, this would send to API and potentially receive a response
    // For demo, simulate seller response after 2 seconds
    setTimeout(() => {
      const autoResponse = {
        id: Date.now() + 1,
        senderId: conversationId,
        senderName: conversations.find(c => c.id === conversationId)?.withUser,
        message: 'Thank you for your message. We\'ll get back to you soon!',
        timestamp: new Date().toISOString(),
        isFromCurrentUser: false
      }

      setConversations(prevConversations =>
        prevConversations.map(conv => {
          if (conv.id === conversationId) {
            return {
              ...conv,
              messages: [...conv.messages, autoResponse],
              lastMessage: autoResponse.message,
              lastMessageTime: autoResponse.timestamp,
              unread: conv.unread + 1
            }
          }
          return conv
        })
      )
      setUnreadCount(prev => prev + 1)
    }, 2000)
  }

  const markAsRead = (conversationId) => {
    setConversations(prevConversations =>
      prevConversations.map(conv => {
        if (conv.id === conversationId && conv.unread > 0) {
          setUnreadCount(prev => prev - conv.unread)
          return { ...conv, unread: 0 }
        }
        return conv
      })
    )
  }

  const startConversation = (orderId, sellerName) => {
    // Check if conversation already exists
    const existingConv = conversations.find(c => c.orderId === orderId)
    if (existingConv) {
      setActiveConversation(existingConv.id)
      markAsRead(existingConv.id)
      return
    }

    // Create new conversation
    const newConversation = {
      id: Date.now(),
      orderId,
      withUser: sellerName,
      withUserType: 'seller',
      lastMessage: 'Conversation started',
      lastMessageTime: new Date().toISOString(),
      unread: 0,
      messages: [
        {
          id: 1,
          senderId: 'current',
          senderName: 'You',
          message: 'Hi! I have a question about my order.',
          timestamp: new Date().toISOString(),
          isFromCurrentUser: true
        }
      ]
    }

    setConversations(prev => [newConversation, ...prev])
    setActiveConversation(newConversation.id)
  }

  const value = {
    conversations,
    activeConversation,
    unreadCount,
    sendMessage,
    markAsRead,
    startConversation,
    setActiveConversation
  }

  return (
    <MessagingContext.Provider value={value}>
      {children}
    </MessagingContext.Provider>
  )
}
