import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import 'typeface-roboto'
import './App.css'
import Header from './components/Header'
import PropertyTabs from './components/PropertyTabs'
import PropertyFilters from './components/PropertyFilters'
import PropertyDetails from './components/PropertyDetails'
import Login from './components/Login'
import PropertyEdit from './components/PropertyEdit'
import LoadMore from './components/LoadMore'

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#1F1F1F',
    primary3Color: '#FFB407',
    accent1Color: '#FFB407',
    accent3Color: '#FFB407'
  },
  chip: {
    backgroundColor: '#FFB407',
    deleteIconColor: '#1F1F1F',
    textColor: '#1F1F1F'
  }
})

class App extends Component {
  render () {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className='App'>
          {/* TODO: Implement Routing for Login and Edit Form */}
          <Header />
          <PropertyFilters />
          <PropertyTabs />
          <PropertyDetails />
          <Login />
          <PropertyEdit />
          <LoadMore />
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App
