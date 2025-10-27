import React from "react";
import styled from "styled-components";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const StyledInput = styled.input<InputProps>`
  width: 100%;
  padding: 0.625rem 0.75rem;
  border: 1px solid ${(props) => (props.error ? "#EF4444" : "#D1D5DB")};
  border-radius: 0.375rem;
  font-size: 0.875rem;

  &:focus {
    outline: none;
    ring: 2px;
    ring-color: #3b82f6;
    border-color: #3b82f6;
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

export const Input: React.FC<InputProps> = ({ error, ...props }) => {
  return <StyledInput error={error} {...props} />;
};
