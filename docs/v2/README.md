# Claude Desktop 2.0 (v2.42304.0 / v2.37337.1) 全量版本更新深度逆向分析与 CDS 2.0 架构演进报告

> **目标应用载体**：Anthropic 官方桌面端生产包 Windows MSIX `Claude_2.42304.0.0_x64__pzs8sxrjxfjjc` 与 macOS `/Applications/Claude.app`
> **二进制元数据**：`@ant/desktop v2.42304.0`（Build: `2026-10-15T05:54:05Z`，Commit: `e7f60e658f15cfece9efa384a78a39aec3c12845`，捆绑 CLI `2.1.299`，`app.asar` Evidence: `ev_db29cf6b5757fd86666fd272343cccd383bf391d00dac49aada8f2d616fa36c8`）及 `v2.37337.1` 基线
> **逆向工具栈**：**[REA (Reverse Engineer Anything) v6.5.0](https://github.com/morluto/rea)** 全流程执行 Fuse 熔丝扫描、Mach-O 代码签名提取、AST 抽象语法树解构与 Electron ASAR 运行时逆向审计。

---

## 1. 1.x 对话外壳 vs 2.0 执行沙箱工作站对比

| 模块 / 维度 | 1.x 对话外壳 | 2.0 执行沙箱工作站 | 变革类型 | 核心收益 |
| :--- | :--- | :--- | :---: | :--- |
| **定位边界** | 休闲聊天对话外壳 | 企业级执行沙箱工作站 | **定位跃迁** | 从单轮会话升格为工程生产力工作台 |
| **输入终端** | 20px 巨圆角胶囊框 | 12px 扁平圆角 + 28px 下颌行 | **重构** | 四角释放空间，引入 `--cmp-chin-touch-grow: 4px` 触控补偿 |
| **思考调节** | 仅开/关二元开关 | 5 阶算力调节 (Low ~ Max) | **新增** | 精细化管理 Token 成本，支持企业策略锁定与 Max 熔断警示 |
| **离线消息** | 断网报错，刷新即丢失 | IndexedDB 事务级本地暂存队列 | **新增** | 零丢失承诺，断网呼出琥珀色重发横幅，重启程序自动恢复 |
| **动效引擎** | JS (Framer Motion) 占用主线程 | 纯 CSS Compositor 合成器 (152 项关键帧) | **重构** | 彻底消除 100+ tokens/s 流式吐字时的主线程丢帧与发烫瓶颈 |
| **弹簧微交互** | 简单线性或单阶缓动 | 1.32x 过冲回弹 (`cubic-bezier`) | **重构** | 增加 32% 物理超调量，打造机械果冻手感 |
| **骨架屏质感** | 垂直 90° 死板复印机扫光 | 105° 倾斜非线性双模扫光 | **重构** | 斜向流光模拟玻璃折射，显著缓解心理等待焦虑 |
| **会话侧边栏** | 36px 宽松卡片，时间倒序 | 28px 高密行 + 本地/云端/沙箱四态收敛 | **重构** | 原生内嵌 Git 分支、PR 胶囊与章节图钉 (Pin as chapter) |
| **视觉底色** | 暖米黄纸张色 + 静态深阴影 | 冷雪花白 `#FCFCFB` + 0.5px 发丝边 | **重构** | 严格践行单边框法则，`color-mix()` 相对色彩动态漫反射 |
| **窗口与全局交互** | 单一 Electron 窗口反复切换 | 15 窗口拓扑 + SableOtter HUD / CuTeach / Buddy | **新增** | 光标级全局 AI 改写听写、屏幕录制提炼技能、BLE 创客硬件联动 |

---

## 🧭 第二版分章目录与导读索引

- [第一章：综述与版本边界](01-综述与版本边界.md)
  - 1.1 版本边界声明 (v2.42304.0 捆绑 CLI 2.1.299 与 MSIX 多进程宿主边界)
  - 1.2 全局设计契约演进 (环境不可变性、零丢失承诺、陶土品牌色克制守则与人声衬线分界)
- [第二章：新增特性深度逆向](02-新增特性深度逆向.md)
  - 2.1 独立多窗口架构 (Electron IPC 弹射窗口、会话隔离与 Find-in-Page)
  - 2.2 离线可视化组件 (随包内联 Mermaid/Chart.js/Grid.js 与失活行规范)
  - 2.3 离线消息重试机制 (ChatComposerQueuedMessages 与 IndexedDB 事务持久化)
  - 2.4 推理算力调节器 (ModelSelectorEffort 5 阶档位与企业策略防线)
  - 2.5 现代 CSS 动效系统 (sibling-index() 级联、View Transitions 页面转场、Scroll-Driven 滚动驱动遮罩)
  - 2.6 首页卡片微光浮空 (3D 悬浮透视与底部高光径向渐变)
  - 2.7 极细发丝边与相对色彩 (0.5px 发丝细边与 color-mix() 动态漫反射)
  - 2.8 触控负边距补偿 (--cmp-chin-touch-grow 尺寸补偿算法)
  - 2.9 企业托管配置迁移 (6 大破坏性键名映射、未托管降级风险、OAuth 重新认证)
  - 2.10 悬浮输入框三态几何变形与 16 阶渐隐遮罩 (FloatingComposer handle/pill/composer 变形)
  - 2.11 环形配额仪表与三阶生理心跳曲线 (Usage Ring Meter .urm 彗星尾迹与 19 点双搏心跳)
  - 2.12 Oklab 光泽纸张卡片与标尺微动效 (Sheet Card 200° 光源旋转与 Epitaxy 文档刻度尺)
  - 2.13 5 字体光学悬挂标点与字距补偿矩阵 (serif/sans/atkinson/dyslexia 悬挂引号与负字偶距)
  - 2.14 桌面全局多模态交互壳层 (SableOtter HUD、CuTeach、CuWatchRecord、Hardware Buddy 与 ClawdQuest)
- [第三章：架构重构与对比分析](03-架构重构与对比分析.md)
  - 3.1 会话侧边栏与环境收敛 (28px 高密状态列、四态物理源分组收敛、Git 分支与 PR 胶囊、Halo 心跳)
  - 3.2 工作台画布与底色演进 (暖陶土信纸跃迁为冷雪花白 #FCFCFB、暗部墨黑 #151515 对比分析)
  - 3.3 基础圆角与密度系统 (Composer 圆角 20px 降为 12px/14px、Density 紧凑/舒适双模引擎)
  - 3.4 模型选择器与用量感知 (选模用量仪表化、5 小时配额感知、Context 移入新建会话抽屉)
  - 3.5 骨架屏与胶囊微交互 (Pill 1.32x 过冲回弹两段式形变、Skeleton 双模 Wave/Lockstep + 105° 扫光)
  - 3.6 运行时并发与环境隔离 (十大关键并发缺陷修复、Windows OpenSSH 路径硬锁定与证书轮换)
  - 3.7 章节图钉界面泄漏 (Pin as chapter 真实面目与内部工具取证)
  - 3.8 动效纯 CSS 合成器化 (为什么全面 Compositor 化，消解 100+ tokens/s 流式吐字掉帧瓶颈)
  - 3.9 Tailwind v4 CSS-First 引擎迁移与双代际样式共存 (@layer cds-card 法则与桌面按钮箭头光标约定)
- [第四章：系统底座全景解密](04-系统底座全景解密.md)
  - 4.1 纯 CSS 动效参数 (152 项全域 @keyframes 与 55 项主窗口关键帧完整清单)
  - 4.2 原生组件命名空间 (52 大 data-cds 原生组件命名空间契约与 79 项结构槽位)
  - 4.3 响应时间与贝塞尔曲线 (5 阶时间 Token 60ms~450ms 与 3 大精确贝塞尔控制点)
  - 4.4 官方 @ant/cds 六层令牌架构与 Cove 数据可视化设计体系 (6 层模型、逆混色方程与 Cove 8 色色板)
- [第五章：生产级参考实现代码](05-生产级参考实现代码.md)
  - 5.1 模型选择与算力调节器 (`ModelSelectorEffort.tsx`)
  - 5.2 输入框底部工具栏 (`ChatComposerChin.tsx`)
  - 5.3 动效引擎与微交互 (`CdsMotionEngine.tsx`)
- [第六章：总结与升格意义](06-总结与升格意义.md)
  - 6.1 结构规范化
  - 6.2 动效物理化
  - 6.3 架构安全化

> 💡 **单文件检索**：如需离线单文件全局搜索第二版全文，可直接参阅 [第二版单文件完整版](Claude-Desktop-2.0-全量分析.full.md)。
