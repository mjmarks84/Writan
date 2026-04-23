import { _electron as electron } from 'playwright-core';

export const launchElectronApp = async (entryPoint: string) => {
  return electron.launch({ args: [entryPoint] });
};
