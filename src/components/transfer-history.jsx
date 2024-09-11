import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import DetailModal from "./transfer-detail-modal";
import { formatDateShort } from "../utils/dateFormat"; // 날짜 포맷 함수 import
import { IoSearchCircleOutline } from "react-icons/io5";

const Container = styled.div`
  width: 100%;
  padding: 1rem;
  background-color: white;
  padding-bottom: 100%;
`;

const SearchHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const SearchButton = styled.button`
  padding: initial;
  font-size: 2rem;
  cursor: pointer;
`;

const FilterButton = styled.button`
  background: none;
  border: none;
  font-size: 1rem;
  cursor: pointer;
`;

const FilterMenu = styled.div`
  position: absolute;
  background: #fff;
  border: 1px solid #ddd;
  padding: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const MenuItem = styled.div`
  padding: 0.5rem 0;
`;

const TransactionList = styled.div`
  display: flex;
  flex-direction: column;
`;

const Transaction = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid #ddd;
`;

const TransactionDate = styled.div`
  width: 10%;
  font-size: 1rem;
  margin-right: 2rem;
`;

const TransactionDetails = styled.div`
  width: 60%;
`;

const TransactionName = styled.div`
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const TransactionMemo = styled.div`
  font-size: 0.875rem;
  color: #888;
`;

// transaction  type 확인하여 수정 필요
const TransactionAmount = styled.div`
  text-align: right;
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: ${(props) => (props.type === "출금" ? "#00A5FF" : "initial")};
`;

const TransactionBalance = styled.div`
  text-align: right;
  font-size: 0.875rem;
  color: #888;
`;

// 입출금 내역 목록
export default function TransferHistory() {
  const { accountId } = useParams();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // DB에서 거래내역 가져옴
  const [transactions, setTransactions] = useState([]);
  // 모달
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const openModal = (transaction) => {
    setSelectedTransaction(transaction);
  };

  const closeModal = () => {
    setSelectedTransaction(null);
  };

  // 계좌 정보 받아오기
  // GET: 사용자 입출금 내역 확인
  const readMyTx = async () => {
    const myTxListURL = `/api/transaction/${accountId}`;
    try {
      console.log("Fetching transactions from:", myTxListURL);
      const res = await axios.get(myTxListURL);

      if (res.status === 200) {
        if (res.data && res.data) {
          setTransactions(res.data);
        } else {
          console.error("Invalid API response format:", res.data);
          alert("계좌 내역을 불러오는데 실패했습니다. API 응답 형식이 잘못되었습니다.");
        }
      } else {
        console.error("Unexpected HTTP status code:", res.status);
        alert("계좌 내역을 불러오는데 실패했습니다. 서버에서 오류가 발생했습니다.");
      }
    } catch (error) {
      console.error("API request failed:", error);
      alert(
        "계좌 내역을 불러오는데 실패했습니다. 네트워크 오류가 발생했습니다."
      );
      navigate("/login");
    }
  };

  useEffect(() => {
    readMyTx();
  }, [accountId]);

  // 특정 거래 내역 다시 조회
  const fetchTransaction = async (transactionId) => {
    const transactionURL = `/api/transaction/${accountId}/${transactionId}`;
    try {
      const res = await axios.get(transactionURL);
      if (res.status === 200) {
        const updatedTransaction = res.data;
        setTransactions((prevTransactions) =>
          prevTransactions.map((transaction) =>
            transaction.transaction_pk === updatedTransaction.transaction_pk
              ? updatedTransaction
              : transaction
          )
        );
      }
    } catch (error) {
      console.error("Failed to fetch updated transaction:", error);
    }
  };

  return (
    <Container>
      <SearchHeader>
        <SearchButton>
          <IoSearchCircleOutline />
        </SearchButton>
        <FilterButton onClick={toggleMenu}>기간 ▼</FilterButton>
        {isMenuOpen && (
          <FilterMenu>
            <MenuItem>조회 기간</MenuItem>
            <MenuItem>유형 선택</MenuItem>
          </FilterMenu>
        )}
      </SearchHeader>

      <TransactionList>
        {transactions.map((transaction) => (
          <Transaction
            key={transaction.transaction_pk}
            onClick={() => openModal(transaction)}
          >
            <TransactionDate>
              {formatDateShort(transaction.transaction_date)}
            </TransactionDate>
            <TransactionDetails>
              <TransactionName>{transaction.transaction_name}</TransactionName>
              <TransactionMemo>{transaction.transaction_memo}</TransactionMemo>
            </TransactionDetails>
            <TransactionDetails>
              <TransactionAmount type={transaction.transaction_type}>
                {transaction.transaction_amount}원
              </TransactionAmount>
              <TransactionBalance>
                {transaction.transaction_balance}원
              </TransactionBalance>
            </TransactionDetails>
          </Transaction>
        ))}
      </TransactionList>

      {selectedTransaction && (
        <DetailModal
          isOpen={!!selectedTransaction}
          onRequestClose={closeModal}
          transaction={selectedTransaction} // 선택된 transaction
          onMemoUpdate={fetchTransaction} // 메모 업데이트 후 호출할 함수 전달
        />
      )}
    </Container>
  );
}
