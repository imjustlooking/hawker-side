import React, { Component } from 'react'
import './App.css'
import firebase from './firebase.js'

class App extends Component {
  constructor () {
    super()
    this.state = { inputs: ['1'] }
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
        restaurant.items[values[i]] = values[i + 1]
      }
    }
    console.log(restaurant)
    restaurantRef.push(restaurant)
  }
  appendInput () {
    var newInput = `${this.state.inputs.length + 1}`
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
          <section className='add-item'>
            <form refs='form' onSubmit={e => this.handleSubmit(e)}>
              <input type='text' name='user' placeholder="What's your restaurant name?" required />
              <input type='text' name='it0' placeholder='Dish 1 name' required />
              <input type='number' name='pr0' min='0.01' step='0.01' placeholder='Price: e.g. 10.00' required />
              {this.state.inputs.map(
                 (counter, index) =>
                   <div key={index}>
                     <input type='text' name={'it' + counter} placeholder={'Dish ' + counter + ' name'} required />
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
export default App