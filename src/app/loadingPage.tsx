import React from 'react';
import styled from 'styled-components'

const MainLoadingDiv = styled.div`
display: flex;
align-items: center;
justify-content: center;
height: 100vh;
margin: 0;
background-color: #f8f8f8; /* Set your preferred background color */
`;

const LoadingTextDiv = styled.div`
color: orange;
  font-size: 90px;
`;

const LoadingPage = () => {


    return (
        <MainLoadingDiv>
            <LoadingTextDiv>Loading...</LoadingTextDiv>
        </MainLoadingDiv>
    );
};

export default LoadingPage;
