import { useState } from "react";
import type { PortNode } from "../types/PortNode";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdDelete } from "react-icons/md";

interface Props {
  node: PortNode;
  onAdd: (id: string) => void;
  onChange: (id: string, value: string) => void;
  onDelete: (id: string) => void;
  onToggleReadOnly: (id: string) => void;
}

export function PortNodeItem({
  node,
  onAdd,
  onChange,
  onDelete,
  onToggleReadOnly,
}: Props) {
  const [active, setActive] = useState(false);

  return (
    <div className="node-block">
      {node.id !== "root" && (
        <div
          className={`node-row ${active ? "active" : ""}`}
          onFocus={() => setActive(true)}
          onBlur={() => setActive(false)}
        >
          <span className="h-line" />

          <input
            className="node-input"
            value={node.value}
            readOnly={node.readOnly}
            onChange={(e) => onChange(node.id, e.target.value)}
          />

          {/* CONTEXT TOOLBAR */}
          {active && (
            <div
              className="node-actions"
              onMouseDown={(e) => e.preventDefault()}
            >
              <label className="readonly-toggle">
                Read only
                <input
                  type="checkbox"
                  checked={!!node.readOnly}
                  onChange={() => onToggleReadOnly(node.id)}
                />
              </label>

              <button
                className="icon-btn danger"
                onMouseDown={() => onDelete(node.id)}
              >
                 🗑 
              </button>

              <button
                className="icon-btn primary"
                onMouseDown={() => onAdd(node.id)}
              >
                +
              </button>
            </div>
          )}
        </div>
      )}

      {node.children.length > 0 && (
        <div className="children">
          <span className="v-line" />
          {node.children.map((child) => (
            <PortNodeItem
              key={child.id}
              node={child}
              onAdd={onAdd}
              onChange={onChange}
              onDelete={onDelete}
              onToggleReadOnly={onToggleReadOnly}
            />
          ))}
        </div>
      )}
    </div>
  );
}
