export interface VoteBtnProps { // VoteBtn props
  label: string
  type: 'VoteYes' | 'VoteNo'
  handleClick: () => void
  active: boolean
}