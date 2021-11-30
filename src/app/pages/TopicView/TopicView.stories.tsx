import React from 'react'
import TopicDetailView from './TopicView'

export default {
  title: 'Component/TopicView',
  component: TopicDetailView,
}

const EXAMPLE = {
  id: '1',
  title: 'Annual income for employees',
  description:
    'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Culpa, laborum. Molestias sint dicta, amet nemo vero enim pariatur ipsa maxime illo possimus repellendus fugiat modi odio consequatur maiores architecto natus dolorem eum quisquam dolor dolores, ut voluptatibus labore! Itaque officia quidem porro mollitia, deleniti voluptates! Minima cum aliquid minus provident?',
  needs: [
    {
      id: '0',
      text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores, veniam.',
      upvotes: 13,
    },
    {
      id: '1',
      text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores, veniam.',
      upvotes: 13,
    },
    {
      id: '2',
      text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores, veniam.',
      upvotes: 13,
    },
  ],
}

export const Topic_Regular = (): JSX.Element => (
  <TopicDetailView
    content={EXAMPLE}
    onAddNeed={() => console.log('add')}
    onUpvoteChange={(needId: string) => (newUpvotes: number) =>
      console.log({ needId, newUpvotes })}
  />
)
