module.exports = class ServerResponse {
  constructor(request) {
    this.headers = {}
    this.request = request
  }

  setHeader(name, value) {
    this.headers[name] = value
  }

  getHeader(name) {
    return this.headers[name]
  }

  // Các phương thức và thuộc tính khác mà bạn cần có thể được thêm vào đây tùy theo yêu cầu của ứng dụng của bạn
}
