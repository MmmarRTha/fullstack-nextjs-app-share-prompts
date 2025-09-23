import '@styles/globals.css';
import Nav from '@components/Nav';
import Provider from "@components/Provider";

export const metadata = {
    title: "Share Prompts",
    description: 'Discover & Share AI Prompts'
}

export default function RootLayout ({children }) {
  return (
    <html lang='en' suppressHydrationWarning>
        <body>
        <Provider>
            <div className='main'>
                <div className='gradient' />
            </div>

            <main className='app'>
                <Nav />
                {children}
            </main>
        </Provider>
        </body>
    </html>
  )
}