# Claude Design System (CDS) 全量技术文档库

欢迎查阅 Claude 桌面端与 CDS 设计系统的全量逆向分析与工程实现文档。本项目文档划分为**第一版 (v1.0)** 与 **第二版 (v2.0)** 两个独立的分支目录：

---

## 🚀 [第二版 (v2.0)：Claude Desktop 2.0 全量架构升级与演进报告](v2/README.md)
> **适用版本**：Claude Desktop v2.42304.0（2026-10-17 最新审计，兼容 v2.37337.1 基线）
> **核心焦点**：官方 `@ant/cds` 6 层设计令牌与 Cove 8 色可视化色板、FloatingComposer 三态胶囊变形与 16 阶渐隐遮罩、`.urm` 环形配额双搏心跳仪、Oklab 光源折页卡片、5 字体光学悬挂标点矩阵、SableOtter 光标级 HUD / CuTeach / CuWatchRecord / Hardware Buddy / ClawdQuest 五大原生交互壳层、52 大 `data-cds` 组件命名空间与 152 项纯 CSS 合成器动效参数。

* **[第 1 章：综述与版本边界](v2/01-综述与版本边界.md)**：v2.42304.0 捆绑 CLI 2.1.299 与 MSIX 多进程边界、三层演进血缘图谱、陶土品牌色克制守则与人声衬线分界。
* **[第 2 章：新增特性深度逆向](v2/02-新增特性深度逆向.md)**：独立多窗口架构、离线看板内联、离线消息重试、5 阶推理算力调节器、FloatingComposer 三态变形、`.urm` 环形配额心跳、Oklab 光泽折页卡片、5 字体光学悬挂标点及 SableOtter HUD / CuTeach / CuWatchRecord / Hardware Buddy / ClawdQuest。
* **[第 3 章：架构重构与对比分析](v2/03-架构重构与对比分析.md)**：会话侧边栏环境收敛、画布底色冷调演进、基础圆角与密度系统、模型选择用量感知、骨架屏双模、并发缺陷修复、纯 CSS 合成器化与 Tailwind v4 `@layer cds-card` 迁移架构。
* **[第 4 章：系统底座全景解密](v2/04-系统底座全景解密.md)**：152 项全域 CSS 动效关键帧、52 大 `data-cds` 原生组件命名空间契约、5 阶时间 Token 矩阵、官方 6 层令牌架构与 Cove 8 色数据可视化标准。
* **[第 5 章：生产级参考实现代码](v2/05-生产级参考实现代码.md)**：`ModelSelectorEffort.tsx`、`ChatComposerChin.tsx`、`CdsMotionEngine.tsx` 独立组件代码。
* **[第 6 章：总结与升格意义](v2/06-总结与升格意义.md)**：结构规范化、动效物理化与架构安全化三大工程跃迁总结。

---

## 🏛️ [第一版 (v1.0)：Claude Design System 1.0 逆向工程与完整组件规范](v1/README.md)
> **适用版本**：Claude Desktop v1.x 经典稳定版
> **核心焦点**：八大基础规范、30 个生产级独立组件、4 套经典物理弹簧预设、Web Audio API 纯代码合成与 AI Agent 前端开发指南。

* **[第一篇：设计哲学与设计令牌体系](v1/01-设计哲学与设计令牌体系.md)**：Surface 0-3 色彩令牌、Clay 陶土阶梯、双环弥散投影。
* **[第二篇：基础原子组件与交互控件](v1/02-基础原子组件与交互控件.md)**：CdsButton、SegmentedControl、StatusIndicators、ConfirmationDialog 等基础控件。
* **[第三篇：会话核心流与指令交互引擎](v1/03-会话核心流与指令交互引擎.md)**：ChatMessageBubbles、ThinkingAccordion、RichComposerWithMentions、ModelSwitcher 等输入终端。
* **[第四篇：动效物理学、着色器与环境光影](v1/04-动效物理学、着色器与环境光影.md)**：二阶阻尼谐振子弹簧算法、7 档非线性 Alpha 渐隐遮罩、光场着色器。
* **[第五篇：视听多媒体与产物交互物理学](v1/05-视听多媒体与产物交互物理学.md)**：Web Audio 无损和弦合成、MediaLightboxViewer、StreamingDiffViewer 等。
* **[第六篇：系统级桌面架构与协作拓扑](v1/06-系统级桌面架构与协作拓扑.md)**：macOS Vibrancy 毛玻璃、DraggableSessionList、CoworkAgentCanvas、容器查询防挤压。
* **[第七篇：工程配置与资产代码库总览](v1/07-工程配置与资产代码库总览.md)**：Tailwind 全局样式配置、30 个生产级模块源码清单与系统级资产规范。
* **[第八篇：AI Agent 前端 UI 与动效开发指南](v1/08-AI-Agent-前端-UI-与动效开发指南.md)**：AI Agent 前端设计契约、弹簧决策树与质量门禁清单。

---

## 🎨 交互式组件故事书 (Storybook)

在本地离线体验全量生产级组件的动态交互、物理弹簧阻尼与环境光影：

```bash
npm run storybook
# 或直接双击打开:
open docs/claude-components-storybook.html
```
