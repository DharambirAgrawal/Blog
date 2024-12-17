"use client";
import React, { useState } from "react";

const CopyCode = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    console.log(children);
    if (!children) return;
    const contentToCopy =
      typeof children === "string" ? children : children.toString();
    navigator.clipboard.writeText(contentToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
  };

  return (
    <div className="relative">
      <div className="rounded-lg overflow-hidden bg-gray-100 p-4">
        <pre className="overflow-x-auto">{children}</pre>
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
    </div>
  );
};

export default CopyCode;