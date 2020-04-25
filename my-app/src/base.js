import Rebase from 're-base'
import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyCm1WRAVLK06JqsnhQc0rM1O_h4vao3GMM",
    authDomain: "fresh-seafood-market-a5dc1.firebaseapp.com",
    databaseURL: "https://fresh-seafood-market-a5dc1.firebaseio.com",
};

const app = firebase.initializeApp(config)
const base = Rebase.createClass(app.database())

export default base;