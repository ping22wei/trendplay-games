# Google Search Console 提交指南

## 为什么要提交

让Google更快发现并索引网站内容，提高搜索排名。

## 提交步骤

### 方法1：手动提交（推荐，适合少量页面）

1. 登录 https://search.google.com/search-console
2. 添加属性：输入网站URL（如 `https://trendplay.top`）
3. 验证所有权（可通过DNS记录、HTML标签或Cloudflare验证）
4. 进入"网址检查"工具
5. 逐个输入要索引的URL，点击"请求编入索引"

**注意事项：**
- 每个URL最多提交一次/天
- 建议分3-5天提交，避免触发风控
- 确保页面内容完整后再提交
- 优先提交游戏主页，再提交SEO文章页

### 方法2：提交Sitemap（适合大量页面）

1. 创建 `sitemap.xml` 文件
2. 上传到网站根目录
3. 在Search Console中提交 sitemap URL

## URL格式要点

### Cloudflare Pages自动移除.html后缀

- 文件：`word-chain-basics.html`
- 正确URL：`https://trendplay.top/word-chain/word-chain-basics`
- ❌ 错误：不要提交带.html的URL

### 待提交URL列表模板

```
1. https://example.com/ （主页）
2. https://example.com/game-1/ （游戏1）
3. https://example.com/game-2/ （游戏2）
4. https://example.com/game-1/article-1 （SEO文章1）
5. https://example.com/game-1/article-2 （SEO文章2）
```

## 常见坑

### 验证失败

**问题：** DNS验证失败
**解决：** 确保Cloudflare DNS代理开启（橙色云朵），或等待DNS传播

### 索引延迟

**问题：** 提交后几天没变化
**解决：** 正常现象，Google需要时间爬取。检查"索引覆盖"报告查看状态

### 重复内容

**问题：** 同一内容多个URL
**解决：** 统一使用带www或不带www，Canonical标签指向首选URL
