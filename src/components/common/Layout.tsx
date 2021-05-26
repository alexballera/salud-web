import React from 'react'

export default function Layout({ children }: any): React.ReactNode {
  return (
    <div>
      Layout
      <main>{children}</main>
    </div>
  )
}
