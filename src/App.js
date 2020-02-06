import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import Iterative from './components/Iterative'
import Recursive from './components/Recursive'

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`

const ContentContainer = styled.div`
  width: 50%;
  height: 100%;
  padding: 20;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Title = styled.h2`
  color: red;
  margin-bottom: 20px;
`

class App extends Component {
  render() {
    const { tree } = this.props

    return (
      <Container>
        <ContentContainer>
          <Title>Recursive</Title>
          <Recursive tree={tree} rootTree={tree} setList={this.props.setListAsync} />
        </ContentContainer>
        <ContentContainer>
          <Title>Iterative</Title>
          <Iterative tree={tree} setList={this.props.setListAsync} />
        </ContentContainer>
      </Container>
    )
  }
}

export default connect(
  ({ tree }) => ({ tree: tree.treeObject }),
  (({ tree: { setListAsync } }) => ({ setListAsync }))
)(App)
