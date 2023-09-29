import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
} from 'chart.js/auto'
import { Pie } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
)

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom'
    },
    title: {
      display: true,
      text: 'Poll Statistics'
    }
  }
}

// const labels = ['John', 'Max']
// const data = {
//   labels,
//   datasets: [
//     {
//       label: labels,
//       data: [12, 40],
//       backgroundColor: ['rgba(255, 99, 132, 0.5)', 'rgba(155, 199, 132, 0.5)']
//     }
//   ]
// }

export function ChartPoll (props) {
  const {
    optionone,
    optiontwo,
    optiononevote,
    optiontwovote
  } = props.data
  const labels = [optionone, optiontwo]
  const data = {
    labels,
    datasets: [
      {
        label: labels,
        data: [optiononevote, optiontwovote],
        backgroundColor: ['rgba(255, 99, 132, 0.5)', 'rgba(155, 199, 132, 0.5)']
      }
    ]
  }
  return (optiononevote !== 0 && optiontwovote !== 0 ? <Pie options={options} data={data}/> : <p>Not Enough Poll Count</p>)
}
