const proposalStatuses = {
  draft: 'Draft',
  submitted: 'Submitted',
  under_review: 'Under Review',
  pending_edits: 'Edits Required',
  accepted: 'Accepted',
  declined: 'Declined'
}
const proposalStatusToHumanFriendlyString = status => proposalStatuses[status]

export { proposalStatuses, proposalStatusToHumanFriendlyString }
