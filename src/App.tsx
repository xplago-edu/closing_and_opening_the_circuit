import './App.css'
import Plot from "react-plotly.js";
import {useState} from "react";

function App() {

    const [inductance, setInductance] = useState("1");
    const [resistance, setResistance] = useState("1");
    const [emf, setEmf] = useState("1");
    const [xStart, setXStart] = useState("0");
    const [xEnd, setXEnd] = useState("10");
    const [xStep, setXStep] = useState("0.1");

    const f1 = (t: number, l: number, r: number, emf: number) => {
        return (1 - Math.exp(- (r / l) * t)) * (emf / r);
    }

    const f2 = (t: number, l: number, r: number, emf: number) => {
        return Math.exp(- (r / l) * t) * (emf / r);
    }

    const xData = [];
    const yData1 = [];
    const yData2 = [];

    const inductanceData = Number.parseFloat(inductance);
    const resistanceData = Number.parseFloat(resistance);
    const emfData = Number.parseFloat(emf);

    if (Number.parseFloat(xStep) > 0) {
        for (let i = Number.parseFloat(xStart); i < Number.parseFloat(xEnd); i += Number.parseFloat(xStep)) {
            xData.push(i);

            yData1.push(f1(i, inductanceData, resistanceData, emfData))
            yData2.push(f2(i, inductanceData, resistanceData, emfData))
        }
    }

    return (
        <>
            <div className={"wrapper"}>
                <div className={"container inputContainer"}>
                    <label htmlFor={"inductance"}>Inductance:</label>
                    <input
                        id={"inductance"}
                        name={"inductance"}
                        onChange={(e) => setInductance(e.target.value)}
                        value={inductance}/>
                    <span>Farad</span>
                    <label htmlFor={"resistance"}>Resistance:</label>
                    <input
                        id={"resistance"}
                        name={"resistance"}
                        onChange={(e) => setResistance(e.target.value)}
                        value={resistance}/>
                    <span>Ohms</span>
                    <label htmlFor={"emf"}>EMF:</label>
                    <input
                        id={"emf"}
                        name={"emf"}
                        onChange={(e) => setEmf(e.target.value)}
                        value={emf}/>
                    <span>Volts</span>
                    <label htmlFor={"emf"}>t start:</label>
                    <input
                        id={"emf"}
                        name={"emf"}
                        onChange={(e) => setXStart(e.target.value)}
                        value={xStart}/>
                    <span>Seconds</span>
                    <label htmlFor={"emf"}>t end:</label>
                    <input
                        id={"emf"}
                        name={"emf"}
                        onChange={(e) => setXEnd(e.target.value)}
                        value={xEnd}/>
                    <span>Seconds</span>
                    <label htmlFor={"emf"}>t step:</label>
                    <input
                        id={"emf"}
                        name={"emf"}
                        onChange={(e) => setXStep(e.target.value)}
                        value={xStep}/>
                    <span>Seconds</span>
                </div>
                <div className={"container"}>
                    <Plot

                        data={[
                            {
                                x: xData,
                                y: yData1,
                                type: 'scatter',
                                mode: 'lines',
                                marker: {color: 'red'},
                            },
                        ]}
                        layout={{width: 700, height: 400, title: 'Clojure', xaxis: {title: "Time, Seconds"}, yaxis: {title: "Current, Amperes"}}}
                    />
                    <Plot

                        data={[
                            {
                                x: xData,
                                y: yData2,
                                type: 'scatter',
                                mode: 'lines',
                                marker: {color: 'red'},
                            },
                        ]}
                        layout={{width: 700, height: 400, title: 'Disconnection', xaxis: {title: "Time, Seconds"}, yaxis: {title: "Current, Amperes"}}}
                    />
                </div>
            </div>
        </>
    )
}

export default App
