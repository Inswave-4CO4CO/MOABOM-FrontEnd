import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;

  background-color: #ffffff;
  border: 1px solid #dcdcdc;
  border-radius: 20px;
  padding: 60px 40px;
  width: 100%;
  max-height: 400px;
  min-width: 300px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  box-sizing: border-box;

  .name {
    font-size: 24px;
    font-weight: bold;
    margin-top: 15px;
    margin-bottom: 25px;
  }

  .buttonBox {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 25px;
    width: 100%;
  }

  .subButtonBox {
    display: flex;
    justify-content: center;
    gap: 70px;
    width: 100%;
  }
`;

export const Icon = styled.p`
  font-size: 20px;
  color: #555;
`;
