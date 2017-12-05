import React, { Component } from 'react'
import firebase from './firebase.js'

// var starCountRef = firebase.database().ref('orders/' + postId + '/items');
var orderRef = firebase.database().ref('orders')
var orderObj
orderRef.on('value', function (snapshot) {
  orderObj = snapshot.val()
  console.log('orderObj', orderObj[0].items[0])
})
class Orders extends Component {
// writeUserData(userId, name, email, imageUrl) {
//   firebase.database().ref('users/' + userId).set({
//     username: name,
//     email: email,
//     profile_picture : imageUrl
//   })
//   console.log('reached final step')
// }
  constructor () {
    super()
    this.state = {
      order: {}
    }
  }

render () {
  return (
    <div>
      <h1> test </h1>
      <p> </p>
      {/* <button onClick={() => this.writeUserData(2, 'gabriel', 'gabrielulu@gmail.com','hotmail.com')}> Click this to write data </button> */}
    </div>
  )
}
}
export default Orders
