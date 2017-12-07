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
    var hawkerRef = firebase.database().ref('orders').child('H06').orderByChild('order_status').equalTo('preparing')
    // var hawkerRef = firebase.database().ref().child('orders').orderByChild('H_id').equalTo('H02')
    hawkerRef.on('value', snap => {
      if (snap.val() !== null) {
        console.log('preview', snap.val())
        var removeEmptyEl = snap.val().filter(el => el)
        console.log('filtered preview')
        var orderChange = []

        for (var j in removeEmptyEl) {
          // console.log('j overview', j, removeEmptyEl[j])
          // console.log('items', removeEmptyEl[j].items)
          orderChange[j] = [] // each order will occupy a separate array
          for (var k in removeEmptyEl[j].items) {
            // console.log(removeEmptyEl[j].items[k].name, removeEmptyEl[j].items[k].quantity)
            orderChange[j].push(removeEmptyEl[j].items[k].name)
            orderChange[j].push(' x' + removeEmptyEl[j].items[k].quantity + ' ')
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
    if (!this.state.user) {
      return <Redirect to='/' />
    }
    const hawkerIdCheck = firebase.database().ref('hawkerId').orderByChild('email').equalTo(this.state.user.email)
    hawkerIdCheck.on('value', snap => {
      const existingId = Object.keys(snap.val())[0]
      this.setState({
        id: existingId
      })
    }
    )
  }

  render () {
    return (
      <div>
        {/* <BasicExample user={this.state.user} /> */}
        <h1> Orders </h1>
        <p> Double click on the order(s) to complete them. </p>
        {/* {this.state.order.map(
            (test, index) =>
              <p id={index} onDoubleClick={(e) => this.changeStatus(e)} key={index}> {test} </p>
      )} */}
        <button onClick={() => this.checkState()}> Testing </button>
        {this.state.user
           ? this.state.order.map(
               (test, index) =>
                 <p id={index} onDoubleClick={(e) => this.changeStatus(e)} key={index}> {test} </p>
         )
           : <div> <p> You must be logged in to see your store orders. </p> </div>
         }

      </div>
    )
  }
  componentWillMount () {
    this.setItemsState()
    this.getId()
  }
  }
export default Orders
