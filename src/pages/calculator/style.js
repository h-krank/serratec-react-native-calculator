import styled from 'styled-components/native'

export const Container = styled.View`
    display: flex;
    flex: 1;
    background-color: #111111;
    flex-direction: column;
    
    align-items: flex-end;
`

export const DisplayArea = styled.View`
    width: 100%;
    background-color: #111;
    align-items: flex-end;
`

export const ButtonArea = styled.View`
    flex: 1;
    background-color: #222222;
    flex-direction: row;
    flex-wrap: wrap;
    position: absolute;
    bottom: 0;  

`

export const CalcButton = styled.TouchableOpacity`
    text-align: center;
    padding: 10px;
    width: 25%;
    height: 85px;
    align-items: center;
    justify-content: center;

`