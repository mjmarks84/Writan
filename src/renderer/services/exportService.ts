export const exportService = {
  exportDocument: async (format: '.docx' | '.pdf' | '.txt' | '.epub') => {
    return { ok: true, format };
  }
};
