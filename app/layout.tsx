// import './globals.css';
// import Header from '@/components/Header/Header';
// import Footer from '@/components/Footer/Footer';
// import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body>
//         <TanStackProvider>
//           <Header />
//           {children}
//           <Footer />
//         </TanStackProvider>
//       </body>
//     </html>
//   );
// }

import type { ReactNode } from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';

export default function RootLayout({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode; // ✅ ДОДАЛИ
}) {
  return (
    <html lang="en">
      <body>
        <TanStackProvider>
          <Header />
          {children}
          <Footer />

          {/* 🔥 ВАЖЛИВО */}
          {modal}
        </TanStackProvider>
        <div id="modal-root"></div>
      </body>
    </html>
  );
}