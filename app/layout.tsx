import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Pedago - Learn Authentic Tagalog Language',
  description: 'Master authentic Tagalog language through 50 interactive grammar lessons, 50 real-life Philippine conversation scenarios, native audio pronunciation, and smart flashcards.',
  openGraph: {
    title: 'Pedago - Learn Authentic Tagalog Language',
    description: 'Master authentic Tagalog language through 50 interactive grammar lessons, 50 real-life Philippine conversation scenarios, native audio pronunciation, and smart flashcards.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pedago - Learn Authentic Tagalog Language',
    description: 'Master authentic Tagalog language through 50 interactive grammar lessons, 50 real-life Philippine conversation scenarios, native audio pronunciation, and smart flashcards.',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-sky-500/30 selection:text-sky-200">
        {/* Subtle ambient lighting gradients for transparent glass design */}
        <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-sky-500/10 blur-[120px]" />
          <div className="absolute top-[20%] right-[-10%] w-[550px] h-[550px] rounded-full bg-indigo-500/10 blur-[140px]" />
          <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] rounded-full bg-amber-500/5 blur-[150px]" />
        </div>
        {children}
      </body>
    </html>
  );
}
