import React, { Component } from 'react';
import './App.css';
import Search from '../search/Search'
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
    }
  }

  componentDidMount() {
    const products = data.products

    const ts = new Trie(['name'],  {indexField: 'name'});
    ts.addAll(products);

    this.setState({data: data.products, ts})
    const types = this.getAvailableTypes(products)
    const typesObj = this.makeTypesObject(types)

    this.setState({types, typesObj})
  }

  handleInputChange = (e) => {
    this.setState({searchVal: e.target.value})
    this.search(e.target.value, this.state.typesObj)
  }

  search = (val, typesObj) => {
    if ( !val ) {
      this.setState({types: [], results: []})
      return 
    }
    var results = this.state.ts.get([val])

    results = results.filter((el) => {
      return typesObj[el.type] === true
    })
    this.setState({results})
  }

  getAvailableTypes = (results) => {
    let uniqueTypes = new Set()
    results.forEach((el) => {
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

  handleCheckboxChange = (indx) => {
    let types = this.state.types
    let type = types[indx]
    type.checked = !type.checked
    this.setState(types)
    const typesObj = this.makeTypesObject(types)
    this.search(this.state.searchVal, typesObj)
  } 

  makeTypesObject = (types) => {
    var typesObj = types.reduce((acc, el) => {
      acc[el.name] = el.checked
      return acc
    }, {})
    return typesObj
  }

  handleClick = (val) => {
    this.setState({searchVal: val, types: [], results: []})
  }

  render() {
    return (
      <div className="App">
        <div className="header">Search</div>
        <div className="app-container">
          <Search handleClick={this.handleClick} value={this.state.searchVal} handleChange={this.handleInputChange} results={this.state.results} />
          <ChooseType types={this.state.types} handleChange={this.handleCheckboxChange} />
        </div>
      </div>
    );
  }
}

export default App
