// A TUI pane: bordered box with its title sitting in the top border.
export default function Pane({
    title,
    right,
    as: Tag = "div",
    className = "",
    children,
    ...rest
}) {
    return (
        <Tag className={`pane ${className}`} {...rest}>
            {title && <span className="pane-title">{title}</span>}
            {right && <span className="pane-title-right">{right}</span>}
            {children}
        </Tag>
    );
}
