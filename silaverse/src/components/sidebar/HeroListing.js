import React, { Component } from 'react';
import { MenuProvider } from 'react-contextify';
import ContextMenu from './ContextMenu';

class HeroListing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            triggerId: `heroListing-${props.id}`,
            menuId: `heroListingMenu-${props.id}`,
            url: `/viewhero/${props.urlid}`,
            name: props.name
        };
    }
    render() {

        return (
            <div>
                <p id={this.state.triggerId}>{this.state.name}</p>

                <ContextMenu menuId={this.state.menuId} />
            </div>
        );
    }
}

export default HeroListing;