import { CircularProgress } from "@mui/material";
import React from "react";
import styled from "styled-components";

const filterProps = ({ $isLoading, $isDisabled, small, type, flex, outlined, full, ...rest }) => rest;

const StyledButton = styled.div.attrs(filterProps)`
  border-radius: 10px;
  color:black;
  font-size: 14px;
  cursor: ${({ $isDisabled, $isLoading }) => ($isDisabled || $isLoading ? 'not-allowed' : 'pointer')};
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: min-content;
  padding: ${({ small }) => (small ? '10px 28px' : '16px 26px')};
  box-shadow: 1px 20px 35px 0px ${({ theme }) => theme.primary + 40};
  border: 1px solid ${({ theme }) => theme.primary};

  @media (max-width: 600px) {
    padding: 8px 12px;
  }

  ${({ type, theme }) =>
    type === "secondary"
      ? `
        background: ${theme.secondary};
        border: 1px solid ${theme.secondary};
        `
      : `
        background: ${theme.primary};
      `}

  ${({ $isDisabled, $isLoading }) =>
    ($isDisabled || $isLoading) &&
    `
      opacity: 0.8;
    `}

  ${({ outlined, theme }) =>
    outlined &&
    `
      background: transparent;
      color: ${theme.primary};
      box-shadow: none;
    `}

  ${({ full }) =>
    full &&
    `
      width: 100%;
    `}
`;

const Button = ({
  text,
  $isLoading,
  $isDisabled,
  rightIcon,
  leftIcon,
  type,
  onClick,
  flex,
  small,
  outlined,
  full,
}) => {
  return (
    <StyledButton
      onClick={() => !$isDisabled && !$isLoading && onClick()}
      $isDisabled={$isDisabled}
      $isLoading={$isLoading}
      type={type}
      flex={flex}
      small={small}
      outlined={outlined}
      full={full}
    >
      {$isLoading && (
        <CircularProgress
          style={{ width: "18px", height: "18px", color: "black" }}
        />
      )}
      {leftIcon}
      {text}
      {$isLoading && <> . . .</>}
      {rightIcon}
    </StyledButton>
  );
};

export default Button;
