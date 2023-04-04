import { TLogItem } from './log-type'

export type TReply = {
  /* false: error, true: valuable data */
  flag: boolean
  msg: string
  data: Array<TLogItem> | []
}
