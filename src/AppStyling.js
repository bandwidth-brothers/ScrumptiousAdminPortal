import styled from 'styled-components'

export const StyledFormBox = styled.div`
width: 550px;
border: 1px solid black;
text-align:center;
border-radius: 9px;
background-color: #212529;
box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

form {
    margin: 15px auto 15px auto;
    width: 90%;
}

.title {
    font-size: 1.75rem;
}

.formGroup {
    text-align: left;
}

label {
    color: white;
    padding: 5px 0px 0px 0px;
}

input[type=text],
input[type=password],
input[type=email]{
    
    box-sizing: border-box;
    padding: 12px 20px;
    margin: 10px auto;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
}

input[type=submit], button {
    display: inline-block;
    width: 25%;
    margin: 10px 50px 10px 10px;
    padding: 9px;
    border-radius: 5px;
    border: 1px solid #a8fcff;
}

.error-msg {
    width: 100%;
    margin-top: .25rem;
    font-size: .875em;
    color: #dc3545
}
`

