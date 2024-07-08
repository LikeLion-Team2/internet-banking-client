import axios from "axios";
import * as S from "./styles/transfer.style";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import useBottomSheet from "../../hooks/useBottomSheet";
import BottomSheet from "../../components/bottom-sheet";

// 입/출금 페이지: 본인 계좌에 입금시 받는 계좌 즉시 주입
export default function Transfer({ destinationAccount }) {
  const [originAccount, setOriginAccount] = useState("");

  const { onDragEnd, controls, setIsOpen } = useBottomSheet();

  const options = ["3374-16-562652", "two", "three"];
  const defaultOption = options[0];

  const { accountId } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();

  // POST: 이체
  const onSubmit = async ({
    transaction_destination,
    transaction_amount,
    transaction_origin_memo,
    transaction_destination_memo,
    account_pw,
  }) => {
    const transferInfo = {
      transaction_origin: originAccount,
      transaction_destination,
      transaction_amount,
      transaction_origin_memo,
      transaction_destination_memo,
      account_pw,
    };

    const transferURL = `/api/transaction/${accountId}/transfer`;
    await axios
      .post(transferURL, transferInfo, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.status === 200) {
          alert("이체에 성공했습니다");
          navigate("/home");
        }
      })
      .catch(() => {
        alert("계좌 정보를 불러오는데 실패했습니다.");
      });
  };

  const changeOriginAccount = (data) => {
    setOriginAccount(data.value);
  };
  // transaction_origin,
  return (
    <S.Wrapper>
      <S.FormContainer
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* 받는 계좌 번호 */}
        <S.Header>이체하기</S.Header>
        {/* 받는 계좌 번호 입력 */}
        <S.DestinationAccountInput
          type="text"
          value={destinationAccount}
          placeholder="받는사람 계좌번호"
          {...register("transaction_destination", {
            required: true,
            maxLength: 20,
          })}
        />
        <S.TransferAmount
          placeholder="보낼 금액"
          {...register("transaction_amount", { required: true, maxLength: 20 })}
        ></S.TransferAmount>
        {/* 보내는 계좌 */}
        <S.OriginAccountSelect>
          <Dropdown
            options={options}
            onChange={changeOriginAccount}
            value={defaultOption}
            placeholder="Select an option"
          />
        </S.OriginAccountSelect>
        {/* 표기란 */}
        <S.MemoContainer>
          <S.Description>받는 분에게 표기</S.Description>
          <S.MemoInput
            maxLength={8}
            {...register("transaction_destination_memo", {
              required: true,
              maxLength: 8,
            })}
          />
        </S.MemoContainer>
        <S.MemoContainer>
          <S.Description>나에게 표기</S.Description>
          <S.MemoInput
            maxLength={8}
            {...register("transaction_origin_memo", {
              required: true,
              maxLength: 8,
            })}
          ></S.MemoInput>
        </S.MemoContainer>
        <S.NextBtn
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setIsOpen(true);
          }}
        >
          다음
        </S.NextBtn>
        <BottomSheet onDragEnd={onDragEnd} controls={controls}>
          <S.BtmSheetContainer>
            <S.AccountPwInput
              type="password"
              placeholder="계좌 비밀번호"
              required
              {...register("account_pw", {
                required: true,
                minLength: 6,
                maxLength: 6,
              })}
            />
            {/* 완료 버튼 */}
            <S.TransferBtn type="submit">이체하기</S.TransferBtn>
          </S.BtmSheetContainer>
        </BottomSheet>
      </S.FormContainer>
    </S.Wrapper>
  );
}
