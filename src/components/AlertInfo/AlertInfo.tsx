import { ReactNode } from "react";
import cx from "classnames";

import InfoIconComponent from "img/ic_info.svg?react";
import WarnIconComponent from "img/ic_warn.svg?react";

import "./AlertInfo.scss";

interface Props {
  type: "warning" | "info";
  children: ReactNode;
  className?: string;
  compact?: boolean;
  noMargin?: boolean;
  onClick?: () => void;
  /**
   * @default "text-slate-100"
   */
  textColor?: "text-slate-100" | "text-yellow-500";
}

export function AlertInfo({
  compact: smallMargin = false,
  noMargin = false,
  children,
  type,
  textColor = "text-slate-100",
  className,
  onClick,
}: Props) {
  const Icon = type === "warning" ? WarnIconComponent : InfoIconComponent;
  return (
    <div className={cx("AlertInfo", { smallMargin, noMargin }, textColor, className)} onClick={onClick}>
      <div className="AlertInfo-icon">
        <Icon aria-label="Alert Icon" />
      </div>
      <div className={cx("AlertInfo-text")}>{children}</div>
    </div>
  );
}
