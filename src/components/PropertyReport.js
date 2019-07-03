import React from 'react'
import { connect } from 'kea'
import LinearProgress from 'material-ui/LinearProgress'
import Drawer from 'material-ui/Drawer'
import IconButton from 'material-ui/IconButton'
import Divider from 'material-ui/Divider'
import Paper from 'material-ui/Paper'
import propertyLogic from './logic/property.logic'
import reportLogic from './logic/report.logic'
import ReportTable from './reports/ReportTable'
import OffIcon from 'material-ui/svg-icons/file/cloud-off'
import MenuIcon from 'material-ui/svg-icons/navigation/menu'
import { MainListItems, SecondaryListItems } from './reports/MenuItems'
import ReportColumns from './reports/ReportColumns'
import Totals from './reports/Totals'
import Graph from './reports/Graph'

const styles = {
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px'
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto'
  },
  bodyContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: 40,
    marginLeft: 280
  },
  middleContainer: {
    marginLeft: 280,
    marginRight: 40
  },
  expandedContainer: {
    marginLeft: 100
  },
  leftContainer: {
    width: '75%'
  },
  rightContainer: {
    width: '25%'
  },
  fixedHeightCell: {
    height: 240,
    margin: 10,
    padding: 15
  },
  reportTable: {
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    margin: 10,
    padding: 15
  },
  drawerOpen: {
    width: 240,
    position: 'absolute',
    minHeight: 700
  },
  drawerClosed: {
    width: 60,
    position: 'absolute',
    minHeight: 700
  },
  progress: {
    margin: 'auto',
    width: '50%',
    textAlign: 'center',
    padding: 100
  }
}

@connect({
  props: [
    propertyLogic, [
      'properties',
      'isLoading',
      'searchResults',
      'error'
    ],
    reportLogic, [
      'reportDrawer'
    ]
  ],
  actions: [
    reportLogic, [
      'toggleReportDrawer'
    ]
  ]
})
export class PropertyReport extends React.Component {
  getCols (resultsCount) {
    // eslint-disable-next-line
    var w = jQuery(window).width()

    if (resultsCount > 3 && w >= 1200) return 4
    if (resultsCount > 2 && w >= 1024) return 3
    if (resultsCount > 1 && w >= 768) return 2
    return 1
  }

  render () {
    const { searchResults, isLoading, error, reportDrawer } = this.props
    const { toggleReportDrawer } = this.actions

    const bodyStyle = reportDrawer ? styles.bodyContainer : {...styles.bodyContainer, ...styles.expandedContainer}
    const middleStyle = reportDrawer ? styles.middleContainer : {...styles.middleContainer, ...styles.expandedContainer}

    return (
      <div style={styles.root}>
        {isLoading ? (
          <div style={styles.progress}>
            Loading...
            <LinearProgress mode='indeterminate' />
          </div>
        ) : (
          <div>
            <Drawer
              containerStyle={reportDrawer ? styles.drawerOpen : styles.drawerClosed}
              open
            >
              <div style={styles.toolbarIcon}>
                <IconButton onClick={toggleReportDrawer}>
                  <MenuIcon />
                </IconButton>
              </div>
              <Divider />
              <MainListItems />
              <Divider />
              <SecondaryListItems />
              <Divider />
              <ReportColumns />
            </Drawer>
            {searchResults.length > 0 ? (
              <main style={styles.content}>
                <div style={bodyStyle}>
                  <div style={styles.leftContainer}>
                    <Paper style={styles.fixedHeightCell}>
                      <Graph />
                    </Paper>
                  </div>
                  <div style={styles.rightContainer}>
                    <Paper style={styles.fixedHeightCell}>
                      <Totals />
                    </Paper>
                  </div>
                </div>
                <div style={middleStyle}>
                  <Paper style={styles.reportTable}>
                    <ReportTable />
                  </Paper>
                </div>
              </main>)
              : (
                <div style={styles.progress}>
                  <OffIcon />
                  <div>
                    {error ? `Error: ${error}` : 'No Go-Lives found'}
                  </div>
                </div>
              )}
          </div>
        )}
      </div>
    )
  }
}

export default PropertyReport
