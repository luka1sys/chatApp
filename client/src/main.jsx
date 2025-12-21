
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { AuthProvider } from './context/authContext.jsx'
import { BrowserRouter } from 'react-router'
import { ChatProvider } from './context/chatContext.jsx'
import { MessageProvider } from './context/messageContext.jsx'


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <ChatProvider>
        <MessageProvider>
          <App />
        </MessageProvider>
      </ChatProvider>
    </AuthProvider>
  </BrowserRouter>,
)