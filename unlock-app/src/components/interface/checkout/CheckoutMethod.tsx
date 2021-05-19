import React from 'react'
import styled from 'styled-components'
import { ActionButton } from '../buttons/ActionButton'
import Svg from '../svg'

interface CheckoutMethodProps {
  onWalletSelected: () => void
  lock: any
  showLogin: () => void
  onNewAccountSelected: () => void
}

export const CheckoutMethod = ({
  lock,
  onWalletSelected,
  showLogin,
  onNewAccountSelected,
}: CheckoutMethodProps) => {
  const isCreditCardEnabled = lock.fiatPricing?.creditCardEnabled
  return (
    <Wrapper>
      {isCreditCardEnabled && (
        <>
          <MainChoice onClick={onNewAccountSelected}>
            <Icon>
              <Svg.Person />
            </Icon>
            Pay with Credit Card
          </MainChoice>
          <SecondChoice onClick={onWalletSelected}>
            <Icon>
              <Svg.Wallet />
            </Icon>
            Connect your crypto Wallet
          </SecondChoice>
          <SecondChoice onClick={showLogin}>
            <Icon>
              <Svg.Unlock />
            </Icon>
            Already have an Unlock account?
          </SecondChoice>
        </>
      )}
      {!isCreditCardEnabled && (
        <>
          <MainChoice default={!isCreditCardEnabled} onClick={onWalletSelected}>
            <Icon>
              <Svg.Wallet />
            </Icon>
            Connect your crypto Wallet
          </MainChoice>
          <SecondChoice disabled>
            <Icon>
              <Svg.CreditCard />
            </Icon>
            Credit card unavailable for this lock
          </SecondChoice>
          <SecondChoice onClick={showLogin}>
            <Icon>
              <Svg.Unlock />
            </Icon>
            Already have an Unlock account?
          </SecondChoice>
        </>
      )}
    </Wrapper>
  )
}

export default CheckoutMethod

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const MainChoice = styled(ActionButton).attrs({
  color: 'var(--white)',
  activeColor: 'var(--white)',
  fontColor: 'var(--blue)',
  fontActiveColor: 'var(--blue)',
  borderColor: 'transparent',
  activeBorderColor: 'var(--blue)',
})`
  border: 1px solid var(--white);
  & :hover {
    border: 1px solid var(--blue);
  }
  display: flex;
  margin: 10px 0px;
  color: var(--blue);
  align-items: center;
`

const Icon = styled.div`
  margin-right: 10px;
  border: 1px solid var(--blue);
  border-radius: 50%;
  width: 30px;
  height: 30px;

  svg {
    fill: var(--blue);
  }
`
const SecondChoice = styled.a`
  display: flex;
  color: ${(props) => (props.disabled ? 'var(--grey)' : 'var(--blue)')};
  align-items: center;
  font-size: 14px;
  margin: 5px 20px;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};

  ${Icon} {
    background-color: ${(props) =>
      props.disabled ? 'var(--grey)' : 'var(--blue)'};
    border: 1px solid var(--white);
    width: 20px;
    height: 20px;

    svg {
      fill: var(--white);
    }
  }
`
