import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './components/Dashboard/Dashboard'

import type { Need, Topic } from './types/types'

const TOPICS = [
  {
    showDetails: true,
    content: {
      id: '0',
      title: 'Annual income for employees',
      description:
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Culpa, laborum. Molestias sint dicta, amet nemo vero enim pariatur ipsa maxime illo possimus repellendus fugiat modi odio consequatur maiores architecto natus dolorem eum quisquam dolor dolores, ut voluptatibus labore! Itaque officia quidem porro mollitia, deleniti voluptates! Minima cum aliquid minus provident?',
      needs: [
        {
          id: '1',
          text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores, veniam.',
          upvotes: 4,
        },
        {
          id: '2',
          text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores, veniam.',
          upvotes: 9,
        },
        {
          id: '3',
          text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores, veniam.',
          upvotes: 89,
        },
      ],
    },
  },
  {
    showDetails: false,
    content: {
      id: '1',
      title: 'Annual income for employees',
      description:
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Culpa, laborum. Molestias sint dicta, amet nemo vero enim pariatur ipsa maxime illo possimus repellendus fugiat modi odio consequatur maiores architecto natus dolorem eum quisquam dolor dolores, ut voluptatibus labore! Itaque officia quidem porro mollitia, deleniti voluptates! Minima cum aliquid minus provident?',
      needs: [
        {
          id: '1',
          text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores, veniam.',
          upvotes: 57,
        },
        {
          id: '2',
          text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores, veniam.',
          upvotes: 2,
        },
        {
          id: '3',
          text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores, veniam.',
          upvotes: 19,
        },
      ],
    },
  },
  {
    showDetails: false,
    content: {
      id: '2',
      title: 'Annual income for employees',
      description:
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Culpa, laborum. Molestias sint dicta, amet nemo vero enim pariatur ipsa maxime illo possimus repellendus fugiat modi odio consequatur maiores architecto natus dolorem eum quisquam dolor dolores, ut voluptatibus labore! Itaque officia quidem porro mollitia, deleniti voluptates! Minima cum aliquid minus provident?',
      needs: [
        {
          id: '1',
          text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores, veniam.',
          upvotes: 3,
        },
        {
          id: '2',
          text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores, veniam.',
          upvotes: 9,
        },
        {
          id: '3',
          text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores, veniam.',
          upvotes: 1,
        },
      ],
    },
  },
]

function App(): JSX.Element {
  const [topics, setTopics] = useState(TOPICS)

  function handleTopicDisplayToggle(id: string) {
    setTopics(prev =>
      prev.map(topic =>
        topic.content.id === id
          ? {
              ...topic,
              showDetails: !topic.showDetails,
            }
          : topic
      )
    )
  }

  function handleTopicSubmit(topic: Topic) {
    setTopics(prev => [
      {
        showDetails: false,
        content: topic,
      },
      ...prev,
    ])
  }

  function handleNeedSubmit(topicId: string, newNeed: Need) {
    // finds the correct topic and adds a need on top of its needList
    setTopics(prev =>
      prev.map(topic =>
        topic.content.id === topicId
          ? {
              ...topic,
              content: {
                ...topic.content,
                needs: [newNeed, ...topic.content.needs],
              },
            }
          : topic
      )
    )
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Dashboard
              content={topics}
              onDisplayToggle={handleTopicDisplayToggle}
              onTopicSubmit={handleTopicSubmit}
              onNeedSubmit={handleNeedSubmit}
            />
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
