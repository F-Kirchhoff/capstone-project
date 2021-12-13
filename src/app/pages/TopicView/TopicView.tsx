import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Need from '../../components/Need/Need'
import type { Topic, Need as NeedType } from '../../types/types'
import Button from '../../components/Button/Button'
import { useNavigate, useParams } from 'react-router-dom'
import NeedForm from '../../components/Forms/NeedForm'
import useFetch from '../../hooks/useFetch'
import TabMenu, { Tab } from '../../components/TabMenu/TabMenu'
import Proposal from '../../components/Proposal/Proposal'
import { BiChevronsLeft } from 'react-icons/bi'
import EditMenu from '../../components/EditMenu/EditMenu'
import Alert from '../../components/Alert/Alert'

type ViewMsgType = '' | 'SHOW_NEED_FORM' | 'SHOW_EDIT_FORM'

function TopicView(): JSX.Element {
  const { boardName, topicId } = useParams()
  const nav = useNavigate()

  const [topic, fetchTopic] = useFetch<Topic>(`/api/topics`, {
    boardName,
    topicId,
  })
  const [_need, fetchNeed] = useFetch<NeedType>(`/api/needs`, {
    boardName,
    topicId,
  })

  const { title, description, needs, proposals } = topic
    ? topic
    : { title: '', description: '', needs: [], proposals: [] }

  useEffect(() => {
    fetchTopic('GET')
  }, [])

  const [view, setView] = useState<ViewMsgType>('')
  const [tab, setCategory] = useState('needs')
  const [popup, setPopup] = useState<{ show: boolean; id: string | null }>({
    show: false,
    id: null,
  })

  const handleDelete = async () => {
    if (popup.id === 'TOPIC') {
      await fetchTopic('DELETE')
      nav('../..')
    } else if (popup.id) {
      await fetchNeed('DELETE', { needId: popup.id })
      fetchTopic('GET')
    }
  }

  const handleNeedSubmit = async (payload: { text: string }) => {
    // finds the correct topic and adds a need
    await fetchNeed('POST', { payload })
    await fetchTopic('GET')
    setView('')
  }

  const handleNeedUpvote = (needId: string) => async (upvotes: number) => {
    // finds the relevant Topic, inside it finds the relevant need and updates it upvote count
    fetchNeed('PATCH', {
      needId,
      patchMsg: 'UPVOTES',
      payload: upvotes,
    })
    fetchTopic('GET')
  }
  const handleNeedEdit = (needId: string) => async () => {
    console.log('Handle Edit ', needId)
  }

  let tabContent

  if (tab === 'needs') {
    if (needs.length > 0) {
      tabContent = (
        <NeedsList>
          {needs.map(need => (
            <Need
              key={need.id}
              content={need}
              onUpvoteChange={handleNeedUpvote(need.id)}
              onEdit={handleNeedEdit(need.id)}
              onDelete={() => setPopup({ show: true, id: need.id })}
            />
          ))}
        </NeedsList>
      )
    } else {
      tabContent = <Disclaimer>no needs added yet.</Disclaimer>
    }
  } else {
    if (proposals.length > 0) {
      tabContent = (
        <ProposalList>
          {proposals.map(proposal => (
            <Proposal content={proposal} key={proposal.id} />
          ))}
        </ProposalList>
      )
    } else {
      tabContent = <Disclaimer>no proposals added yet.</Disclaimer>
    }
  }

  return (
    <>
      {topic && (
        <>
          <TopicContainer>
            <NavContainer>
              <BiChevronsLeft size="32px" onClick={() => nav('../..')} />
              <EditMenu
                onEdit={() => console.log('Enter Edit')}
                onDelete={() => setPopup({ show: true, id: 'TOPIC' })}
                vertical
              />
            </NavContainer>
            <h2> {title}</h2>
            <Description>{description}</Description>
            <TabMenu>
              <Tab
                key="needs"
                active={tab === 'needs'}
                onClick={() => setCategory('needs')}
              >
                needs
              </Tab>
              <Tab
                key="proposals"
                active={tab === 'proposals'}
                onClick={() => setCategory('proposals')}
              >
                proposals
              </Tab>
            </TabMenu>
            {tabContent}
            {tab === 'needs' ? (
              <Button onClick={() => setView('SHOW_NEED_FORM')}>
                Add Need
              </Button>
            ) : (
              <Button onClick={() => nav('addProposal')}>Add Proposal</Button>
            )}
          </TopicContainer>
          {view === 'SHOW_NEED_FORM' && (
            <NeedForm
              onSubmit={handleNeedSubmit}
              onCancel={() => setView('')}
            />
          )}
          {popup.show && (
            <Alert
              onConfirm={() => {
                handleDelete()
                setPopup({ show: false, id: null })
              }}
              onCancel={() => setPopup({ show: false, id: null })}
            >
              You are going to permantly delete this{' '}
              {popup.id === 'TOPIC' ? 'topic' : 'need'}. Proceed?
            </Alert>
          )}
        </>
      )}
    </>
  )
}

export default TopicView

const TopicContainer = styled.article`
  width: 100vw;
  min-height: 100vh;
  background-color: var(--c-gray-100);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
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

const Description = styled.p`
  color: var(--c-gray-700);
`

const Disclaimer = styled.p`
  text-align: center;
  padding: 5px 0;
  color: var(--c-gray-400);
`

const NeedsList = styled.ul`
  display: flex;
  flex-direction: column;
  background-color: var(--c-gray-200);
  gap: 2px;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
`
const ProposalList = styled.ul`
  display: grid;
  gap: 10px;
`
