import React, { Component } from 'react'
import firebase from './firebase.js'
import './App.css'
import {
  Redirect
} from 'react-router-dom'

class MenuSetup extends Component {
  constructor (props) {
    super()
    this.state = {
      inputs: [],
      user: props.loggedIn,
      hawkerCount: 'H01',
      id: null
    }
  }
  handleSubmit (e) {
    e.preventDefault()
    const formData = Array.from(e.target.elements)
           .filter(el => el.name)
           .reduce((a, b) => ({...a, [b.name]: b.value}),
           {})
    // console.log(formData)
    // console.log('number of food fields', Object.keys(formData).length - 1)

    let hawker = {
      items: {},
      name: formData.user
    }
    var values = Object.values(formData)
    values.splice(0, 2) // to remove formData.user
    console.log('values', values)
    for (var i = 0; i < values.length; i++) {
      if (i % 2 === 0) {
        console.log(values[i])
        hawker.items[i / 2] = {name: values[i], price: values[i + 1]}
      }
    }
    console.log('hawker output', hawker)
    const hawkerRef = firebase.database().ref('hawkers').child(formData.hawker_id)
    // hawkerRef.on('value', snap =>
    // this.setState({
    //   hawkerCount: snap.numChildren()
    // }))
    // const hawkerRef = firebase.database().ref('hawkers')
    // hawkerRef.push(hawker)
    hawkerRef.set(hawker)
  }
  appendInput () {
    var newInput = this.state.inputs.length + 1
    this.setState({ inputs: this.state.inputs.concat([newInput]) })
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
      <div className='app'>
        <header>
          <div className='wrapper'>
            <h1>Hawker Menu Setup</h1>
          </div>
        </header>
        <div className='container'>
          {this.state.user
            ? <section className='add-item'>
              <form refs='form' onSubmit={e => this.handleSubmit(e)}>
                <input type='text' name='hawker_id' value={this.state.id} disabled='disabled' />
                <input type='text' name='user' placeholder="What's your stall name?" required />
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
          : <p> You must be logged in to see your adjust your menu items. </p>
        }
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
  componentDidMount () {
    const restaurantRef = firebase.database().ref('hawkers')
    restaurantRef.on('value', snap =>
    this.setState({
      hawkerCount: 'H' + (snap.numChildren() + 1)
    }))
    this.getId()
  }
}
export default MenuSetup
