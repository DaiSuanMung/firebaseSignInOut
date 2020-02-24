import React, { Component } from 'react';
var firebase = require('firebase');
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
    login=(event)=>{
        const email = this.refs.email.value;
        const password = this.refs.password.value;
        console.log(email, password)

        const auth = firebase.auth();
        const promise = auth.signInWithEmailAndPassword(email, password);

        //TODO: handle login promise

        promise.then(user=>{
            var lout = document.getElementById("logout");
            lout.classList.remove('hide');
        })

        promise.catch(e=>{
            var err = e.message;
            console.log(err)
            this.setState({err: err})
        })
    }
    signup=()=>{
        const email = this.refs.email.value;
        const password = this.refs.password.value;
        console.log(email, password)

        const auth = firebase.auth();
        const promise = auth.createUserWithEmailAndPassword(email, password);
        promise
        .then(user=>{
            var err = "Welcome "+ user.user.email;
            firebase.database().ref('users/' + user.user.uid).set({
                email: user.user.email
            });
            console.log(user)
            this.setState({err: err});
        });
        promise
        .catch(e=>{
            var err = e.message;
            console.log(err);
            this.setState({err: err})
        });
    }
    logout=()=>{
        firebase.auth().signOut();
        var lout = document.getElementById("logout");
            lout.classList.add('hide');

    }
    constructor(props) {
        super(props)
    
        this.state = {
             err: ''
        }
    }
    
    render() {
        return (
            <div>
                <input id="email" type="email" ref="email" placeholder="Enter your emial"/><br/>
                <input id="pass" type="password" ref="password" placeholder="Password"/><br/>
        <p>{this.state.err}</p>
                <button onClick={this.login}>Log in</button>
                <button onClick={this.signup}>Sign up</button>
                <button id="logout" onClick={this.logout} className="hide" >Log out</button>
            </div>
        )
    }
}
