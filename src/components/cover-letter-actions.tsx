"use client";

import { useState } from "react";
import { Check, Copy, Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CoverLetterActions({
  content,
  fileName,
}: {
  content: string;
  fileName: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copyToClipboard() {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  function downloadTxt() {
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${fileName}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Button type="button" variant="secondary" size="sm" onClick={copyToClipboard}>
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        {copied ? "Copied" : "Copy"}
      </Button>
      <Button type="button" variant="outline" size="sm" onClick={downloadTxt}>
        <Download className="h-4 w-4" />
        Download TXT
      </Button>
      <Button type="button" variant="ghost" size="sm" disabled title="PDF export hook">
        <FileText className="h-4 w-4" />
        PDF soon
      </Button>
    </div>
  );
}

