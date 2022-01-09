import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export function Pchart({counts}) {

  console.log(counts)
  const data = {
    labels: ['Admins', 'Managers', 'Reservation Managers', 'Bar Managers', 'Human Resource Managers'],
    datasets: [
      {
        label: '# of Votes',
        data: [
          counts.e1,
          counts.e2,
          counts.e3,
          counts.e4,
          counts.e5
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };
  return <Pie data={data} />;
}
