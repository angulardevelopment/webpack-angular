
import { Component } from '@angular/core';

@Component({
 selector: 'my-app',
 template: '<h1>Hello !</h1>',
})
export class AppComponent {

 constructor(){
   console.log("I am Angular!")
  //  ES6 code to check babel-loader working fine or not:
const arr = [1, 2, 3];
// const iAmJavascriptES6 = () => console.log(...arr);
// window.iAmJavascriptES6 = iAmJavascriptES6;
// Now take a look at final js file in dist folder to see the transpiled code.

 }
}