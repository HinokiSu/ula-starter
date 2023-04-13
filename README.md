## Uipath Log Analyzer Starter

#### Usage

##### Pre-prepared

Need **Uipath log analyzer .exe** file

> Github: [Uipath-log-analyzer](https://github.com/HinokiSu/uipath-log-analyzer)
> File download page: [ula-releases](https://github.com/HinokiSu/uipath-log-analyzer/releases)

copy it to the `$rootPath/resources` directory

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
  ├── resources     # ula process file
  │
  ├──┬ background   # handle ula logger renderer
  │  ├── index.html # background page
  │  └── index.ts   # background renderer
  │
  ├──┬ src   # font-end
  │  └─┬ background  # handle ula logger renderer
  │    └── index.ts   # background renderer
  │
  ├──┬ resources   # uipath log analyzer project
  │  ├── uipath-log-analyzer_win.exe
  │  └─┬ ula
  │    ├── server.config.json
  │    ├── database
  │    └── logger
  │
  ├── index.html
  ├── background.html   # background page
  │
  ├── package.json
  └── vite.config.ts
```

#### Reference

- [Electron-vite-vue](https://github.com/electron-vite/electron-vite-vue)
- [NextUi](https://nextui.org/)
- [Hyper](https://github.com/vercel/hyper)

#### License

[MIT](https://github.com/HinokiSu/ula-starter/blob/main/LICENSE)
