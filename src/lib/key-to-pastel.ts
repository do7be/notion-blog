import { useLayoutEffect, useState } from 'react'
import md5 from 'crypto-js/md5'
import colorConvert from 'color-convert'

// TODO: npm package化したい
export function useKeyToPastel(key: string) {
  const [pastel, setPastel] = useState<string>()
  useLayoutEffect(() => {
    setPastel(keyToPastel(key))
  }, [key])
  return pastel
}

export function useKeysToPastel(keys: string[]) {
  const [pastels, setPastels] = useState<string[]>([])
  useLayoutEffect(() => {
    setPastels(keys.map(key => keyToPastel(key)))
  }, [keys])
  return pastels
}

function keyToPastel(key: string) {
  const base64 = md5(key)
    .toString()
    .slice(0, 3)
  const h = parseInt(base64, 16) % 360
  const s = 80
  const l = 90

  const rgb = colorConvert.hsl.rgb([h, s, l])
  const rgbHex = colorConvert.rgb.hex(rgb)

  return rgbHex
}
