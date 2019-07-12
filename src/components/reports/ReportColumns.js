import React from 'react'
import { connect } from 'kea'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import {ListItem} from 'material-ui/List'
import Checkbox from 'material-ui/Checkbox'
import reportLogic from '../logic/report.logic'
import constants from '../../constants'

const styles = {
  item: {
    fontSize: 14
  }
}

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

      if (!reportDrawer) return null

      return (

        <Menu desktop>
          <ListItem
            primaryText='Additional Columns'
            primaryTogglesNestedList
            nestedItems={[
              <MenuItem primaryText='Account Manager'
                key={0} style={styles.item}
                checked={isColumnAMVisible}
                onClick={toggleColumnAM} />,
              <MenuItem primaryText='Implementation Consultant'
                key={1} style={styles.item}
                checked={isColumnICVisible}
                onClick={toggleColumnIC} />,
              <MenuItem primaryText='Technical Consultant'
                key={2} style={styles.item}
                checked={isColumnTCVisible}
                onClick={toggleColumnTC} />,
              <MenuItem primaryText='Technical Architect'
                key={3} style={styles.item}
                checked={isColumnTAVisible}
                onClick={toggleColumnTA} />,
              <MenuItem primaryText='Kick-off date'
                key={4} style={styles.item}
                checked={isColumnKickOffDateVisible}
                onClick={toggleColumnKickOffDate} />,
              <MenuItem primaryText={constants.friendlyLabels.cdcProducts}
                key={5} style={styles.item}
                checked={isCDCProductsVisible}
                onClick={toggleColumnCDCProducts} />,
              <MenuItem primaryText='Other CX Solutions'
                key={6} style={styles.item}
                checked={isOtherCXProductsVisible}
                onClick={toggleColumnOtherCXProducts} />
            ]}
          />
        </Menu>

      )
    }
}
