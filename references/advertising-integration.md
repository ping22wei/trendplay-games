# 广告平台集成指南

## AdMaven 广告代码

### 验证代码

用于验证站点所有权，放在 `<head>` 中：

```html
<meta name='admaven-placement' content='验证代码'>
```

**注意：** 这是验证代码，不是广告代码！

### 正式广告代码

**弹窗广告（Popunder）：**
```html
<script src="https://plXXX.profitableratecpmnetwork.com/XXX.js"></script>
```

位置：`</head>` 标签之前，每个页面都要加。

**社交栏（Social Bar）：**
```html
<script src="https://plXXX.profitableratecpmnetwork.com/XXX.js"></script>
```

位置：`</body>` 标签之前，footer之后。

## Adsterra 广告代码

与AdMaven格式相同，具体代码由广告平台提供。

## 集成规则

1. **每个页面都要加**：主页、游戏页、SEO文章页
2. **顺序不能错**：验证代码 → Popunder → 样式 → 页面内容 → Social Bar
3. **先验证后加广告**：先等AdMaven验证通过，再添加正式广告代码
4. **人工审核期间不加广告**：页面可能被封，等审核通过后再加

## 常见错误

### 错误1：把验证代码当成广告代码

验证代码只有`<meta>`标签，没有广告效果。
正式广告需要`<script>`标签。

### 错误2：漏加Social Bar

弹窗+社交栏组合使用效果最佳。

### 错误3：在HTML文件中写CSS脚本

广告脚本必须用`<script src="">`格式，不能内联。
