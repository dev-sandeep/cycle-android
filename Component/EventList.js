import * as React from 'react';
import { List, Checkbox} from 'react-native-paper';

class MyComponent extends React.Component {
  state = {
    expanded: true
  }

  _handlePress = () =>
    this.setState({
      expanded: !this.state.expanded
    });

  render() {
    return (
      <List.Section title="Events">
        <List.Accordion
          title="Cycles"
          left={props => <List.Icon {...props} icon="folder" />}
        >
          <List.Item title="23 May 2019" />
          <List.Item title="18 June 2019" />
        </List.Accordion>
      </List.Section>
    );
  }
}

export default MyComponent;