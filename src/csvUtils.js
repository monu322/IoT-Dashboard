//Papa parser for CSV files
import Papa from 'papaparse';

export function transpose(matrix) {
    return matrix[0].map((col, i) => matrix.map(row => row[i]));
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