import styled from 'styled-components'

export const MainDiv = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-between;
background-color: #f5f5f5;
padding-bottom: 30px;
height: 100%;
`;

export const MainBox = styled.div`
  background-color: white;
  padding-top: 30px;
  padding-left: 3%;
  padding-right: 3%;
  border-radius: 18px;
  padding-bottom: 30px;
  width: 80%;
  align-items: center;
`;

export const ContentTitle = styled.p`
    display: flex;
    flex-wrap: wrap;
    margin-left: 25px;
    font-weight: bold;
    font-size: 35px;
    color: #000000;
`;

export const ContentDescriptionCut = styled.span`
    color: #000000;
    margin-left: 25px;
    font-size: 25px;
    text-align: center;
`;