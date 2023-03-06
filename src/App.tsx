import React, { useEffect, useState } from 'react'
import { API_URL } from './lib/config'
import type Commit from './models/Commit'
import ItemList from './components/ItemList'
import axios from 'axios'

const App = () => {
  const [commits, setCommits] = useState<Commit[]>()

  useEffect(() => {
    async function fetchData () {
      const response = await axios.get<Commit[]>(`${API_URL}/github`)
      console.log(response.data)
      setCommits(response.data)
    }

    fetchData().catch(console.log)
  }, [])

  const showCommits = () => {
    if (!commits) {
      return (
        <div className='bg-red-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
          <dt className='text-sm font-medium text-gray-500'>💢 No commits on this repository</dt>
        </div>
      )
    }

    return commits.map((commit, index) => <ItemList key={commit.id} commit={commit} odd={!!(index % 2)} />)
  }

  return (
    <div className='overflow-hidden bg-white shadow sm:rounded-lg'>
      <div className='bg-lime-900 px-4 py-5 sm:px-6'>
        <h3 className='text-base font-semibold leading-6 text-white'>Git Commit History</h3>
        <p className='mt-1 max-w-2xl text-sm text-slate-200'>Repository created by Maikoll Soto 🚀</p>
      </div>
      <div className='border-t border-gray-200'>
        <dl>
          {showCommits()}
        </dl>
      </div>
    </div>
  )
}

export default App
