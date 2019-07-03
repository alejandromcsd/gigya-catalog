import React from 'react'
import { connect } from 'kea'
import { withRouter } from 'react-router-dom'
import {GridList} from 'material-ui/GridList'
import FlatButton from 'material-ui/FlatButton'
import {Card, CardActions, CardHeader, CardMedia} from 'material-ui/Card'
import OffIcon from 'material-ui/svg-icons/file/cloud-off'
import LinearProgress from 'material-ui/LinearProgress'
import propertyLogic from './logic/property.logic'

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    backgroundColor: '#edeff0',
    minHeight: 500,
    paddingBottom: 40,
    paddingTop: 30
  },
  gridList: {
    width: '100%',
    height: '100%'
  },
  progress: {
    marginTop: 50,
    textAlign: 'center'
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
export class PropertyGrid extends React.Component {
  getCols (resultsCount) {
    // eslint-disable-next-line
    var w = jQuery(window).width()

    if (resultsCount > 3 && w >= 1200) return 4
    if (resultsCount > 2 && w >= 1024) return 3
    if (resultsCount > 1 && w >= 768) return 2
    return 1
  }

  showProperty = (tile) => {
    this.props.history.push(`/${tile['Id']}`)
  }

  render () {
    const { searchResults, isLoading, error, scrollCount } = this.props

    return (
      <div style={styles.root}>
        {isLoading ? (
          <div style={styles.progress}>
            Loading...
            <LinearProgress mode='indeterminate' />
          </div>
        ) : searchResults.length > 0 ? (
          <div>
            <GridList
              cellHeight={300}
              style={styles.gridList}
              cols={this.getCols(searchResults.length)}
            >
              {searchResults.slice(0, scrollCount).map((tile) => (
                <Card
                  key={tile['Id']}
                  style={styles.tile}
                  onClick={() => this.showProperty(tile)}
                >
                  <CardHeader
                    title={tile['Customer']}
                    subtitle={tile['Implementation']}
                    avatar={tile['ImageUrl']}
                  />
                  <CardMedia style={styles.media}>
                    <img src={tile['ImageUrl']} alt={tile['Implementation']} />
                  </CardMedia>
                  <CardActions>
                    <FlatButton primary label='View' onClick={() => this.showProperty(tile)} />
                  </CardActions>
                </Card>
              ))}
            </GridList>
          </div>
        ) : (
          <div style={styles.progress}>
            <OffIcon />
            <div>
              {error ? `Error: ${error}` : 'No Go-Lives found'}
            </div>
          </div>
        )
        }
      </div>
    )
  }
}
export default withRouter(PropertyGrid)
