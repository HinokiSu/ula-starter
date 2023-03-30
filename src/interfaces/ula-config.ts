export type TModConfigRes = {
  state: boolean
  msg?: string
  config?: string
}

export interface IUlaRunResult {
  status: 'running' | 'failed' | 'stopped'
  msg: string
}
