import React, { Component } from 'react';
import './App.css';
//import Radium, {StyleRoot} from 'radium';

import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      { id: '1234abc', name: 'Max', age: 28},
      { id: '345ndf',name: 'Manu', age: 29},
      { id: '0995kkf',name: 'Stephanie', age: 26}
    ],
    otherState: 'some other value',
    showPersons: false
  }
  // switchNameHandler = (newName) => {
  //   //console.log('Was clicked');
  //   // DON't DO THIS: this.state.persons[0].name = 'Maximilian';
  //   this.setState({
  //     persons: [
  //       { name: newName, age: 28},
  //       { name: 'Manu', age: 29},
  //       { name: 'Vina', age: 27}
  //     ]
  //   })
  // }

  nameChangeHandler =(event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };

    //alternative to the above const person = Object.assign({}, this.state.persons[personIndex]);

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({persons: persons });
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }

  deletePersonHandler = (personIndex) => {
    //const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons: persons})
  }

  render() {
    const style = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inheret',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
      // ':hover': {
      //   backgroundColor: 'lightgreen',
      //   color: 'black'
      // }
    };

    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index )=> {
            return <Person 
              click={() => this.deletePersonHandler(index)} //alternative is bind.this, index
              name={person.name} 
              age={person.age}
              key={person.id}
              changed={(event) => this.nameChangeHandler(event, person.id)}
              />
          })}
        </div>   
          // <Person name={this.state.persons[0].name} age={this.state.persons[0].age} />
          // <Person name={this.state.persons[1].name} age={this.state.persons[1].age}
          //   click={this.switchNameHandler.bind(this, 'Vanie')}
          //   changed={this.nameChangeHandler}>Hobbies: Cooking  
          // </Person>
          // <Person name={this.state.persons[2].name} age={this.state.persons[2].age}/>
        
      );
      // style.backgroundColor = 'red';
      // style[':hover'] = {
      //   backgroundColor: 'salmon',
      //   color: 'black'
      // }
    }

    //let classes = ['red', 'bold'].join(' '); //pass this to <p className={classes}></p>
    const classes = [];
    if(this.state.persons.length <= 2) {
      classes.push('red'); //classes = ['red']
    }
    if(this.state.persons.length <= 1) {
      classes.push('bold'); // classes = ['red', 'bold']
    }
    

    return (
      // <StyleRoot>
        <div className="App">
          <h1>Hi, I'm a React App</h1>
          <p className={classes.join(' ')}>This is really working!</p>
          <button 
            style={style}
            //onClick={()=>this.switchNameHandler('Vanessa')}>Switch Name
            onClick={this.togglePersonsHandler}>Toggle Persons
          </button>
          {persons}
        </div>
      // </StyleRoot>
    );
  }
}
export default App;

// export default Radium(App);
