const { CanvasRenderService } = require('chartjs-node-canvas');
const AWS = require("aws-sdk");

exports.handler = async (event, context) => {
  const width = event.width;
    const height = event.height;
    let labels = event.data.map((e)=> e.label );
    let data = event.data.map((e)=> e.value ); 
    let backgrounds = event.data.map((e)=> e.color );
   
    const configuration = {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: backgrounds
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    stacked: true
                }]
            }
        }
    };
    const canvasRenderService = new CanvasRenderService(width, height, (ChartJS) => { });
    const image = await canvasRenderService.renderToBuffer(configuration);

    return {b64PNG : image.toString('base64')};
}