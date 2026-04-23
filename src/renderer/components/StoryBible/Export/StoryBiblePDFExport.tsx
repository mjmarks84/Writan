import React from 'react';

function sanitizeHTML(html: string): string {
  const template = document.createElement('template');
  template.innerHTML = html;

  template.content.querySelectorAll('script, iframe, object, embed').forEach((node) => node.remove());

  template.content.querySelectorAll<HTMLElement>('*').forEach((element) => {
    [...element.attributes].forEach((attribute) => {
      const name = attribute.name.toLowerCase();
      const value = attribute.value.trim().toLowerCase();
      const isUnsafeDataUrl = value.startsWith('data:') && !value.startsWith('data:image/');
      if (
        name.startsWith('on') ||
        value.startsWith('javascript:') ||
        isUnsafeDataUrl ||
        value.startsWith('vbscript:')
      ) {
        element.removeAttribute(attribute.name);
      }
    });
  });

  return template.innerHTML;
}

export function StoryBiblePDFExport({ html }: { html: string }) {
  return (
    <button
      onClick={() => {
        const iframe = document.createElement('iframe');
        iframe.style.position = 'fixed';
        iframe.style.width = '0';
        iframe.style.height = '0';
        iframe.style.border = '0';
        iframe.setAttribute('aria-hidden', 'true');
        document.body.appendChild(iframe);

        const frameDoc = iframe.contentDocument;
        if (!frameDoc) {
          document.body.removeChild(iframe);
          return;
        }

        frameDoc.open();
        frameDoc.write(sanitizeHTML(html));
        frameDoc.close();

        const contentWindow = iframe.contentWindow;
        if (contentWindow) {
          contentWindow.focus();
          contentWindow.print();
        }

        setTimeout(() => {
          if (iframe.parentNode) {
            iframe.parentNode.removeChild(iframe);
          }
        }, 1000);
      }}
    >
      Export Story Bible (Print/PDF)
    </button>
  );
}
