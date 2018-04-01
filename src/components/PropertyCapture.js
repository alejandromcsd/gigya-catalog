import React from 'react'
import DropZoneModal from './DropZone'
import RaisedButton from 'material-ui/RaisedButton'

const styles = {
  addFileBtn: {
    'marginTop': '15px'
  }
}

export default class PropertyCapture extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      openUploadModal: false,
      files: []
    }
  }

  closeDialog = () => {
    this.setState({openUploadModal: false})
  }

  saveFiles = (files) => {
    // Saving files to state for further use and closing Modal.
    this.setState({files: files, openUploadModal: false})
    this.props.setImage(files && files.length ? files[0] : null)
  }

  handleOpenUpload = () => {
    this.setState({
      openUploadModal: true
    })
  }

  deleteFile = (fileName) => {
    this.props.deleteFile(fileName)
  }

  render () {
    // If we already saved files they will be shown again in modal preview.
    let files = this.state.files

    return (
      <div>
        <RaisedButton
          style={styles.addFileBtn}
          label={this.props.uploadLabel}
          onClick={this.handleOpenUpload}
        />
        <DropZoneModal
          open={this.state.openUploadModal}
          saveFiles={this.saveFiles}
          deleteFile={this.deleteFile}
          acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
          files={files}
          showPreviews
          maxSize={5000000}
          filesLimit={1}
          closeDialog={this.closeDialog}
        />
      </div>
    )
  }
}
