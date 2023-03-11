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
        this.state = {n: props.start, timer: null}
        this.toogle = this.toogle.bind(this)
        this.reset = this.reset.bind(this)
    }

    // Fonction qui s'execute après le rendu
    componentDidMount(){
       this.play()
    } 

    // Fonction qui s'execute avant le rendu
    componentWillUnmount(){ 
        window.clearInterval(this.state.timer)
    }

    increment(){
        this.setState((state, props) => {
            return {n: state.n + props.step}
        })
    }

    pause(){
        window.clearInterval(this.state.timer)
        this.setState({
            timer: null
        })
    }

    play(){
        window.clearInterval(this.state.timer)
        this.setState({
            timer: window.setInterval(this.increment.bind(this), 1000)
        })
    }

    /* Cela marche, cependant, il veut mieux décomposer le code en plusieurs fonctions
    render(){
        return <div>
            Notre variable vaut {this.state.n}
            {this.state.timer ? 
                <button onClick={this.pause.bind(this)}>Pause</button> : 
                <button onClick={this.play.bind(this)}>Play</button>
            }
        </div> 
    }
    */

    toogle(){
        return this.state.timer ? this.pause() : this.play()
    }
 
    label(){
        return this.state.timer ? 'Pause' : 'Play'
    }

    reset(){
        this.pause()
        this.setState((state, props) => ({n: props.start}))
        this.play()
    }

    render(){
        return <div>
            Notre variable vaut {this.state.n}
            <button onClick={this.toogle}>{this.label()}</button>
            <button onClick={this.reset}>Réinitialiser</button> 
        </div> 
    }
}

// On peut définir des valeurs par défaut pour les props
Incrementer.defaultProps = {
    start : 0,
    step : 1
}

/*
class ManualIncrementer extends React.Component {

    constructor(props){
        super(props)
        this.state = {n: 0}
    }

    increment(e){
        // On empêche le comportement par défaut du bouton
        // c'est à dire que si c'est un lien, on ne va pas vers la page
        e.preventDefault()
        this.setState((state, props) => ({n: state.n + 1}))
    }

    render(){
        return <div>
            Valeur : {this.state.n}
            <button onClick={this.increment.bind(this)}>Incrementer</button>
        </div>
    }
}*/
 
function Home () {
    return <div>
        <Welcome name="Luna" />
        <Incrementer />
    </div>
}

ReactDOM.render(<Home/>, document.querySelector('#app'))