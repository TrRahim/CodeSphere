import { Check, Copy } from "lucide-react";
import { useState } from "react";

const CopyButton = ({ code }: { code: string }) => {
  const [isCopied, setCopied] = useState<boolean>(false);

  const handleClick = async () => {
    await navigator.clipboard.writeText(code);

    setCopied(true);

    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="p-2 hover:bg-white/10 rounded-lg transition-all duration-200 group relative"
    >
      {isCopied ? (
        <Check className="size-4 text-green-400" />
      ) : (
        <Copy className="size-4 text-gray-400 " />
      )}
    </button>
  );
};

export default CopyButton;
