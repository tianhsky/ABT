window.ABT.utils.Browser = class Model{
  static getUserAgent(){
    return navigator.userAgent
  }

  static getWindowSize(){
    return {
      width: window.innerWidth,
      height: window.innerHeight
    }
  }
}