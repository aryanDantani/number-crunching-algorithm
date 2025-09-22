import { useState } from 'react'
import './App.css'

function App() {

  const [arrayInput, setArrayInput] = useState('')
  const [targetSum, setTargetSum] = useState('')
  const [result, setResult] = useState<number[] | null>(null)

  const getShortestSubarray = (array: number[], target: number) => {
    let minLength = 9;
    let start = 0;
    let end = 0;
    let currentSum = 0;
    let shortestSubarray: number[] = [];

    while (end < array.length) {
      currentSum += array[end]
      while (currentSum > target && start <= end) {
        if (end - start + 1 < minLength) {
          minLength = end - start + 1
          shortestSubarray = array.slice(start, end + 1)
        }
        currentSum -= array[start]
        start++
      }
      end++
    }
    return shortestSubarray
  }
  const handleArrayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setArrayInput(e.target.value)
  }
  const handleArrayBlur = () => {
    setArrayInput(arrayInput.trim())
  }
  const handleTargetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTargetSum(e.target.value)
  }

  function allElementsSame(arr: number[]): boolean {
    if (arr.length === 0) {
      return true;
    }

    const firstElement = arr[0];
    for (let i = 1; i < arrayInput.length; i++) {
      if (arr[i] !== firstElement) {
        return false;
      }
    }
    return true;
  }

  const findShortestSubarray = () => {
    const array = arrayInput.split(',').map(Number)
    const target = Number(targetSum)
    const subarray: number[] = getShortestSubarray(array, target)
    setResult(subarray)
  }

  console.log(arrayInput?.split(','), result, "arrayInput")

  return (
    <>
      <h2>The shortest subarray</h2>

      <div className='form-container'>
        <input className='numbers-input' type="text" placeholder="Add comma separated numbers" value={arrayInput} onChange={handleArrayChange} onBlur={handleArrayBlur} />
        <input className="target-input" placeholder="Enter target sum" value={targetSum} onChange={handleTargetChange} />
        <button onClick={findShortestSubarray}>Find</button>
      </div>
      <div>

        <div>
          {/* Result:
          {arrayInput?.split(',').map((num, index) => (
            <div key={index} className='result-item'>
              <p style={{ backgroundColor: allElementsSame([Number(num)]) ? 'green' : 'red' }}>{num}</p>
            </div>
          ))} */}

          Result:
          {result?.map((num, index) => (
            <div key={index} className='result-item'>
              <p>{num}</p>
            </div>
          ))}
        </div>

      </div>
    </>
  )
}

export default App
