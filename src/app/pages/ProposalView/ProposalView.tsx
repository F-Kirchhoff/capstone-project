import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import Button from '../../components/Button/Button'
import OverlayWrapper from '../../components/OverlayWrapper/OverlayWrapper'
import TabMenu, { Tab } from '../../components/TabMenu/TabMenu'
import VoteForm from '../../components/VoteForm/VoteForm'
import useFetch from '../../hooks/useFetch'
import type { Proposal, Vote } from '../../types/types'
import { BiChevronsLeft } from 'react-icons/bi'
import {
  FaCheck,
  FaExclamationCircle,
  FaRegQuestionCircle,
  FaStar,
} from 'react-icons/fa'
import EditMenu from '../../components/EditMenu/EditMenu'
import Alert from '../../components/Alert/Alert'

const DEFAULT = {
  id: '0',
  description: '',
  votes: [],
}

export default function ProposalView(): JSX.Element {
  const { boardName, topicId, proposalId } = useParams()
  const nav = useNavigate()

  const [proposal, fetchProposal] = useFetch<Proposal>(`/api/proposals`, {
    boardName,
    topicId,
    proposalId,
  })
  const [_vote, fetchVote] = useFetch<Vote>(`/api/votes`, {
    boardName,
    topicId,
    proposalId,
  })

  const [view, setView] = useState<'SHOW_VOTE_FORM' | ''>('')
  const [voteCategory, setVoteCategory] = useState<string>('pro')
  const [popup, setPopup] = useState<{ show: boolean; id: string | null }>({
    show: false,
    id: null,
  })

  useEffect(() => {
    fetchProposal('GET')
  }, [])

  const { description, votes } = proposal ? proposal : DEFAULT

  const VotesWithComments = votes.filter(
    (vote: Vote) => vote.type === voteCategory && vote.text !== ''
  )

  const voteTypes = ['pro', 'neutral', 'remarks', 'concerns']
  const voteTypeSymbols = {
    pro: <FaStar size="1em" />,
    neutral: <FaCheck size="1em" />,
    remarks: <FaRegQuestionCircle size="1em" />,
    concerns: <FaExclamationCircle size="1em" />,
  }

  const handleVoteSubmit = async (payload: { text: string; type: string }) => {
    await fetchVote('POST', { payload })
    await fetchProposal('GET')
    setView('')
  }

  const handleDelete = async () => {
    await fetchProposal('DELETE')
    nav('..')
  }

  return (
    <ProposalViewContainer>
      <NavContainer>
        <BiChevronsLeft size="32px" onClick={() => nav('..')} />
        <EditMenu
          onEdit={() => console.log('Enter Edit')}
          onDelete={() => setPopup({ show: true, id: 'PROPOSAL' })}
          vertical
        />
      </NavContainer>
      <h1>Proposal</h1>
      <p>{description}</p>
      <TabMenu>
        {voteTypes.map(type => (
          <Tab
            key={type}
            active={voteCategory === type}
            onClick={() => setVoteCategory(type)}
          >
            {voteTypeSymbols[type as keyof typeof voteTypeSymbols]}
            <span>
              {`(${votes.filter((vote: Vote) => vote.type === type).length})`}
            </span>
          </Tab>
        ))}
      </TabMenu>
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
        <VoteForm onSubmit={handleVoteSubmit} onCancel={() => setView('')} />
      )}
      {popup.show && (
        <Alert
          onConfirm={() => {
            handleDelete()
            setPopup({ show: false, id: null })
          }}
          onCancel={() => setPopup({ show: false, id: null })}
        >
          You are going to permantly delete this Proposal. Proceed?
        </Alert>
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
const NavContainer = styled.header`
  text-decoration: none;
  color: inherit;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  & > h2 {
    overflow: hidden;
  }
`
