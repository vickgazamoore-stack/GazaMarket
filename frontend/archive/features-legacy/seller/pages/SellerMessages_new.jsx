import { useState } from 'react';
import { Send, Search, Users, MessageSquare, Phone } from 'lucide-react';
import Footer from '../../../components/layout/Footer';

const SellerMessages = () => {
  const [selectedConversation, setSelectedConversation] = useState(0);
  const [messageText, setMessageText] = useState('');

  const conversations = [
    {
      id: 1,
      customer: 'Ahmed Hassan',
      avatar: 'AH',
      lastMessage: 'Can you ship this faster?',
      timestamp: '2 mins ago',
      unread: 2,
      messages: [
        { id: 1, sender: 'customer', text: 'Hi, do you have this in blue?', time: '10:30 AM' },
        { id: 2, sender: 'seller', text: 'Yes, we have blue in stock!', time: '10:32 AM' },
        { id: 3, sender: 'customer', text: 'Can you ship this faster?', time: '10:35 AM' },
        { id: 4, sender: 'seller', text: 'We offer 2-day shipping for +$5', time: '10:36 AM' }
      ]
    },
    {
      id: 2,
      customer: 'Fatima Ali',
      avatar: 'FA',
      lastMessage: 'Product arrived, thank you!',
      timestamp: '1 hour ago',
      unread: 0,
      messages: [
        { id: 1, sender: 'customer', text: 'Just received my order', time: '9:15 AM' },
        { id: 2, sender: 'customer', text: 'Product arrived, thank you!', time: '9:20 AM' }
      ]
    },
    {
      id: 3,
      customer: 'Mohamed Ibrahim',
      avatar: 'AH',
      lastMessage: 'Any discount available?',
      timestamp: '5 hours ago',
      unread: 0,
      messages: [
        { id: 1, sender: 'customer', text: 'Do you offer wholesale?', time: '3:45 PM' },
        { id: 2, sender: 'seller', text: 'Yes, for orders 10+', time: '3:50 PM' },
        { id: 3, sender: 'customer', text: 'Any discount available?', time: '4:00 PM' }
      ]
    }
  ];

  const current = conversations[selectedConversation];

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <div className="flex h-screen">
        {/* Conversations List */}\n        <div className=\"w-full md:w-80 bg-zinc-900 border-r border-zinc-800 flex flex-col\">\n          <div className=\"p-4 border-b border-zinc-800\">\n            <h2 className=\"text-2xl font-bold mb-4\">Messages</h2>\n            <div className=\"relative\">\n              <Search className=\"absolute left-3 top-3 w-5 h-5 text-gray-500\" />\n              <input type=\"text\" placeholder=\"Search conversations...\" className=\"w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500\" />\n            </div>\n          </div>\n\n          <div className=\"flex-1 overflow-y-auto\">\n            {conversations.map((conv, idx) => (\n              <button key={conv.id} onClick={() => setSelectedConversation(idx)} className={`w-full p-4 border-b border-zinc-800 text-left hover:bg-gray-800 transition ${\n                idx === selectedConversation ? 'bg-gray-800 border-l-2 border-l-blue-600' : ''\n              }`}>\n                <div className=\"flex items-start gap-3\">\n                  <div className=\"text-2xl\">{conv.avatar}</div>\n                  <div className=\"flex-1 min-w-0\">\n                    <div className=\"flex justify-between items-start mb-1\">\n                      <h3 className=\"font-semibold\">{conv.customer}</h3>\n                      {conv.unread > 0 && <span className=\"bg-blue-600 text-xs rounded-full w-5 h-5 flex items-center justify-center\">{conv.unread}</span>}\n                    </div>\n                    <p className=\"text-sm text-gray-400 truncate\">{conv.lastMessage}</p>\n                    <p className=\"text-xs text-gray-500 mt-1\">{conv.timestamp}</p>\n                  </div>\n                </div>\n              </button>\n            ))}\n          </div>\n        </div>\n\n        {/* Message Thread */}\n        <div className=\"hidden md:flex flex-col flex-1\">\n          <div className=\"p-6 border-b border-zinc-800 bg-zinc-900\">\n            <div className=\"flex justify-between items-center\">\n              <div>\n                <h3 className=\"text-xl font-bold\">{current.customer}</h3>\n                <p className=\"text-sm text-gray-400\">Active now</p>\n              </div>\n              <div className=\"flex gap-2\">\n                <button className=\"p-2 hover:bg-gray-800 rounded-lg transition\"><Phone className=\"w-5 h-5\" /></button>\n                <button className=\"p-2 hover:bg-gray-800 rounded-lg transition\"><MessageSquare className=\"w-5 h-5\" /></button>\n              </div>\n            </div>\n          </div>\n\n          <div className=\"flex-1 overflow-y-auto p-6 space-y-4 bg-gray-900\">\n            {current.messages.map((msg) => (\n              <div key={msg.id} className={`flex ${msg.sender === 'seller' ? 'justify-end' : 'justify-start'}`}>\n                <div className={`max-w-xs px-4 py-2 rounded-lg ${\n                  msg.sender === 'seller'\n                    ? 'bg-blue-600 text-white rounded-br-none'\n                    : 'bg-gray-800 text-gray-200 rounded-bl-none'\n                }`}>\n                  <p>{msg.text}</p>\n                  <p className={`text-xs mt-1 ${\n                    msg.sender === 'seller' ? 'text-blue-100' : 'text-gray-400'\n                  }`}>{msg.time}</p>\n                </div>\n              </div>\n            ))}\n          </div>\n\n          <div className=\"p-4 border-t border-zinc-800 bg-zinc-900\">\n            <div className=\"flex gap-2\">\n              <input type=\"text\" placeholder=\"Type a message...\" value={messageText} onChange={(e) => setMessageText(e.target.value)} className=\"flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500\" />\n              <button className=\"px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold flex items-center gap-2 transition\">\n                <Send className=\"w-4 h-4\" /> Send\n              </button>\n            </div>\n          </div>\n        </div>\n      </div>\n      <Footer />\n    </div>\n  );\n};\n\nexport default SellerMessages;
