import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from '@/context/CartContext';
import { Header } from '@/components/layout/Header';
import { CartSidebar } from '@/components/layout/CartSidebar';
import { WhatsAppFloat } from '@/components/layout/WhatsAppFloat';
import { Toast } from '@/components/shared/Toast';
import { HomePage } from '@/pages/HomePage';
import { GalleryPage } from '@/pages/GalleryPage';
import { ShopPage } from '@/pages/ShopPage';
import { CommissionsPage } from '@/pages/CommissionsPage';
import { ToolsPage } from '@/pages/ToolsPage';
import { TipsPage } from '@/pages/TipsPage';
import { BlogListPage } from '@/pages/BlogListPage';
import { BlogPostPage } from '@/pages/BlogPostPage';
import { ContactPage } from '@/pages/ContactPage';

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Header />
        <CartSidebar />
        <Toast />
        <main className="min-h-screen">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/commissions" element={<CommissionsPage />} />
            <Route path="/tools" element={<ToolsPage />} />
            <Route path="/tips" element={<TipsPage />} />
            <Route path="/blog" element={<BlogListPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
        <WhatsAppFloat />
      </BrowserRouter>
    </CartProvider>
  );
}
