import React from 'react'
import { connect } from 'kea'
import { BarChart, Bar, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { schemeCategory10 } from 'd3-scale-chromatic'
import { scaleOrdinal } from 'd3-scale'
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
    fontWeight: 400
  },
  root: {
    height: 160
  }
}

const colors = scaleOrdinal(schemeCategory10).range()

@connect({
  props: [
    propertyLogic, [
      'searchResults'
    ]
  ]
})
export default class Graph extends React.Component {
  render () {
    const { searchResults } = this.props

    const data = searchResults.reduce((items, item) => {
      items.find(e => e.Country === item.Country && e.Count++) || items.push({ Country: item.Country, Count: 1 })
      return items
    }, [])

    return (
      <div style={styles.root}>
        <h3 style={styles.header}>Go-Lives per Country</h3>
        <ResponsiveContainer>
          <BarChart
            margin={{
              top: 16,
              right: 16,
              bottom: 0,
              left: 24
            }}
            data={data}
          >
            <XAxis tick={{fontSize: 11}} dataKey='Country' />
            <YAxis tick={{fontSize: 11}} yAxisId='a' />
            <Tooltip />
            <CartesianGrid vertical={false} />
            <Bar yAxisId='a' dataKey='Count'>
              {
                data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % 10]} />
                ))
              }
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    )
  }
}
