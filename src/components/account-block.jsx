import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const ClickableBlock = styled.div`
  width: 100%;
  height: fit-content;
  border: 2px solid var(--secondary-color);
  background: rgb(255, 252, 250);
  background: linear-gradient(
    180deg,
    rgba(255, 252, 250, 1) 0%,
    rgba(241, 191, 155, 1) 100%
  );
  border-radius: 2rem;
  padding: 1.5rem 1.3rem 1rem 1.5rem;
  margin-bottom: 0.9rem;
  box-shadow: 0 0.25rem 0.4rem rgba(0, 0, 0, 0.1);
  color: black;
`;

const AccountInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 1rem;
`;

const NameContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const AccountName = styled.div`
  font-size: 1rem;
  font-weight: bold;
`;

const AccountPhoto = styled.div`
  width: 3rem;
  height: 3rem;
`;
const AccountNumber = styled.div`
  letter-spacing: 0.1rem;
`;

const Balance = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
`;

const ButtonContainer = styled.div`
  margin-top: -2rem;
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  background-color: var(--secondary-color);
  width: 5rem;
  height: 2.6rem;
  color: white;
  margin-left: auto;
  border: none;
  border-radius: 2rem;
  font-size: 0.9rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  filter: brightness(95%);

  &:hover {
    filter: brightness(90%);
    box-shadow: 0px 0px 0px 1px rgb(0 0 0 / 0.06),
      0px 1px 1px -0.5px rgb(0 0 0 / 0.06), 0px 3px 3px -1.5px rgb(0 0 0 / 0.06),
      0px 6px 6px -3px rgb(0 0 0 / 0.06), 0px 12px 12px -6px rgb(0 0 0 / 0.06),
      0px 24px 24px -12px rgb(0 0 0 / 0.06);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(1px);
    box-shadow: 0px 0px 0px 1px rgb(0 0 0 / 0.06),
      0px 1px 1px -0.5px rgb(0 0 0 / 0.06), 0px 3px 3px -1.5px rgb(0 0 0 / 0.06),
      0px 6px 6px -3px rgb(0 0 0 / 0.06), 0px 12px 12px -6px rgb(0 0 0 / 0.06),
      0px 24px 24px -12px rgb(0 0 0 / 0.06);
  }
`;

export default function AccountBlock({
  accountId,
  accountNumber,
  name,
  balance,
}) {
  const navigate = useNavigate();

  const handleTransferClick = (e) => {
    e.stopPropagation();
    navigate(`/transfer/${accountId}`, {
      state: { accountData: { accountNumber }, action: "send" },
    });
  };

  return (
    <ClickableBlock
      onClick={() =>
        navigate(`/account/${accountId}`, { // /transactions
          state: { accountId, accountNumber, name, balance },
        })
      }
    >
      <AccountInfo>
        <AccountPhoto></AccountPhoto>
        <Balance>{balance}원</Balance>
      </AccountInfo>
      <NameContainer>
        <AccountName>{name}</AccountName>
        <AccountNumber>{accountNumber}</AccountNumber>
      </NameContainer>
      <ButtonContainer>
        <Button onClick={handleTransferClick}>
          이체
        </Button>
      </ButtonContainer>
    </ClickableBlock>
  );
}
