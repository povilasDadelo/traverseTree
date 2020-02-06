import React, { Component } from 'react'
import styled from 'styled-components'
import _ from 'lodash'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 20px;
`

const ChildrenContainer = styled.div`
  display: flex;
`

const NameContainer = styled.div`
  border: solid 1px blue;
  display: flex;
  flex: 1;
  margin-right: 10px;
`

const Name = styled.div`
  margin-right: 20px;
`

const AddIcon = styled.div`
  margin-right: 10px;
  cursor: pointer;
`

const Member = ({ name, click }) => (
  <NameContainer>
    <Name>{name}</Name>
    <AddIcon onClick={click}>+</AddIcon>
  </NameContainer>
)

class Recursive extends Component {
  rebuildObject(item, parentId, newChild) {
    if (item.id === parentId) {
      item.children.push(newChild)

      return item
    }
    if (!item.children.length) return item

    return {
      ...item,
      children: item.children.map(node => this.rebuildObject(node, parentId, newChild))
    }
  }

  addChildren(parent) {
    const newPerson = window.prompt('Add new person to family')
    const tree = this.props.rootTree || this.props.tree
    const deepTreeCopy = _.cloneDeep(tree)
    const newChild = { name: newPerson, children: [], id: Math.random() }
    const newTree = this.rebuildObject(deepTreeCopy, parent.id, newChild)

    this.props.setList({ newTree })
  }

  hasChildren(obj) {
    return obj.children && obj.children.length
  }

  render() {
    const { tree, rootTree, setList } = this.props
    const level = this.props.level || 0

    return (
      <Container>
        <Member {...tree} click={() => this.addChildren(tree)} />
        <ChildrenContainer>
          {
            tree.children.map((obj, i) => {
              return <div key={`level-${level}-${i}`}>
                <Recursive
                  tree={obj}
                  rootTree={rootTree}
                  level={level + 1}
                  setList={setList}
                />
              </div>
            })
          }
        </ChildrenContainer>
      </Container>
    )
  }
}

export default Recursive
