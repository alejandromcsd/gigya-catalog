import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import 'typeface-roboto'
import './App.css'
import PropertyContainer from './components/PropertyContainer'

// JIM

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#354A5F',
    primary3Color: '#0070b1',
    accent1Color: '#0070b1',
    accent3Color: '#0070b1'
  },
  chip: {
    backgroundColor: '#0070b1',
    deleteIconColor: '#354A5F',
    textColor: '#333'
  }
})

class App extends Component {
  render () {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <Router>
          <div className='App'>
            <Route path='/:id?' component={PropertyContainer} />
          </div>
        </Router>
      </MuiThemeProvider>
    )
  }
}

export default App
