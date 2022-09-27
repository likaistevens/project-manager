import React, { FC, memo } from "react";
import styled from "styled-components";

export const AppLoading: FC = () => {
  return (
    <LoadingContainer>
      <div className="index-loading-container">
        <div className="loading-spinner">
          <div />
          <div />
          <div />
        </div>
        <div>加载中...</div>
      </div>
    </LoadingContainer>
  );
};

const LoadingContainer = styled.div`
  @keyframes loading-spinner-animation {
    0% {
      top: 8px;
      height: 64px;
    }

    50%,
    100% {
      top: 24px;
      height: 32px;
    }
  }
  .index-loading-container {
    font-size: 20px;
    text-align: center;
    padding-top: 300px;

    .loading-spinner {
      display: inline-block;
      position: relative;
      width: 80px;
      height: 80px;

      div {
        display: inline-block;
        position: absolute;
        left: 8px;
        width: 16px;
        background: silver;
        animation: loading-spinner-animation 1.2s cubic-bezier(0, 0.5, 0.5, 1)
          infinite;

        &:nth-child(1) {
          left: 8px;
          animation-delay: -0.24s;
        }

        &:nth-child(2) {
          left: 32px;
          animation-delay: -0.12s;
        }

        &:nth-child(3) {
          left: 56px;
          animation-delay: 0;
        }
      }
    }
  }

  section .layout {
    min-height: 100vh;
    transition: all 0.3s;
    background: WhiteSmoke;
    .arco-layout-content {
      background: WhiteSmoke;
    }
    .content-container {
      background: WhiteSmoke;
    }
  }
`;
