import styled from 'styled-components'

export const StyledMenu = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: ${({ theme }) => theme.primaryLight};
  height: 100vh;
  text-align: left;
  position: absolute;
  top: 0;
  right: 0;
  transition: transform 0.3s ease-in-out;
  transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(100%)')};
  display: ${({ open }) => (open ? '' : 'none')};

  @media (max-width: ${({ theme }) => theme.mobile}) {
    width: 100%;
    text-align: center;
  }

  @media (min-width: ${({ theme }) => theme.mobile}) {
    padding: 2rem;
  }

  @media (min-width: ${({ theme }) => theme.tablet}) {
    display: none;
  }

  li,
  li > a {
    padding: 2rem 0;
  }

  a {
    font-size: 2rem;
    text-transform: uppercase;
    font-weight: bold;
    letter-spacing: 0.5rem;
    color: ${({ theme }) => theme.primaryDark};
    text-decoration: none;
    transition: color 0.3s linear;

    @media (max-width: ${({ theme }) => theme.mobile}) {
      font-size: 1.5rem;
      text-align: center;
    }

    &:hover {
      color: ${({ theme }) => theme.primaryHover};
    }
  }
`
