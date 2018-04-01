import React from 'react'
import { connect } from 'kea'
import Dialog from 'material-ui/Dialog'
import Chip from 'material-ui/Chip'
import RaisedButton from 'material-ui/RaisedButton'
import {Card, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import LanguageIcon from 'material-ui/svg-icons/action/language'
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit'
import propertyLogic from './logic/property.logic'
import {toHTML} from '../utils'

const styles = {
  button: {
    margin: 10,
    float: 'right'
  },
  chip: {
    marginRight: 4
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    marginBottom: 20
  },
  dialogTitle: {
    backgroundColor: 'black',
    color: 'white'
  },
  image: {
    minHeight: 300
  }
}

@connect({
  props: [
    propertyLogic, [
      'isOpen',
      'selectedProperty'
    ]
  ],
  actions: [
    propertyLogic, [
      'setPropertyOnEdit',
      'toggleDialog'
    ]
  ]
})
export default class PropertyDetails extends React.Component {
  renderChip = (data) => {
    return (
      <Chip
        key={data}
        style={styles.chip}
      >
        {data}
      </Chip>
    )
  };

  renderMedia = (selectedProperty) => (
    <div>
      <RaisedButton
        label='Edit'
        labelPosition='before'
        primary
        icon={<ModeEdit />}
        onClick={() => this.actions.setPropertyOnEdit(selectedProperty)}
        style={styles.button}
      />
      <RaisedButton
        label='View Implementation'
        labelPosition='before'
        primary
        icon={<LanguageIcon />}
        href={selectedProperty['Url']}
        target='_blank'
        // onClick={() => window.open(selectedProperty['Url'], '_blank')}
        style={styles.button}
      />
    </div>
  )

  render () {
    const { isOpen, selectedProperty } = this.props
    const { toggleDialog } = this.actions

    const subtitle = `
      AM: ${selectedProperty['AM']} |
      IC: ${selectedProperty['IC']} |
      TC: ${selectedProperty['TC']} |
      Go Live: ${selectedProperty['GoLiveDate']} |
      Platform: ${selectedProperty['Platform']} |
      Country: ${selectedProperty['Country']} |
      Category: ${selectedProperty['Category']}
    `

    if (!isOpen) return null
    return (
      <div>
        <RaisedButton label='Dialog' onClick={toggleDialog} />
        <Dialog
          title='Implementation details'
          modal={false}
          autoScrollBodyContent
          titleStyle={styles.dialogTitle}
          open={isOpen}
          onRequestClose={toggleDialog}
        >
          <Card>
            <CardHeader
              title={selectedProperty['Implementation']}
              subtitle={selectedProperty['Customer']}
              avatar={selectedProperty['ImageUrl']}
            />
            <CardMedia
              overlay={this.renderMedia(selectedProperty)}
            >
              {selectedProperty['ImageUrl'] && <img src={selectedProperty['ImageUrl']} alt='' style={styles.image} />}
            </CardMedia>
            <CardTitle
              title={selectedProperty['Implementation']}
              subtitle={subtitle}
            />
            <CardText>
              <div style={styles.wrapper}>
                {selectedProperty['Keywords'].map(this.renderChip, this)}
              </div>
              <div dangerouslySetInnerHTML={{__html: toHTML(selectedProperty['Description'])}} />
            </CardText>
          </Card>

        </Dialog>
      </div>
    )
  }
}
