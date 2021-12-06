import React from 'react'
import ProposalView from './ProposalView'

export default {
  title: 'Page/ProposalView',
  component: ProposalView,
}

const EXAMPLE = {
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

export const Short = (): JSX.Element => <ProposalView content={EXAMPLE} />
