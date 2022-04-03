import React, {useContext} from "react";

import './multiline-graph.styles.scss';

import { Line } from "react-chartjs-2";

import { DataContext } from 'contexts/DataContext';

// reactstrap components
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle
  } from "reactstrap";

// core components
import {chartExample2} from "variables/charts.js";




function MultiLineGraph() {


    const labels = [];

    const chartData = {
        labels,
        datasets: [
        {
            label: 'Dataset 1',
            data: [],
            borderWidth: 0,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: 'Dataset 2',
            data: [],
            borderWidth: 0,
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },

        {
            label: 'Dataset 3',
            data: [],
            borderWidth: 0,
            borderColor: 'rgb(33, 52, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },

        ],
    };

    const { data } = useContext(DataContext);

    if(data)
    {
        data[0].slice(1).map((item, index)=>{
            labels.push(item+' '+data[1][index+1]);
            chartData.datasets[0].data.push(data[2][index+1]);
            chartData.datasets[1].data.push(data[18][index+1]);
            chartData.datasets[2].data.push(data[10][index+1]);
        });

        
    }

        console.log('labels: ', labels);
        console.log('data[2]: ', chartData.datasets[0].data);
    
    


    return (
        <Card className="card-chart">
            <CardHeader>
                <h5 className="card-category">Main Readings</h5>
                <CardTitle tag="h3">
                
                </CardTitle>
            </CardHeader>
            <CardBody>
                <div className="chart-area">
                <Line
                    data={chartData}
                    options={chartExample2.options}
                />
                </div>
            </CardBody>
        </Card>
    )
}

export default MultiLineGraph;