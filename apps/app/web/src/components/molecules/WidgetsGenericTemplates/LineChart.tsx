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
  const getThreshold = (num: number): number => {
    if (num < 10) return 1
    return Math.pow(10, Math.floor(Math.log10(num)))
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        suggestedMax: 20,
        ticks: {
          stepSize: getThreshold(Math.max(...data))
        }
      },
      x: {
        grid: {
          display: false
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
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
            tension: 0.5
          }
        ]
      }}
    />
  )
}

export default LineChart
