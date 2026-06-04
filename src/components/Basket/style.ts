import styled from "styled-components";

export const BasketWrapper = styled.div<{ isOpen: boolean }>`
  width:400px;
  flex-shrink: 0;
  border-left: 1px solid #ccc;
  overflow-y: auto;
  height: 100vh;
  background: #fff;

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    width: 100%;
    max-width: 320px;
    box-shadow: -2px 0 8px rgba(0, 0, 0, 0.15);
    transform: ${({ isOpen }) => (isOpen ? "translateX(0)" : "translateX(100%)")};
  }
`;

export const MobileOverlay = styled.div<{ isOpen: boolean }>`
  display: none;
  @media (max-width: 768px) {
    display: ${({ isOpen }) => (isOpen ? "block" : "none")};
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 10;
  }
`;

export const CloseButton = styled.button`
  display: none;
  @media (max-width: 768px) {
    display: block;
    margin-bottom: 8px;
  }
`;

export const FloatingButton = styled.button`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    bottom: 24px;
    right: 24px;
    z-index: 2;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    border: none;
    background: #1a1a2e;
    color: #fff;
    font-weight: bold;
    font-size: 14px;
    cursor: pointer;
  }
`;
