import styled from "styled-components";

export const Layout = styled.div`
  display: flex;
  height: 100vh;
`;

export const ListArea = styled.div`
  flex: 1;
  overflow-x: auto;
`;

export const HeaderRow = styled.div`
  display: grid;
  grid-template-columns: 300px 70px 40px 40px 40px 40px 40px 40px 40px 40px 40px 40px 40px 40px 40px 40px 40px 40px 40px;
  font-size: 12px;
  font-weight: bold;
  background: #c8c8c8;
  border-bottom: 1px solid #ccc;
  box-sizing: border-box;
`;

export const BetRow = styled.div<{ $even: boolean }>`
  display: grid;
  grid-template-columns: 300px 70px 40px 40px 40px 40px 40px 40px 40px 40px 40px 40px 40px 40px 40px 40px 40px 40px 40px;
  font-size: 12px;
  border-bottom: 1px solid #ccc;
  box-sizing: border-box;
`;

export const Cell = styled.div`
  padding: 0 4px;
  white-space: nowrap;
  border-right: 1px solid #ccc;
  display: flex;
  align-items: center;
  cursor: pointer;
    &:hover {
      background: #e8f0fe;
      color: #f37f00;
      font-weight: bold;
    }
`;
