import CanvasJSReact from "../canvasjs/canvasjs.react";
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

export function BarChart({data, title}) {
    const options = {
        title: {
            text: title
        },
        data: [{
            type: "column",
            dataPoints: data        }]
    }

    return (
        <div>
            <CanvasJSChart options = {options}
                /* onRef = {ref => this.chart = ref} */
            />
        </div>
    );
}