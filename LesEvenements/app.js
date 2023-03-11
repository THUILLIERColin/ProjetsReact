/* Un exemple avec toutes les possibilités de formulaire
class Home extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            nom: 'demo2', 
            tab: ['demo1', 'demo2'], 
            checked: true
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleChangeTab = this.handleChangeTab.bind(this)
    }

    handleChange(event){
        this.setState({
            nom: event.target.value
        })
    }

    handleChangeTab(event){
        this.setState({
            tab: Array.from(event.target.selectedOptions).map(o => o.value)
        })
    }

    handleChangeCheckbox(event){
        this.setState({
            checked: event.target.checked
        })
    }

    render(){
        return <div>
            {JSON.stringify(this.state.tab)} <br/>
            <label htmlFor="nom">Mon nom</label>
            <input type="text" id="nom" nom="nom" value={this.state.nom} onChange={this.handleChange} />
            <select value={this.state.tab} onChange={this.handleChangeTab} multiple>
                <option value="demo1">Demo 1</option>
                <option value="demo2">Demo 2</option>
                <option value="demo3">Demo 3</option>
            </select> 
            <br/>
            <input type="checkbox" checked={this.state.checked} onChange={this.handleChangeCheckbox.bind(this)}/>
            <br/>
            {this.state.checked ? <div> La box est cochée </div> : null}
        </div>
    }
}*/

function Field({name, value, onChange, children}){
        return <div className={name}>
            <label htmlFor={name}>{children}</label>
            <input type="text" className="form-control" id={name} name={name} value={value} onChange={onChange} />
        </div>
}

function Checkbox({name, value, onChange, children}){
    return <div className="form-check">
        <input type="checkbox" className="form-check-input" id={name} name={name} checked={value} onChange={onChange} />
        <label htmlFor={name} className="form-chek-label">{children}</label>
    </div>
}

class Home extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            nom: '', 
            prenom : '', 
            newsletter: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event){
        const name = event.target.name
        const type = event.target.type
        const value = type === 'checkbox' ? event.target.checked : event.target.value
        this.setState({
            [name]: value
        })
    }

    handleSubmit(event){
        event.preventDefault()
        const data = JSON.stringify(this.state)
        this.setState({
            nom: '', 
            prenom: '', 
            newsletter: false
        }) 
    }

    render(){
        return <form className="container" onSubmit={this.handleSubmit}>
            <Field name="nom" value={this.state.nom} onChange={this.handleChange}>Nom</Field>
            <Field name="prenom" value={this.state.prenom} onChange={this.handleChange}>Prénom</Field>
            <Checkbox name="newsletter" value={this.state.newsletter} onChange={this.handleChange}>S'abonner à la Newsletter ?</Checkbox>
            <div className="form-group">
                <button className="btn btn-primary">Envoyer</button>
            </div>
            {JSON.stringify(this.state)}
        </form>
    }
}

ReactDOM.render(<Home/>, document.querySelector('#app'))