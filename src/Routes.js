import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom'
import { auth, provider } from './firebase.js'
import MenuSetup from './Menusetup'
import Orders from './Orders'

class BasicExample extends Component {
  constructor () {
    super()
    this.state = {
      inputs: [],
      user: null
    }
  }
  logout () {
    auth.signOut()
      .then(() => {
        this.setState({
          user: null
        })
      })
  }
  login () {
    auth.signInWithPopup(provider)
      .then((result) => {
        const user = result.user
        this.setState({
          user
        })
      })
  }
  render () {
    return (
      <Router>
        <div>
          <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/orders'>Orders</Link></li>
            <li><Link to='/topics'>Topics</Link></li>
            <li><Link to='/menu'>Menu</Link></li>
            {this.state.user
              ? <button onClick={() => this.logout()}>Log Out</button>
              : <button onClick={() => this.login()}>Log In</button>
            }
          </ul>

          <hr />
          {/* if (!{this.state.user}) return <Redirect to='/' /> */}
          <Route exact path='/' component={Home} />
          <Route path='/orders' component={Orders} />
          {/* <Route path='/orders' render={() => <Orders someProp={this.state.user} />} /> */}
          <Route path='/topics' component={Topics} />
          <Route path='/menu' component={MenuSetup} />
        </div>
      </Router>
    )
  }
  componentDidMount () {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user })
      }
    })
  }
}

const Home = () => (
  <div>
    <h2>Home</h2>
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

    <Route path={`${match.url}/:topicId`} component={Topic} />
    <Route exact path={match.url} render={() => (
      <h3>Please select a topic.</h3>
    )} />
  </div>
)

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
)

export default BasicExample
