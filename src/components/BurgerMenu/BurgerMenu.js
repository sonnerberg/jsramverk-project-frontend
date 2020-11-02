import React from 'react'
import { withRouter } from 'react-router-dom'
import Navigation from '../Navigation'
import { StyledMenu } from './BurgerMenu.styled'

const BurgerMenu = ({ open, setOpen }) => {
  return (
    <StyledMenu open={open}>
      <Navigation setOpen={setOpen} />
    </StyledMenu>
  )
}
export default withRouter(BurgerMenu)
