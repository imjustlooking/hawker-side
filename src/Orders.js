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

  setItemsState (id) {
    var hawkerRef = firebase.database().ref('orders').child(id).orderByChild('order_status').equalTo('preparing')
    hawkerRef.on('value', snap => {
      var orderChange = []
      if (snap.val() !== null) {
        for (var j in snap.val()) {
          orderChange[j] = [] // each order will occupy a separate array
          for (var k in snap.val()[j].items) {
            orderChange[j].push(snap.val()[j].items[k].name)
            orderChange[j].push(' x' + snap.val()[j].items[k].quantity + ' ')
          }
        }
        this.setState({
          order: orderChange
        })
      } else {
        this.setState({
          order: ['Awaiting more orders']
        })
      }
    })
  }

  changeStatus (e) {
    var orderRef = firebase.database().ref('orders/' + this.state.id + '/' + e.target.id).child('order_status')
    orderRef.set(
      'ready'
    )
  }
  getId () {
    if (!this.state.user) {
      return <Redirect to='/' />
    } else {
      const hawkerIdCheck = firebase.database().ref('hawkerId').orderByChild('email').equalTo(this.state.user.email)
      hawkerIdCheck.on('value', snap => {
        const existingId = Object.keys(snap.val())[0]
        this.setState({
          id: existingId
        })
        this.setItemsState(existingId)
      }
    )
    }
  }

  render () {
    return (
      <div>
        <h1> Orders </h1>
        <p className='orderp'> Double click on the order(s) to complete them. </p>
        {this.state.user
           ? this.state.order.map(
               (test, index) =>
                 <div className='card' key={index} >
                   <div className='card-block'>
                     <h4 id={index} onDoubleClick={(e) => this.changeStatus(e)} className='card-title orderp'>Order #{index}</h4>
                     <p className='card-text orderp'>{test}</p>
                   </div>
                 </div>
         )
          : <Redirect to='/' />
         }
      </div>
    )
  }
  componentDidMount () {
    this.getId()
  }
  }
export default Orders
