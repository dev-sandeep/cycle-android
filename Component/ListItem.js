import * as React from 'react';
import { List } from 'react-native-paper';

class ListItem extends React.Component {
    render() {
        return (
            // key={this.props.key}
            <List.Item
                title={this.props.title}
                description={this.props.desc}
                left={props => <List.Icon icon={this.props.icon || 'folder'} />}
            />
        );
    }
}

export default ListItem;