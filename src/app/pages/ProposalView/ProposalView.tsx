import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'
import SliderMenu from '../../components/SliderMenu/SliderMenu'
import useFetch from '../../hooks/useFetch'
import DoubleChevronLeft from '../../Icons/DoubleChevronLeft'

const DEFAULT = {
  id: '0',
  description: '',
  votes: {
    pro: [],
    neutral: [],
    remarks: [],
    concerns: [],
  },
}

export default function ProposalView(): JSX.Element {
  const { boardName, topicId, proposalId } = useParams()

  const [proposal, fetchProposal] = useFetch<Proposal>(
    `/api/boards/${boardName}/topics/${topicId}/proposals/${proposalId}`
  )

  useEffect(() => {
    fetchProposal('GET', '/')
  }, [])

  const { description, votes } = proposal ? proposal : DEFAULT

  const [voteCategory, setVoteCategory] = useState<string>('pro')
  const votesFromCategory: string[] = votes[voteCategory as keyof typeof votes]

  const VotesWithTextAvailable =
    votesFromCategory.filter((voteText: string) => voteText !== '').length > 0

  const menuCategories = Object.keys(votes).map(category => ({
    id: category,
    text: `${category} (${votes[category as keyof typeof votes].length})`,
  }))

  return (
    <ProposalViewContainer>
      <ReturnButton to="..">
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
