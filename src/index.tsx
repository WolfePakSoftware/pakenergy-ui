import React, { useCallback, useState } from 'react';
import ReactDOM from 'react-dom';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/datetime/lib/css/blueprint-datetime.css';
import { VDraggableModal } from './components';
import { AnchorButton, Button, Navbar } from '@blueprintjs/core';
import { VDraggableModalProvider } from './components/Dialog/VDraggableModal';
import { GridExample } from './table';

const TestComponent = () => {
  const [visible, setVisible] = useState(false);
  const [width, setWidth] = useState('300px');
  const onOk = useCallback(() => setVisible(true), []);
  const onCancel = useCallback(() => setVisible(false), []);
  const getEndButtons = () => {
    return (
      <>
        <AnchorButton
          minimal
          icon={'tick'}
          text={'save2'}
          onClick={onOk}
          intent={'success'}
        />
        <AnchorButton
          minimal
          icon={'tick'}
          text={'save2'}
          onClick={onOk}
          intent={'success'}
        />
        <AnchorButton
          minimal
          icon={'disable'}
          text={'Cancel'}
          onClick={onCancel}
          intent={'danger'}
        />
      </>
    );
  };
  return (
    <>
      <Navbar />
      <Button onClick={onOk}>Open</Button>

      <VDraggableModalProvider>
        <VDraggableModal
          buttonsEndComponent={getEndButtons()}
          width={width}
          isOpen={visible}
          onSave={onOk}
          onCancel={onCancel}
          hideEndContainer
        >
          <Button onClick={() => setWidth('600px')}>Change</Button>
          <GridExample />
        </VDraggableModal>
      </VDraggableModalProvider>
    </>
  );
};

ReactDOM.render(<TestComponent />, document.getElementById('root'));
