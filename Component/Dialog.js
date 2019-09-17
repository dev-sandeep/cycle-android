import * as React from 'react';
import { Button, Dialog, Portal, Paragraph } from 'react-native-paper';
import UseCycle from '../Context/UseCycle'

function DialogBox() {
    const { hideDialog, dialogMessage, dialogVisibility } = UseCycle();

    return (
        <Portal>
            <Dialog
                visible={dialogVisibility}
                onDismiss={this._hideDialog}>

                <Dialog.Content>
                    <Paragraph>{dialogMessage}</Paragraph>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={() => hideDialog()}>Ok</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
}

export default DialogBox;

