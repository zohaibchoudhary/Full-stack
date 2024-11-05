import { useEffect, useState } from 'react'
import axios from "axios"
import './App.css'

function App() {
  const [data, setData] = useState([])

  const getData = async () => {
    const {data} = await axios.get("http://localhost:5000/api")
    console.log(data);
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      
    </>
  )
}

export default App
