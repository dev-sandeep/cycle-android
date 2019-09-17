import * as React from 'react';
import { View, TextInput, Text } from 'react-native';
import { Button, Dialog, Portal } from 'react-native-paper';
import UseCycle from '../../Context/UseCycle'

function MyComponent() {
    const { dayModalVisibilityStatus, changeSelectDateVisibility } = UseCycle();
    let visibility = dayModalVisibilityStatus;

    _showDialog = () => this.setState({ visible: true });

    _hideDialog = () => changeSelectDateVisibility();

    return (
        <View>
            <Portal>
                <Dialog
                    style={{ position: 'relative', overflow: 'scroll' }}
                    visible={visibility}
                    onDismiss={this._hideDialog}>
                    <Dialog.Title>Fill in few details</Dialog.Title>
                    <Dialog.Content>
                        <View style={{ margin: 3 }}>
                            <View style={{ width: '100%' }} >
                                <Text>Input one</Text>
                            </View>
                            <View style={{ width: '100%' }} >
                                <TextInput
                                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                                />
                            </View>
                        </View>
                        <View style={{ margin: 3 }}>
                            <View style={{ width: '100%' }} >
                                <Text>Input two</Text>
                            </View>
                            <View style={{ width: '100%' }} >
                                <TextInput
                                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                                />
                            </View>
                        </View>
                        <View style={{ margin: 3 }}>
                            <View style={{ width: '100%' }} >
                                <Text>Input three</Text>
                            </View>
                            <View style={{ width: '100%' }} >
                                <TextInput
                                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                                />
                            </View>
                        </View>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={this._hideDialog}>SAVE</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    );
}

export default MyComponent;
