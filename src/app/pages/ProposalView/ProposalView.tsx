import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import SliderMenu from '../../components/SliderMenu/SliderMenu'
import DoubleChevronLeft from '../../Icons/DoubleChevronLeft'

type Votes = {
  pro: string[]
  neutral: string[]
  remarks: string[]
  concerns: string[]
}

export type Proposal = {
  id: string
  description: string
  votes: Votes
}

type ProposalViewProps = {
  content: Proposal
}

export default function ProposalView({
  content,
}: ProposalViewProps): JSX.Element {
  const { description, votes } = content

  const [voteCategory, setVoteCategory] = useState<string>('pro')
  const votesFromCategory: string[] = votes[voteCategory as keyof Votes]

  const VotesWithTextAvailable =
    votesFromCategory.filter((voteText: string) => voteText !== '').length > 0

  const menuCategories = Object.keys(votes).map(category => ({
    id: category,
    text: `${category} (${category.length})`,
  }))

  return (
    <ProposalViewContainer>
      <ReturnButton to="/">
        <DoubleChevronLeft width={'24'} />
      </ReturnButton>
      <h1>Proposal</h1>
      <p>{description}</p>
      <SliderMenu
        options={menuCategories}
        selectedOption={voteCategory}
        onSelect={setVoteCategory}
      />
      {VotesWithTextAvailable ? (
        <VotesContainer>
          {votesFromCategory
            .filter((voteText: string) => voteText !== '')
            .map((voteText: string) => (
              <VoteDisplay>{voteText}</VoteDisplay>
            ))}
        </VotesContainer>
      ) : (
        <Disclaimer> No votes with comments in this category.</Disclaimer>
      )}
    </ProposalViewContainer>
  )
}

const ProposalViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 20px;
`

const VotesContainer = styled.ul`
  display: grid;
  gap: 1px;
  background-color: var(--c-gray-400);
  border-radius: 3px;
  overflow: hidden;
`

const VoteDisplay = styled.li`
  list-style: none;
  padding: 10px 20px;
  background-color: var(--c-gray-100);
`
const Disclaimer = styled.p`
  color: var(--c-gray-400);
  text-align: center;
`

const ReturnButton = styled(Link)`
  color: inherit;
  text-decoration: none;
`
