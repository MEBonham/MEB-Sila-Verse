import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { MenuProvider } from 'react-contexify';
import ContextMenu from './ContextMenu';

class HeroListing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            triggerId: `heroListing-${props.id}`,
            // menuId: `heroListingMenu-${props.id}`,
            url: `/viewhero/${props.urlid}`,
            name: props.name,
            tag: props.urlid
        };
    }
    render() {

        return (
            <div>
                <MenuProvider id={this.state.triggerId}><Link to={this.state.url}>{this.state.name}</Link></MenuProvider>
                <ContextMenu menuId={this.state.triggerId} url={this.state.tag} history={this.props.history} />
            </div>
        );
    }
}

export default withRouter(HeroListing);