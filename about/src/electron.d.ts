declare interface Window {
  about: About
  mu: string
  versions: Versions
}
interface About {
  test: (msg: string) => void
  test1: (callback: (_: null, value: string) => void) => void
}
interface Versions {
  node: string
  chrome: string
  electron: string
}
