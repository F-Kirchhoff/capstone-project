import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'
import Button from '../../components/Button/Button'
import OverlayWrapper from '../../components/OverlayWrapper/OverlayWrapper'
import TabMenu from '../../components/TabMenu/TabMenu'
import VoteForm from '../../components/VoteForm/VoteForm'
import useFetch from '../../hooks/useFetch'
import type { Proposal, Vote } from '../../types/types'
import { BiChevronsLeft } from 'react-icons/bi'

const DEFAULT = {
  id: '0',
  description: '',
  votes: [],
}

export default function ProposalView(): JSX.Element {
  const { boardName, topicId, proposalId } = useParams()

  const [proposal, fetchProposal] = useFetch<Proposal>(
    `/api/boards/${boardName}/topics/${topicId}/proposals/${proposalId}`
  )

  const [view, setView] = useState<'SHOW_VOTE_FORM' | ''>('')

  useEffect(() => {
    fetchProposal('GET', '/')
  }, [])

  const { description, votes } = proposal ? proposal : DEFAULT

  const [voteCategory, setVoteCategory] = useState<string>('pro')

  const VotesWithComments = votes.filter(
    (vote: Vote) => vote.type === voteCategory && vote.text !== ''
  )
  const voteTypes = ['pro', 'neutral', 'remarks', 'concerns']
  const menuCategories = voteTypes.map(category => ({
    id: category,
    text: `${category} (${
      votes.filter((vote: Vote) => vote.type === category).length
    })`,
  }))

  function handleVoteSubmit(newVote: Vote) {
    fetchProposal('POST', '/addVote', JSON.stringify({ newVote }))
    fetchProposal('GET', '/')
    setView('')
  }

  return (
    <ProposalViewContainer>
      <ReturnButton to="..">
        <BiChevronsLeft size="32px" />
      </ReturnButton>
      <h1>Proposal</h1>
      <p>{description}</p>
      <TabMenu
        options={menuCategories}
        selectedOption={voteCategory}
        onSelect={setVoteCategory}
      />
      {VotesWithComments.length > 0 ? (
        <VotesContainer>
          {VotesWithComments.map((vote: Vote) => (
            <VoteDisplay key={vote.id}>{vote.text}</VoteDisplay>
          ))}
        </VotesContainer>
      ) : (
        <Disclaimer> No votes with comments in this category.</Disclaimer>
      )}
      <Button highlight onClick={() => setView('SHOW_VOTE_FORM')}>
        submit your vote
      </Button>
      {view === 'SHOW_VOTE_FORM' && (
        <OverlayWrapper onReturn={() => setView('')}>
          <VoteForm onSubmit={handleVoteSubmit} onCancel={() => setView('')} />
        </OverlayWrapper>
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
  padding: 1px 0;
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
  line-height: 0;
  color: inherit;
  text-decoration: none;
`
