import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import React from 'react'
import { Line } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

type Props = {
  labelsX: string[]
  data: number[]
}

const LineChart = () => {
  const labels = Array(12).fill('12h00', 0)
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const
      }
    }
  }
  return (
    <Line
      options={options}
      data={{
        labels,
        datasets: [
          {
            label: 'Nombre de requêtes/heure',
            data: Array(12).fill(Math.random(), 0),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)'
          }
        ]
      }}
    />
  )
}

export default LineChart
