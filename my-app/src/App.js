import React, { Component } from 'react'
import './css/style.css'
import Header from './components/Header'
import Order from './components/Order'
import Inventory from './components/Inventory'
import {sampleFishes} from './sample-fishes'
import Fish from './components/Fish'
import base from './base'

class App extends Component {
    constructor(props) {
        super(props)
        this.addFish = this.addFish.bind(this)
        this.loadSample = this.loadSample.bind(this)
        this.addToOrder = this.addToOrder.bind(this)
        this.removeFish = this.removeFish.bind(this)
        this.removeFishorder = this.removeFishorder.bind(this)
        this.updateFish = this.updateFish.bind(this)
        
        this.state = {
            fishes : {},
            order: {},
        }
    }
    componentWillMount() {
        // this runs right before the <App> is rendered
        this.ref = base.syncState(`${this.props.match.params.storeId}/fishes`, {
            context: this,
            state: 'fishes'
        });
    
        // check if there is any order in localStorage
        const localStorageRef = localStorage.getItem(`order-${this.props.match.params.storeId}`);
        if(localStorageRef) {
          // update our App component's order state
            this.setState({
                order: JSON.parse(localStorageRef)
            });
        }
    }
    componentWillUnmount() {
        base.removeBinding(this.ref);
    }
    
    componentWillUpdate(nextProps, nextState) {
        localStorage.setItem(`order-${this.props.match.params.storeId}`, JSON.stringify(nextState.order));
    }
    addFish(fish) {
        // Update the state 
        const fishes = {...this.state.fishes};
        // Work in the state 
        // a hack to make a uniq key
        const timestamp = Date.now();
        fishes[`fish-${timestamp}`] = fish 
        // set the state
        this.setState({
            fishes 
        }) 
    }
    loadSample = () => {
        this.setState({
            fishes : sampleFishes
        })
    }

    addToOrder = (key) => {
        const order = {...this.state.order};
        order[key] = order[key] + 1 || 1 ;
        this.setState({
            order
        })
    }
    updateFish(key, updatedFish) {
        const fishes = {...this.state.fishes};
        fishes[key] = updatedFish;
        this.setState({ fishes });
    }
    removeFish = (key) => {
        const fishes = {...this.state.fishes}
        fishes[key] = null
        this.setState({
            fishes
        })
    }
    removeFishorder = (key) => {
        const order = {...this.state.order}
        order[key] = null
        this.setState({
            order
        })
    }
    render() {
        return (
            <div className='catch-of-the-day'>
                <div className='menu'>
                    <Header tagline='Sea FreshFood Market'/>
                    <ul className='list-of-fishes'>
                        {
                            Object.keys(this.state.fishes).map( item => {
                                return  <Fish   key={item}  index={item}
                                                details={this.state.fishes[item]}
                                                addToOrder={this.addToOrder}/  >
                            })
                        }
                    </ul>
                </div>
                <Order  fishes={this.state.fishes}
                        order={this.state.order}
                        params={this.props.match.params}
                        removeFishorder={this.removeFishorder}/>
                <Inventory  addFish={this.addFish}
                            loadSample={this.loadSample}
                            fishes={this.state.fishes} 
                            updateFish={this.updateFish}
                            removeFish={this.removeFish}/>
            </div>
            
        )
    }
}

export default App

