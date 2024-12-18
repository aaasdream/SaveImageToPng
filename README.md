# Save as PNG Chrome Extension

這是一個簡單的 Chrome 擴充功能，可以讓您在瀏覽網頁時，對任何圖片按右鍵並將其儲存為 PNG 格式。

## 功能特點

- 在圖片的右鍵選單中新增「儲存成PNG」選項
- 自動將任何格式的圖片轉換為 PNG 格式
- 保持原始圖片的尺寸和品質
- 支援另存新檔，可自選儲存位置

## 安裝方式

1. 下載或複製此專案的所有檔案到本地資料夾
2. 開啟 Chrome 瀏覽器
3. 在網址列輸入 `chrome://extensions/` 進入擴充功能頁面
4. 開啟右上角的「開發人員模式」
5. 點擊「載入未封裝項目」
6. 選擇包含擴充功能檔案的資料夾

## 使用方式

1. 在網頁上找到想要儲存的圖片
2. 在圖片上按右鍵
3. 選擇「儲存成PNG」選項
4. 選擇儲存位置並確認

## 檔案結構

- `manifest.json`: 擴充功能的設定檔
- `background.js`: 主要程式碼
- `README.md`: 說明文件

## 錯誤排除

如果遇到問題，可以：

1. 在擴充功能頁面找到此擴充功能
2. 點擊「Service Worker」連結
3. 在開發者工具的 Console 面板中���看詳細的錯誤訊息

## 技術細節

- 使用 Chrome Extension Manifest V3
- 使用 Service Worker 處理背景工作
- 使用 OffscreenCanvas 進行圖片處理
- 支援 CORS (跨域資源共享)

## 權限說明

此擴充功能需要以下權限：
- `contextMenus`: 用於新增右鍵選單項目
- `downloads`: 用於下載轉換後的圖片

## 授權

MIT License 