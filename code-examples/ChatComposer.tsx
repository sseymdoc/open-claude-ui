/**
 * Claude Design System (CDS) - Chat Composer Terminal
 * 
 * 逆向溯源：Claude Desktop 2.42304.0.0 安装包 CSS (c6a992d55-sXiDGMFQ.css) 与 claude.ai 实测的输入框实现。
 * 核心规范：
 *   - .875rem 圆角 (--cds-radius-composer：comfortable 14px，compact .75rem = 12px；claude.ai 实测)
 *   - 三态双环动态弥散投影 (--cds-shadow-composer, :hover, :focus-within)
 *   - 原生 CSS field-sizing: content 自适应弹性伸缩 (min 48px, max 384px)
 *   - 陶土发送键 (--cds-fill-brand #c6613f → hover #d97757)，按压只缩放背景层 .cds-btn-squish
 *   - 双环悬浮弹出菜单 (--cds-shadow-popover)
 */

import React, { useState, useRef, useEffect } from "react";

export interface AttachmentItem {
  id: string | number;
  name: string;
  size: string;
  type?: string;
}

export interface ChatComposerProps {
  onSendMessage?: (content: string, attachments: AttachmentItem[], model: string, thinking: boolean) => void;
  placeholder?: string;
  initialModel?: string;
  className?: string;
}

export const CLAUDE_MODELS = [
  { id: "claude-fable-5-1", name: "Fable 5.1", badge: "应对您最艰巨的挑战" },
  { id: "claude-opus-5-5", name: "Opus 5.5", badge: "适用于复杂工作与日常任务" },
  { id: "claude-sonnet-5-5", name: "Sonnet 5.5", badge: "处理简单任务效率最高" },
  { id: "claude-haiku-5-5", name: "Haiku 5.5", badge: "快速解答的最佳选择" },
];

export function ChatComposer({
  onSendMessage,
  placeholder = "Reply to Claude... (Shift + Enter to insert line break)",
  initialModel = "Opus 5.5",
  className = "",
}: ChatComposerProps) {
  const [inputText, setInputText] = useState("");
  const [attachments, setAttachments] = useState<AttachmentItem[]>([]);
  const [selectedModel, setSelectedModel] = useState(initialModel);
  const [isThinkingEnabled, setIsThinkingEnabled] = useState(true);
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
  const [isModelMenuOpen, setIsModelMenuOpen] = useState(false);
  const [isComposing, setIsComposing] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const addMenuRef = useRef<HTMLDivElement>(null);
  const modelMenuRef = useRef<HTMLDivElement>(null);

  // 点击外部关闭弹出层
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (addMenuRef.current && !addMenuRef.current.contains(event.target as Node)) {
        setIsAddMenuOpen(false);
      }
      if (modelMenuRef.current && !modelMenuRef.current.contains(event.target as Node)) {
        setIsModelMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSend = () => {
    if (!inputText.trim() && attachments.length === 0) return;
    onSendMessage?.(inputText.trim(), attachments, selectedModel, isThinkingEnabled);
    setInputText("");
    setAttachments([]);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // 官方 Claude 核心断言: 如果正在进行输入法合成 (CJK) 或 keyCode 为 229，绝对放行并终止响应
    if (isComposing || e.nativeEvent.isComposing || e.keyCode === 229) {
      return;
    }

    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleRemoveAttachment = (id: string | number) => {
    setAttachments((prev) => prev.filter((a) => a.id !== id));
  };

  const handleSimulateAddAttachment = (name: string, size: string, type: string) => {
    setAttachments((prev) => [...prev, { id: Date.now(), name, size, type }]);
    setIsAddMenuOpen(false);
  };

  return (
    <div className={`w-full max-w-3xl mx-auto px-4 ${className}`}>
      {/* 核心终端外壳：--cds-radius-composer 圆角与三态双环投影 */}
      <div
        className="relative flex flex-col w-full rounded-composer bg-white dark:bg-[#1a1a19] p-[0.875rem] gap-y-2 transition-all duration-200"
        style={{
          boxShadow: "var(--cds-shadow-composer, 0 4px 20px rgba(0, 0, 0, 0.035), inset 0 0 0 1px var(--cds-border, rgba(0, 0, 0, 0.08)))",
        }}
      >
        {/* 1. 待发送附件水平滚动展示区 */}
        {attachments.length > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-1.5 pt-0.5">
            {attachments.map((file) => (
              <div
                key={file.id}
                className="px-2.5 py-1 rounded-lg bg-neutral-50 dark:bg-neutral-800 border border-neutral-200/80 dark:border-neutral-700 text-xs flex items-center gap-2 shadow-2xs transition-all animate-fade"
              >
                <div className="size-4 rounded bg-clay/10 text-clay flex items-center justify-center font-mono text-[9px] font-bold">
                  {file.type?.[0] || "F"}
                </div>
                <span className="font-medium text-neutral-800 dark:text-neutral-200 truncate max-w-[140px]">
                  {file.name}
                </span>
                <span className="text-[10px] text-neutral-400 font-mono">{file.size}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveAttachment(file.id)}
                  className="text-neutral-400 hover:text-red-500 hover:bg-neutral-200/50 dark:hover:bg-neutral-700 size-4 rounded-full flex items-center justify-center transition-colors"
                  aria-label="Remove attachment"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        {/* 2. 原生 CSS 自适应伸缩文本域 */}
        <textarea
          ref={textareaRef}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={() => setIsComposing(false)}
          placeholder={placeholder}
          rows={1}
          className="w-full max-h-96 min-h-[3rem] bg-transparent border-none outline-none resize-none text-[15px] leading-[1.4] text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 pl-1.5 focus:ring-0 overflow-y-auto"
          style={{
            // @ts-ignore - Modern CSS property supported in Chromium 123+ & Safari 17.4+
            fieldSizing: "content",
          }}
        />

        {/* 3. 底部功能控制栏 */}
        <div className="flex items-center justify-between pt-1 border-t border-transparent">
          {/* 左侧控制胶囊群 */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {/* + Add Content 弹出菜单 */}
            <div className="relative" ref={addMenuRef}>
              <button
                type="button"
                onClick={() => setIsAddMenuOpen(!isAddMenuOpen)}
                className="h-8 px-2.5 rounded-lg flex items-center gap-1.5 text-xs font-medium text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              >
                <span className="text-sm font-semibold">+</span>
                <span>Add content</span>
              </button>

              {isAddMenuOpen && (
                <div
                  className="absolute bottom-full left-0 mb-2 w-52 rounded-xl bg-white dark:bg-[#222220] p-1.5 z-30 space-y-0.5"
                  style={{
                    boxShadow: "var(--cds-shadow-popover, 0 8px 24px rgba(0, 0, 0, 0.12), 0 2px 6px rgba(0, 0, 0, 0.08), inset 0 0 0 1px rgba(0, 0, 0, 0.08))",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => handleSimulateAddAttachment("architecture.ts", "4.2 KB", "TS")}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 text-xs flex items-center gap-2 text-neutral-800 dark:text-neutral-200 transition-colors"
                  >
                    <span className="text-clay font-mono font-bold">&lt;/&gt;</span>
                    <span>Upload Code (architecture.ts)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSimulateAddAttachment("system-spec.pdf", "182 KB", "PDF")}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 text-xs flex items-center gap-2 text-neutral-800 dark:text-neutral-200 transition-colors"
                  >
                    <span className="text-blue-500 font-mono font-bold">PDF</span>
                    <span>Upload Document (spec.pdf)</span>
                  </button>
                </div>
              )}
            </div>

            {/* 模型切换药丸胶囊 */}
            <div className="relative" ref={modelMenuRef}>
              <button
                type="button"
                onClick={() => setIsModelMenuOpen(!isModelMenuOpen)}
                className="h-8 px-2.5 rounded-lg flex items-center gap-1.5 text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 border border-neutral-200/60 dark:border-neutral-700/60 transition-colors"
              >
                <span className="size-2 rounded-full bg-clay" />
                <span>{selectedModel}</span>
                <span className="text-[10px] text-neutral-400">▾</span>
              </button>

              {isModelMenuOpen && (
                <div
                  className="absolute bottom-full left-0 mb-2 w-56 rounded-xl bg-white dark:bg-[#222220] p-1.5 z-30 space-y-1"
                  style={{
                    boxShadow: "var(--cds-shadow-popover, 0 8px 24px rgba(0, 0, 0, 0.12), 0 2px 6px rgba(0, 0, 0, 0.08), inset 0 0 0 1px rgba(0, 0, 0, 0.08))",
                  }}
                >
                  {CLAUDE_MODELS.map((model) => (
                    <button
                      key={model.id}
                      type="button"
                      onClick={() => {
                        setSelectedModel(model.name);
                        setIsModelMenuOpen(false);
                      }}
                      className={`w-full text-left p-2 rounded-lg text-xs flex items-center justify-between transition-colors ${
                        selectedModel === model.name
                          ? "bg-clay/10 text-neutral-900 dark:text-white font-semibold"
                          : "text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                      }`}
                    >
                      <div className="flex flex-col">
                        <span>{model.name}</span>
                        <span className="text-[10px] text-neutral-400 font-normal">{model.badge}</span>
                      </div>
                      {selectedModel === model.name && <span className="text-clay font-bold">✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Extended Thinking 深度思考开关 */}
            <button
              type="button"
              onClick={() => setIsThinkingEnabled(!isThinkingEnabled)}
              className={`h-8 px-2.5 rounded-lg flex items-center gap-1.5 text-xs font-medium transition-all ${
                isThinkingEnabled
                  ? "bg-clay/15 text-clay border border-clay/30"
                  : "text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              }`}
            >
              <span>💡</span>
              <span>Thinking</span>
            </button>
          </div>

          {/* 右侧发送按钮：陶土色，只有背景层随按压缩放 */}
          <button
            type="button"
            onClick={handleSend}
            disabled={!inputText.trim() && attachments.length === 0}
            className="group/btn relative isolate size-8 rounded-lg flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed text-white shrink-0"
            aria-label="Send message"
          >
            <span aria-hidden="true" className="cds-btn-squish absolute inset-0 -z-10 rounded-[inherit] bg-[var(--cds-fill-brand)] group-hover/btn:bg-[var(--cds-fill-brand-hover)] shadow-xs transition-colors" />
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" />
              <path d="M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
