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
  labels: string[]
  data: number[]
}

const LineChart = ({ labels, data }: Props) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        suggestedMax: 20,
        ticks: {
          stepSize: 1
        }
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
            data,
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)'
          }
        ]
      }}
    />
  )
}

export default LineChart
