import React, { Component } from 'react'
import './App.css'
import firebase from './firebase.js'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

const BasicExample = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/topics">Topics</Link></li>
        <li><Link to="/menu">Menu</Link></li>
      </ul>

      <hr/>

      <Route exact path="/" component={Home}/>
      <Route path="/about" component={About}/>
      <Route path="/topics" component={Topics}/>
      <Route path="/menu" component={App}/>
    </div>
  </Router>
)

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)

const About = () => (
  <div>
    <h2>About</h2>
  </div>
)

const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>
          Rendering with React
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>
          Components
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>
          Props v. State
        </Link>
      </li>
    </ul>

    <Route path={`${match.url}/:topicId`} component={Topic}/>
    <Route exact path={match.url} render={() => (
      <h3>Please select a topic.</h3>
    )}/>
  </div>
)

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
)

class App extends Component {
  constructor () {
    super()
    this.state = {
      inputs: []
    }
  }
  handleSubmit (e) {
    e.preventDefault()
    const restaurantRef = firebase.database().ref('restaurants')
    const formData = Array.from(e.target.elements)
           .filter(el => el.name)
           .reduce((a, b) => ({...a, [b.name]: b.value}),
           {})
    console.log(formData)
    // console.log('number of food fields', Object.keys(formData).length - 1)

    let restaurant = {
      items: {},
      name: formData.user
    }
    var values = Object.values(formData)
    values.splice(0, 1)

    for (var i = 0; i < values.length; i++) {
      if (i % 2 === 0) {
        console.log(values[i])
        restaurant.items[i / 2] = {name: values[i], price: values[i + 1]}
      }
    }
    console.log(restaurant)
    restaurantRef.push(restaurant)
  }
  appendInput () {
    var newInput = this.state.inputs.length + 1
    this.setState({ inputs: this.state.inputs.concat([newInput]) })
  }
  render () {
    return (
      <div className='app'>
        <header>
          <div className='wrapper'>
            <h1>Hawker Menu Setup</h1>
          </div>
        </header>
        <div className='container'>
          {/* <Router>
            <div>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/topics">Topics</Link></li>
              </ul>

              <hr/>

              <Route exact path="/" component={Home}/>
              <Route path="/about" component={About}/>
              <Route path="/topics" component={Topics}/>
            </div>
          </Router> */}
          <section className='add-item'>
            <form refs='form' onSubmit={e => this.handleSubmit(e)}>
              <input type='text' name='user' placeholder="What's your restaurant name?" required />
              <input type='text' name='it0' placeholder='Dish 1 name' required />
              <input type='number' name='pr0' min='0.01' step='0.01' placeholder='Price: e.g. 10.00' required />
              {this.state.inputs.map(
                 (counter, index) =>
                   <div key={index}>
                     <input type='text' name={'it' + counter} placeholder={'Dish ' + (counter + 1) + ' name'} required />
                     <input type='number' name={'pr' + counter} min='0.01' step='0.01' placeholder='Price: e.g. 10.00' required />
                   </div>)}
              <button type='submit'>Submit</button>
            </form>
            <button onClick={() => this.appendInput()}>
                   Add dish
               </button>
          </section>
          <section className='display-item'>
            <div className='wrapper'>
              <ul>
              </ul>
            </div>
          </section>
        </div>
      </div>
    )
  }
}
export default BasicExample
