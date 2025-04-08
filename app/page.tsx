'use client'

import { Toaster } from 'react-hot-toast'
import StandardSchemaExample from './components/StandardSchemaExample/StandardSchemaExample'

export default function IndexPage() {
  return (
    <>
      <title>Standard Schema Example</title>
      <StandardSchemaExample />
      <Toaster />
    </>
  )
}
