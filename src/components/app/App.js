import React, { Component } from 'react';
import './App.css';
import Search from '../search/Search'
import Error from '../error/Error'
import ChooseType from '../type/ChooseType'
import data from '../../data/products.json'
import Trie from 'trie-search'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchVal: '',
      results: [],
      types: [],
      typesState: {},
      clicked: false,
    }
  }

  componentDidMount() {
    const products = data.products

    const ts = new Trie(['name'],  {indexField: 'name'})
    ts.addAll(products)

    this.setState({data: data.products, ts})
    const types = this.getAvailableTypes(products)
    const typesObj = this.makeTypesObject(types)
    this.setState({types, typesObj})
  }

  handleInputChange = (e) => {
    this.setState({searchVal: e.target.value})

    // we could debounce this function
    this.search(e.target.value, this.state.typesObj)
  }

  handleCheckboxChange = (indx) => {
    let types = this.state.types
    let type = types[indx]
    type.checked = !type.checked
    const typesObj = this.makeTypesObject(types)
    this.setState({types, typesObj})
    this.search(this.state.searchVal, typesObj)
  } 

  // get values from trie and filters them based on types selected
  search = (val, typesObj) => {
    this.setState({clicked: false})
    var results = this.state.ts.get([val])
    results = results.filter((el) => {
      return typesObj[el.type] === true
    })
    this.setState({results})
  }

  // returns unique types from json file
  getAvailableTypes = (products) => {
    let uniqueTypes = new Set()
    products.forEach((el) => {
      uniqueTypes.add(el.type)
    })
    let typesArray = Array.from(uniqueTypes)
    var types = typesArray.reduce((acc, el) => {
      let newType = {
        name: el,
        checked: true,
      }
      acc.push(newType)
      return acc
    }, [])
    return types
  }

  //makes map of available types and their current values to be able to filter results
  makeTypesObject = (types) => {
    var typesObj = types.reduce((acc, el) => {
      acc[el.name] = el.checked
      return acc
    }, {})
    return typesObj
  }

  handleClick = (val) => {
    this.setState({searchVal: val, results: [], clicked: true})
  }

  checkForError = () => {
    return this.state.searchVal !== '' && this.state.results.length === 0 && !this.state.clicked
  }

  render() {
    return (
      <div className="App">
        <div className="header">Search</div>
        <div className="app-container">
          <Search handleClick={this.handleClick} value={this.state.searchVal} handleChange={this.handleInputChange} results={this.state.results} />
          <ChooseType types={this.state.types} handleChange={this.handleCheckboxChange} />
        </div>
        <Error error={this.checkForError()}/>
      </div>
    )
  }
}

export default App
