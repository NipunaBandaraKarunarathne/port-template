import { useState } from "react";
import { PortNodeItem } from "./components/PortNode";
import { initialTree } from "./data/tree";
import type { PortNode } from "./types/PortNode";
import "./styles.css";

export default function App() {
  const [tree, setTree] = useState<PortNode>(initialTree);

  const addRootNode = () => {
    setTree({
      ...tree,
      children: [
        ...tree.children,
        { id: crypto.randomUUID(), value: "", children: [] },
      ],
    });
  };

  const addNode = (id: string) => {
    const add = (node: PortNode): PortNode => {
      if (node.id === id) {
        return {
          ...node,
          children: [
            ...node.children,
            { id: crypto.randomUUID(), value: "", children: [] },
          ],
        };
      }
      return { ...node, children: node.children.map(add) };
    };
    setTree(add(tree));
  };

  const updateValue = (id: string, value: string) => {
    const update = (node: PortNode): PortNode => {
      if (node.id === id) return { ...node, value };
      return { ...node, children: node.children.map(update) };
    };
    setTree(update(tree));
  };

  return (
    <div className="page">
      {/* Header */}
      <div className="header">
        <span className="title">Port Template</span>
      </div>

      {/* Toolbar */}
      <div className="toolbar">
        <button className="add-root" onClick={addRootNode}>
          +
        </button>

        <div className="actions">
          <button className="btn outline">Back</button>
          <button className="btn primary">Save</button>
        </div>
      </div>

      {/* Editor */}
      <div className="editor">
        <PortNodeItem node={tree} onAdd={addNode} onChange={updateValue} />
      </div>
    </div>
  );
}
