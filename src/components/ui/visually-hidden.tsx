import * as React from "react";

/**
 * Visually hides content while keeping it accessible to screen readers
 */
function VisuallyHidden({ children, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      {...props}
      style={{
        position: "absolute",
        border: 0,
        width: 1,
        height: 1,
        padding: 0,
        margin: -1,
        overflow: "hidden",
        clip: "rect(0, 0, 0, 0)",
        whiteSpace: "nowrap",
        wordWrap: "normal",
      }}
    >
      {children}
    </span>
  );
}

export { VisuallyHidden };
