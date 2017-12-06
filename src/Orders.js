import React, { Component } from 'react'
import firebase from './firebase.js'

class Orders extends Component {
  constructor () {
    super()
    this.state = {
      order: []
    }
  }

  setItemsState () {
    var hawkerRef = firebase.database().ref('orders').child('H06').orderByChild('order_status').equalTo('unpaid')
    // var hawkerRef = firebase.database().ref().child('orders').orderByChild('H_id').equalTo('H02')
    hawkerRef.on('value', snap => {
      console.log('preview', snap.val())
      // var removeEmptyEl = snap.val().filter(el => el)
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
      console.log('state.order', this.state.order)
    })
  }

  changeStatus (e) {
    // console.log(e.target.id)
    // var orderRef = firebase.database().ref('orders/' + 'H06' + '/0')

    var orderRef = firebase.database().ref('orders/' + 'H06/' + e.target.id).child('order_status')
    orderRef.on('value', snap => {
      console.log('preview', snap.val().order_status)
    })
    orderRef.set(
      'ready'
    )
  }

  // manualAdjust () {
  //   var orderRef = firebase.database().ref('orders/' + 'H06' + '/2').child('order_status')
  //   orderRef.on('value', snap => {
  //     console.log('preview addManual', snap.val())
  //   })
  //   orderRef.set(
  //     'unpaid lol'
  //   )
  // }
  render () {
    return (
      <div>
        <h1> Orders </h1>
        {
          this.state.order.map(
              (test, index) =>
                <p id={index} onDoubleClick={(e) => this.changeStatus(e)}key={index}> {test} </p>
        )
        }
        <button onClick={() => this.manualAdjust()}> addManual </button>
      </div>
    )
  }
  componentDidMount () {
    this.setItemsState()
  }
  }
export default Orders
