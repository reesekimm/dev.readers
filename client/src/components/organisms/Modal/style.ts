import styled, { css } from 'styled-components';

interface ModalStyleProps {
  modalSize: string;
}

export const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalStyle = css<ModalStyleProps>`
  background: #fff;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: ${({ theme }) => theme.shadows.xl};
  display: flex;
  flex-direction: column;
  overflow: auto;
`;

export const Content = styled.div`
  flex: 1;
`;

export const LargeModal = styled.div`
  ${ModalStyle}
  width: ${({ theme }) => theme.breakpoints.lg};
  height: 600px;
  margin: 0 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 100%;
    height: 100%;
    margin: 0;
    border-radius: 0;
  }
`;

export const MediumModal = styled.div`
  ${ModalStyle}
  width: 500px;
  height: 600px;
  margin: 0 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 100%;
    height: 100%;
    margin: 0;
    border-radius: 0;
  }
`;

export const SmallModal = styled.div`
  ${ModalStyle}
  width: 300px;
  height: 170px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.palette.gray2};
`;
