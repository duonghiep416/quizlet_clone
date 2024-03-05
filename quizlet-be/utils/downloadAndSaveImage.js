const fetch = require('node-fetch')
const fs = require('fs')

function generateUniqueFileName(extension) {
  const timestamp = Date.now()
  const randomString = Math.random().toString(36).substring(2, 8) // Tạo một chuỗi ngẫu nhiên từ 6 ký tự
  return `${timestamp}_${randomString}.${extension}`
}

async function downloadImageAndSaveToLocal(imageURL, localDirectory) {
  try {
    // Tải nội dung của hình ảnh từ URL
    const response = await fetch(imageURL)
    const imageType = await response.clone().blob()
    const imageData = await response.clone().buffer()
    // Lấy phần mở rộng của hình ảnh
    const extension = imageType.type.split('/')[1]

    // Tạo tên tập tin duy nhất cho hình ảnh
    const uniqueFileName = generateUniqueFileName(extension)

    // Lưu hình ảnh vào máy chủ
    const localFilePath = `${localDirectory}/${uniqueFileName}`
    fs.writeFileSync(localFilePath, imageData)

    console.log('Image downloaded and saved successfully:', uniqueFileName)
    return localFilePath
  } catch (error) {
    console.error('Error downloading and saving image:', error)
  }
}
module.exports = downloadImageAndSaveToLocal
