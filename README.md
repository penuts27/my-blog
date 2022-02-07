# 部落格1.0
一個使用 react.js + react router6 製作的部落格,提供使用者登入帳號,閱讀server文章、發布文章
- [Demo Website](https://penuts27.github.io/my-blog/)
歡迎使用測試帳號登入使用，預設帳密如下：
```
帳號：user01
密碼：Lidemy
```
> 備註:自行註冊帳號的話，統一在後端把密碼改成 Lidemy，因此每個 user 的密碼都會一樣

## 專案畫面
![image](https://github.com/penuts27/my-blog/blob/main/my-blog-shot.png)
## 產品功能
1. 使用者可以輸入帳號密碼登入帳號
2. 使用者可以點擊任一篇文章，查看更多訊息，例如：發佈者、發佈時間
3. 使用者可以刪除文章
4. 使用者可以註冊帳號，輸入nickname,username,password即可
5. 使用者登入後可以發布文章，並以nickname為名發表

## 其他功能
1. loading畫面，可阻止連續呼叫api
![image](https://github.com/penuts27/my-blog/blob/main/diagram1.png)
2. 前台資料驗證 與 提醒用的alert字串
![image](https://github.com/penuts27/my-blog/blob/main/diagram2.png)
3. 伺服器提示並回傳alert字串
4. 使用styled-components進行RWD排版

## 備註
1. context.js 檔案為 react context 共用資料儲存專用檔案
2. utils.js token 相關變數檔案，整理成單支檔案有便於管理與呼叫
3. WebAPI.js 為儲存 fetch server api 變數檔案，整理成單支檔案有便於管理與呼叫
4. globalStyle.js 為全域樣式使用的 styled-components檔案

### `npm start`
clone 檔案後在終端機輸入 npm start ，現在，你可開啟任一瀏覽器瀏覽器輸入 http://localhost:3000 開始使用部落格1.0囉！




