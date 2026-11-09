import type {Metadata} from 'next';
import './globals.css'; // Global styles
import { ChakraProvider } from '@/components/chakra-provider';
import { AuthProvider } from '@/hooks/use-auth';

export const metadata: Metadata = {
  title: 'Lumina Dashboard',
  description: 'Professional Analytics Dashboard',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <AuthProvider>
          <ChakraProvider>
            {children}
          </ChakraProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
