import React from 'react';
import { LoadingTextDiv, MainLoadingDiv } from '../styles/loadingPageStyles'

const LoadingPage = () => {
    return (
        <MainLoadingDiv>
            <LoadingTextDiv>Loading...</LoadingTextDiv>
        </MainLoadingDiv>
    );
};

export default LoadingPage;
