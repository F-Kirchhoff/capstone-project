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
    pros: ['', 'great!', '', ''],
    neutral: ['', 'ok', '', ''],
    remarks: ['', 'Would be better if we buy at Dannovsky.', '', ''],
    concerns: ['I think we shouldnt drink that much beer.'],
  },
}

export const Regualr = (): JSX.Element => <Proposal content={EXAMPLE} />
