import React, { useEffect, useState } from 'react'
import { API_URL } from './lib/config'
import type Commit from './models/Commit'
import ItemList from './components/ItemList'
import axios from 'axios'

const App = () => {
  const [commits, setCommits] = useState<Commit[]>()
  const [refresh, setRefresh] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    async function fetchData () {
      try {
        const response = await axios.get<Commit[]>(`${API_URL}/github`)
        setCommits(response.data)
        setError(false)
      } catch (error) {
        setError(true)
      } finally {
        setRefresh(false)
      }
    }

    if (refresh) { fetchData().catch(console.log) }
  }, [refresh])

  const showCommits = () => {
    let message = null

    if (error) {
      message = 'Error fetching data'
    } else if (!commits) {
      message = 'No commits on this repository'
    }

    if (message) {
      return (
        <div className='bg-red-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
          <dt className='text-sm font-medium text-gray-500'>💢 {message}</dt>
        </div>
      )
    }

    return commits?.map((commit, index) => <ItemList key={commit.id} commit={commit} odd={!!(index % 2)} />)
  }

  const handleRefresh = () => {
    setRefresh(true)
  }

  return (
    <div className='overflow-hidden bg-white shadow sm:rounded-lg'>
      <div className='bg-lime-900 px-4 py-5 sm:px-6'>
        <h3 className='text-base font-semibold leading-6 text-white'>Git Commit History</h3>
        <p className='mt-1 max-w-2xl text-sm text-slate-200'>Repository created by Maikoll Soto 🚀</p>
      </div>
      <div className='flex justify-end bg-gray-100'>
        <button onClick={handleRefresh} disabled={refresh} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2'>
          {refresh ? 'Loading' : 'Refresh'}
        </button>
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
