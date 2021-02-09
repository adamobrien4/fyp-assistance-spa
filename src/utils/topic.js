const topicStatuses = {
  draft: 'Draft',
  suggestion: 'Ready for Submission',
  active: 'Active',
  archived: 'Archived',
  assigned: 'Assigned',
  prev_term: 'From Previous Term'
}
const topicStatusToHumanFriendlyString = status => topicStatuses[status]

export { topicStatusToHumanFriendlyString }
