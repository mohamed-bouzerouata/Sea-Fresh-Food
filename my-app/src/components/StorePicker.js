import React, { Component } from 'react'
import { getFunName } from '../helpers'

class StorePicker extends Component {
    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit = (e) => {
        e.preventDefault()
        // first Grab the text form from the box
        const storeId = this.storeInput.value
        // second we're going to transition from / to /store/:store:id
        this.props.history.push(`/store/${storeId}`)
    }

    render() {
        
        return (
            <form className='store-selector' onSubmit={this.handleSubmit}>
                <h2>PLEASE ENTRE A STORE</h2>
                <input  type='text' placeholder='STORE NAME' defaultValue={getFunName()}
                ref={(input) => {this.storeInput = input}}/>
                <button type='submit'>VISIT STORE</button>
            </form>
        )
    }
}
export default StorePicker
