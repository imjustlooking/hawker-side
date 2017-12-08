import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import firebase, { auth, provider } from './firebase.js'
import MenuSetup from './Menusetup'
import Orders from './Orders'

class BasicExample extends Component {
  constructor () {
    super()
    this.state = {
      inputs: [],
      id: null,
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
        const hawkerIdRef = firebase.database().ref('hawkerId')
        const hawkerIdCheck = firebase.database().ref('hawkerId').orderByChild('email').equalTo(user.email)
        hawkerIdCheck.once('value').then(snap => {
          if (snap.val() === null) {
            hawkerIdRef.once('value').then(subsnap => {
              let newId = 'H' + (subsnap.numChildren() + 1)
              this.setState({
                id: newId
              })
              hawkerIdRef.child(newId).set({
                email: user.email
              })
            })
          } else {
            let existingId = Object.keys(snap.val())[0]
            this.setState({
              id: existingId
            })
          }
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
            <li><Link to='/menu'>Menu</Link></li>
            {this.state.user
              ? <Link className='btn btn-outline-warning btn-block' to='/' onClick={() => this.logout()}>Log Out</Link>
              : <Link className='btn btn-warning btn-block' to='/' onClick={() => this.login()}>Log In</Link>
            }
          </ul>
          <hr />
          <Route exact path='/' component={Home} />
          <Route path='/orders' render={() => <Orders loggedIn={this.state.user} />} />
          <Route path='/menu' render={() => <MenuSetup loggedIn={this.state.user} />} />
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
    <h1>Home</h1>
    <p className='orderp'> Welcome to HawkerPay. <br /> This is a free trial account. <br />
    Your account manager: Gabriel Lu </p>
  </div>
)

export default BasicExample
