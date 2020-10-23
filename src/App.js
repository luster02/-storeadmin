import React from 'react';
import { Layout } from 'antd';
import { Navigation } from './routes/main'
import { SideNav } from './components/SideNav'
import { useAuth } from './context/AuthContext'
import { AppProvider } from './context/AppContext'
import 'antd/dist/antd.css';
import './App.css'

function App() {
  const { isAuth } = useAuth()

  return (
    <AppProvider>
      <Layout>
        {isAuth && <SideNav />}
        <Layout>
          <Layout.Content className="content">
            <Navigation />
          </Layout.Content>
        </Layout>
      </Layout>
    </AppProvider>
  )
}

export default App;
