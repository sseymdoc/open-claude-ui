/**
 * Claude Design System (CDS) - Button System
 * 
 * 逆向溯源：依据 REA v6.5.0 对 Claude Desktop 生产环境 (shared-frame-BfjMqbuN.js / c6a992d55-sXiDGMFQ.css)
 * AST 逆向提取的完整按钮阶梯与物理阻尼规范。
 * 
 * 核心准则：
 *   - 严格遵循“单闭合边框原则 (The 1-Border Rule)”：卡片内部的 Secondary 按钮严禁带边框，默认采用 Surface-2 浅底填充。
 *   - 尺寸阶梯（claude.ai 实测）：XXS (20px)、XS (24px, 6px圆角)、SM (28px, 7px圆角)、MD (32px, 8px圆角)、LG (40px, 10px圆角)。
 *   - 主按钮为中性黑白 (--cds-fill-primary #0b0b0b / 深色 #fff)；陶土 (--cds-fill-brand) 只给发送键与 Spark。
 *   - 物理阻尼：只有背景层 .cds-btn-squish 随按压缩放（60ms ease-out 到 .975，松开 450ms --cds-btn-spring 回弹），图标与文字不缩放。
 *   - 架构分离：button（尺寸、圆角、内容）> span.cds-btn-squish（absolute · -z-10）> span 绘景图层 (data-cds-part="paint")。
 *   - 焦点环：--cds-focus-shadow（accent 蓝 1px + 6px 光晕）。
 */

import React, { forwardRef } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger" | "brand" | "onContent" | "outline";
export type ButtonSize = "xxs" | "xs" | "sm" | "md" | "lg" | "icon";

export interface CdsButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  isLoading?: boolean;
  indicator?: React.ReactNode;
}

const SIZE_STYLES: Record<ButtonSize, string> = {
  xxs: "h-5 px-1.5 rounded text-[11px] gap-1",
  xs: "h-6 px-2 rounded-[6px] text-[13px] gap-1",
  sm: "h-7 px-2.5 rounded-[7px] text-sm gap-1.5",
  md: "h-8 px-3 rounded-lg text-sm gap-1.5",
  lg: "h-10 px-4 rounded-[10px] text-[15px] gap-2 font-medium",
  icon: "size-8 rounded-lg p-0 flex items-center justify-center",
};

const VARIANT_STYLES: Record<ButtonVariant, { text: string; paint: string }> = {
  // 1. 次级操作（Claude 官方默认变体）：严格无边框，采用二次表面填充 + 柔和 Hover 漫反射
  secondary: {
    text: "text-neutral-800 dark:text-neutral-200 font-normal",
    paint: "bg-[var(--cds-fill-secondary,rgba(0,0,0,0.06))] group-hover/btn:bg-[var(--cds-fill-secondary-hover,rgba(0,0,0,0.1))] dark:bg-white/10 dark:hover:bg-white/15 shadow-field",
  },
  // 2. 主操作：中性黑白实色填充（陶土色只属于 brand / 发送键）
  primary: {
    text: "text-[var(--cds-on-primary)] font-medium",
    paint: "bg-[var(--cds-fill-primary)] group-hover/btn:bg-[var(--cds-fill-primary-hover)] shadow-2xs",
  },
  // 3. 幽灵操作：无背景无边框，悬停时浅灰微光
  ghost: {
    text: "text-neutral-600 dark:text-neutral-300 font-normal",
    paint: "bg-transparent group-hover/btn:bg-[var(--cds-fill-ghost-hover,rgba(0,0,0,0.05))] dark:group-hover/btn:bg-white/5",
  },
  // 4. 警示破坏操作
  danger: {
    text: "text-white font-medium",
    paint: "bg-red-600 hover:bg-red-700 shadow-2xs",
  },
  // 5. 官方品牌操作
  brand: {
    text: "text-white font-medium",
    paint: "bg-[var(--cds-fill-brand)] group-hover/btn:bg-[var(--cds-fill-brand-hover)] shadow-2xs",
  },
  // 6. 浮动媒体操作（深色或视频内容覆层）
  onContent: {
    text: "text-white font-medium",
    paint: "bg-[var(--cds-button-on-content,rgba(0,0,0,0.5))] backdrop-blur-md shadow-[inset_0_0_0_1px_rgba(255,255,255,0.15)] group-hover/btn:bg-[var(--cds-button-on-content-hover,rgba(0,0,0,0.7))]",
  },
  // 兼容别名：仅限空白画布展示，禁止放入已带外框的卡片中
  outline: {
    text: "text-neutral-700 dark:text-neutral-300 font-normal",
    paint: "bg-transparent group-hover/btn:bg-neutral-100/60 dark:group-hover/btn:bg-neutral-800/60 border border-neutral-200/90 dark:border-neutral-700/80",
  },
};

export const CdsButton = forwardRef<HTMLButtonElement, CdsButtonProps>(
  (
    {
      variant = "secondary",
      size = "md",
      icon,
      iconPosition = "left",
      isLoading = false,
      indicator,
      disabled = false,
      children,
      className = "",
      ...props
    },
    ref
  ) => {
    const isIconOnly = size === "icon" || (!children && !!icon);
    const variantStyle = VARIANT_STYLES[variant];

    return (
      <button
        ref={ref}
        data-cds="Button"
        disabled={disabled || isLoading}
        className={`group/btn relative isolate inline-flex shrink-0 items-center justify-center font-sans select-none cursor-pointer border-0 outline-none focus-visible:outline-hidden focus-visible:shadow-[var(--cds-focus-shadow)] disabled:opacity-35 disabled:cursor-not-allowed disabled:pointer-events-none transition-shadow duration-fast ${
          SIZE_STYLES[size]
        } ${variantStyle.text} ${className}`}
        {...props}
      >
        {/* 按压缩放层：只有它随 :active 缩放，内含独立绘景图层 (data-cds-part="paint") */}
        <span aria-hidden="true" className="cds-btn-squish absolute inset-0 -z-10 rounded-[inherit]">
          <span
            data-cds-part="paint"
            className={`absolute inset-0 rounded-[inherit] transition-[background-color,box-shadow,color] duration-fast ease-out ${variantStyle.paint}`}
          />
        </span>

        {/* 加载旋转指示器 */}
        {isLoading ? (
          <span className="size-3.5 border-2 border-current border-t-transparent rounded-full animate-spin shrink-0" />
        ) : (
          icon && iconPosition === "left" && (
            <span className="shrink-0 flex items-center justify-center leading-none">
              {icon}
            </span>
          )
        )}

        {/* 文本内容 */}
        {children && <span className="truncate">{children}</span>}

        {/* 右侧图标 */}
        {!isLoading && icon && iconPosition === "right" && !isIconOnly && (
          <span className="shrink-0 flex items-center justify-center leading-none">
            {icon}
          </span>
        )}

        {/* 状态微点插槽 (如脉冲呼吸微点) */}
        {indicator && (
          <span data-cds-part="indicator" className="shrink-0 ml-1">
            {indicator}
          </span>
        )}
      </button>
    );
  }
);

CdsButton.displayName = "CdsButton";
