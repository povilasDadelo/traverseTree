import React, { Component } from 'react'
import styled from 'styled-components'
import _ from 'lodash'

const Container = styled.div`
  justify-content: center;
  margin-top: 20px;
`

const NameContainer = styled.div`
  border: solid 1px blue;
  display: flex;
  margin-right: 10px;
  margin-left: ${({ depth }) => depth}0px;
`

const Name = styled.div`
  margin-right: 20px;
`

const AddIcon = styled.div`
  margin-right: 10px;
  cursor: pointer;
`

const Member = ({ name, click, depth }) => (
  <NameContainer depth={depth}>
    <Name>{name}</Name>
    <AddIcon onClick={click}>+</AddIcon>
  </NameContainer>
)


class Iterative extends Component {
  list(node) {
    const cloned = _.cloneDeep(node)
    let leftToTraverse = [[cloned, 0]]
    const result = []

    while (leftToTraverse.length !== 0) {
      let [current, depth] = leftToTraverse.pop()
      leftToTraverse = leftToTraverse.concat(current.children.reverse().map(obj => [obj, depth + 1]))

      result.push([current, depth])
    }

    return result
  }

  add(node, parentId) {
    const newPerson = window.prompt('Add new person to family')
    const newChild = { name: newPerson, children: [], id: Math.random() }
    const cloned = _.cloneDeep(node)
    let leftToTraverse = [cloned]

    while (leftToTraverse.length !== 0) {
      let current = leftToTraverse.pop()

      if (current.id === parentId) {
        current.children.push(newChild)
      }

      leftToTraverse = leftToTraverse.concat([...current.children].reverse())
    }

    this.props.setList({ newTree: cloned })
  }


  render() {
    const { tree } = this.props

    return (
      <Container>
        {this.list(tree).map(([obj, depth], index) => {
          return (
            <Member key={`${index}-k`} {...obj} click={() => this.add(tree, obj.id)} depth={depth} />
          )
        })}
      </Container>
    )
  }
}

export default Iterative
