import * as React from 'react';
import { Appbar } from 'react-native-paper';

_goBack = () => console.log('Went back');

_onSearch = () => console.log('Searching');

_onMore = () => {console.log('Shown more');}

function Header() {
    return (
        <Appbar.Header>
            <Appbar.BackAction
                onPress={this._goBack}
            />
            <Appbar.Content
                title="Cycle"
                subtitle="Do More, Worry Less"
            />
            <Appbar.Action icon="search" onPress={this._onSearch} />
            {/* <Appbar.Action icon="more-vert" onPress={this._onMore} /> */}
        </Appbar.Header>
    )
}

export default Header;