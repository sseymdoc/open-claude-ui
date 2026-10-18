# Claude Desktop 2.42304.0.0 逆向分析与 CDS 设计系统报告

> **目标应用载体**：Anthropic 官方桌面端生产包 Windows MSIX `Claude_2.42304.0.0_x64__pzs8sxrjxfjjc`
> **二进制元数据**：`@ant/desktop v2.42304.0`（Commit Timestamp: `2026-10-15T05:54:05Z`，Commit: `e7f60e658f15cfece9efa384a78a39aec3c12845`，捆绑 CLI `2.1.299`，`app.asar` Evidence: `ev_db29cf6b5757fd86666fd272343cccd383bf391d00dac49aada8f2d616fa36c8`）
> **逆向工具栈**：**[REA (Reverse Engineer Anything)](https://github.com/morluto/rea)**：ASAR 解包、`ion-dist` CSS / JS 静态分析与 AST 解构。
> **网页版对照**：claude.ai 运行时实测（DOM 测量、CSSOM 遍历）见 [交互式故事书 · claude.ai 实测页](../claude-components-storybook.html#claude-ai-web)（W0–W22；W16–W22 是安装包全部可视化效果的盘点与复刻）。

---

## 🧭 分章目录与导读索引

- [第一章：综述与版本边界](01-综述与版本边界.md)
  - 1.1 版本边界声明 (v2.42304.0 捆绑 CLI 2.1.299 与 MSIX 多进程宿主边界)
  - 1.2 核心设计契约 (陶土品牌色克制守则与人声衬线分界)
- [第二章：核心特性逆向](02-核心特性逆向.md)
  - 2.1 弹出窗口与窗口级页面搜索 (Pop-out 会话与侧栏面板、Find-in-Page)
  - 2.2 Cowork 产物第三方库白名单与数据表格失活行 (jsDelivr + SRI 校验)
  - 2.3 排队消息 (ChatComposerQueuedMessages 与 Send now)
  - 2.4 推理努力程度 (5 档 Effort、Max 警示与 maxEffort 配置)
  - 2.5 现代 CSS 动效系统 (sibling-index() 级联、View Transitions 页面转场、Scroll-Driven 滚动驱动遮罩)
  - 2.6 触控负边距补偿 (--cmp-chin-touch-grow 尺寸补偿算法)
  - 2.7 悬浮输入框三态几何变形与 16 阶渐隐遮罩 (FloatingComposer handle/pill/composer 变形)
  - 2.8 环形配额仪表与三阶生理心跳曲线 (Usage Ring Meter .urm 彗星尾迹与 20 点双搏心跳)
  - 2.9 Oklab 光泽纸张卡片与标尺微动效 (Sheet Card 200° 光源旋转与 Epitaxy 文档刻度尺)
  - 2.10 5 字体光学悬挂标点与字距补偿矩阵 (serif/sans/atkinson/dyslexia 悬挂引号与负字偶距)
  - 2.11 桌面全局多模态交互壳层 (SableOtter HUD、CuTeach、CuWatchRecord、Hardware Buddy 与 ClawdQuest)
- [第三章：界面架构与样式系统](03-界面架构与样式系统.md)
  - 3.1 工作台画布底色 (浅色 #fcfcfb、深色 #151515)
  - 3.2 基础圆角与密度系统 (compact / comfortable 双档令牌)
  - 3.3 胶囊与骨架屏微交互 (cds-pill-pop 两段式形变、Skeleton Wave / Lockstep + 105° 扫光)
  - 3.4 章节标记 (Pin as chapter 与 mark_chapter)
  - 3.5 Tailwind v4 CSS-First 引擎与样式共存 (@layer cds-card 法则与桌面按钮箭头光标约定)
- [第四章：系统底座全景解密](04-系统底座全景解密.md)
  - 4.1 纯 CSS 动效参数 (全包 309 个 @keyframes、主样式表 152 个，56 个 cds-* 关键帧中 54 个复制进 7 处本地窗口与外壳)
  - 4.2 原生组件命名空间 (52 个 data-cds 原生组件命名空间契约与 79 项结构槽位)
  - 4.3 响应时间与贝塞尔曲线 (5 阶时间 Token 60ms~450ms 与 3 大精确贝塞尔控制点)
  - 4.4 官方 @ant/cds 六层令牌架构与 Cove 数据可视化设计体系 (6 层模型、逆混色方程与 Cove 8 色色板)
- [第五章：生产级参考实现代码](05-生产级参考实现代码.md)
  - 5.1 模型选择与努力程度调节器 (`ModelSelectorEffort.tsx`)
  - 5.2 输入框底部工具行 (`ChatComposerChin.tsx`)
  - 5.3 动效引擎与微交互 (`CdsMotionEngine.tsx`)
- [第六章：总结](06-总结.md)
- [第七章：隐藏与条件触发效果](07-隐藏与条件触发效果.md)
  - 7.1 盘点口径与结果 (309 个关键帧、53 个文件、153 项非关键帧效果)
  - 7.2 需要特定条件才出现的效果 (电脑使用光晕、天气工具卡片、升级庆祝页、Imagine 部件等)
  - 7.3 代码在、界面走不到的路径
  - 7.4 减少动效与强制颜色
  - 7.5 对既有内容的更正
  - 7.6 与故事书的对应 (W15 后半与 W16–W22)

> 💡 **单文件检索**：如需离线单文件全局搜索全文，可直接参阅 [单文件完整版](Claude-Desktop-2.42304.0.0-全量分析.full.md)。
