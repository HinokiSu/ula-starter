import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer'

export async function installExt() {
  await installExtension(VUEJS3_DEVTOOLS)
    .then(() => {
      console.log('[Electron DevTools] Added Extension')
    })
    .catch((err) => {
      console.log('Extension Error: ', err)
    })
}
