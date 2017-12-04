import React, { Component } from 'react'
// import logo from './logo.svg';
import './App.css'
import firebase from './firebase.js'

class App extends Component {
  constructor(props) {
       super(props);
       this.state = { inputs: ['2'] };
   }
  handleSubmit(e) {
    e.preventDefault()
    const restaurantRef = firebase.database().ref('restaurants')
    const formData = Array.from(e.target.elements)
           .filter(el => el.name)
           .reduce((a, b) => ({...a, [b.name]: b.value}),
           {})
    // console.log(formData)
    // console.log('number of food fields', Object.keys(formData).length - 1)

    let restaurant = {
      items: {},
      name: formData.user
    }
    for (var i in formData) {
      if (i !== 'user') {
        restaurant.items[i] = formData[i]
      }
    }
    restaurantRef.push(restaurant)
  }
  appendInput() {
        var newInput = `${this.state.inputs.length+2}`;
        this.setState({ inputs: this.state.inputs.concat([newInput]) });
  }
  render() {
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
              <div id="dynamicInput">
                         {this.state.inputs.map(
                           counter =>
                           <div>
                           <input type='text' name={'it' + counter} placeholder={'Dish ' + counter + ' name'} required />
                           <input type='number' name={'pr' + counter} min='0.01' step='0.01' placeholder='Price: e.g. 10.00' required /> </div>)}
              </div>
              <button type='submit'>Submit</button>
            </form>
            <button onClick={() => this.appendInput() }>
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
    );
  }
}
export default App;
