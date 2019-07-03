import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'kea'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table'
import propertyLogic from '../logic/property.logic'
import reportLogic from '../logic/report.logic'
import constants from '../../constants'

const styles = {
  header: {
    color: '#35495F'
  }
}

@connect({
  props: [
    propertyLogic, [
      'searchResults'
    ],
    reportLogic, [
      'isColumnAMVisible',
      'isColumnICVisible',
      'isColumnTCVisible',
      'isColumnTAVisible',
      'isCDCProductsVisible'
    ]
  ]
})
export class ReportTable extends React.Component {
  showProperty = (tile) => {
    this.props.history.push(`/${tile['Id']}`)
  }

  render () {
    const { searchResults, isColumnAMVisible, isColumnICVisible, isColumnTCVisible, isColumnTAVisible, isCDCProductsVisible } = this.props
    return (
      <div>
        <h3 style={styles.header}>Go-Lives</h3>
        <Table
          selectable
          onRowSelection={selectedRow => selectedRow.length ? this.showProperty(searchResults[selectedRow[0]]) : null}
        >
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
          >
            <TableRow>
              <TableHeaderColumn>Go Live</TableHeaderColumn>
              <TableHeaderColumn>Customer</TableHeaderColumn>
              <TableHeaderColumn>Implementation</TableHeaderColumn>
              <TableHeaderColumn>Country</TableHeaderColumn>
              <TableHeaderColumn>Category</TableHeaderColumn>
              {isColumnAMVisible && <TableHeaderColumn>AM</TableHeaderColumn>}
              {isColumnICVisible && <TableHeaderColumn>IC</TableHeaderColumn>}
              {isColumnTCVisible && <TableHeaderColumn>TC</TableHeaderColumn>}
              {isColumnTAVisible && <TableHeaderColumn>TA</TableHeaderColumn>}
              {isCDCProductsVisible && <TableHeaderColumn>{constants.friendlyLabels.cdcProducts}</TableHeaderColumn>}
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {searchResults.map((tile) => (
              <TableRow
                selectable
                key={tile['Id']}
              >
                <TableRowColumn>{tile['GoLiveDate']}</TableRowColumn>
                <TableRowColumn>{tile['Customer']}</TableRowColumn>
                <TableRowColumn>{tile['Implementation']}</TableRowColumn>
                <TableRowColumn>{tile['Country']}</TableRowColumn>
                <TableRowColumn>{tile['Category']}</TableRowColumn>
                {isColumnAMVisible && <TableRowColumn>{tile['AM']}</TableRowColumn>}
                {isColumnICVisible && <TableRowColumn>{tile['IC']}</TableRowColumn>}
                {isColumnTCVisible && <TableRowColumn>{tile['TC']}</TableRowColumn>}
                {isColumnTAVisible && <TableRowColumn>{tile['TA']}</TableRowColumn>}
                {isCDCProductsVisible &&
                  <TableRowColumn>
                    {`${tile[constants.fields.useIdentity] ? 'Identity,' : ''} ${tile[constants.fields.useConsent] ? 'Consent,' : ''} Profile`}
                  </TableRowColumn>}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  }
}

export default withRouter(ReportTable)
