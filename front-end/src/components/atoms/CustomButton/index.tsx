"use client";

import { Button } from "@mui/material";
import React from "react";

interface CustomButtonProps {
  title: string;
  fullWidth?: boolean;
  variant?: "text" | "outlined" | "contained";
  onClick?: () => void;
  sx?: React.CSSProperties;
}

const CustomButton = ({
  title,
  fullWidth,
  variant,
  onClick,
  sx,
}: CustomButtonProps) => {
  return (
    <Button
      sx={{
        borderRadius: 100,
        ...sx,
      }}
      variant={variant}
      fullWidth={fullWidth}
      onClick={onClick}
    >
      {title}
    </Button>
  );
};

export default CustomButton;
