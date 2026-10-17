import React from 'react';
import { ModelSelectorEffort, EffortLevel } from './ModelSelectorEffort';

export interface ChatComposerChinProps {
  currentEffort: EffortLevel;
  onEffortChange: (effort: EffortLevel) => void;
}

/** Chin 渲染在输入框卡片外、卡片下方（claude.ai 实测），不要放进卡片内部。 */
export const ChatComposerChin: React.FC<ChatComposerChinProps> = ({
  currentEffort,
  onEffortChange
}) => {
  return (
    <div
      className="cds-root w-full border-t border-[var(--cds-border-subtle,rgba(0,0,0,0.08))] bg-[var(--cds-surface,#FCFBF7)] px-3 py-1.5"
      data-cds="ChatComposerChin"
    >
      {/* 下颌操作行 (自带触控补偿) */}
      <div
        data-touch-size="true"
        className="flex items-center justify-between min-h-[28px]"
        style={{
          // 原生 CDS 负边距补偿算法
          '--cds-h-control': '36px',
          '--cmp-chin-row-h': '28px',
        } as React.CSSProperties}
      >
        <div className="flex items-center gap-2">
          {/* 模型与推理调节器 */}
          <ModelSelectorEffort currentEffort={currentEffort} onEffortChange={onEffortChange} />
          
          <button
            type="button"
            data-cds="Button"
            className="px-2 py-1 text-xs text-neutral-600 hover:text-neutral-900 rounded hover:bg-neutral-100 transition-colors"
          >
            + Attach
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] text-neutral-400">⌘ + Enter to send</span>
          <button
            type="button"
            data-cds="Button"
            className="w-7 h-7 rounded-full bg-neutral-900 text-white flex items-center justify-center hover:bg-neutral-800 transition-colors"
          >
            ↑
          </button>
        </div>
      </div>
    </div>
  );
};
