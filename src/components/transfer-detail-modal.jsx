// 모달: 입출금 내역 상세
import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import styled from "styled-components";
import { formatDateLong } from "../utils/dateFormat"; // 날짜 포맷 함수 import
import { IoCheckmarkSharp, IoPencilSharp } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";

const ModalContent = styled.div`
  padding: 20px;
  font-family: "Arial, sans-serif";
`;

const Header = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 10px;
`;

const SubHeader = styled.div`
  font-size: 0.9rem;
  color: #888;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const MemoInput = styled.input`
  font-size: 0.875rem;
  color: #888;
  flex: 1;
  margin-right: 10px;
`;

const ActionButtonsContainer = styled.div`
  display: flex;
`;

const DetailItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const DetailLabel = styled.div`
  font-size: 1rem;
  color: #555;
`;

const DetailValue = styled.div`
  font-size: 1rem;
  font-weight: bold;
`;

const ConfirmButton = styled.button`
  background-color: var(--primary-color);
  color: #000;
  font-size: 1rem;
  font-weight: bold;
  padding: 10px;
  border: none;
  cursor: pointer;
  width: 100%;
  text-align: center;
  margin-top: 20px;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #007bff;
  font-size: 1rem;
  margin-left: 10px;
`;

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    maxWidth: "400px",
    padding: "0",
  },
};

export default function TransferDetailModal({
  isOpen,
  onRequestClose,
  transaction,
  onMemoUpdate,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [memo, setMemo] = useState(transaction.transaction_memo || "");

  const handleEditClick = async () => {
    if (isEditing) {
      try {
        const response = await axios.post(
          `/api/transaction/${transaction.transaction_pk}/memo/update`,
          {
            transaction_memo: memo,
          }
        );

        if (response.status === 200) {
          //console.log("Memo updated successfully");
          // 업데이트된 거래 내역을 가져와서 부모 컴포넌트에 알림
          // memo가 수정된 특정 transaction만 다시 조회
          onMemoUpdate(transaction.transaction_pk);
        }
      } catch (error) {
        console.error("There was an error updating the memo!", error);
      }
    }
    setIsEditing(!isEditing);
  };

  const handleDeleteClick = async () => {
    try {
      const response = await axios.post(
        `/api/transaction/${transaction.transaction_pk}/memo/delete`
      );

      if (response.status === 200) {
        //console.log("Transaction deleted successfully");
        onMemoUpdate(transaction.transaction_pk);
        setMemo("");
        setIsEditing(false);
      }
    } catch (error) {
      console.error("There was an error deleting the transaction!", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
      <ModalContent>
        <Header>{transaction.transaction_name}
        </Header>
        <SubHeader>
          {isEditing ? (
            <MemoInput
              type="text"
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              maxLength="20"
              style={{ display: isEditing ? 'block' : 'hidden' }}
            />
          ) : (
            <span>{memo || "메모할 수 있어요. (최대 20자)"}</span>
          )}
          {isEditing ? (
            <>
            <ActionButtonsContainer>
              <ActionButton onClick={handleEditClick}><IoCheckmarkSharp /></ActionButton>
              <ActionButton onClick={handleDeleteClick}><MdDeleteOutline /></ActionButton>
            </ActionButtonsContainer>
            </>
          ) : (
            <ActionButtonsContainer>
              <ActionButton onClick={() => setIsEditing(true)}><IoPencilSharp /></ActionButton>
            </ActionButtonsContainer>
          )}
        </SubHeader>
        <DetailItem>
          <DetailLabel>거래시각</DetailLabel>
          <DetailValue>{formatDateLong(transaction.transaction_date)}</DetailValue>
        </DetailItem>
        <DetailItem>
          <DetailLabel>거래구분</DetailLabel>
          <DetailValue>{transaction.transaction_type}</DetailValue>
        </DetailItem>
        <DetailItem>
          <DetailLabel>거래금액</DetailLabel>
          <DetailValue>{transaction.transaction_amount}원</DetailValue>
        </DetailItem>
        <DetailItem>
          <DetailLabel>거래 후 잔액</DetailLabel>
          <DetailValue>{transaction.transaction_balance}원</DetailValue>
        </DetailItem>
        <ConfirmButton onClick={onRequestClose}>확인</ConfirmButton>
      </ModalContent>
    </Modal>
  );
}
