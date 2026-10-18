# Claude Design System (CDS) 技术文档库

欢迎查阅 Claude 桌面端与 CDS 设计系统的逆向分析与工程实现文档。全部内容基于 **Claude Desktop 2.42304.0.0** 安装包与 **claude.ai 网页版**运行时实测：

---

## 🚀 [Claude Desktop 2.42304.0.0 逆向分析与 CDS 设计系统报告](v2/README.md)
> **适用版本**：Claude Desktop v2.42304.0（Windows MSIX `Claude_2.42304.0.0_x64__pzs8sxrjxfjjc`，2026-10-17 审计）
> **核心焦点**：官方 `@ant/cds` 6 层设计令牌与 Cove 8 色可视化色板、FloatingComposer 三态胶囊变形与 16 阶渐隐遮罩、`.urm` 环形配额双搏心跳仪、Oklab 光源折页卡片、5 字体光学悬挂标点矩阵、SableOtter 光标级 HUD / CuTeach / CuWatchRecord / Hardware Buddy / ClawdQuest 五大原生交互壳层、52 个 `data-cds` 组件命名空间与 152 项纯 CSS 合成器动效参数。

* **[第 1 章：综述与版本边界](v2/01-综述与版本边界.md)**：v2.42304.0 捆绑 CLI 2.1.299 与 MSIX 多进程边界、桌面版与网页版的加载关系、陶土品牌色克制守则与人声衬线分界。
* **[第 2 章：核心特性逆向](v2/02-核心特性逆向.md)**：弹出窗口与窗口级页面搜索、Cowork 产物库白名单、排队消息、5 档努力程度、FloatingComposer 三态变形、`.urm` 环形配额心跳、Oklab 光泽折页卡片、5 字体光学悬挂标点及 SableOtter HUD / CuTeach / CuWatchRecord / Hardware Buddy / ClawdQuest。
* **[第 3 章：界面架构与样式系统](v2/03-界面架构与样式系统.md)**：画布底色、compact / comfortable 圆角与密度系统、胶囊与骨架屏微交互、章节标记与 Tailwind v4 `@layer cds-card` 架构。
* **[第 4 章：系统底座全景解密](v2/04-系统底座全景解密.md)**：152 项全域 CSS 动效关键帧、52 个 `data-cds` 原生组件命名空间契约、5 阶时间 Token 矩阵、官方 6 层令牌架构与 Cove 8 色数据可视化标准。
* **[第 5 章：生产级参考实现代码](v2/05-生产级参考实现代码.md)**：`ModelSelectorEffort.tsx`、`ChatComposerChin.tsx`、`CdsMotionEngine.tsx` 独立组件代码。
* **[第 6 章：总结](v2/06-总结.md)**：结构规范化、动效物理化与桌面原生化三个层面的总结。

---

## 🌐 [claude.ai 网页版实测页](claude-components-storybook.html#claude-ai-web)
> **适用版本**：claude.ai 线上构建 `541957a01b`（2026-10-17，1440×900 与 375×812 实测）
> **核心焦点**：外壳与控件坐标、侧栏密度、输入框与 Chin、菜单、消息流、按钮解剖、图标字体、动效时长、令牌、登录页、隐藏机制（W0–W12），Code 会话族谱与思考状态机（W13–W14），以及桌面端独有功能（W15）。桌面版 2.42304.0.0 与网页行为不同的项在各节就地并排显示。

---

## 🎨 交互式组件故事书 (Storybook)

在本地离线体验全量生产级组件的动态交互、物理弹簧阻尼与环境光影：

```bash
npm run storybook
# 或直接双击打开:
open docs/claude-components-storybook.html
```
