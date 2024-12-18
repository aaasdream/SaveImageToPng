// 建立右鍵選單
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "savePNG",
    title: "儲存成PNG",
    contexts: ["image"]
  });
});

// 處理右鍵選單點擊事件
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "savePNG") {
    convertAndSaveAsPNG(info.srcUrl);
  }
});

// 將 Blob 轉換為 base64
async function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

// 轉換並儲存圖片
async function convertAndSaveAsPNG(imageUrl) {
  try {
    console.log('開始處理圖片:', imageUrl);
    
    // 取得圖片
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`取得圖片失敗: ${response.status} ${response.statusText}`);
    }
    const blob = await response.blob();
    console.log('圖片大小:', blob.size, 'bytes', '類型:', blob.type);
    
    // 使用 createImageBitmap 替代 Image
    const imageBitmap = await createImageBitmap(blob);
    console.log('圖片尺寸:', imageBitmap.width, 'x', imageBitmap.height);
    
    // 建立 OffscreenCanvas
    const canvas = new OffscreenCanvas(imageBitmap.width, imageBitmap.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(imageBitmap, 0, 0);
    
    // 轉換成 PNG
    const pngBlob = await canvas.convertToBlob({type: 'image/png'});
    console.log('轉換後PNG大小:', pngBlob.size, 'bytes');
    
    // 轉換 blob 為 base64
    const base64Data = await blobToBase64(pngBlob);
    console.log('Base64轉換完成');
    
    // 產生檔名
    let fileName = imageUrl.split('/').pop().split('.')[0];
    fileName = fileName.replace(/[^a-zA-Z0-9-_]/g, '_');
    if (!fileName) {
      fileName = 'image';
    }
    fileName = fileName + '.png';
    console.log('準備儲存檔案:', fileName);
    
    // 下載檔案
    await chrome.downloads.download({
      url: base64Data,
      filename: fileName,
      saveAs: true
    });
    
    console.log('檔案儲存完成');
    
  } catch (error) {
    console.error('轉換圖片時發生錯誤:', {
      message: error.message,
      stack: error.stack,
      imageUrl: imageUrl,
      errorName: error.name,
      fullError: error
    });
  }
} 