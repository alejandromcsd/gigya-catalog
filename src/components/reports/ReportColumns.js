import React from 'react'
import { connect } from 'kea'
import {List, ListItem} from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import Checkbox from 'material-ui/Checkbox'
import reportLogic from '../logic/report.logic'
import constants from '../../constants'

@connect({
  props: [
    reportLogic, [
      'reportDrawer',
      'isColumnAMVisible',
      'isColumnICVisible',
      'isColumnTCVisible',
      'isColumnTAVisible',
      'isCDCProductsVisible'
    ]
  ],
  actions: [
    reportLogic, [
      'toggleColumnAM',
      'toggleColumnIC',
      'toggleColumnTC',
      'toggleColumnTA',
      'toggleColumnCDCProducts'
    ]
  ]
})
export default class ReportColumns extends React.Component {
    renderCheckbox = (s, a) => <Checkbox checked={s} onCheck={a} />

    render () {
      const { reportDrawer, isColumnAMVisible, isColumnICVisible, isColumnTCVisible, isColumnTAVisible, isCDCProductsVisible } = this.props
      const { toggleColumnAM, toggleColumnIC, toggleColumnTC, toggleColumnTA, toggleColumnCDCProducts } = this.actions

      return (
        <List>
          <Subheader>{reportDrawer && 'Additional columns'}</Subheader>
          <ListItem primaryText='AM' leftCheckbox={this.renderCheckbox(isColumnAMVisible, toggleColumnAM)} />
          <ListItem primaryText='IC' leftCheckbox={this.renderCheckbox(isColumnICVisible, toggleColumnIC)} />
          <ListItem primaryText='TC' leftCheckbox={this.renderCheckbox(isColumnTCVisible, toggleColumnTC)} />
          <ListItem primaryText='TA' leftCheckbox={this.renderCheckbox(isColumnTAVisible, toggleColumnTA)} />
          <ListItem primaryText={constants.friendlyLabels.cdcProducts} leftCheckbox={this.renderCheckbox(isCDCProductsVisible, toggleColumnCDCProducts)} />
        </List>
      )
    }
}
