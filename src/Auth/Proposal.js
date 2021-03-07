class Proposal {
  constructor(attrs) {
    Object.assign(this, attrs)
  }

  static get modelName() {
    return 'Proposal'
  }
}

export default Proposal
