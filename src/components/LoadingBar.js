import React from 'react';
import styled, { keyframes } from 'styled-components';

const Loading = styled.div`
    background-color: lightgrey;
    height: 2px;
    margin: 1em auto;
    overflow: hidden;
    position: relative;
    width: 12em;
    align-self: center;
    justify-self: center;
`;

const Side2Side = keyframes`
    0%, 100% { 
        transform: translateX(-50%); 
    }
    50% { 
        transform: translateX(150%); 
    }
`;
const Bar = styled.div`
    animation: ${Side2Side} 2s infinite;
    background-color: dodgerblue;
    height: 100%;
    position: absolute;
    width: 50%;
`;

const LoadingBar = () => (
    <Loading>
        <Bar/>
    </Loading>
);

export default LoadingBar;