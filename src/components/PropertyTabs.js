import React from 'react'
import { connect } from 'kea'
import {Tabs, Tab} from 'material-ui/Tabs'
import DashboardIcon from 'material-ui/svg-icons/action/dashboard'
import TableIcon from 'material-ui/svg-icons/action/reorder'
import PropertyGrid from './PropertyGrid'
import PropertyTable from './PropertyTable'
import propertyLogic from './logic/property.logic'

const styles = {
  hiddenTab: {
    height: 0
  },
  hiddenBar: {
    height: 0
  }
}

@connect({
  props: [
    propertyLogic, [
      'fullScreen'
    ]
  ]
})
export class PropertyTabs extends React.Component {
  render () {
    const { fullScreen } = this.props
    return (
      <Tabs inkBarStyle={fullScreen ? styles.hiddenBar : null}>
        <Tab
          icon={<DashboardIcon />}
          label='Grid view'
          style={fullScreen ? styles.hiddenTab : null}
        >
          <PropertyGrid />
        </Tab>
        <Tab
          icon={<TableIcon />}
          label='Table view'
          style={fullScreen ? styles.hiddenTab : null}
        >
          <PropertyTable />
        </Tab>
      </Tabs>
    )
  }
}
export default PropertyTabs
