const proposalStatuses = {
  draft: 'Draft',
  submitted: 'Pending Supervisor Feedback',
  under_review: 'Under Review',
  pending_edits: 'Edits Required',
  accepted: 'Accepted',
  rejected: 'Rejected'
}
const proposalStatusToHumanFriendlyString = status => proposalStatuses[status]

export { proposalStatuses, proposalStatusToHumanFriendlyString }
