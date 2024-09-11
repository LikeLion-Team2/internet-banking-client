// 모달: 입출금 내역 상세
import React, { useState }  from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import styled from 'styled-components';
import { IoCheckmarkSharp, IoPencilSharp } from 'react-icons/io5';



const ModalContent = styled.div`
  padding: 20px;
  font-family: 'Arial, sans-serif';
`;

const Header = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 10px;
`;

const SubHeader = styled.div`
  font-size: 0.875rem;
  color: #888;
  margin-bottom: 20px;
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

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    maxWidth: '400px',
    padding: '0',
  },
};

export default function TransferDetailModal({ isOpen, onRequestClose, transaction }) {
  const [isEditing, setIsEditing] = useState(false);
  const [memo, setMemo] = useState(transaction.transaction_description || '');
  
  const handleEditClick = () => {
    // if (isEditing) {
    //   // 서버에 요청을 보내는 로직 추가
    //   axios.post('/api/update-transaction-memo', {
    //     transaction_pk: transaction.transaction_pk,
    //     transaction_description: memo,
    //   })
    //   .then(response => {
    //     console.log('Memo updated successfully');
    //     // 성공적으로 업데이트 되었을 때의 로직 추가
    //   })
    //   .catch(error => {
    //     console.error('There was an error updating the memo!', error);
    //   });
    // }
    // setIsEditing(!isEditing);
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
      <ModalContent>
        <Header>{transaction.transaction_name}</Header>
        <SubHeader>
          {isEditing ? (
            <MemoInput
              type="text"
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              maxLength="20"
            />
          ) : (
            <span>{memo || '메모할 수 있어요. (최대 20자)'}</span>
          )}
          <button onClick={handleEditClick} style={{ background: 'none', border: 'none', marginLeft: '10px', cursor: 'pointer' }}>
            {isEditing ? <IoCheckmarkSharp /> : <IoPencilSharp />}
          </button>
        </SubHeader>
        <DetailItem>
          <DetailLabel>거래시각</DetailLabel>
          <DetailValue>{transaction.transaction_date}</DetailValue>
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
