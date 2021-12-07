import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Need from '../../components/Need/Need'
import type { Topic, Need as NeedType } from '../../types/types'
import Button from '../../components/Button/Button'
import DoubleChevronLeft from '../../Icons/DoubleChevronLeft'
import { Link, useParams } from 'react-router-dom'
import NeedForm from '../../components/NeedForm/NeedForm'
import OverlayWrapper from '../../components/OverlayWrapper/OverlayWrapper'
import useFetch from '../../hooks/useFetch'

type ViewMsgType = '' | 'SHOW_NEED_FORM'

function TopicView(): JSX.Element {
  const { boardName, topicId } = useParams()

  const [topic, fetchTopic] = useFetch<Topic>(
    `/api/boards/${boardName}/topics/${topicId}`
  )

  const { title, description, needs } = topic
    ? topic
    : { title: '', description: '', needs: [] }

  useEffect(() => {
    fetchTopic('GET', '/')
  }, [])

  const [view, setView] = useState<ViewMsgType>('')

  const handleNeedSubmit = async (newNeed: NeedType) => {
    // finds the correct topic and adds a need
    await fetchTopic('POST', `/addNeed`, JSON.stringify({ newNeed }))
    setView('')
    fetchTopic('GET', '/')
  }

  const handleNeedUpvote = (needId: string) => async (upvotes: number) => {
    // finds the relevant Topic, inside it finds the relevant need and updates it upvote count
    await fetchTopic(
      'PATCH',
      `/needs/${needId}`,
      JSON.stringify({ patchMsg: 'UPVOTES', payload: upvotes })
    )
    fetchTopic('GET', '/')
  }

  return (
    <>
      {topic && (
        <>
          <TopicContainer>
            <TitleContainer to={'..'}>
              <DoubleChevronLeft width="24" /> <h2> {title}</h2>
            </TitleContainer>
            <Description>{description}</Description>
            <h3>Needs</h3>
            {needs.length > 0 ? (
              <NeedsList>
                {needs.map(need => (
                  <Need
                    key={need.id}
                    content={need}
                    onUpvoteChange={handleNeedUpvote(need.id)}
                  />
                ))}
              </NeedsList>
            ) : (
              <Disclaimer>no needs added yet.</Disclaimer>
            )}
            <Button highlight onClick={() => setView('SHOW_NEED_FORM')}>
              Add Need
            </Button>
          </TopicContainer>
          {view === 'SHOW_NEED_FORM' && (
            <OverlayWrapper onReturn={() => setView('')}>
              <NeedForm
                onSubmit={handleNeedSubmit}
                onCancel={() => setView('')}
              />
            </OverlayWrapper>
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
const TitleContainer = styled(Link)`
  text-decoration: none;
  color: var(--c-primary);
  font-family: 'Plairfair';
  font-weight: bold;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 20px;
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
