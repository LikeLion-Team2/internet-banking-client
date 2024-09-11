import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import TransferHistory from "../../components/transfer-history";
import * as S from "./styles/account-page.style";
import { IoArrowBackOutline } from "react-icons/io5";
import { IoIosSettings } from "react-icons/io";

// 계좌 페이지
export default function AccountPage() {
  const { accountId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [isOpen, setOpen] = useState(false);

  const accountData = location.state || {};

  // 이체하기 버튼 핸들러
  const handleTransferClick = (e) => {
    e.stopPropagation();
    navigate(`/transfer/${accountId}`);
  };

  // 뒤로 가기 버튼 핸들러
  const handleBackClick = () => {
    navigate('/home');
  };

  // //임시  데이터
  // const accountData = {
  //   account_name: "NH1934",
  //   account_balance: "4,661원",
  //   account_type: "normal",
  //   account_number: "3333-09-5576906",
  // };

  return (
    <S.Wrapper>
      {/* 상단부: 계좌 정보 */}
      <S.Header>
        <S.HeaderButton onClick={handleBackClick}>
          <IoArrowBackOutline />
        </S.HeaderButton>
        {/* 계좌명 */}
        <S.AccountName>{accountData.name}</S.AccountName>
        <S.HeaderButton>
          <IoIosSettings />
        </S.HeaderButton>
      </S.Header>
      <S.AccountInfo>
        {/* 계좌 번호 */}
        <S.AccountNumber>{accountData.accountNumber}</S.AccountNumber>
        {/* 계좌 잔액 */}
        <S.AccountBalance>{accountData.balance}</S.AccountBalance>
      </S.AccountInfo>
      <S.ButtonGroup>
        <S.ActionButton
          onClick={() =>
            navigate(`/transfer/${accountId}`, {
              state: { accountData, action: "send" },
            })
          }
        >
          이체하기
        </S.ActionButton>
        <S.ActionButton
          onClick={() =>
            navigate(`/transfer/${accountId}`, {
              state: { accountData, action: "receive" },
            })
          }
        >
          가져오기
        </S.ActionButton>
      </S.ButtonGroup>
      {/* 하단부: 입출금 내역 */}
      <TransferHistory />
    </S.Wrapper>
  );
}
