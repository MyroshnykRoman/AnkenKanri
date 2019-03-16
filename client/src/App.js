import React, { Component } from 'react';
import axios from 'axios';
import AddAnkenComponent from './components/AddAnkenComponent'
import AnkenListComponent from './components/AnkenListComponent'
import FilterComponent from './components/FilterComponent';

class App extends Component {
  state = {
    ankenName:'',
    postalCode:'',
    filterInput:'',
    ankenNameIsOk:false,
    postalCodeIsOk:false,
    ankens:[],
    filteredAnkens:[],
    error:''
  }

  onAnkenNameInputChange = (event) => {
    console.log(event)
    this.setState({ankenName:event.target.value})
  }

  onPostalCodeInputChange = (event) => {
    this.setState({postalCode:event.target.value})
  }

  onAddAnken = (event) => {
    axios.post('/anken/add', {
      ankenName:this.state.ankenName,
      postalCode:this.state.postalCode,
    })
    .then(this.getAnkens)
    .catch(this.getError)
  
  }

  ankenAdded = (response) => {
    let ankens = this.state.ankens;
    let newAnkens =  Array.from(ankens);
    newAnkens.push(response.data.newAnken)
    this.setState({
      ankens:newAnkens,
    },this.filterAnkens)
  }

  getError = (error) => {
    this.setState({error})
  }
  getAnkens = (response) => {
    this.setState({
      ankens:response.data.ankens,
    },this.filterAnkens)
  }

  componentDidMount(){
    axios.get('/anken/get')
    .then(this.getAnkens)
    .catch(this.getError)
    
  }
  deleteAnken = (ankenId) => {
    axios.post('/anken/delete', {
      ankenId
    })
    .then(()=>{this.onAnkenDeleted(ankenId)})
    .catch(this.getErrors)
  }

  onAnkenDeleted =  (ankenId) => {
    const newAnkens = this.state.ankens.filter(anken => anken.ankenId !== ankenId);
    this.setState({
      ankens:newAnkens,
    },this.filterAnkens)
  }

  filterAnkens = () => {
    const filterString = this.state.filterInput
    const filteredAnkens = this.state.ankens.filter(anken => (anken.ankenName.includes(filterString) ||anken.prefecture.includes(filterString) || anken.postalCode.includes(filterString)))
    this.setState({
      filteredAnkens:filteredAnkens
    })
  }

  onFilterInputChange = (event) => {
    this.setState({
      filterInput:event.target.value,
    },this.filterAnkens)
  }
  
  render() {
    const { ankenName, postalCode , ankens, filteredAnkens, filterInput } = this.state;
    const { onAnkenNameInputChange, onFilterInputChange, deleteAnken, onPostalCodeInputChange, onAddAnken } = this;
    return (
      <div className="App">
      <AddAnkenComponent onAddAnken={onAddAnken} ankenName={ankenName} postalCode={postalCode} onAnkenNameInputChange={onAnkenNameInputChange} onPostalCodeInputChange={onPostalCodeInputChange}/>
      <FilterComponent filterInput={filterInput} onFilterInputChange={onFilterInputChange}/>
      <AnkenListComponent deleteAnken={deleteAnken} ankens={filteredAnkens}/>
      </div>
    );
  }
}

export default App;
