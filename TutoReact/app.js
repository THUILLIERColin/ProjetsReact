/*

// ---------- Syntaxe React ----------

let n = 0

function render() {
    const title = React.createElement('h1', {}, 
        'Bonjour tout le monde ',
        React.createElement('span', {}, n),
    )
    ReactDOM.render(title, document.querySelector('#app'))
}

render()

window.setInterval(() => { 
    n++
    render() 
}, 1000)

*/

// ---------- Syntaxe JSX ----------

let n = 0

function  numberFormat(n) {
    return n.toString().padStart(2, '0')
}

function render() {
    const items = [
        'Tache 1', 
        'Tache 2',
        'Tache 3'
    ]
    // on parcourt le tableau items et on retourne un élément li
    // pour chaque élément du tableau on donne une clé unique (index)
    const list = items.map((item, index) => <li key={index}>{item}</li>)

    // pour éviter d'avoir une div inutile
    const title = <React.Fragment> 
        <h1 id={"title" + n} className="title">
            Bonjour tout le monde <span>{n % 2 ? numberFormat(n) : null}</span>
        </h1>

        <ul>
            {list} 
        </ul>
    </React.Fragment>

    ReactDOM.render(title, document.querySelector('#app'))
}

render()

window.setInterval(() => {
    n++
    render()
}, 1000)
