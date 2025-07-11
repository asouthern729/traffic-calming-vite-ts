import { HeaderProvider } from "../Header/context"

// Components
import PageWrapper from "@/utils/PageWrapper"
import Header from "../Header"
import Footer from "../Footer"

// Types
import { ReactNode } from 'react'

function Layout({ children }: { children: ReactNode }) {

  return (
    <div className="flex flex-col w-full h-[100%] min-h-screen">
      <HeaderProvider>
        <Header />
      </HeaderProvider>
      <main>
        <PageWrapper>
          <div className="m-auto w-[90%] h-full 2xl:w-[80%]">
            {children}
          </div>
        </PageWrapper>
      </main>
      <Footer />
    </div>
  )
}

export default Layout