import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Passed Months Customer Reservations Chart',
    },
  },
};

const labels = ['2020 January', '2020 February', '2020 March', '2020 April', '2020 May', '2020 June', '2020 July', '2020 August', '2020 September', '2020 October', '2020 November', '2020 December'  ];

export const data = {
  labels,
  datasets: [
    {
      label: 'Numbers of Customers',
      data: [12, 19, 3, 5, 2, 3, 6, 12, 19, 3, 5, 2,],
      backgroundColor: 'rgba(53, 162, 235, 0.5)',

    },
  ],
};

export function ResBarChart() {
  return <Bar options={options} data={data} />;
}
