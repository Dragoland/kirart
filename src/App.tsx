import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from '@/context/CartContext';
import { DataProvider } from '@/context/DataContext';
import { AuthProvider } from '@/context/AuthContext';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartSidebar } from '@/components/layout/CartSidebar';
import { WhatsAppFloat } from '@/components/layout/WhatsAppFloat';
import { Toast } from '@/components/shared/Toast';
import { AnimatedBackground } from '@/components/shared/AnimatedBackground';
import { HomePage } from '@/pages/HomePage';
import { GalleryPage } from '@/pages/GalleryPage';
import { ShopPage } from '@/pages/ShopPage';
import { CommissionsPage } from '@/pages/CommissionsPage';
import { ToolsPage } from '@/pages/ToolsPage';
import { TipsPage } from '@/pages/TipsPage';
import { BlogListPage } from '@/pages/BlogListPage';
import { BlogPostPage } from '@/pages/BlogPostPage';
import { ContactPage } from '@/pages/ContactPage';
import { AdminPage } from '@/pages/AdminPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo(0, 0), [pathname]);
  return null;
}

export default function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <CartProvider>
          <BrowserRouter>
            <ScrollToTop />
            <AnimatedBackground />
            <Header />
            <CartSidebar />
            <Toast />
            <main className="min-h-screen">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/gallery" element={<GalleryPage />} />
                <Route path="/gallery/:category" element={<GalleryPage />} />
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/commissions" element={<CommissionsPage />} />
                <Route path="/tools" element={<ToolsPage />} />
                <Route path="/tips" element={<TipsPage />} />
                <Route path="/blog" element={<BlogListPage />} />
                <Route path="/blog/:slug" element={<BlogPostPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
            <Footer />
            <WhatsAppFloat />
          </BrowserRouter>
        </CartProvider>
      </DataProvider>
    </AuthProvider>
  );
}
