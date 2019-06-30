import React from 'react'
import { connect } from 'kea'
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation'
import Paper from 'material-ui/Paper'
import ExpandMore from 'material-ui/svg-icons/navigation/expand-more'
import UnfoldMore from 'material-ui/svg-icons/navigation/arrow-drop-down'
import propertyLogic from './logic/property.logic'

const styles = {
  bottomNav: {
    backgroundColor: '#354A5F'
  },
  bottomNavItem: {
    color: 'white'
  },
  buttonButton: {
    fill: 'white'
  }
}

@connect({
  props: [
    propertyLogic, [
      'searchResults',
      'scrollCount'
    ]
  ],
  actions: [
    propertyLogic, [
      'showMoreItems',
      'showAll'
    ]
  ]
})
export default class LoadMore extends React.Component {
  render () {
    const { searchResults, scrollCount } = this.props

    if (scrollCount > searchResults.length) return null

    return (
      <Paper zDepth={1}>
        <BottomNavigation style={styles.bottomNav}>
          <BottomNavigationItem
            label={<label style={styles.bottomNavItem}>{`Show more (Displaying ${scrollCount})`}</label>}
            icon={<ExpandMore style={styles.buttonButton} />}
            style={styles.bottomNavItem}
            onClick={() => this.actions.showMoreItems()}
          />
          <BottomNavigationItem
            label={<label style={styles.bottomNavItem}>{`Show all (Total ${searchResults.length})`}</label>}
            icon={<UnfoldMore style={styles.buttonButton} />}
            onClick={() => this.actions.showAll(searchResults.length)}
          />
        </BottomNavigation>
      </Paper>
    )
  }
}
