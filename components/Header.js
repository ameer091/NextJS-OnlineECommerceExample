import Link from "next/link";
import styled from "styled-components";
import Center from "@/components/Center"
import {useContext} from "react";
import {CartContext} from "@/components/CartContext";
import BarsIcon from "@/components/icons/Bars"
import {useState} from "react"


//Dont forget that you are using backticks for this
//DO NOT FORGET SEMI-COLONS
const StyledHeader = styled.header`
 background-color: #222;

`;
//Because NavLink is a component and not an HTML tag I'm styling it here for now with styled-components, don't forget back ticks
const Logo = styled(Link)`
 color: #fff;
 text-decoration: none;
 position: relative;
 z-index: 3;
`;

const Wrapper = styled.div`
display: flex;
justify-content: space-between;
padding: 20px 0;
`;

const StyledNav = styled.nav`
${props => props.$mobileNavActive ? `
display: block;
` : `
display: none;
`}

 gap: 15px;
 position: fixed;
 top: 0;
 botton: 0;
 left: 0;
 right: 0;
 padding: 70px 20px 20px;
 background-color: #222;
 @media screen and (min-width: 768px) {
  display: flex;
  position: static;
  padding: 0;
 }
`;

const NavLinks = styled(Link)`
display: block;
color:#aaa;
text-decoration:none;
padding: 10px 0;
@media screen and (min-width: 768px) {
  padding: 0;
 }
`;

const NavButton = styled.button`
background-color: transparent;
width: 30px;
height: 30px;
border: 0;
color: white;
cursor: pointer;
position: relative;
z-index: 3;
@media screen and (min-width: 768px) {
  display: none;

}
`

export default function Header() {
  const {cartProducts} = useContext(CartContext);
  const [mobileNavActive, setMobileNavActive] = useState(false)
  return (
    <StyledHeader>
      <Center>
        <Wrapper>
      <Logo href={'/'}>Online Store</Logo>
      <StyledNav $mobileNavActive={mobileNavActive}>
        <NavLinks href={'/'}>Home</NavLinks>
        <NavLinks href= {'/products'}>All Products</NavLinks>
        <NavLinks href= {'/categories'}>Categories</NavLinks>
        <NavLinks href= {'/account'}>Account</NavLinks>
        <NavLinks href= {'/cart'}>Cart ({cartProducts.length})</NavLinks>

      </StyledNav>
      <NavButton onClick={() => setMobileNavActive(prev => !prev)}>
      <BarsIcon />
      </NavButton>
      </Wrapper>
      </Center>

    </StyledHeader>
  )
}