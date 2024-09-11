import { motion } from "framer-motion";
import styled from "styled-components";

const Wrapper = styled(motion.div)`
  flex-direction: column;
  position: fixed;
  z-index: 10;
  top: 75vh;
  left: 0;
  right: 0;
  border-top-left-radius: 1.5rem;
  border-top-right-radius: 1.5rem;
  background-color: white;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.6);
  height: var(--btm-sheet-height);
  margin: 0 auto;
`;
const HeaderWrapper = styled(motion.div)`
  height: 48px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  position: relative;
  padding-top: 16px;
  padding-bottom: 4px;
`;
const HandleBar = styled(motion.div)`
  width: 32px;
  height: 4px;
  border-radius: 2px;
  background-color: #d0d0d0;
  margin: auto;
`;
const ContentWrapper = styled.div`
  height: 80vh;
  padding-bottom: calc(var(--btm-navbar-height) + 20vh);
  overflow: auto;
`;

// 버텀 시트
export default function BottomSheet({ onDragEnd, controls, children }) {
  return (
    <Wrapper
      drag="y"
      onDragEnd={onDragEnd}
      initial="hidden"
      animate={controls}
      transition={{
        type: "spring",
        damping: 40,
        stiffness: 400,
      }}
      variants={{
        visible: { y: -100 },
        hidden: { y: "65%" },
      }}
      dragConstraints={{ top: 10 }}
      dragElastic={0.2}
    >
      <HeaderWrapper>
        <HandleBar />
      </HeaderWrapper>
      <ContentWrapper>{children}</ContentWrapper>
    </Wrapper>
  );
}
