<div style="text-align:center;">
    <h2>Uipath Log Analyzer Starter</h3>
</div>
<div style="text-align:center;">
    Uipath Log Analyzer Starter
</div>

#### Usage
##### Pre-prepared
  Need **Uipath log analyzer .exe**  file

  > Github: [Uipath-log-analyzer](https://github.com/HinokiSu/uipath-log-analyzer)
  > File download page: [ula-releases](https://github.com/HinokiSu/uipath-log-analyzer/releases)

copy it to the `ula` directory


##### Install Deps
```bash
$ yarn 
```

##### Start
```bash
$ yarn dev
```


#### Directory
```
  ├── dist-electron # electron build
  ├── electron  # electron
  │ 
  ├── 
  ├──┬ background  # handle ula logger renderer
  │  ├── index.html # background page
  │  └── index.ts   # background renderer
  │
  ├── src   # font-end
  │
  ├──┬ ula   # uipath log analyzer project
  │  ├── uipath-log-analyzer_win.exe
  │  ├── database
  │  └── logger
  │
  ├── index.html
  ├── package.json
  └── vite.config.ts
```


#### Reference
- [Electron-vite-vue](https://github.com/electron-vite/electron-vite-vue)
- [NextUi](https://nextui.org/)
- [Hyper](https://github.com/vercel/hyper)