import React from 'react'
import styled from 'styled-components'

const StyledCenterDiv = styled.div`
    display: flex;
    align-content: center;
    align-items: center;
    height: 95vh;

    div {
        margin: auto auto;
    }
`

const CenterDiv = (props) => {
    return (
        <StyledCenterDiv>
            {props.children}
        </StyledCenterDiv>
    )
}

export default CenterDiv
