import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './components/Dashboard/Dashboard'

import type { Topic } from './types/types'

const TOPICS = [
  {
    showDetails: true,
    content: {
      id: 0,
      title: 'Annual income for employees',
      description:
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Culpa, laborum. Molestias sint dicta, amet nemo vero enim pariatur ipsa maxime illo possimus repellendus fugiat modi odio consequatur maiores architecto natus dolorem eum quisquam dolor dolores, ut voluptatibus labore! Itaque officia quidem porro mollitia, deleniti voluptates! Minima cum aliquid minus provident?',
      needs: [
        {
          id: 1,
          text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores, veniam.',
        },
        {
          id: 2,
          text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores, veniam.',
        },
        {
          id: 3,
          text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores, veniam.',
        },
      ],
    },
  },
  {
    showDetails: false,
    content: {
      id: 1,
      title: 'Annual income for employees',
      description:
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Culpa, laborum. Molestias sint dicta, amet nemo vero enim pariatur ipsa maxime illo possimus repellendus fugiat modi odio consequatur maiores architecto natus dolorem eum quisquam dolor dolores, ut voluptatibus labore! Itaque officia quidem porro mollitia, deleniti voluptates! Minima cum aliquid minus provident?',
      needs: [
        {
          id: 1,
          text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores, veniam.',
        },
        {
          id: 2,
          text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores, veniam.',
        },
        {
          id: 3,
          text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores, veniam.',
        },
      ],
    },
  },
  {
    showDetails: false,
    content: {
      id: 2,
      title: 'Annual income for employees',
      description:
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Culpa, laborum. Molestias sint dicta, amet nemo vero enim pariatur ipsa maxime illo possimus repellendus fugiat modi odio consequatur maiores architecto natus dolorem eum quisquam dolor dolores, ut voluptatibus labore! Itaque officia quidem porro mollitia, deleniti voluptates! Minima cum aliquid minus provident?',
      needs: [
        {
          id: 1,
          text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores, veniam.',
        },
        {
          id: 2,
          text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores, veniam.',
        },
        {
          id: 3,
          text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores, veniam.',
        },
      ],
    },
  },
]

function App(): JSX.Element {
  const [topics, setTopics] = useState(TOPICS)

  function handleTopicDisplayToggle(id: number) {
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
            />
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
