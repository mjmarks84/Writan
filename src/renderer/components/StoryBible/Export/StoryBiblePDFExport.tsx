import React from 'react';

export function StoryBiblePDFExport({ html }: { html: string }) {
  return (
    <button
      onClick={() => {
        const printWindow = window.open('', '_blank');
        if (!printWindow) return;
        printWindow.document.write(html);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
      }}
    >
      Export Story Bible (Print/PDF)
    </button>
  );
}
