import React from "react";
import { AlertCircle } from "lucide-react";

interface Props {
  message: string;
}

const ErrorMessage: React.FC<Props> = ({ message }) => {
  return (
    <div className="flex items-center mt-2 text-red-400 text-sm">
      <AlertCircle className="w-4 h-4 mr-1" />
      {message}
    </div>
  );
};

export default ErrorMessage;
