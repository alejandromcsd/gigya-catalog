import React from 'react'
import { connect } from 'kea'
import propertyLogic from '../logic/property.logic'

const styles = {
  header: {
    color: '#35495F'
  },
  amount: {
    fontWeight: 300,
    fontSize: 70,
    lineHeight: '10px'
  },
  subtitle: {
    color: '#757575',
    fontWeight: 400,
    fontSize: 15
  }
}

@connect({
  props: [
    propertyLogic, [
      'searchResults',
      'filters'
    ]
  ]
})
export default class Totals extends React.Component {
  render () {
    const { searchResults, filters } = this.props
    return (
      <div>
        <h3 style={styles.header}>Go-Lives: Total</h3>
        <h1 style={styles.amount}>
          {searchResults.length}
        </h1>
        <h4 style={styles.subtitle}>
        with {filters.join(' and ')}
        </h4>
      </div>
    )
  }
}
