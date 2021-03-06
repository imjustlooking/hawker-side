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
      id: 'H0'
    }
  }
  handleSubmit (e) {
    e.preventDefault()
    const formData = Array.from(e.target.elements)
           .filter(el => el.name)
           .reduce((a, b) => ({...a, [b.name]: b.value}),
           {})

    let hawker = {
      items: {},
      name: formData.user
    }
    var values = Object.values(formData)
    values.splice(0, 2) // to remove formData.user
    for (var i = 0; i < values.length; i++) {
      if (i % 2 === 0) {
        hawker.items[i / 2] = {name: values[i], price: values[i + 1]}
      }
    }
    const hawkerRef = firebase.database().ref('hawkers').child(formData.hawker_id)
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
    if (!this.state.user) {
      return <Redirect to='/' />
    }
    return (
      <div className='app'>
        <header>
          <h1>Hawker Menu Setup</h1>
        </header>
        <div className='container'>
          {this.state.user
            ? <section className='add-item'>
              <form refs='form' onSubmit={e => this.handleSubmit(e)}>
                <div className='form-group row'>
                  <div className='col-12'>
                    <input type='text' className='form-control' name='hawker_id' value={this.state.id} disabled='disabled' />
                    <input type='text' className='form-control' name='user' placeholder='Stall name' required />
                    <input type='text' className='form-control' name='it0' placeholder='Dish 1 name' required />
                    <input type='number' className='form-control' name='pr0' min='0.01' step='0.01' placeholder='Price: e.g. 10.00' required />
                  </div>
                </div>
                {this.state.inputs.map(
                 (counter, index) =>
                   <div key={index}>
                     <input type='text' className='form-control' name={'it' + counter} placeholder={'Dish ' + (counter + 1) + ' name'} required />
                     <input type='number' className='form-control' name={'pr' + counter} min='0.01' step='0.01' placeholder='Price: e.g. 10.00' required />
                   </div>)}

                <button type='submit'>Submit</button>
              </form>
              <div className='buttonwrapper'>
                <button className='button1' onClick={() => this.appendInput()}>
                     Add dish
                 </button>
              </div>
            </section>
          : <p> You must be logged in to see your adjust your menu items. </p>
        }
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
