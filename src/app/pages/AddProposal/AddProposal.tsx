import { nanoid } from 'nanoid'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import Button from '../../components/Button/Button'
import FormInput from '../../components/FormInput/FormInput'
import useFetch from '../../hooks/useFetch'
import { BiChevronsLeft } from 'react-icons/bi'
import type { Proposal, Topic } from '../../types/types'

const MAX_DESCRIPTION_LENGTH = 144

export default function AddProposal(): JSX.Element {
  const { boardName, topicId } = useParams()

  const [topic, fetchTopic] = useFetch<Topic>(`/api/topics`)
  const [_proposal, fetchProposal] = useFetch<Proposal>(`/api/proposals`)

  const needs = topic ? topic.needs : []

  useEffect(() => {
    fetchTopic('GET', { boardName, topicId })
  }, [])

  const [description, setDescription] = useState('')
  const descriptionDiff = MAX_DESCRIPTION_LENGTH - description.length

  const nav = useNavigate()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const newProposal: Proposal = {
      id: nanoid(),
      description,
      votes: [],
    }

    await fetchProposal('POST', { boardName, topicId, payload: newProposal })
    nav('..')
  }

  const handleCancel = () => {
    setDescription('')
    nav('..')
  }
  return (
    <PageContainer>
      <Background>
        <ReturnButton to="..">
          <BiChevronsLeft size="32px" />
        </ReturnButton>
        <Header>Add Proposal</Header>
      </Background>
      <FormContainer onSubmit={handleSubmit}>
        <FormInput
          type="textArea"
          name="description"
          diff={descriptionDiff}
          value={description}
          onChange={event =>
            event.target.value.length <= MAX_DESCRIPTION_LENGTH &&
            setDescription(event.target.value)
          }
        />
        <h3>Needs</h3>
        {needs.length > 0 ? (
          <NeedsList>
            {needs.map(need => (
              <NeedContainer key={need.id}>
                <input type="checkbox" />
                <p>
                  {need.text}
                  {` (${need.upvotes})`}
                </p>
              </NeedContainer>
            ))}
          </NeedsList>
        ) : (
          <Disclaimer>No needs added yet.</Disclaimer>
        )}
        <ButtonContainer>
          <Button type="button" onClick={handleCancel}>
            Cancel
          </Button>
          <Button highlight>Add Topic</Button>
        </ButtonContainer>
      </FormContainer>
    </PageContainer>
  )
}

const PageContainer = styled.div`
  position: relative;
`

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 100vh;
  background-color: var(--c-secondary);
`

const ReturnButton = styled(Link)`
  position: absolute;
  top: 30px;
  left: 30px;
  color: var(--c-gray-50);
  text-decoration: none;
  align-content: center;
`

const Header = styled.h1`
  color: var(--c-gray-50);
  margin: 30px;
  margin-top: 20vh;
  font-size: 4rem;
`
const FormContainer = styled.form`
  margin-top: 60vh;
  position: relative;
  display: grid;
  grid-template-rows: auto 1fr auto;
  width: 100%;
  min-height: 40vh;
  flex-direction: column;
  padding: 20px;
  background-color: var(--c-gray-100);
  color: var(--c-dark);
  border-top-right-radius: 30px;
  border-top-left-radius: 30px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
`

const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`
const NeedsList = styled.ul`
  list-style: none;
`

const NeedContainer = styled.li`
  display: flex;
  gap: 20px;
  padding: 10px;
`

const Disclaimer = styled.p`
  color: var(--c-gray-600);
  text-align: center;
  padding: 20px;
`
