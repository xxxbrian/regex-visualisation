import React, { useRef, useState, useEffect, useContext } from "react"
import { Node, Box, RenderVirtualNode, RenderNode } from "@/types"
import Traverse from "./traverse"
import SvgContainer from "./svgContainer"
import VisContext from "../context"
import { ActionTypes } from "@/reducers/vis"

const Railroad: React.FC<{}> = React.memo(() => {
  const {
    state: { nodes, selectedNodes },
    dispatch,
  } = useContext(VisContext)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [traverse] = useState<Traverse>(new Traverse(canvasRef))
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const [rootRenderNode, setRootRenderNode] = useState<RenderVirtualNode>({
    type: "virtual",
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    children: [],
  })

  useEffect(() => {
    const rootRenderNode = traverse.render(nodes)
    const { width, height } = rootRenderNode
    setWidth(width)
    setHeight(height)
    setRootRenderNode(rootRenderNode)
  }, [nodes, traverse])

  const handleSelect = (nodes: Node[] | Node) => {
    dispatch({
      type: ActionTypes.SELECT_NODES,
      payload: { selected: nodes },
    })
  }

  const onDragSelect = (box: Box) => {
    const { x: boxX, y: boxY, width: boxWidth, height: boxHeight } = box
    const selectedNodes: Node[] = []
    let selected = false
    function dfs(renderNode: RenderVirtualNode | RenderNode) {
      const { children } = renderNode
      for (let i = 0; i < children.length; i++) {
        const child = children[i]
        switch (child.type) {
          case "node":
            const { target, x, y, width, height } = child
            if (target.type !== "root") {
              const overlapX = boxX < x && boxX + boxWidth > x + width
              const overlapY = boxY < y && boxY + boxHeight > y + height
              if (overlapX && overlapY) {
                selected = true
                selectedNodes.push(target)
                break
              } else if (selected) {
                return
              }
            }
            dfs(child)
            break
          case "virtual":
            dfs(child)
            break
          default:
            break
        }
      }
    }
    dfs(rootRenderNode)
    handleSelect(selectedNodes)
  }

  const onClick = (node: Node) => {
    handleSelect(node)
  }
  return (
    <>
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", top: "-9999px", left: "-9999px" }}
      ></canvas>
      <SvgContainer
        width={width}
        height={height}
        rootRenderNode={rootRenderNode}
        selectedNodes={selectedNodes}
        onDragSelect={onDragSelect}
        onClick={onClick}
      ></SvgContainer>
    </>
  )
})

export default Railroad
