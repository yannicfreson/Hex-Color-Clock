import React, { Component } from "react";
import "./App.css";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            textColor: "white",
            backgroundColor: "000000"
        };
        this.updateTime = this.updateTime.bind(this);
    }

    updateTime() {
        // huidige tijd
        let today = new Date();
        let time = formatTime(today.getHours()) + "" + formatTime(today.getMinutes()) + "" + formatTime(today.getSeconds());

        // tijd omzetten naar hex
        function toHex(input) {
            let numberAsHex = input.toString(16).toUpperCase();
            if (input < 16) {
                numberAsHex = "0" + numberAsHex;
            }
            return numberAsHex;
        }

        let backgroundColor =
            toHex(today.getHours()) +
            toHex(today.getMinutes()) +
            toHex(today.getSeconds());

        //prefix tijd met 0
        function formatTime(input) {
            let output = input;
            if (input < 10) {
                output = "0" + input;
            }
            return output;
        }

        // contrast berekenen text en backgroundcolor
        if (today.getHours() * 0.299 + today.getMinutes() * 0.587 + today.getSeconds() * 0.114 > 186) {
            this.textColor = "black";
        }

        //concatenate strings for output
        let hexAndTimeFormatted = backgroundColor + "\n" + time;
        console.log(hexAndTimeFormatted);

        // state zetten
        this.setState({
            backgroundColor,
            time,
            hexAndTimeFormatted
        });
        console.log("updateTime");
        console.log("backgroundColor", backgroundColor);
    }

    componentDidMount() {
        this.updateTime();
        setInterval(this.updateTime, 1000);
    }

    render() {
        const backgroundColor = this.state.backgroundColor;
        const textColor = this.state.textColor;
        const hexAndTimeFormatted = this.state.hexAndTimeFormatted;
        return (
            <div
                className="root"
                style={{
                    fontSize: "15vh",
                    color: textColor,
                    backgroundColor: "#" + backgroundColor,
                    whiteSpace: 'pre-wrap'
                }}
            >
                {hexAndTimeFormatted}
            </div>
        );
    }
}

export default App;