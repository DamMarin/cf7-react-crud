import { BrowserRouter, Route, Routes } from "react-router";
import { Toaster } from "sonner";
import HomePage from "@/pages/HomePage.tsx";
import ProductListPage from "@/pages/ProductListPage.tsx";
import ProductPage from "@/pages/ProductPage.tsx";
import NotFoundPage from "@/pages/NotFoundPage.tsx";
import Layout from "@/components/Layout.tsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="products">
              <Route index element={<ProductListPage />} />
              <Route path="new" element={<ProductPage mode="create" />} />
              <Route path=":productId" element={<ProductPage mode="edit" />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster richColors />
    </>
  );
}

export default App;
