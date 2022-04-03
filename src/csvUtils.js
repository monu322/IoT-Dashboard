//Papa parser for CSV files
import Papa from 'papaparse';

export function transpose(matrix) {
    return matrix[0].map((col, i) => matrix.map((row, index) => row[i]));
}


export const maxMinAvg = (arr)=> {
    var max = arr[0];
    var min = arr[0];
    var sum = 0; 
    for (var i = 1; i < arr.length-1; i++) {

        arr[i] = parseInt(arr[i]);

        if (arr[i] > max) {
            max = arr[i];
        }
        if (arr[i] < min) {
            min = arr[i];
        }
        sum = sum + arr[i];
    }

    return [max, min, Math.round(((sum/arr.length) + Number.EPSILON)*100)/100];
}


export const load_data = (url)=>{
    
    let data_arrays = [];

    Papa.parse(url, {
        worker: true, // Don't bog down the main thread if its a big file,
        download: true,
        complete: function(result, file) {
            

            data_arrays = transpose(result.data);

            console.log('parsing complete read util', data_arrays);
           return data_arrays;
        }
    });
  }