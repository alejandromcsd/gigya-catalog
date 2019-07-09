import React from 'react'
import { connect } from 'kea'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
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
      'isColumnKickOffDateVisible',
      'isCDCProductsVisible',
      'isOtherCXProductsVisible'
    ]
  ],
  actions: [
    reportLogic, [
      'toggleColumnAM',
      'toggleColumnIC',
      'toggleColumnTC',
      'toggleColumnTA',
      'toggleColumnKickOffDate',
      'toggleColumnCDCProducts',
      'toggleColumnOtherCXProducts'
    ]
  ]
})
export default class ReportColumns extends React.Component {
    renderCheckbox = (s, a) => <Checkbox checked={s} onCheck={a} />

    render () {
      const {
        reportDrawer,
        isColumnAMVisible,
        isColumnICVisible,
        isColumnTCVisible,
        isColumnTAVisible,
        isColumnKickOffDateVisible,
        isCDCProductsVisible,
        isOtherCXProductsVisible
      } = this.props
      const {
        toggleColumnAM,
        toggleColumnIC,
        toggleColumnTC,
        toggleColumnTA,
        toggleColumnKickOffDate,
        toggleColumnCDCProducts,
        toggleColumnOtherCXProducts
      } = this.actions

      return (
        <Menu desktop>
          <Subheader>{reportDrawer && 'Additional columns'}</Subheader>
          <MenuItem primaryText='AM' checked={isColumnAMVisible} onClick={toggleColumnAM} />
          <MenuItem primaryText='IC' checked={isColumnICVisible} onClick={toggleColumnIC} />
          <MenuItem primaryText='TC' checked={isColumnTCVisible} onClick={toggleColumnTC} />
          <MenuItem primaryText='TA' checked={isColumnTAVisible} onClick={toggleColumnTA} />
          <MenuItem primaryText='Kick-off date' checked={isColumnKickOffDateVisible} onClick={toggleColumnKickOffDate} />
          <MenuItem primaryText={constants.friendlyLabels.cdcProducts} checked={isCDCProductsVisible} onClick={toggleColumnCDCProducts} />
          <MenuItem primaryText='CX Solutions' checked={isOtherCXProductsVisible} onClick={toggleColumnOtherCXProducts} />
        </Menu>
      )
    }
}
