import * as React from 'react';
import { List } from 'react-native-paper';
import UseCycle from '../Context/UseCycle'

const ListItem = (props) => {
    const { deleteList } = UseCycle();
    function removeItem(){
        deleteList(props.date);
    }
    return (
        // key={this.props.key}
        <List.Item
            title={props.title}
            description={props.desc}
            onPress={removeItem}
            left={props => <List.Icon icon={props.icon || 'folder'} />}
        />
    );
}

export default ListItem;