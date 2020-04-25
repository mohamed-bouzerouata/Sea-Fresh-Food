import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App'
import * as serviceWorker from './serviceWorker';
import StorePicker from './components/StorePicker';
import { BrowserRouter, Route } from 'react-router-dom'




const app = (      
        <div>
        <BrowserRouter>
                <Route path='/' exact component={StorePicker} />
                <Route exact path='/store/:storeId' component={App} />
        </BrowserRouter>
        </div>
                        
)

ReactDOM.render(app , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
