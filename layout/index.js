import React from 'react'
import Link from 'next/link'

const Index = (props) => {
  return (
    <div>
        <Link href={'/home'}></Link>
        <Link href={'/login'}></Link>
        <Link href={'/read'}></Link>
        <Link href={'/write'}></Link>
    </div>
  )
}

export default Index