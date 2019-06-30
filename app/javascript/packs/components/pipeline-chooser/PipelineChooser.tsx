import {Collapse, Icon, Intent} from '@blueprintjs/core'
import * as React from 'react'
import {useState} from 'react'
import PipelineSelect from './PipelineSelect'

function PipelineChooser() {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <div id='pipeline-chooser' onClick={() => setOpen(!open)}>
        <h3>
          1. Choose New Pipelines to Monitor {' '}
          {
            open ?
              <Icon icon='chevron-down' iconSize={16} intent={Intent.NONE}/> :
              <Icon icon='chevron-right' iconSize={16} intent={Intent.NONE}/>
          }
        </h3>
      </div>
      <Collapse isOpen={open}>
        <PipelineSelect/>
      </Collapse>
    </div>
  )
}

export default PipelineChooser
