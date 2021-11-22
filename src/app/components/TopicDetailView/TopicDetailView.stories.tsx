import React from 'react'
import TopicDetailView from './TopicDetailView'

export default {
  title: 'Component/TopicDetailView',
  component: TopicDetailView,
}

const EXAMPLE = {
  title: 'Annual income for employees',
  description:
    'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Culpa, laborum. Molestias sint dicta, amet nemo vero enim pariatur ipsa maxime illo possimus repellendus fugiat modi odio consequatur maiores architecto natus dolorem eum quisquam dolor dolores, ut voluptatibus labore! Itaque officia quidem porro mollitia, deleniti voluptates! Minima cum aliquid minus provident?',
  needs: [
    {
      text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores, veniam.',
      upvotes: 10,
    },
    {
      text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores, veniam.',
      upvotes: 12,
    },
    {
      text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores, veniam.',
      upvotes: 3,
    },
  ],
  deadline: new Date().getTime() + 1000 * 60 * 60 * 8,
}

export const Topic_Regular = (): JSX.Element => (
  <TopicDetailView content={EXAMPLE} />
)
