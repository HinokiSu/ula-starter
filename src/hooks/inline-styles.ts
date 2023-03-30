import { isObject, isString } from './judge-types'

/* 
    {
        : ,
        color: 
        ...
    }
    {
      `border-radius`: '20px',
      `color`: 'red'
    }

*/
/**
 *
 * @param val Object ex: {color: 'red', 'border-radius': '20px'}
 * @returns
 */
const inlineStyles = (val: any): string => {
  const styles = []

  if (isObject(val)) {
    for (const name in val) {
      if (val[name]) {
        styles.push(name + ':' + val[name] + ';')
      }
    }
  }
  const styleStr = styles.join(' ')
  return styleStr
}

export default inlineStyles
