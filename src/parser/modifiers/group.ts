import { nanoid } from "nanoid"
import produce from "immer"
import * as AST from "../ast"
import { getNodeById, getNodesByIds } from "../visit"
import { replaceFromLists } from "./replace"

function unGroup(nodeList: AST.Node[], selectNode: AST.GroupNode) {
  const { children } = selectNode
  replaceFromLists(nodeList, [selectNode], children!)
  return children.map(({ id }) => id)
}

export const updateGroup = (
  ast: AST.Regex,
  selectedIds: string[],
  group: AST.Group | null
) => {
  let nextSelectedIds: string[] = selectedIds
  const nextAst = produce(ast, (draft) => {
    const { node, nodeList, index } = getNodeById(draft, selectedIds[0])
    if (node.type === "group") {
      if (group === null) {
        nextSelectedIds = unGroup(nodeList, node)
      } else {
        const { id, type, children, quantifier } = node
        const groupNode: AST.GroupNode = {
          id,
          type,
          children,
          quantifier,
          ...group,
        }
        nodeList[index] = groupNode
      }
    }
  })

  return { nextAst, nextSelectedIds }
}

export const groupIt = (
  ast: AST.Regex,
  selectedIds: string[],
  group: AST.Group
) => {
  const id = nanoid()
  const nextSelectedIds: string[] = [id]
  const nextAst = produce(ast, (draft) => {
    let groupNode: AST.GroupNode
    const { nodes, nodeList } = getNodesByIds(draft, selectedIds)
    switch (group.kind) {
      case "capturing":
        groupNode = {
          id,
          type: "group",
          kind: "capturing",
          children: [],
          name: "",
          index: 0,
          quantifier: null,
        }
        break
      case "nonCapturing":
        groupNode = {
          id,
          type: "group",
          kind: "nonCapturing",
          children: [],
          quantifier: null,
        }
        break
      case "namedCapturing":
        groupNode = {
          id,
          type: "group",
          kind: "namedCapturing",
          children: [],
          name: group.name,
          index: 0,
          quantifier: null,
        }
        break
    }
    groupNode.children = nodes
    replaceFromLists(nodeList, nodes, [groupNode])
  })
  return { nextAst, nextSelectedIds }
}
