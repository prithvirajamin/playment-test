import styled from 'styled-components';

export default styled.div`
  width: 100%;
  height: 20px;
  background-color: #00601d;
  border-radius: 10px;
  position: absolute;

  div {
    height: 20px;
    width: ${ props => props.width };
    background-color: #02d140;
    border-radius: 10px;
    

    &:hover {
      cursor: pointer;
    }
  }
  div p {
    padding:0px;
    margin:0 auto;
    font-size:10px;
    text-align:center;
  }
`;
