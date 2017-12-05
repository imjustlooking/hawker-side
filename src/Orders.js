import React, { Component } from 'react'
import firebase from './firebase.js'


class Orders extends Component {
// writeUserData (userId, name, email, imageUrl) {
//   firebase.database().ref('users/' + userId).set({
//     username: name,
//     email: email,
//     profile_picture: imageUrl
//   })
//   console.log('reached final step')
// }
  constructor () {
    super()
    this.state = {
      order: []
    }
  }

  setItemsState () {
    var hawkerRef = firebase.database().ref().child('orders').orderByChild('H_id').equalTo('H02')
    // var hawkerRef = firebase.database().ref().child('restaurants').orderByChild('name').equalTo('Food Republic')
  //  var hawkerRef = firebase.database().ref().child('restaurants').orderByChild('name').equalTo("Food Republic")
    hawkerRef.on('value', snap => {
      // console.log('snap val', snap.val())

      var removeEmptyEl = snap.val().filter(el => el)
      // console.log('display', removeEmptyEl)
      var orderChange = []

      for (var j in removeEmptyEl) {
        console.log('j overview', j, snap.val()[j])
        console.log('items', removeEmptyEl[j].items)
        orderChange[j] = [] // each order will occupy a separate array
        for (var k in removeEmptyEl[j].items) {
          console.log(removeEmptyEl[j].items[k].name, removeEmptyEl[j].items[k].quantity)
          orderChange[j].push(removeEmptyEl[j].items[k].name)
          orderChange[j].push(removeEmptyEl[j].items[k].quantity)
        }
      }

      this.setState({
        order: orderChange
      })
      console.log('state.order', this.state.order)
    })
  }

render () {
  return (
    <div>
      <h1> Orders </h1>
      {/* <p> {this.state.order[0]}x {this.state.order[2]} </p> */}
      {/* <button onClick={() => this.writeUserData(2, 'nikita', 'sinfulnikita@gmail.com', 'hotmail.com')}> Click this to write data </button> */}
    </div>
  )
}
  componentDidMount () {
    this.setItemsState()
  }
  }
export default Orders
