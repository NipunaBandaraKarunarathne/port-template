
import type { PortNode } from "../types/PortNode";

interface Props {
  node: PortNode;
  onAdd: (id: string) => void;
  onChange: (id: string, value: string) => void;
}

export function PortNodeItem({ node, onAdd, onChange }: Props) {
  return (
    <div className={`node ${node.id === "root" ? "root" : ""}`}>
      {node.id !== "root" && (
        <div className="node-row">
          <span className="h-line" />
          <input
            className="node-input"
            value={node.value}
            onChange={(e) => onChange(node.id, e.target.value)}
          />
          <button className="add-btn" onClick={() => onAdd(node.id)}>
            +
          </button>
        </div>
      )}

      {node.children.length > 0 && (
        <div className="children">
          {node.children.map((child) => (
            <PortNodeItem
              key={child.id}
              node={child}
              onAdd={onAdd}
              onChange={onChange}
            />
          ))}
        </div>
      )}
    </div>
  );
}
