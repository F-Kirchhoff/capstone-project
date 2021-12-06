import React from 'react'
import Proposal from './Proposal'

export default {
  title: 'Component/Proposal',
  component: Proposal,
}

const EXAMPLE = {
  description: 'We buy more beer in a store.',
  id: '0',
  votes: {
    pro: ['', 'great!', '', ''],
    neutral: ['', 'ok', '', ''],
    remarks: ['', 'Would be better if we buy at Dannovsky.', '', ''],
    concerns: ['I think we shouldnt drink that much beer.'],
  },
}
const EXAMPLE_LONG = {
  description:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Id qui nobis odit voluptates consequuntur quam, voluptatibus quod, fugiat praesentium, non error totam blanditiis eum reprehenderit alias sapiente facere. Debitis doloremque nisi a ducimus neque pariatur nesciunt in. Aliquam deserunt eligendi soluta harum consequuntur deleniti atque sequi asperiores, nam doloremque id?',
  id: '0',
  votes: {
    pro: ['', 'great!', '', '', '', '', '', '', ''],
    neutral: ['', 'ok', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    remarks: ['', 'Would be better if we buy at Dannovsky.', ''],
    concerns: ['I think we shouldnt drink that much beer.'],
  },
}

export const Regualr = (): JSX.Element => <Proposal content={EXAMPLE} />
export const Long = (): JSX.Element => <Proposal content={EXAMPLE_LONG} />
