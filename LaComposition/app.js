const scaleNames = {
    c: 'Celcius',
    f: 'Fahrenheit'
}

function toCelcius(fahrenheit){
    return (fahrenheit - 32) * 5 / 9
}

function toFahrenheit(celcius){
    return (celcius * 9 / 5) + 32
}

function BoilingVerdict({celcius}){
    if (celcius >= 100){
        return <div className="alert alert-success">L'eau bout</div>
    } else {
        return <div className="alert alert-info">L'eau ne bout pas</div>
    }
}

function tryConvert(temperature, convert){
    const input = parseFloat(temperature)
    if (Number.isNaN(input)){
        return ''
    }
    const output = convert(input)
    const rounded = Math.round(output * 100) / 100
    return rounded.toString()
}

class TemperatureInput extends React.Component {

    constructor(props){
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e){
        this.props.onTemperatureChange(e.target.value)
    }

    render(){
        const {temperature} = this.props
        const name = 'scale ' + this.props.scale
        const scaleName = scaleNames[this.props.scale]
        return <div className="form-group"> 
            <label htmlFor={name}>Température (en {scaleName})</label>
            <input type="number" id={name} className="form-control" value={temperature} onChange={this.handleChange}/>
        </div>
    }
}

function Button ({type, children}){
    const className = 'btn btn-' + type
    return <button className={className}>{children}</button>
}

function PrimaryButton ({children}){
    return <Button type="primary">{children}</Button>
}

function SecondaryButton ({children}){
    return <Button type="secondary">{children}</Button>
}

function Column2({left, right}){
    return <div className="row">
        <div className="col-md-6">{left}</div>
        <div className="col-md-6">{right}</div>
    </div>
}

class Calculator extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            scale: 'c',
            temperature: 20
        }
        this.handleCelsiusChange = this.handleCelsiusChange.bind(this)
        this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this)
    }

    handleFahrenheitChange(temperature){
        this.setState({
            scale: 'f',
            temperature
        })
    }

    handleCelsiusChange(temperature){
        this.setState({
            scale: 'c',
            temperature
        })
    }

    render(){
        const {temperature, scale} = this.state
        const celcius = scale === 'c' ? temperature : tryConvert(temperature, toCelcius)
        const fahrenheit = scale === 'f' ? temperature : tryConvert(temperature, toFahrenheit)
        return <div>
            <Column2 
                left={<TemperatureInput scale="c" temperature={celcius} onTemperatureChange={this.handleCelsiusChange}/>}
                right={<TemperatureInput scale="f" temperature={fahrenheit} onTemperatureChange={this.handleFahrenheitChange}/>}
            />
            <BoilingVerdict celcius={celcius}/>
        </div>
    }
}

function Home () {
    return <div>
        <Calculator/> 
    </div>
}

ReactDOM.render(<Home/>, document.querySelector('#app'))