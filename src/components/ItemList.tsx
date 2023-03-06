import React from 'react'
import type Commit from '../models/Commit'
import { formatDateSince } from '../lib/util'

interface Props {
  commit: Commit
  odd?: boolean
}

const ItemList = ({ commit, odd = false }: Props) => {
  const bgColor = odd ? 'bg-gray-100' : 'bg-white'
  const date = formatDateSince(commit.createdAt)

  return (
    <div className={`${bgColor} px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}>
      <dt className='text-sm font-medium text-gray-500'>by <strong>{commit.author}</strong>: {date}</dt>
      <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>{commit.message}</dd>
    </div>
  )
}

export default ItemList
