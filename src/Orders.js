import React, { Component } from 'react'
import firebase from './firebase.js'
import {
  Redirect
} from 'react-router-dom'

class Orders extends Component {
  constructor (props) {
    super()
    this.state = {
      order: [],
      user: props.loggedIn,
      id: null
    }
  }

  setItemsState () {
    var hawkerRef = firebase.database().ref('orders').child(this.state.id).orderByChild('order_status').equalTo('preparing')
    console.log('orders extracted')
    // var hawkerRef = firebase.database().ref().child('orders').orderByChild('H_id').equalTo('H02')
    hawkerRef.on('value', snap => {
      console.log('snap.val() refers to', snap.val())
      if (snap.val() !== null) {
        console.log('preview', snap.val())
        // var removeEmptyEl = snap.val().filter(el => el)
        console.log('filtered preview')
        var orderChange = []

        for (var j in snap.val()) {
          // console.log('j overview', j, snap.val()[j])
          // console.log('items', snap.val()[j].items)
          orderChange[j] = [] // each order will occupy a separate array
          for (var k in snap.val()[j].items) {
            // console.log(snap.val()[j].items[k].name, snap.val()[j].items[k].quantity)
            orderChange[j].push(snap.val()[j].items[k].name)
            orderChange[j].push(' x' + snap.val()[j].items[k].quantity + ' ')
          }
        }
        this.setState({
          order: orderChange
        })
      }
      console.log('state.order', this.state.order)
    })
  }

  changeStatus (e) {
    var orderRef = firebase.database().ref('orders/' + this.state.id + e.target.id).child('order_status')
    orderRef.set(
      'ready'
    )
  }
  checkState () {
    console.log('state', this.state)
  }
  getId () {
    console.log('getId is running 1')
    console.log('test user', this.state.user == null)
    if (!this.state.user) {
      console.log('state user does not exist')
      return <Redirect to='/' />
    } else {
      console.log('state user exists')
      const hawkerIdCheck = firebase.database().ref('hawkerId').orderByChild('email').equalTo(this.state.user.email)
      hawkerIdCheck.on('value', snap => {
        const existingId = Object.keys(snap.val())[0]
        this.setState({
          id: existingId
        })
        console.log('setting id', this.state.id)
        this.setItemsState()
      }
    )
    }
  }

  render () {
    return (
      <div>
        {/* <BasicExample user={this.state.user} /> */}
        <h1> Orders </h1>
        <p> Double click on the order(s) to complete them. </p>

        <button onClick={() => this.checkState()}> Testing </button>
        {this.state.user
           ? this.state.order.map(
               (test, index) =>
                 <p id={index} onDoubleClick={(e) => this.changeStatus(e)} key={index}> {test} </p>
         )
          : <Redirect to='/' />
          //  : <div> <p> You must be logged in to see your store orders. </p> </div>
         }

      </div>
    )
  }
  componentDidMount () {
    this.getId()
    // this.setItemsState()
  }
  }
export default Orders
