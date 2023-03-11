function WelcomeFunc({name, children}) {
  return <div>
        <h1>Bonjour, {name}</h1>
        <p>
            {children}
        </p>
    </div>
}

class Welcome extends React.Component {

    /* 
    constructor(props){
        super(props)
        console.log(props)
    }
    */

    render(){
        return <div>
            <h1>Bonjour {this.props.name}</h1>
            <p>
                {this.props.children}
            </p>
        </div>
    }
}

class Clock extends React.Component {

    constructor(props){
        super(props)
        this.state = {date: new Date()}
        this.timer = null
    }

    componentDidMount(){
        this.timer = window.setInterval(this.tick.bind(this), 1000)
    }

    componentWillUnmount(){ 
        window.clearInterval(this.timer)
    }

    tick(){
        this.setState({date: new Date()})
    }

    render(){
        const date = new Date()
        return <div>
            Il est {this.state.date.toLocaleDateString()} {this.state.date.toLocaleTimeString()}
        </div>
    }

}

class Incrementer extends React.Component {

    constructor(props){
        super(props)
        this.state = {n: props.start}
        this.timer = null
    }

    // Fonction qui s'execute après le rendu
    componentDidMount(){
       this.timer= window.setInterval(this.tick.bind(this), 1000)
    } 

    // Fonction qui s'execute avant le rendu
    componentWillUnmount(){ 
        window.clearInterval(this.timer)
    }

    tick(){
        /* C'est correct mais il vaut mieux utiliser une fonction 
            this.setState({n: this.state.n + 1})
        */

        // C'est plus conseillé car on utilise state dans setState
        // => écriture comme fonction anonyme javascript
        this.setState((state, props) => {
            return {n: state.n + props.step}
        })
    }

    render(){
        return <div>
            Notre variable vaut {this.state.n}
        </div>
    }
}

// On peut définir des valeurs par défaut pour les props
Incrementer.defaultProps = {
    start : 0,
    step : 1
}
 
function Home () {
    return <div>
        <Welcome name="Ninon" />
        <Welcome name="Luna" />
        <Clock/>
        <Incrementer start={10}/>
        <Incrementer start={100} step={10}/>
    </div>
}

ReactDOM.render(<Home/>, document.querySelector('#app'))