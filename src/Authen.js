import React, { Component } from 'react'

const firebase = require('firebase')

const config = {
    apiKey: "AIzaSyCJwKkKs_kIwG2nvge12ZcRAyT42A5T4WA",
    authDomain: "uservey-c6f8b.firebaseapp.com",
    databaseURL: "https://uservey-c6f8b.firebaseio.com",
    projectId: "uservey-c6f8b",
    storageBucket: "uservey-c6f8b.appspot.com",
    messagingSenderId: "1963930293",
    appId: "1:1963930293:web:b75b4ff6a03305ed5dc4fc",
    measurementId: "G-W80X1GCMZB"
  };
  firebase.initializeApp(config)

export default class Authen extends Component {
    constructor(props) {
    super(props)

    this.state = {
         err: ''
    }
}

login=(event)=>{
    const email = this.refs.email.value;
    const password = this.refs.password.value;
    const auth = firebase.auth();
    auth.signInWithEmailAndPassword(email,password)
    .then(user=>{
        console.log(email, password)
    const log = document.getElementById("logout");
    log.classList.remove('hide')
    })
    .catch(e=>{
        let err = e.message;
        this.setState({
            err: err
        })
        
    })
    
}

signUp=()=>{
    const email = this.refs.email.value;
    const password = this.refs.password.value;
    const auth = firebase.auth();
    const promise =auth.createUserWithEmailAndPassword(email,password)
    promise.then(user=>{
        var err = "welcome to" + user.user.email
        firebase.database().ref('users/' + user.user.uid).set({
            email: user.user.email
        })
        this.setState({err: err});
    })
    .catch(e=>{
        let err = e.message;
        this.setState({
            err: err
        })
        
    })


}
logOut=()=>{
    firebase.auth().signOut()
    var log = document.getElementById("logout");
    log.classList.add('hide');

}

    render() {
        return (
            <div>
                <input type="email" placeholder="write your name" ref="email" /><br/>
                <input type="password" placeholder="write your Password" ref="password" /><br/>
        <p>{this.state.err}</p>
                <button onClick={this.login}>Login</button>
                <button onClick={this.signUp}>Signup</button>
                <button id="logout" className="hide" onClick={this.logOut}>Log Out</button>
            </div>
        )
    }
}
