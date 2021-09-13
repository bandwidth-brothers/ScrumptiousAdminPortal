import React, { Component } from 'react';
import styled from 'styled-components'

import userProfile from '../../../assets/images/user-icon.png'

const StyledList = styled.li`



    img {
        height: 50px;
        width: 50px;
    }
    img:hover{
        cursor: pointer;
    }
    
`


class UserDropdown extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false
        }
    }

    showUserSettingsHandler = () => {
        this.setState({
            visible: true
        })
    }

    render() {
        return (
            <React.Fragment>
                <StyledList>
                    <img src={userProfile} alt="user-pic" onClick={this.showUserSettingsHandler}></img>
                </StyledList>
            </React.Fragment>
        );
    }
}

export default UserDropdown;