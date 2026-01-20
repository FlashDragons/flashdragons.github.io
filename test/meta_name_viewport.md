`<meta name="viewport">` 是**移动端网页开发的关键标签**，用于控制网页在移动设备上的显示方式和缩放行为。

## **基本语法**
```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

## **主要作用**

### 1. **防止移动端自动缩放**
- 没有viewport时：移动浏览器会假设网页为桌面宽度（约980px），然后缩小显示
- 有viewport时：按实际设备宽度渲染，内容清晰可读

### 2. **控制布局视口**
```html
<!-- 视口宽度等于设备宽度 -->
<meta name="viewport" content="width=device-width">

<!-- 固定宽度（不推荐） -->
<meta name="viewport" content="width=500">
```

## **content属性的常用参数**

| 参数 | 说明 | 示例 |
|------|------|------|
| `width` | 视口宽度 | `device-width`（推荐） |
| `initial-scale` | 初始缩放比例 | `1.0`（不缩放） |
| `minimum-scale` | 最小缩放比例 | `0.5` |
| `maximum-scale` | 最大缩放比例 | `2.0` |
| `user-scalable` | 是否允许用户缩放 | `yes` / `no` |
| `viewport-fit` | 全面屏适配 | `cover` |

## **常用配置方案**

### **方案1：标准响应式配置**（最常用）
```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

### **方案2：禁止缩放**（特定场景用）
```html
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
```
⚠️ 注意：禁止缩放可能影响可访问性

### **方案3：全面屏适配**（iPhone X+）
```html
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
```

## **实际效果对比**

**没有viewport**：
- 文字很小，需要双击或捏拉放大
- 布局混乱，可能横向滚动
- 用户体验差

**有viewport**：
- 文字大小合适，清晰可读
- 布局自适应屏幕宽度
- 符合移动端使用习惯

## **开发注意事项**

1. **必须放在`<head>`顶部**
   ```html
   <head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1">
     <!-- 其他meta和title -->
   </head>
   ```

2. **结合CSS媒体查询使用**
   ```css
   /* 移动端优先 */
   body { font-size: 16px; }
   
   @media (min-width: 768px) {
     body { font-size: 18px; }
   }
   ```

3. **现代框架的集成**
   - **React**：create-react-app已内置
   - **Vue CLI**：默认包含
   - **Next.js**：自动添加

## **常见问题**

**Q：为什么我的移动端页面还是很小？**
A：可能漏了viewport标签，或CSS使用了固定宽度（如px单位）

**Q：如何测试viewport效果？**
A：使用浏览器开发者工具的**设备模拟模式**

**Q：是否所有移动页面都需要？**
A：是的！这是移动网页开发的**必备标签**

## **历史背景**
- 2007年iPhone首次引入
- 为解决桌面网页在手机显示问题
- 现已成为移动网页标准配置

记住：**没有viewport的移动网页 ≈ 灾难**。这应该是每个移动端网页的第一个meta标签！