import React from 'react'
import { connect } from 'kea'
import LinearProgress from 'material-ui/LinearProgress'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table'
import propertyLogic from './logic/property.logic'

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  },
  gridList: {
    width: '100%',
    height: '100%'
  },
  progress: {
    marginTop: 50
  },
  tile: {
    cursor: 'pointer',
    margin: 10
  },
  media: {
    height: 160,
    maxHeight: 160,
    overflowY: 'hidden'
  }
}

@connect({
  props: [
    propertyLogic, [
      'properties',
      'isLoading',
      'searchResults',
      'error',
      'scrollCount'
    ]
  ],
  actions: [
    propertyLogic, [
      'selectProperty'
    ]
  ]
})
export class PropertyTable extends React.Component {
  getCols (resultsCount) {
    // eslint-disable-next-line
    var w = jQuery(window).width()

    if (resultsCount > 3 && w >= 1200) return 4
    if (resultsCount > 2 && w >= 1024) return 3
    if (resultsCount > 1 && w >= 768) return 2
    return 1
  }

  render () {
    const { searchResults, isLoading, error, scrollCount } = this.props
    const { selectProperty } = this.actions

    return (
      <div style={styles.root}>
        {isLoading ? (
          <div style={styles.progress}>
            Loading...
            <LinearProgress mode='indeterminate' />
          </div>
        ) : searchResults.length > 0 ? (
          <div>
            <Table
              selectable
              onRowSelection={selectedRow => selectedRow.length ? selectProperty(searchResults[selectedRow[0]]) : null}
            >
              <TableHeader
                displaySelectAll={false}
                adjustForCheckbox={false}
              >
                <TableRow>
                  <TableHeaderColumn>Id</TableHeaderColumn>
                  <TableHeaderColumn>Customer</TableHeaderColumn>
                  <TableHeaderColumn>Implementation</TableHeaderColumn>
                  <TableHeaderColumn>Go Live</TableHeaderColumn>
                  <TableHeaderColumn>Country</TableHeaderColumn>
                  <TableHeaderColumn>Category</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false}>
                {searchResults.slice(0, scrollCount).map((tile) => (
                  <TableRow
                    selectable
                    key={tile['Id']}
                  >
                    <TableRowColumn>{tile['Id']}</TableRowColumn>
                    <TableRowColumn>{tile['Customer']}</TableRowColumn>
                    <TableRowColumn>{tile['Implementation']}</TableRowColumn>
                    <TableRowColumn>{tile['GoLiveDate']}</TableRowColumn>
                    <TableRowColumn>{tile['Country']}</TableRowColumn>
                    <TableRowColumn>{tile['Category']}</TableRowColumn>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div style={styles.progress}>
            {error ? `Error: ${error}` : 'No properties found'}
          </div>
        )
        }
      </div>
    )
  }
}
export default PropertyTable
